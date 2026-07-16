// PORTFOLIO NOTE: this was a real client site; the engagement has ended and
// this is now a portfolio piece. Every contact detail below is a deliberate
// placeholder (not the real gym's info) so a visitor can never reach the
// actual business through this demo.
export const site = {
  name: "Unicorn Fitness",
  wordmark: "UNICORN",
  tagline: "Serious training, honest price. You won't be left to figure it out alone.",
  url: "https://unicornfitness.example", // placeholder domain — portfolio piece
  phone: "9000000000",
  phoneIntl: "919000000000",
  phoneHref: "tel:9000000000",
  whatsappBase: "https://wa.me/919000000000",
  address: {
    line1: "123 Example Road, Sector 1",
    line2: "Example City 000001",
    landmark: "Near Example Landmark, Sector 1",
    full: "123 Example Road, Sector 1, Example City 000001",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Example+Fitness+Studio",
    mapsEmbedSrc: "https://www.google.com/maps?q=Example+Fitness+Studio&output=embed",
    geo: {
      lat: 0,
      lng: 0,
    },
  },
  hoursOpen24_7: true, // confirmed by owner
  openedOn: "2026-07-01",
  social: {
    // TODO(owner): confirm the real handle — this is a placeholder so the
    // footer icon/link exists and is wired up correctly.
    instagram: "https://instagram.com/unicornfitness",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Personal Training", href: "/personal-training" },
    { label: "Membership", href: "/membership" },
    { label: "The Gym", href: "/the-gym" },
    { label: "Coaches", href: "/coaches" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

export function waLink(message) {
  return `${site.whatsappBase}?text=${encodeURIComponent(message)}`;
}
