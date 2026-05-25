# Design Brief — Credit Bridge Auth & Premium Fintech

## Direction
Credit Bridge authentication system — premium fintech login/signup with two-column hero + form layout on desktop, mobile-responsive stack. Light mode: soft white background oklch(0.97 0.006 210) + teal accents oklch(0.72 0.15 195). Dark mode: navy background oklch(0.11 0.04 250) + cyan accents oklch(0.62 0.22 195). Glassmorphic form cards with smooth entrance animations.

## Tone
Secure, refined, approachable. Geometric fintech hero illustration (left panel) with soft glow conveys trust and connectivity. Premium typography and glassmorphism elevate above commodity auth UI.

## Differentiation
Hero panel features geometric bridge + node illustration with teal/cyan glow. Two-column layout (desktop only, stacks mobile) creates premium uncluttered experience. Glassmorphic form card with backdrop blur differentiates from flat auth competitors.

## Color Palette

| Token | OKLCH | Role |
|-------|-------|------|
| background (light) | 0.97 0.006 210 | Soft white, minimal |
| background (dark) | 0.11 0.04 250 | Deep navy foundation |
| primary (light) | 0.72 0.15 195 | Teal CTA buttons |
| primary (dark) | 0.62 0.22 195 | Bright cyan highlights |
| card | 0.16 0.025 245 | Glassmorphic surfaces |
| foreground (light) | 0.15 0.03 245 | Dark text, deep contrast |
| foreground (dark) | 0.92 0.01 245 | Light text on dark |
| border | varies | Soft teal-tinted 0.5 opacity |
| input | 0.94 0.012 210 | Light glass input bg |

## Typography
- Display: Space Grotesk — confident headers ("Sign In", "Create Account")
- Body: General Sans — form labels, body text, helper copy
- Scale: headers 2xl/3xl, labels sm uppercase, body base, helpers xs muted

## Auth Page Components
- Form Card: `.glass-card` (0.85 opacity + blur-16) + 12px radius, 16px padding (mobile) → 24px (desktop)
- Hero Panel: `.glass-card` + `.glow-blue` (desktop only), geometric bridge illustration center
- Inputs: `.auth-input` (glass-sm bg, focus:ring-primary, 8px radius)
- Buttons: `.auth-button` (primary bg, white text, hover:scale-0.98, smooth transition)
- Links: `.auth-link` (muted text, hover darker)

## Structural Zones

| Zone | Treatment | Notes |
|------|-----------|-------|
| Auth Page | bg-background flex center | Min-height screen, padding mobile |
| Hero Panel | glass-card glow-blue | Desktop only, left column, centered illustration |
| Form Container | glass-card | Right column (desktop) or full-width (mobile) |
| Header | text-2xl font-display | Centered in hero panel (desktop) or above form (mobile) |
| Form Fields | glass-sm inputs | Vertical stack, 12px gaps, full-width |
| Button | auth-button primary | Full-width, hover scale 0.98 |
| Footer Link | auth-link muted | Centered below button, e.g. "Forgot password?" |

## Spacing & Rhythm
Mobile-first: 16px horizontal padding, 24px vertical gaps between inputs. Desktop: hero 8px padding (illustration safe zone), form card 24px padding, 12px gap between fields. Section breaks 32px. 

## Component Patterns
- Buttons: 12px radius, primary teal/cyan, white text, smooth 0.3s hover scale 0.98
- Form cards: 12px radius, glass-md bg + blur, 16px mobile padding → 24px desktop
- Inputs: 8px radius, glass-sm, focus:ring-2 ring-primary, muted placeholder
- Links: sm text, muted foreground, hover:foreground smooth
- Status messages: semantic colors (success emerald, error red, info teal)

## Motion
- Entrance: `.fade-in` glass-fade 0.35s ease-out (opacity + blur animation)
- Staggered load: `.fade-in-delay-100`, `.fade-in-delay-200` on form fields
- Hover: buttons scale 0.98 (smooth), inputs ring-primary (no scale)
- No bounce, no overshoot — refined fintech motion

## Constraints
- All colors OKLCH `L C H` via CSS variables (no hex/rgb)
- Glassmorphic: 0.75–0.85 opacity + backdrop-blur-16
- No glow on auth forms (reserve glow for hero panel only)
- Radii: 8px inputs, 12px cards, full buttons text-only
- Focus states: ring-2 ring-primary (no outline)
- Mobile-first responsive: stack vertical, 100% width inputs/buttons
- Desktop two-column: hero left (flex center), form right (max-w-sm)

## Signature Detail
Geometric bridge illustration with interconnected nodes in hero panel, soft teal glow underneath. Hero + form two-column flow (desktop) creates premium uncluttered aesthetic. Glassmorphic form card with subtle glow shadows elevates above commodity authentication interfaces. Smooth fade-in entrance animation on page load conveys confident, polished fintech brand identity.
