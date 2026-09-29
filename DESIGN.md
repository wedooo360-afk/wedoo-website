# WEDOO: Design Direction (Phases 1 to 5)

This document records the thinking behind the site before a line of code was written.
Everything in the build traces back to it.

---

## PHASE 1: Reference analysis

### 1A. Website reference

The website reference did not come through with the brief (only the logo arrived, twice).
Rather than wait, the analysis below works from the art-direction qualities the brief names
(editorial composition, grid behaviour, portfolio-first, independent studio quality, the Studio
Aton / Pentagram benchmark). When the reference arrives, this section should be checked against it.

What makes that class of studio site feel premium:

| Quality | Why it works | What WEDOO takes from it |
| --- | --- | --- |
| **Visual composition** | Pages are composed like spreads, not stacked like components. Big quiet areas are allowed to exist. | Every section gets a distinct compositional idea; no two consecutive sections share an alignment. |
| **Grid logic** | A strict 12-column grid used *asymmetrically*: content often starts on column 4 or 7, leaving deliberate voids. | A 12-col grid whose most important division is derived from the logo (see 1B). |
| **Typography** | One grotesk, two or three sizes only: enormous, small, and a tiny label size. The gap between them creates the drama. | Extreme scale contrast (220px vs 11px), tight leading, sentence case for statements, uppercase only for metadata. |
| **Whitespace** | Whitespace is the luxury signal. Premium sites waste space on purpose. | Section padding of 20 to 30vh, content blocks that occupy a third of the width. |
| **Project presentation** | Work is shown big, cropped with intent, and with minimal chrome. Metadata is small and exact. | Each project in Selected Work gets its own layout (full bleed, offset, split, type-led). |
| **Interaction** | Restraint. Motion answers the cursor instead of performing on its own. | Pointer-reactive hero, hover previews, one cursor language, no idle floating. |

### 1B. The WEDOO logo

Measured from the supplied file (388 x 297 px, transparent PNG, colour `#0C151A`):

```
 (0,0) ───────────┐  ┌──────────┐  ┌──────────── (388,0)
                  ╲╱            ╲╱                     two V-cuts, 90° each
                 (138,18)      (250,18)                 centred at 35.6% and 64.4% of width
  ╲                                              ╱      depth = 6% of height
   ╲               solid mass                   ╱
    ╲                                          ╱        sides taper 1:10 (5.7°)
     (30,297) ────────────╱╲──────────── (358,297)
                        (194,278)                       one inverted cut, centred, same size
```

**Visual character.** A W made by *subtraction*. There are no strokes. A heavy block is cut three times
and the letter appears in the negative space. It is architectural, calm and heavy, with a sense of
something carved rather than drawn.

**Silhouette.** An inverted trapezoid: wide at the top, narrowing slightly toward the base. It reads as
a **keystone**, the wedge at the top of an arch that locks every other stone in place. It also reads
as a vessel or container, and at a glance as a crown.

**Geometry.**

- Three cuts, all near 90°, all the same size (about 10.6% of the width).
- The top cuts divide the top edge into a rhythm of **wide / cut / narrow / cut / wide**
  (30% / 10.6% / 18.3% / 10.6% / 30%).
- A 1:10 side taper, which is almost imperceptible but makes the mark feel planted.
- One colour, one mass. Near-black with a cold blue undertone (`#0C151A`), not pure black.

**How it can influence the site** (subtly, never as wallpaper):

1. **Colour.** The logo's own ink `#0C151A` becomes the site's dark tone. The mark and the dark sections are literally the same material.
2. **Grid.** The top-edge rhythm maps onto 12 columns as **4 · 1 · 2 · 1 · 4**. The hero and several sections use this division, with columns 5 and 8 as the "cuts" (intentional voids).
3. **The cut.** The 90° V-notch is the site's one graphic device: section edges, the page-transition wipe, a hover cut on images.
4. **The taper.** The 1:10 angle appears only in motion (images taper very slightly on hover), never as static decoration.
5. **Mass.** Headlines are set heavy and tight so words read as blocks, the way the mark does.

---

## PHASE 2: Creative concept

### KEYSTONE: mass, cut, taper

> A keystone is the stone that holds the arch together. It is the last piece placed and the one
> everything else depends on. That is the role WEDOO wants in a founder's business: not decoration
> on top, but the piece that makes the structure stand.

The logo already is a keystone with a W cut into it. The site is built with the same logic: **solid
masses of content, opened by a few precise cuts.** Nothing is added for decoration. Interest comes
from what is taken away: voids in the grid, cuts at section edges, crops that remove more than they show.
This makes "strategy before decoration" something visitors feel, not only read.

