const toggle = document.querySelector(".js-nav-toggle");
const overlay = document.querySelector(".js-nav-overlay");

if (toggle && overlay) {
  const closeOverlay = () => {
    overlay.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
  };

  toggle.addEventListener("click", () => {
    const isOpen = overlay.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  overlay.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeOverlay));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeOverlay();
  });
}

// Sticky mobile CTA bar — appears after ~8% scroll
const mobileBar = document.querySelector(".js-mobile-cta-bar");

if (mobileBar) {
  const threshold = () => window.innerHeight * 0.08;
  const onScroll = () => {
    mobileBar.classList.toggle("is-visible", window.scrollY > threshold());
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
