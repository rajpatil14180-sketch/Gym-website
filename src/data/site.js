export const site = {
  name: "Unicorn Fitness",
  wordmark: "UNICORN",
  tagline: "Serious training, honest price. You won't be left to figure it out alone.",
  url: "https://unicornfitness.in", // TODO: confirm real domain before launch
  phone: "8454848066",
  phoneIntl: "918454848066",
  phoneHref: "tel:8454848066",
  whatsappBase: "https://wa.me/918454848066",
  address: {
    line1: "Above Hotel Jagdamb, Sector 25",
    line2: "Ghansoli, Navi Mumbai 400701",
    landmark: "Above Hotel Jagdamb, Sector 25, Ghansoli",
    full: "Above Hotel Jagdamb, Sector 25, Ghansoli, Navi Mumbai 400701",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Unicorn+Fitness+Ghansoli+Navi+Mumbai",
    mapsEmbedSrc:
      "https://www.google.com/maps?q=Above+Hotel+Jagdamb,+Sector+25,+Ghansoli,+Navi+Mumbai+400701&output=embed",
    geo: {
      lat: 19.1197,
      lng: 73.0027,
    },
  },
  hoursOpen24_7: true, // confirmed by owner
  openedOn: "2026-07-01",
  social: {
    instagram: "#", // TODO: add real Instagram URL
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Personal Training", href: "/personal-training" },
    { label: "Membership", href: "/membership" },
    { label: "The Gym", href: "/the-gym" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

export function waLink(message) {
  return `${site.whatsappBase}?text=${encodeURIComponent(message)}`;
}
