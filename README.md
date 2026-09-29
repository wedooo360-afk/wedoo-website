# WEDOO: studio website

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger + SplitText · Lenis · Lucide.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Deploys to Vercel (or any Node host) with zero config. All pages are statically generated.

## Before launch: replace placeholders

| What | Where |
| --- | --- |
| Email, social URLs, production URL | `lib/site.ts` (marked `PLACEHOLDER`) |
| Project images | `public/work/<slug>/hero.jpg`, `image-01.jpg` … `image-06.jpg`. Keep the file names or update paths in `data/projects.ts`. Each placeholder image shows its own target path. |
| Studio photo | `public/placeholders/studio.jpg` (About page) |
| Case-study copy | `data/projects.ts`. Narrative text is **draft copy** that makes no factual claims; every `[Add …]` marker needs verified results. |
| Service preview images | `data/services.ts` → `image` |
| Reversed (white) logo | Optional. Add `public/brand/wedoo-logo-white.png` and set `REVERSED_SRC` in `components/Logo.tsx`. Until then the supplied logo is rendered white on dark backgrounds with a colour filter only. Its geometry is never touched. |

Regenerate placeholder imagery at any time: `python3 scripts/generate-placeholders.py`.

## Adding a project

Add an entry to `projects` in `data/projects.ts`, drop images into `public/work/<slug>/`. It appears on the
homepage (if `featured`), `/work`, the archive, and gets `/work/<slug>` automatically.

- `layout`: `"full" | "offset" | "split" | "type"` picks the Selected Work composition.
- `story`: an ordered list of blocks (`full`, `pair`, `grid`, `text-image`, `quote`, `video`, `strip`).
  Add a `src` to a `video` block to replace the poster placeholder with a real video.
- `tone` / `onTone`: project colour used for hover washes and the split layout only.

## Structure

```
app/                 routes: /, /work, /work/[slug], /about, not-found, icon + OG image
components/          UI sections + motion primitives (TextReveal, ImageReveal, Magnetic, HoverPreview…)
components/case/     case-study building blocks
data/                projects.ts, services.ts  (content only)
lib/                 site config, GSAP registration, media-query helpers
styles/globals.css   design tokens, type scale, the logo-derived "cut" geometry
public/brand/        wedoo-logo.png (supplied file, unmodified)
DESIGN.md            reference analysis, concept, IA, design system, wireframes, QA + audit notes
```

## Interaction notes

- Cursor states are opt-in: `data-cursor="view|arrow|drag|hide"` (+ `data-cursor-label`). Desktop only.
- `TransitionLink` routes through page transitions. Pass `flipFrom="[selector]"` to expand that element's image into the next page's `[data-flip-target]`.
- `prefers-reduced-motion`: no smooth scroll, parallax, marquee movement or transitions; all content renders immediately.
