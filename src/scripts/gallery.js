document.querySelectorAll(".js-gallery").forEach((root) => {
  if (root.dataset.wired) return;
  root.dataset.wired = "true";

  const filters = Array.from(root.querySelectorAll(".gallery-filter"));
  const items = Array.from(root.querySelectorAll(".gallery-grid .placeholder"));
  const lightbox = root.querySelector(".js-lightbox");
  const lightboxLabel = root.querySelector(".js-lightbox-label");
  let visibleItems = items;
  let currentIndex = 0;

  function applyFilter(category) {
    items.forEach((item) => {
      const match = category === "All" || item.dataset.category === category;
      item.style.display = match ? "" : "none";
    });
    visibleItems = items.filter((item) => category === "All" || item.dataset.category === category);
  }

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      applyFilter(btn.dataset.filter);
    });
  });

  function updateLightbox() {
    const item = visibleItems[currentIndex];
    if (!item || !lightboxLabel) return;
    lightboxLabel.textContent = item.getAttribute("aria-label") || "";
  }

  function openLightbox(item) {
    const idx = visibleItems.indexOf(item);
    currentIndex = idx === -1 ? 0 : idx;
    updateLightbox();
    lightbox?.classList.add("is-open");
    lightbox?.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox?.classList.remove("is-open");
    lightbox?.setAttribute("aria-hidden", "true");
  }

  items.forEach((item) => {
    item.addEventListener("click", () => openLightbox(item));
  });

  root.querySelector(".lightbox__close")?.addEventListener("click", closeLightbox);

  root.querySelector(".lightbox__prev")?.addEventListener("click", () => {
    if (!visibleItems.length) return;
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    updateLightbox();
  });

  root.querySelector(".lightbox__next")?.addEventListener("click", () => {
    if (!visibleItems.length) return;
    currentIndex = (currentIndex + 1) % visibleItems.length;
    updateLightbox();
  });

  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox?.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") root.querySelector(".lightbox__prev")?.dispatchEvent(new Event("click"));
    if (e.key === "ArrowRight") root.querySelector(".lightbox__next")?.dispatchEvent(new Event("click"));
  });
});
