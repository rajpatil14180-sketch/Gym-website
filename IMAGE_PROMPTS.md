# Unicorn Fitness — Image Generation Prompts (Nano Banana / Gemini 2.5 Flash Image)

Every photo on the site is currently a dark placeholder box with a text label describing the shot. This doc has a ready-to-paste prompt for each one. Generate them with **Nano Banana** (Gemini's image model, in the Gemini app or Google AI Studio).

## How to use this doc

1. Generate **Hero — Background** first. It sets the color grading (warm, low, moody, orange-tinted highlights against near-black) for the whole site.
2. For every image after that, **attach the hero image as a reference** in the same Nano Banana chat/session and add "match the lighting and color grading of the attached reference image" to the prompt. Nano Banana is strong at style-matching from a reference image — this is the single biggest lever for making 15 separate generations look like one coherent shoot instead of 15 random stock photos.
3. Keep generating in the **same chat thread** per batch (e.g. all 4 "Your First 90 Days" shots together) so consecutive generations stay consistent with each other, not just with the hero.
4. Download at the highest resolution offered, then compress to WebP before adding to `public/assets/img/` (see filenames below — they're already wired to the exact spot in the code, just swap the `Placeholder` component in that file for a real `<img>`).

## Non-negotiables (apply to every prompt)

- **Real Indian gym, Navi Mumbai context.** Members and coaches should read as Indian, ordinary people — not international stock-photo casting.
- **No visible text, logos, or UI overlays baked into the image.** All copy is added in code.
- **No competitor/brand-name equipment.** Generic, unbranded gym equipment only.
- **Correct lifting form.** This is a fitness brand — a photo showing unsafe form undercuts the "real coaching" positioning.
- **Dark, moody, warm-accent lighting** — near-black backgrounds, a single warm (orange/amber) key light source, consistent with a brand that uses `#0E0E10` backgrounds and `#E8722B` orange as its only accent color. Avoid bright, white, clinical gym lighting.
- **No overly posed/flexing "fitness influencer" energy.** The brand line is literally "not posing, not flexing" — candid, mid-action, or genuine mid-conversation moments only.
- **Photorealistic, not illustrated/3D-rendered.** This is a real business; the photography needs to read as real.

Suggested style suffix to append to every prompt below:

> Photorealistic photograph, shot on a full-frame camera, shallow depth of field, dark moody gym interior, near-black background, single warm amber/orange key light, high contrast, cinematic color grade, no visible text or logos, no watermark.

---

## Home page

### 1. Hero — background
**File:** `public/assets/img/hero-bg.jpg` · **Used in:** `src/pages/index.astro` (`.hero__photo`) · **Aspect ratio:** 21:9 or wider (full-bleed hero, crops on mobile) · **Orientation:** landscape

> A single member mid-lift on a gym floor at night, seen from a slight low angle, dramatic warm rim lighting from one side, rest of the gym falling into near-black shadow, empty space in the upper-left third of the frame for headline text to sit over. Determined but calm expression, correct deadlift or squat form. Indian man or woman in their late 20s, simple training clothes, no logos.

### 2. Why Us — coach portrait
**File:** `public/assets/img/why-us-coach.jpg` · **Used in:** `src/pages/index.astro` (Why Us split section) · **Aspect ratio:** 4:5 · **Orientation:** portrait

> An Indian male or female gym coach in their 30s, mid-conversation with a member on the gym floor, gesturing naturally while explaining something — caught candidly, not posing for the camera, no direct eye contact with lens. Both people visible, warm low lighting, gym equipment softly out of focus in the background.

### 3. Two Pillars — Personal Training
**File:** `public/assets/img/pillar-personal-training.jpg` · **Used in:** `src/pages/index.astro` (Two Pillars) · **Aspect ratio:** 4:3 · **Orientation:** landscape, dark in the top third (text overlays there)

> A coach spotting a member during a barbell lift, hands near the bar but not touching, close physical proximity showing active supervision, both concentrating. Shot from the side at floor level. Bottom two-thirds of the frame well-lit and detailed; top third darker/emptier for a heading to sit over.

### 4. Two Pillars — 24/7 Open Access
**File:** `public/assets/img/pillar-open-access.jpg` · **Used in:** `src/pages/index.astro` (Two Pillars) · **Aspect ratio:** 4:3 · **Orientation:** landscape, dark in the top third

> An empty gym training floor photographed late at night, all equipment visible but no people, warm overhead lights on against dark windows showing it's nighttime outside, inviting rather than eerie. Top third of frame darker/emptier for a heading to sit over.

### 5–8. "Your First 90 Days" carousel
**Files:** `public/assets/img/journey-day1.jpg`, `journey-week1.jpg`, `journey-month1.jpg`, `journey-month3.jpg` · **Used in:** `src/pages/index.astro` (journey carousel cards) · **Aspect ratio:** 1:1 (square) · **Orientation:** square, generate all four in one chat for visual consistency

> **Day 1:** A new member being welcomed at the entrance by a coach, genuine handshake or high-five, relaxed body language, gym floor visible behind them. Warm entrance lighting.

> **Week 1:** A coach conducting a fitness assessment with a member — holding a clipboard or tablet, member standing for a simple measurement or demonstrating a movement, focused expressions.

> **Month 1:** A coach physically adjusting a member's form mid-exercise (e.g. hand position on a squat or shoulder alignment on a press), close-up, clearly instructional.

> **Month 3:** A member training alone with visible confidence — mid-rep on a compound lift, focused and strong, no coach in frame, showing independence and progress.

---

## /the-gym page (facility gallery)

**Used in:** `src/data/gallery.js` — each entry's `shot` field is the short label; use the fuller prompt below for generation, then drop the file into `public/assets/img/gallery/` and wire it into `gallery.js`. Aspect ratio 4:3 for all, generate together in one chat for consistency.

| # | File | Prompt |
|---|---|---|
| 1 | `gallery/floor-wide.jpg` | Wide establishing shot of the main training floor, completely empty, soft early-morning light coming through windows mixed with warm interior lighting, full equipment layout visible, clean and orderly. |
| 2 | `gallery/free-weights.jpg` | Free-weights area: a squat rack and flat bench in the foreground, dumbbell rack visible behind, moody warm lighting, no people. |
| 3 | `gallery/cardio-row.jpg` | A row of treadmills and cardio machines from a side angle, evenly lit, no people, clean floor. |
| 4 | `gallery/barbell-closeup.jpg` | Extreme close-up of a loaded olympic barbell resting on a platform, weight plates in sharp focus, shallow depth of field, warm rim light catching the plate edges. |
| 5 | `gallery/cable-rig.jpg` | A cable machine / functional training rig, full height, shot straight-on, dramatic single-source lighting from one side. |
| 6 | `gallery/changing-room.jpg` | A clean, simple gym changing room — lockers and a bench, tidy, well-lit, no people, no visible signage. |
| 7 | `gallery/entrance-night.jpg` | The gym's entrance photographed at night from outside looking in, warm light spilling out onto the street, "open" feeling, no readable signage/text. |
| 8 | `gallery/coach-spotting.jpg` | A coach spotting a member mid-lift, both engaged and focused, candid gym-floor moment, warm lighting. |
| 9 | `gallery/water-station.jpg` | A simple, clean water station / hygiene corner of the gym — water dispenser, clean surfaces, no people, tidy and well-lit. |

---

## Social share image

**File:** `public/assets/img/og-cover.jpg` · **Used in:** `src/layouts/Base.astro` (Open Graph / Twitter card, referenced but not yet generated) · **Aspect ratio:** 1.91:1 (1200×630px — standard OG size)

Until real gym photography exists, do **not** generate a posed "hero" shot for this — reuse the Hero — Background image (#1 above) once it exists, since OG previews are small and a establishing shot reads better at thumbnail size than a close portrait. No prompt needed here; just export a 1200×630 crop of image #1.

---

## Not needed from Nano Banana

- **Logo/wordmark** — it's set typography (`UNICORN.` in Anton), not an image asset.
- **Equipment/facility icons** (Font Awesome glyphs used in `src/data/gallery.js` `equipment`/`facilities` arrays) — these are icon-font, not photos.
- **Favicon** — using Astro's default for now; regenerate only if the brand mark changes.

## Still needed but not image-related (see `HANDOFF.md`)

Coach names/bios/certifications, the founder story for `/about`, and the freeze/refund policy are content gaps, not photo gaps — don't try to solve them with a generated image of a fictional person.
