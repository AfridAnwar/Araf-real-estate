# Araf Real Estate — V2 Immersive Redesign

> A completely original, award-caliber website. Retal was only a starting reference — this plan draws from Awwwards SOTD winners, Lodha Group, Dar/Sidara, and cutting-edge 2025/2026 luxury real estate design patterns.

---

## Design Philosophy: "Architectural Narrative"

The Araf logo is a **vertical architectural monogram** — Arabic calligraphy formed into rising tower silhouettes. The entire V2 design system is built around this concept: **verticality, ascension, and structured elegance**.

Every section tells a chapter. The user doesn't "browse a website" — they experience an architectural narrative that unfolds through scroll, revealing Araf's story like walking through a curated exhibition.

**Core Principles:**
1. **Cinematic, not corporate** — Full-bleed imagery, scroll-driven reveals, zero visual clutter
2. **Editorial restraint** — Let photography and typography do the talking
3. **Warm minimalism** — Light sandy tones, not sterile white
4. **Architectural rhythm** — Asymmetric grids echo building proportions from the logo
5. **Scroll as storytelling** — Each section unlocks with purposeful animation

---

## Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--sand` | `#F5F0E8` | Primary page background |
| `--cream` | `#FAF8F4` | Alternate section background |
| `--white` | `#FFFFFF` | Cards, overlays |
| `--charcoal` | `#2C2C2C` | Primary text, logo |
| `--graphite` | `#5A5A5A` | Secondary/body text |
| `--stone` | `#9E9E96` | Tertiary text, labels, dividers |
| `--bronze` | `#B08D57` | Accent — CTAs, highlights, active states |
| `--bronze-dark` | `#8C6E3F` | Accent hover state |
| `--bronze-light` | `#D4BC8B` | Subtle accent backgrounds |
| `--ink` | `#1A1A1A` | Hero overlay text, footer bg |

> **Note:** The bronze accent (`#B08D57`) is derived from Saudi desert sand tones and pairs naturally with the charcoal logo. This is NOT the same shade as Retal's palette.

### Typography

| Role | Font | Weight | Size | Details |
|------|------|--------|------|---------|
| Display | `Cormorant Garamond` | 300/600 | 56–80px | Hero headlines, editorial feel |
| Heading | `Cormorant Garamond` | 500 italic | 36–52px | Section titles with italic accent words |
| Label | `Plus Jakarta Sans` | 500 | 11–13px | Uppercase, letter-spacing: 4px |
| Body | `Plus Jakarta Sans` | 400 | 16–18px | Line-height: 1.75 |
| Button | `Plus Jakarta Sans` | 600 | 12–13px | Uppercase, letter-spacing: 3px |
| Stat Number | `Cormorant Garamond` | 300 | 72–96px | Thin, elegant, oversized |
| Arabic Body | `Noto Sans Arabic` | 400 | 16–18px | Line-height: 1.8 for diacritics |

**Signature treatment:** In section headings, one keyword is rendered in `Cormorant Garamond italic` + bronze color.
Example: `Building` *excellence* `, delivering trust`

### Spacing & Grid

```
Page max-width:        1400px
Section vertical pad:  140px (desktop) / 80px (mobile)
Grid:                  12-column CSS Grid, 32px gap
Asymmetric splits:     5/7, 4/8, 6/6 column ratios
Border radius:         0px (sharp corners everywhere — architectural)
```

### Button System

| Type | Style |
|------|-------|
| **Primary** | Bronze bg `#B08D57`, white text, 0 radius, 16px/40px padding, subtle lift on hover |
| **Secondary** | Transparent bg, 1px `#2C2C2C` border, charcoal text, bronze fill on hover |
| **Ghost** | No border, charcoal text + right arrow `→`, underline-reveal on hover |
| **Icon** | 48px circle, 1px border, centered SVG icon, scale 1.1 on hover |

### Animation System (GSAP + ScrollTrigger)

| Effect | Trigger | Duration | Easing |
|--------|---------|----------|--------|
| **Fade-up** | Scroll into view | 0.8s | `power2.out` |
| **Stagger-reveal** | Scroll (children) | 0.6s each, 0.15s stagger | `power2.out` |
| **Split-text** | Scroll into view | 1.2s per word | `power3.out` |
| **Image parallax** | Scroll position | Continuous | `none` (scrub) |
| **Horizontal pin-scroll** | Section pin | Scrubbed to scroll | `none` |
| **Counter count-up** | Intersection Observer | 2s | `power1.inOut` |
| **Curtain reveal** | Page load (hero only) | 1.5s | `power4.inOut` |

---

## Homepage — 10 Sections

### § 1 — Curtain Reveal Hero