| Layer | Direction |
| --- | --- |
| **Design idea** | Mass and cut. Big solid blocks (type, ink, image) separated by exact voids. The site reads like a carved object. |
| **Typography** | Archivo variable (weight 100 to 900, width 62 to 125%). Display at 800 weight, slightly expanded (width 108 to 112) so words sit wide like the top of the mark; tracking -0.045em; leading 0.84. Hovering big words widens them (width axis), so the type moves the way the mark is shaped. Geist Mono for metadata. |
| **Grid** | 12 columns, with the logo-derived 4·1·2·1·4 split as the signature division. Voids are placed on purpose. |
| **Image behaviour** | Hard crops, no rounded corners, no shadows. Images are revealed by a clip-path wipe, drift with slow parallax, and on hover gain a 90° cut and a 1:10 taper, the logo's geometry appearing only under the cursor. |
| **Motion** | Quiet and exact. `expo.out` / `power3.out`, 0.9 to 1.2s for reveals, 0.35 to 0.6s for hovers. Motion responds to the visitor; nothing floats on its own except the marquee. |
| **Relation to the logo** | The site ends *inside* the mark: the final contact section is an ink block whose top edge carries the logo's two cuts at 35.6% and 64.4%, and the page-transition wipe uses the same edge. Visitors meet the geometry at the two moments that matter (moving between pages, deciding to get in touch). |

**Hero line:** *Built like we own it.* This is the founder's mindset in five words. It is short, direct and slightly defiant, and it only works for a studio that means it.

---

## PHASE 3: Information architecture

```
/                     Home
/work                 Work index (all projects + archive)
/work/[slug]          Case study (data-driven, static generated)
/about                About: mindset, principles, services, contact
/#services, /#contact Anchors on home
```

**Homepage flow** (a narrative, not a list of sections):

1. **Header**: mark + four links, sitting inside the hero.
2. **Hero**: the claim (*Built like we own it.*) + three work panels on the 4·1·2·1·4 grid.
3. **Intro**: the positioning, said once, quietly. The one place with no imagery.
4. **Selected work**: proof. Four projects, four layouts.
5. **Marquee**: the page turns to ink. Strategy × Identity × Digital × Experience × Culture.
6. **Approach**: stays in ink. *Founders' mindset.* + five principles.
7. **Services**: back to paper. An index, not cards.
8. **Archive**: the full record, dense and tabular.
9. **Contact**: the ink block with the logo's cuts rises from below.
10. **Footer**: lives inside the contact block.

**Case study flow:** title + metadata → hero image → summary → Challenge / Insight / Idea / Solution / Outcome (a structured index, not prose) → visual story (data-driven blocks) → next project.

---

## PHASE 4: Design system

### Colour

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#F1F0EB` | Primary background (warm off-white) |
| `--paper-2` | `#E7E5DE` | Placeholder fills, subtle rows |
| `--ink` | `#111111` | Primary text |
| `--mass` | `#0C151A` | Dark sections (sampled from the logo) |
| `--line` | `rgba(17,17,17,.14)` | Rules |
| `--muted` | `#6B6A64` | Secondary text (5.1:1 on paper) |
| project `tone` | per project | Hover washes and case-study accents only |

### Typography scale (fluid)

| Name | Size | Weight / width | Leading | Use |
| --- | --- | --- | --- | --- |
| `mega` | clamp(84px, 15vw, 260px) | 800 / 110 | 0.82 | Hero, Contact |
| `h1` | clamp(70px, 10vw, 180px) | 800 / 108 | 0.84 | Section titles, case-study title |
| `h2` | clamp(40px, 5.6vw, 96px) | 700 / 104 | 0.9 | Project titles, statements |
| `h3` | clamp(26px, 2.6vw, 44px) | 500 / 100 | 1.05 | Service rows, principles |
| `lead` | clamp(20px, 1.6vw, 26px) | 400 | 1.35 | Supporting copy |
| `body` | 16 to 17px | 400 | 1.55 | Body |
| `label` | 11 to 12px | Geist Mono 400, uppercase, +0.04em | 1.3 | Metadata, section markers |

### Grid and spacing

