// Gallery data with image paths. Some entries still have `img: null` until
// their photos are generated / supplied by the owner.
export const galleryCategories = ["All", "Floor", "Equipment", "Facilities"];

export const gallery = [
  { category: "Floor", shot: "Wide shot of the main training floor, empty, morning light", img: "/assets/img/gallery/floor-wide.png" },
  { category: "Floor", shot: "Free weights area with rack and benches", img: "/assets/img/gallery/free-weights.png" },
  { category: "Equipment", shot: "Row of cardio machines", img: "/assets/img/gallery/cardio-row.png" },
  { category: "Equipment", shot: "Close-up of a loaded barbell on the platform", img: "/assets/img/gallery/barbell-closeup.png" },
  { category: "Equipment", shot: "Cable machine / functional training rig", img: "/assets/img/gallery/cable-rig.png" },
  { category: "Facilities", shot: "Changing room", img: "/assets/img/gallery/changing-room.png" },
  { category: "Facilities", shot: "Entrance / reception at night, well lit", img: null },
  { category: "Floor", shot: "Coach spotting a member mid-lift", img: null },
  { category: "Facilities", shot: "Water station / hygiene area", img: null },
];

export const equipment = [
  { label: "Free weights", glyph: "fa-solid fa-dumbbell" },
  { label: "Cardio machines", glyph: "fa-solid fa-person-running" },
  { label: "Cable & functional rig", glyph: "fa-solid fa-arrows-up-down" },
  { label: "Squat racks & platforms", glyph: "fa-solid fa-weight-hanging" },
];

export const facilities = [
  { label: "Clean & hygienic", glyph: "fa-solid fa-broom" },
  { label: "Changing rooms", glyph: "fa-solid fa-shirt" },
  { label: "Well lit, monitored at night", glyph: "fa-solid fa-shield-halved" },
  { label: "24/7 open access", glyph: "fa-solid fa-clock" },
];