**NOT a slider.** A cinematic curtain-open reveal on page load.

**Behavior:**
1. Page loads with the Araf logo centered on a `--sand` background
2. After 0.8s, two curtain panels (left/right) slide apart revealing a full-viewport hero image behind
3. The logo fades and repositions to the header
4. Hero tagline types in: `Where vision meets structure`
5. A thin scroll-down indicator pulses at the bottom

**Technical:** GSAP timeline — `clipPath` animation on two overlay divs, logo `scale` + `translate` to header position. Single hero image (NOT a carousel) — `home1-banner-img1.jpg` with subtle Ken Burns zoom.

**Content:**
- Tagline: `Where vision meets structure` (EN) / `حيث تلتقي الرؤية بالبناء` (AR)
- Scroll indicator: Thin animated line + "Discover" text

---

### § 2 — Brand Introduction (Asymmetric Split)

**Layout:** Left 40% text / Right 60% full-height image (bleeds to edge)

**Left column:**
- Section label: `ABOUT ARAF` (uppercase, letter-spaced, with thin line before it)
- Headline: `A` *curated* `approach to real estate`
- Body text: Company introduction from v1 content
- Ghost button: `Our Story →`

**Right column:**
- Full-height image (`about-img6.png`) with subtle parallax (moves 15% slower than scroll)
- Sharp architectural framing (no border-radius)
- Thin bronze line accent overlaying the bottom-left corner of the image

**Animation:** Text fades up with stagger. Image slides in with `clipPath` reveal from right.

---

### § 3 — Services Showcase (Vertical Ticker)

**NOT a horizontal ribbon.** A vertical stacked list that reveals service images on hover.

**Layout:** Full-width section, `--cream` background
- 5 rows, each a full-width horizontal band
- Each row: Service name (large Cormorant, ~48px) left-aligned + thin divider line + category tag right-aligned
- On hover: a property image floats in behind the text (CSS `mix-blend-mode: multiply`)
- Row background shifts to `--bronze-light` on hover

**Services:** Residential Development · Commercial Properties · Urban Planning · Property Marketing · Investment Advisory

**Animation:** Rows stagger-reveal on scroll. Hover image follows cursor with `GSAP.quickTo()`.

---

### § 4 — Featured Communities (Horizontal Pin-Scroll)

**THE SIGNATURE SECTION.** A GSAP-pinned horizontal scroll gallery.

**Behavior:**
- User scrolls vertically → section pins to viewport
- Project cards slide horizontally from right to left
- Progress indicator (thin bronze line) tracks horizontal position at top
- Section label and heading remain sticky on the left while cards scroll

**Sticky left panel (30%):**
- Label: `OUR COMMUNITIES`
- Heading: `Homes built with` *precision*
- Ghost button: `View All Projects →`

**Scrolling cards (70%, 6 cards):**
- Araf 1 (`araff1.png`) — Dammam
- Araf 2 (`araf2.png`) — Dammam
- Araf 3 (`project3.PNG`) — Dammam
- Araf 4 (`araf4.PNG`) — Dammam
- Araf 5 (`araf5.png`) — Dammam
- Araf 6 (`araf6.PNG`) — Dammam

**Card hover:** Image scales 1.05, overlay darkens, project name shifts up revealing a "View →" link.

**Technical:** GSAP `ScrollTrigger` with `pin: true`, `scrub: 1`. Flex container animated on `x`.

---

### § 5 — Statistics (Full-Width Counter Bar)

**Layout:** Full-width `--sand` background, single row, 4 stats evenly spaced
- Each stat: oversized thin number (Cormorant 300, 80px) + label below (Plus Jakarta, uppercase, 12px)
- Thin vertical divider lines between stats

**Stats:** 45+ Residential Projects | 15 Ownership Resorts | 10 Developed Building Areas | 50+ Developed Land Areas

**Animation:** Numbers count up from 0 when scrolled into view.

---

### § 6 — Why Araf (Icon Grid)

**Layout:** Centered section, max-width 1100px, 2×3 grid
- Label: `WHY CHOOSE US`
- Heading: `The` *Araf* `difference`
- Each item: SVG line-art icon + title + 1-line description

**Items:** Real Experience | Strategic Partners | Clear Vision | Saudi Standards | Prime Locations | Smart Pricing

---

### § 7 — Our Journey (Video + Editorial)

**Layout:** `--cream` background. Two-column (55% left text / 45% right video thumbnail)

**Left:** Label, heading, body text, feature checklist, Company Profile button
**Right:** Video thumbnail with circular play button → opens `Araf intro.mp4` in lightbox

---

### § 8 — Vision & Mission (Split Panels)

