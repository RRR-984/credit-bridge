# Design Brief — Credit Bridge PWA + Transaction Cards

## Direction
Credit Bridge — Professional fintech credit management PWA with dual-mode design (light: soft white + teal accents; dark: navy + cyan). Glassmorphic surfaces, transaction cards with LenDenClub-style left accent borders (Dr=rose, Cr=green), status badges. Premium typography. Installable native fintech experience.

## Tone
Secure, approachable, premium. Light mode: clarity and trust via soft blue backgrounds. Dark mode: sophisticated navy with cyan energy. Glassmorphism creates depth. Transaction cards add visual scannability through semantic left borders.

## Differentiation
Geometric bridge symbol (CB initials + architectural spans) represents financial connection. Transaction cards with left border accents (4px) by type (Dr=rose, Cr=emerald) enable quick visual scanning. Dual OKLCH palette: light mode oklch(0.97 0.006 210) background + oklch(0.72 0.15 195) teal accent; dark mode oklch(0.11 0.04 250) navy + oklch(0.62 0.22 195) cyan. Glassmorphic card system differentiates from flat fintech.

## Color Palette

| Token | OKLCH Value | Role |
|-------|-------------|------|
| background (light) | 0.97 0.006 210 | Soft white page foundation |
| background (dark) | 0.11 0.04 250 | Deep navy foundation |
| primary (light) | 0.72 0.15 195 | Teal accent, CTAs |
| primary (dark) | 0.62 0.22 195 | Bright cyan, highlights |
| card | 0.16 0.025 245 | Dark glassmorphic surfaces |
| foreground (light) | 0.15 0.03 245 | Deep text |
| foreground (dark) | 0.92 0.01 245 | Light text |
| destructive | 0.58 0.22 10 | Rose red, alerts |
| transaction-dr (dark) | 0.68 0.25 10 | Debit/credit left border |
| transaction-cr (dark) | 0.72 0.22 160 | Collection/payment left border |
| transaction-success (dark) | 0.72 0.22 160 | Status badge: completed |
| transaction-processing (dark) | 0.78 0.22 50 | Status badge: pending |
| transaction-failed (dark) | 0.68 0.25 10 | Status badge: failed |

## Typography
- Display: Space Grotesk — confident, geometric fintech character
- Body: General Sans — accessible, clean legibility
- Scale: hero 5xl, section 2xl, label sm uppercase, body base

## PWA Branding Assets
- Icon (192x192): Teal-cyan gradient circle + geometric bridge symbol + CB initials
- Icon (512x512): Large format with same gradient and bridge geometry
- Icon (Maskable 192x192): Safe-zone adaptive icon for Android adaptive icons
- Apple Touch Icon (180x180): iOS rounded square with gradient bridge symbol
- Theme Color: Light mode #f5f5f7 (off-white), Dark mode #1c1c24 (navy)

## Elevation & Depth
Glassmorphic hierarchy: `.glass-sm` (inputs, subtle); `.glass-md` (cards, default); `.glass-lg` (floating actions). Glow shadows (`glow-blue`, `glow-success`, `glow-destructive`) add emotional depth. Transaction cards: `.transaction-card` with left border accent (`.transaction-card-dr`, `.transaction-card-cr`) + hover scale 1.01. All surfaces combine semi-transparent backgrounds + backdrop-blur-md.

## Structural Zones

| Zone | Treatment | Notes |
|------|-----------|-------|
| Header | glass-md, sticky | Nav, country/language selector |
| Sidebar | glass-sm, collapsible | Menu, profile, settings |
| Content | bg-background | Transparent main area |
| Cards | glass-md, glow | Stat boxes, transactions |
| Transaction List | space-y-4 grid | Stacked transaction cards with left borders |
| Status Badge | semantic pill | 8px padding, uppercase label, colored background |
| Buttons | primary semantic | Full-width mobile, 8px radius |
| Footer | muted/40 opacity | Legal, links |

## Spacing & Rhythm
Mobile-first: 8px, 12px, 16px, 24px, 32px. Card gaps 16px–24px. Transaction list: 12px–16px vertical spacing. Section breaks 32px–48px. Padding: 16px mobile → 24px tablet → 32px desktop.

## Component Patterns
- Buttons: 8px radius, primary teal/cyan, smooth 0.3s hover scale 0.98
- Cards: 12px radius, glass-md, 16px padding, glow shadows
- Transaction Cards: glass-md + left 4px border (Dr/Cr color), hover:scale 1.01, padding 16px, status badge top-right
- Status Badge: pill (4px radius, 8px padding), semantic colors (SUCCESS=emerald, PROCESSING=amber, FAILED=rose)
- Inputs: 8px radius, glass-sm background, focus ring-primary
- Transaction rows: glass-sm, hover:glass-md scale 1.01
- Badges: 4px radius, semantic colors, 8px padding

## Motion
- Entrance: glass-fade 0.3s ease-out (opacity + blur animation)
- Hover: scale 1.01 (cards), scale 0.98 (buttons), all with transition-smooth
- Float: 3s infinite on floating action button
- No bounce or overshoot

## Constraints
- All colors OKLCH `L C H` via CSS variables; no hex/rgb/arbitrary colors
- Glassmorphic: 0.6–0.85 opacity + backdrop-blur-16px
- Glow: blue (primary), rose (destructive), emerald (success)
- Transaction borders: 4px width, left-side only, semantic colors by Dr/Cr type
- Radii: 0, 4px, 8px, 12px, full; no inconsistent values
- Single easing: cubic-bezier(0.4, 0, 0.2, 1)
- PWA-ready: manifest.json, service worker, installable on mobile/desktop

## Signature Detail
Geometric bridge symbol (two towers + arch span) in app icon represents financial trust and connection. Teal-cyan gradient + soft glow creates premium fintech identity. **Transaction cards with left accent borders enable instant visual scanning — Dr/Cr type and status at a glance.** Glassmorphic surfaces on dual-mode OKLCH palette deliver native app experience across platforms.
