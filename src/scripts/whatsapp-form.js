const WA_BASE_FALLBACK = "https://wa.me/918454848066";
const MAX_NAME_LEN = 80;
const MAX_MESSAGE_LEN = 500;
const RESUBMIT_COOLDOWN_MS = 3000;

// Collapses internal whitespace/newlines (common after a paste) and trims ends.
function collapseWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function validateName(raw) {
  const value = collapseWhitespace(raw).slice(0, MAX_NAME_LEN);
  if (value.length < 2) return { ok: false, value };
  // Requires at least one letter (any script) so "12345" or "!!!" don't pass,
  // while still allowing names with numerals/punctuation mixed in (O'Brien, D'Souza 2).
  if (!/\p{L}/u.test(value)) return { ok: false, value };
  return { ok: true, value };
}

// Strips characters a phone number can never contain, and keeps at most one
// leading "+" — handles the messy paste-from-contacts case (stray parens,
// double "+", invisible marks) without rejecting the whole input outright.
function sanitizePhoneInput(raw) {
  let cleaned = raw.replace(/[^0-9+\-().\s]/g, "");
  const hasLeadingPlus = cleaned.trimStart().startsWith("+");
  cleaned = cleaned.replace(/\+/g, "");
  if (hasLeadingPlus) cleaned = "+" + cleaned.replace(/^\s+/, "");
  return cleaned;
}

function validatePhone(raw) {
  const value = raw.trim();
  if (!value) return { ok: false, value };
  if (!/^\+?[0-9\s\-().]{6,25}$/.test(value)) return { ok: false, value };
  if ((value.match(/\+/g) || []).length > 1) return { ok: false, value };

  const digits = value.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return { ok: false, value };
  // Junk like "0000000000" or "9999999999" passes every other check.
  if (/^(\d)\1{6,}$/.test(digits)) return { ok: false, value };

  // Indian mobile numbers (the overwhelming majority of leads for this gym)
  // must start 6-9 once any country code / trunk prefix is stripped. Only
  // enforced when we can confidently isolate a bare 10-digit local number and
  // the input isn't explicitly tagged with a non-Indian country code.
  const hasForeignCode = value.startsWith("+") && !value.startsWith("+91");
  if (!hasForeignCode) {
    let core = digits;
    if (core.length === 12 && core.startsWith("91")) core = core.slice(2);
    else if (core.length === 11 && core.startsWith("0")) core = core.slice(1);
    if (core.length === 10 && !/^[6-9]/.test(core)) return { ok: false, value };
  }

  return { ok: true, value };
}

function setFieldError(field, hasError) {
  const wrapper = field.closest(".field");
  wrapper.classList.toggle("has-error", hasError);
  field.setAttribute("aria-invalid", hasError ? "true" : "false");
}

document.querySelectorAll(".js-wa-form").forEach((form) => {
  const waBase = form.dataset.waBase || WA_BASE_FALLBACK;
  const submitBtn = form.querySelector('[type="submit"]');
  // Mutate only the text node, not submitBtn.textContent — the button also
  // contains an <i> icon element that a textContent assignment would wipe out.
  const submitTextNode = submitBtn
    ? Array.from(submitBtn.childNodes).find((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim())
    : null;
  const submitLabel = submitTextNode ? submitTextNode.textContent : "";
  const nameField = form.querySelector("[name=name]");
  const phoneField = form.querySelector("[name=phone]");
  const wantField = form.querySelector("[name=want]");
  const messageField = form.querySelector("[name=message]");
  let submitting = false;

  // Live sanitize as the user types so junk characters never accumulate,
  // and clear a stale error the moment the value becomes valid again.
  phoneField.addEventListener("input", () => {
    const sanitized = sanitizePhoneInput(phoneField.value);
    if (sanitized !== phoneField.value) {
      const selectionEnd = phoneField.selectionEnd ?? phoneField.value.length;
      const cursorFromEnd = phoneField.value.length - selectionEnd;
      phoneField.value = sanitized;
      try {
        const pos = Math.max(sanitized.length - cursorFromEnd, 0);
        phoneField.setSelectionRange(pos, pos);
      } catch {
        // Some browsers/input states don't support selection ranges — the
        // sanitized value is already set, a cursor jump is a minor tradeoff.
      }
    }
    if (phoneField.closest(".field").classList.contains("has-error") && validatePhone(phoneField.value).ok) {
      setFieldError(phoneField, false);
    }
  });

  nameField.addEventListener("input", () => {
    if (nameField.closest(".field").classList.contains("has-error") && validateName(nameField.value).ok) {
      setFieldError(nameField, false);
    }
  });

  // Validate on blur too, so mistakes surface before the user reaches submit.
  nameField.addEventListener("blur", () => {
    if (nameField.value.trim()) setFieldError(nameField, !validateName(nameField.value).ok);
  });
  phoneField.addEventListener("blur", () => {
    if (phoneField.value.trim()) setFieldError(phoneField, !validatePhone(phoneField.value).ok);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (submitting) return;

    // Honeypot: real users never fill this hidden field. Bots that
    // blindly fill every input do — silently drop the submission.
    const honeypot = form.querySelector('[name="_hp"]');
    if (honeypot && honeypot.value.trim() !== "") return;

    const name = validateName(nameField.value);
    const phone = validatePhone(phoneField.value);

    setFieldError(nameField, !name.ok);
    setFieldError(phoneField, !phone.ok);

    if (!name.ok || !phone.ok) {
      (name.ok ? phoneField : nameField).focus();
      return;
    }

    const lines = [`Hi! I'm ${name.value}.`, `Phone: ${phone.value}`, `I want to: ${wantField.value}`];

    const messageValue = messageField ? collapseWhitespace(messageField.value).slice(0, MAX_MESSAGE_LEN) : "";
    if (messageValue) lines.push(`Note: ${messageValue}`);

    const url = `${waBase}?text=${encodeURIComponent(lines.join("\n"))}`;

    // Client-side throttle: stops double-clicks/rapid resubmits from
    // popping open multiple WhatsApp tabs. There's no server here to
    // rate-limit — this is the meaningful equivalent for a form that
    // only ever redirects to wa.me.
    submitting = true;
    if (submitBtn) submitBtn.disabled = true;
    if (submitTextNode) submitTextNode.textContent = "Opening WhatsApp…";
    window.open(url, "_blank", "noopener");
    window.setTimeout(() => {
      submitting = false;
      if (submitBtn) submitBtn.disabled = false;
      if (submitTextNode) submitTextNode.textContent = submitLabel;
    }, RESUBMIT_COOLDOWN_MS);
  });
});