- Desktop: 12 cols, gutter `clamp(12px, 1.4vw, 24px)`, margin `clamp(16px, 3.4vw, 64px)`, max width 1600px (full bleed allowed).
- Tablet (768 to 1023): 8 cols. Mobile: 4 cols.
- Signature division: `4 · 1 · 2 · 1 · 4` (the logo's top edge).
- Vertical rhythm: section padding `clamp(96px, 18vh, 240px)`; component spacing 8px base (8, 16, 24, 40, 64, 104).

### Controls

- **Button (CTA):** no fill, no pill. Text + arrow on a 1px baseline rule, underline draws left to right on hover, arrow travels 6px, magnetic pull of 0.25. The primary CTA in the contact block is a large typographic line.
- **Link:** underline drawn from the left on hover, retracts to the right on leave.
- **Radius:** 0 everywhere. **Shadows:** none.

### Images

- `object-fit: cover`, hard edges, placeholders labelled in-image with their target path.
- Reveal: clip-path from the bottom edge, inner image scale 1.18 → 1.
- Parallax: ±8% max, scrubbed.
- Hover: scale 1.03 + optional 90° cut on the top edge + 1:10 taper.

### Animation principles

1. Respond, don't perform. Nothing loops except the marquee.
2. One idea per element (a title moves *or* fades, not both at once).
3. Ease: `expo.out` for entrances, `power3.inOut` for page transitions, `power2.out` for hovers.
4. Everything is transform / opacity / clip-path. No layout properties animated.
5. `prefers-reduced-motion`: no smooth scroll, no parallax, no marquee movement, reveals become simple fades or are skipped entirely. The layout is complete without motion.

---

## PHASE 5: Wireframes

### Desktop homepage (1440)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ [W]                                            Work   About   Services  Contact│
│                                                                              │
│ (WEDOO)             BRANDING + CREATIVE AGENCY            INDEX 2026 / 04    │
│                                                                              │
│ BUILT LIKE                                                                   │  mega, 800
│            WE OWN IT.                                                        │  line 2 starts on col 5 (the cut)
│                                                                              │
│ ┌────────────────┐        ┌────────┐        ┌────────────────┐               │
│ │                │  (cut) │        │ (cut)  │                │               │  4 · 1 · 2 · 1 · 4
│ │   panel A      │        │  B     │        │   panel C      │               │  pointer parallax
│ │   4:5          │        │  3:4   │        │   5:4          │               │
│ └────────────────┘        └────────┘        └────────────────┘               │
│ 01 Soutsakan              02 Futura          03 Kyae Oh King     Scroll ↓    │
├──────────────────────────────────────────────────────────────────────────────┤
│ (WEDOO / BRANDING AGENCY)                                                    │
│                         We build brands with a                               │  h2, 500
│                         founder's mindset.                                   │
│                                                    supporting text ...       │
│                                                    Start a project →         │
├──────────────────────────────────────────────────────────────────────────────┤
│ SELECTED                                                        (04)         │
│ WORK                                                   2026 INDEX            │
│ ┌──────────────────────────────────────────────────────────────────────────┐ │
│ │ 01  full-bleed image                                                     │ │
│ └──────────────────────────────────────────────────────────────────────────┘ │
│ Soutsakan Institute of Technology          Education / Brand Transformation │
│                                                                              │
│ 02                    ┌─────────────────────────────────────────────┐        │
│ (empty field)         │ image offset right                          │        │
│ Futura School         └─────────────────────────────────────────────┘        │
│                                                                              │
│ ┌──────────────────────────────┐ ▓▓▓▓▓▓▓▓▓▓ project tone ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│ │ 03 image                     │ ▓ KYAE OH KING   ┌──────┐ ┌──────┐     ▓▓ │  split
│ └──────────────────────────────┘ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓└──────┘─└──────┘▓▓▓▓▓▓▓▓ │
│                                                                              │
│ STAR  [img follows cursor]                                                   │  type-led
│             EXAM                                                        04   │
├══════════════════════════ bg turns to ink ═══════════════════════════════════┤
│ STRATEGY × IDENTITY × DIGITAL × EXPERIENCE × CULTURE ×  →→→                  │  marquee
│                                                                              │
│ FOUNDERS'            │ We approach every brand as if it were our own.        │
│ MINDSET.   (sticky)  │ 01 Understand before designing ....................   │
│                      │ 02 Make strategy visible ..........................   │
│                      │ 03 ... 04 ... 05 ...                                  │
├══════════════════════════ back to paper ═════════════════════════════════════┤
│ (SERVICES)                                                                   │
│ 01  Brand Strategy                                    →      [preview follows]│
│ 02  Brand Identity                                    →                      │
│     └ expanded: description + deliverables                                  │
│ ...                                                                          │
│ ARCHIVE     Project            Industry        Services         Year         │
│             ─────────────────────────────────────────────────────────        │
├─────────────╲╱────────────────────────────────╲╱─────────────────────────────┤  the logo's cuts
│▓ SOMETHING                                                                  ▓│
│▓ WORTH BUILDING?                                                            ▓│  contact (ink)
│▓ Start a project →          hello@...          Instagram  Behance  LinkedIn ▓│
│▓ ─────────────────────────────────────────────────────────────────────────  ▓│
│▓ [W]  WEDOO © 2026   Branding + Creative Agency                Back to top ↑▓│
└──────────────────────────────────────────────────────────────────────────────┘
```

### Mobile homepage (390)

```
┌──────────────────────────┐
│ [W]                 Menu │   Menu → fullscreen ink layer, "Close"
│                          │
│ (WEDOO) BRANDING +       │
│ CREATIVE AGENCY          │
│                          │
│ BUILT                    │   mega, 3 lines, left
│ LIKE WE                  │
│ OWN IT.                  │
│                          │
│ ┌──────────────────────┐ │   panel A full width 4:5
│ │                      │ │
│ └──────────────────────┘ │
│ ┌──────────┐  ┌────────┐ │   B + C side by side, C lower
│ └──────────┘  │        │ │
│               └────────┘ │
├──────────────────────────┤
│ We build brands with a   │
│ founder's mindset.       │
│ text... Start a project →│
├──────────────────────────┤
│ SELECTED WORK       (04) │
│ ┌──────────────────────┐ │   every project: full-width image,
│ │ 01                   │ │   big title, one line of metadata.
│ └──────────────────────┘ │   Layout variety via aspect ratio
│ Soutsakan Institute...   │   (4:5, 1:1, 3:4, type-led)
│ ...                      │
├▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┤
│ STRATEGY × IDENTITY ×    │   marquee (static if reduced motion)
│ FOUNDERS' MINDSET.       │
│ 01 ... 05 (stacked)      │
├──────────────────────────┤
│ 01 Brand Strategy     +  │   tap to expand (accordion)
│ 02 Brand Identity     +  │
├──────────────────────────┤
│ Archive: title / year    │
│ industry under title     │
├──╲╱──────────╲╱──────────┤
│▓ SOMETHING WORTH       ▓│
│▓ BUILDING?             ▓│
│▓ Start a project →     ▓│
│▓ © 2026   Back to top ↑▓│
└──────────────────────────┘
```

---

## PHASE 7: QA log

| Check | Result |
| --- | --- |
| `next build` + TypeScript | Clean. All 4 case studies statically generated. |
| Console / hydration | No errors or warnings on `/`, `/work`, `/about`, `/work/*` (desktop + mobile). |
| Horizontal overflow | Fixed: `t-mega` minimum was too large for single long words on 390px screens ("Something"). Now `clamp(54px, 14.6vw, 264px)`; hero uses its own mobile size. |
| CSS cascade | Fixed: custom classes were unlayered and overrode Tailwind utilities (image frames collapsed to 0px). All component classes now live in `@layer components`. |
| Clipped descenders | Fixed: SplitText masks now pad 0.2em below each line/word. |
| Layout collision | Fixed: "Founders' mindset." overlapped its paragraph at 1440px. Title now runs full width, split below. |
| GSAP cleanup | Every animation lives in `useGSAP` (auto-revert on unmount); listeners removed in cleanups; ink theme reset on unmount. |
| Transitions | Thumbnail → hero expand and the ink wipe both verified frame by frame; back/forward navigation is native. |
| Reduced motion | Verified: no hidden content, no smooth scroll, no parallax, instant routes. |
| Keyboard | Skip link, visible focus ring, services are disclosure buttons, Esc closes the mobile menu, `inert` on page content while it is open. |
| Images | `next/image` everywhere, responsive `sizes`, AVIF/WebP, lazy by default, first hero panel prioritised. |

## PHASE 8: Creative audit (the 5 weakest decisions, and what changed)

1. **Circular arrow buttons on every project.** Generic UI furniture that contradicted "no pills, no rounded everything". Replaced with a typographic `View case →` whose underline retracts on hover, the same language as every other CTA.
2. **A giant grey "02" filling the empty field of the offset layout.** Decoration pretending to be content. The void now carries the project's one-line summary: still quiet, now meaningful.
3. **The concept was invisible at rest.** The 4·1·2·1·4 grid only existed in code. A hairline above the hero panels now carries two small 90° cuts over the empty columns, a design-publication spec line that shows the logo-derived grid without explaining it.
4. **Star Exam's floating image collided with the title.** Repositioned into the natural gap between "Star" and "Exam", so the type-led layout reads as composed rather than accidental.
5. **Split layout: a same-colour image beside a same-colour field, plus a collage that repeated project numbers.** The image side now uses a contrasting application, and the collage is data-driven (`collage` in project data) so it always shows the right two images. The intro's disconnected paragraph was also pulled closer to its statement.