**Layout:** Two full-height panels side by side (50/50)
- **Left (Vision):** `--charcoal` bg, bronze label, white Cormorant italic text
- **Right (Mission):** `--cream` bg, charcoal label, charcoal body text, watermarked logo at 10% opacity

> Note: The dark left panel is a strategic contrast accent, not a "dark theme".

---

### § 9 — Contact CTA (Full-Bleed Image Banner)

Full-viewport banner (`home1-banner-img3.jpg`) with dark overlay
- Heading: `Let's build` *something* `extraordinary` (white, Cormorant)
- Two buttons: `Book a Meeting` (bronze) + `Get in Touch` (white outline)

---

### § 10 — Footer (Multi-Column Editorial)

`--ink` (#1A1A1A) background, 4-column grid:
1. **Brand:** Logo + tagline + social icons
2. **Properties:** Links to Araf 1–6
3. **Company:** About, Journey, Profile, Project Status
4. **Contact:** Phone, email, address, directions

Bottom bar: Copyright + legal links

---

## Header / Navigation

**Desktop:** Transparent → white on scroll. Left: Araf logo | Center: Nav links | Right: `EN | عربي`
**Mobile:** Logo left, hamburger right → full-screen overlay menu with sand background

---

## Page Architecture

| Page | File | Description |
|------|------|-------------|
| Homepage | `index.html` | All 10 sections |
| Projects | `projects.html` | Filter grid of projects |
| Project Detail | `project-detail.html` | Hero, gallery, specs, map |
| About | `about.html` | Story, vision/mission, timeline |
| Contact | `contact.html` | Form + map + office info |
| Meeting | `meeting.html` | Scheduling form |
| Project Status | `project-status.html` | Progress tracking |

---

## File Structure

```
v2/
├── .planning/
├── index.html
├── projects.html
├── project-detail.html
├── about.html
├── contact.html
├── meeting.html
├── project-status.html
├── assets/
│   ├── css/style.css
│   ├── js/
│   │   ├── main.js
│   │   ├── translate.js
│   │   └── lenis.min.js
│   ├── lng/ (en.json, ar.json)
│   ├── img/
│   │   ├── logo/
│   │   ├── hero/
│   │   ├── projects/
│   │   └── about/
│   └── video/
```

---

## Technical Stack

| Layer | Technology |
|-------|-----------|
| Structure | Vanilla HTML5 |
| Styling | Vanilla CSS + Custom Properties |
| Smooth Scroll | Lenis.js |
| Animations | GSAP 3 + ScrollTrigger |
| Slider | Swiper.js (projects page only) |
| Counter | IntersectionObserver + rAF |
| Localization | translate.js (v1 `lng-tag` system) |
| Fonts | Google Fonts (Cormorant Garamond + Plus Jakarta Sans + Noto Sans Arabic) |

---

## What Makes This Different From Retal

| Aspect | Retal | Araf V2 |
|--------|-------|---------|
| Hero | Standard image slider | Cinematic curtain-reveal with logo animation |
| Projects | Vertical card grid | GSAP horizontal pin-scroll gallery |
| Layout | Conventional sections | Asymmetric editorial splits + full-bleed contrasts |
| Typography | Standard serif/sans | Cormorant Garamond + Plus Jakarta Sans |
| Colors | Bronze on white | Desert sand bg + warm bronze accent |
| Scroll | Standard | Lenis smooth scroll + GSAP scrubbed animations |
| Services | Static cards | Interactive hover-reveal ticker rows |
| Vision/Mission | Text block | Dramatic dark/light split panel |
| Feel | Corporate developer | Architectural gallery / luxury exhibition |

---

## Open Questions

1. **Project locations**: V1 shows all projects in Dammam. Are there projects in other Saudi cities?
2. **Social media URLs**: V1 has placeholder links. Do actual Araf social profiles exist?
3. **Company profile PDF**: Is the existing PDF still the correct document?
4. **New projects**: Should we include only the 6 existing projects, or are more coming?
5. **Video**: Is `Araf intro.mp4` still the company video to use?

---

## Verification Plan

### Visual QA
- Test at 375px / 768px / 1440px / 1920px
- Verify Cormorant Garamond + Plus Jakarta Sans rendering
- Confirm bronze accent consistency across all elements

### Functional Testing
- GSAP horizontal scroll: pin, scrub, progress indicator
- Language switching: EN↔AR with all `lng-tag` elements
- RTL layout: mirrored navigation, text alignment, scroll direction
- Video lightbox: play/pause/close on all devices
- Lenis smooth scroll: no jank on scroll-heavy pages

### Performance
- Lighthouse: 90+ Performance, 95+ Accessibility
- Lazy-load all below-fold images
- Preload hero image + display font
