# Project: luznycontent-landing

Landing page for "Luzny Content" — UGC content creator Julia Jabłońska.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Custom hooks (IntersectionObserver + requestAnimationFrame), zero external libs
- **Deployment:** Vercel

## Structure

```
src/
├── app/
│   ├── layout.tsx          — metadata, Google Fonts (Work Sans, Playfair Display, Bodoni Moda, Material Symbols)
│   ├── page.tsx            — mobile: original components, desktop: StickyScrollSection
│   └── globals.css         — theme colors, blob shapes, keyframes
├── components/
│   ├── StickyScrollSection — desktop sticky scroll storytelling (7 steps + footer)
│   ├── VideoPlayer.tsx     — fullscreen video player via React portal
│   ├── PhotoGallery.tsx    — orbit effect photo gallery (hover → expand + orbit)
│   ├── Hero.tsx            — mobile hero with parallax blobs
│   ├── About.tsx           — mobile about section
│   ├── Services.tsx        — service cards (gradient, numbers, dashed rings)
│   ├── VideoPortfolio.tsx  — mobile video grid with click-to-play
│   ├── PhotoPortfolio.tsx  — mobile photo grid
│   ├── Collaborations.tsx  — brand logos
│   ├── Contact.tsx         — contact form
│   ├── Footer.tsx          — footer
│   ├── Navbar.tsx          — sticky nav with scroll detection
│   ├── ScrollProgressBar   — vertical progress indicator (right side)
│   ├── TextReveal.tsx      — word-by-word scroll reveal
│   └── InstagramIcon.tsx   — SVG Instagram icon
├── hooks/
│   ├── useStickyScroll.ts  — weighted step system with hysteresis
│   └── useScrollAnimations.ts — useReveal, useParallax, useScrollProgress, useCountUp, useMagneticHover
public/
├── logo.jpg, julia-portrait.jpg
├── images/photo-{1-6}.jpg
└── videos/ugc-{1-8}.mp4, thumb-{1-8}.jpg
```

## Design System (from logo)

- **Primary:** `#6B9FD4` (cornflower blue — the "U" in logo)
- **Brand brown:** `#6B5A4E` (warm chocolate)
- **Brand cream:** `#E8E0D4` / `#F0EBE3` (warm beige backgrounds)
- **Font display:** Work Sans
- **Font headings:** Playfair Display
- **Font logo:** Bodoni Moda (italic, 900)
- **Decorative:** organic blob shapes (`.blob-shape`, `.blob-shape-2`)

## Key Patterns

- **Desktop:** Sticky scroll storytelling — all content in one viewport, scroll drives step transitions
- **Mobile:** Traditional scroll with reveal/parallax animations
- **Video player:** React portal to document.body (escapes sticky/overflow)
- **Video carousel:** Conveyor belt driven by scroll progress (weight=7 step)
- **Photo gallery:** Hover → center photo expands, others orbit with organic blob shapes
- **Animated blobs:** lerp-smoothed 60fps via requestAnimationFrame (not React state)

## Commands

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run start` — production server
