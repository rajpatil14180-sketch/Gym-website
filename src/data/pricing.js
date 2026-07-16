export const membershipFeatures = [
  "24/7 unlimited access",
  "Starting fitness assessment",
  "Floor coaching support",
  "Modern equipment & free weights",
  "Clean locker rooms & showers",
  "No hidden charges, no joining fee",
];

export const membershipPlans = [
  {
    id: "monthly",
    name: "Monthly",
    unit: "month",
    duration: "1 month",
    price: 2000,
    perMonth: 2000,
    perDay: 67,
    badge: null,
    tagline: null,
    highlight: false,
  },
  {
    id: "quarterly",
    name: "Quarterly",
    unit: "3 months",
    duration: "3 months",
    price: 4500,
    perMonth: 1500,
    perDay: 49,
    badge: null,
    tagline: null,
    highlight: false,
  },
  {
    id: "half-yearly",
    name: "Half Yearly",
    unit: "6 months",
    duration: "6 months",
    price: 7000,
    perMonth: 1167,
    perDay: 38,
    badge: null,
    tagline: null,
    highlight: false,
  },
  {
    id: "yearly",
    name: "Yearly",
    unit: "year",
    duration: "12 months · best value",
    price: 11500,
    perMonth: 958,
    perDay: 32,
    badge: "BEST VALUE",
    tagline: "Less than a cup of coffee. For a year of your life back.",
    highlight: true,
  },
];

/** @deprecated Use membershipPlans — kept for any legacy imports */
export const yearlyPlan = {
  price: membershipPlans[3].price,
  perMonth: membershipPlans[3].perMonth,
  perDay: membershipPlans[3].perDay,
  badge: membershipPlans[3].badge,
  tagline: membershipPlans[3].tagline,
  features: membershipFeatures,
};

/** @deprecated Use membershipPlans */
export const memberships = membershipPlans.map((plan) => ({
  name: plan.name,
  meta: plan.duration,
  price: plan.price,
  highlight: plan.highlight,
}));

export const dayPass = {
  name: "Day Pass",
  price: 200,
  meta: "Per day · no commitment",
  description:
    "Already used your free trial day? Drop in any time for a single day of full access.",
};

export const personalTraining = [
  {
    name: "Personal Training",
    meta: "Per month, on top of open gym access",
    price: 6000,
  },
  {
    name: "Combo — 1 month",
    meta: "1 month membership + 1 month PT",
    price: 7000,
  },
  {
    name: "Combo — 3 months",
    meta: "3 months membership + 3 months PT",
    price: 19000,
  },
];

export const included = [
  "24/7 access to the floor",
  "Starting fitness assessment",
  "Floor coaching, every session",
  "Modern equipment & free weights",
  "Clean, hygienic locker rooms & showers",
  "Nutrition guidance (not a full meal plan)",
  "No joining fee, no hidden charges",
];

export const notIncluded = [
  "1-on-1 personal training (sold separately — see Personal Training)",
  "Full nutrition meal plans (guidance only, not a diet plan)",
  "Supplements or gear",
];
