const maps = document.querySelectorAll(".js-lazy-map");

if (maps.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const iframe = entry.target;
          iframe.src = iframe.dataset.src;
          observer.unobserve(iframe);
        }
      });
    },
    { rootMargin: "200px" }
  );

  maps.forEach((iframe) => observer.observe(iframe));
}
