document.querySelectorAll(".js-faq").forEach((faq) => {
  if (faq.dataset.wired) return;
  faq.dataset.wired = "true";

  faq.querySelectorAll(".faq-item__trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const panel = document.getElementById(trigger.getAttribute("aria-controls"));
      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      trigger.setAttribute("aria-expanded", String(!isOpen));
      panel.style.height = isOpen ? "0px" : `${panel.scrollHeight}px`;
    });
  });
});
