import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  gsap.registerPlugin(ScrollTrigger);

  // ---------- scroll reveals (fade + rise, staggered per viewport batch) ----------
  const revealEls = gsap.utils.toArray(".reveal");

  if (revealEls.length) {
    gsap.set(revealEls, { opacity: 0, y: 28 });

    ScrollTrigger.batch(revealEls, {
      start: "top 88%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          overwrite: true,
        }),
    });

    // Safety net: an instant scroll jump (skip-link, back/forward restore,
    // anchor nav) can land past a target without it ever crossing the
    // trigger, so ScrollTrigger never fires for it. Force everything
    // visible after a short delay so nothing stays hidden indefinitely.
    window.setTimeout(() => {
      revealEls.forEach((el) => {
        if (gsap.getProperty(el, "opacity") < 1) {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.4, overwrite: true });
        }
      });
    }, 2500);
  }

  // ---------- home hero: staggered copy entrance ----------
  // The headline entrance (ufUp) is handled by a CSS keyframe already; the
  // athlete image is static. This choreographs the sub-headline/CTAs in
  // right after the headline.
  const heroCopy = document.querySelector(".uf-hero__copy-inner");
  if (heroCopy) {
    const copyTargets = heroCopy.querySelectorAll(".uf-hero__lead, .uf-hero__actions, .uf-hero__fine");
    if (copyTargets.length) {
      gsap.set(copyTargets, { opacity: 0, y: 20 });
      gsap.to(copyTargets, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.5,
      });
    }
  }

  // ---------- inner-page compact hero: entrance ----------
  const pageHero = document.querySelector(".hero--compact .hero__content");
  if (pageHero) {
    const heroTargets = pageHero.querySelectorAll(".hero__eyebrow, .hero__title, .hero__subhead");
    if (heroTargets.length) {
      gsap.set(heroTargets, { opacity: 0, y: 20 });
      gsap.to(heroTargets, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.1,
      });
    }
  }

  // ---------- "here's exactly what happens" carousel: pinned horizontal scroll ----------
  // The section (heading + track) pins in place while vertical scroll is
  // translated into horizontal motion on the track, so cards pass by one
  // at a time instead of needing their own scroll gesture.
  const journeySection = document.querySelector(".journey-pin");
  const journeyTrack = journeySection?.querySelector(".carousel");
  const journeyViewport = journeyTrack?.parentElement;

  if (journeySection && journeyTrack && journeyViewport) {
    journeySection.classList.add("js-horizontal-pin");

    const getDistance = () => Math.max(journeyTrack.scrollWidth - journeyViewport.clientWidth, 0);

    gsap.to(journeyTrack, {
      x: () => -getDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: journeySection,
        start: "top top",
        end: () => `+=${getDistance()}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
      },
    });
  }

  window.addEventListener("load", () => ScrollTrigger.refresh());
}
