# StudyMitra Design Guidelines

## Design Approach
**Selected Approach:** Hybrid (Education Platform Standards + Modern Web Aesthetics)
- Primary inspiration: Khan Academy's educational clarity + Duolingo's engaging interface
- Focus on student-friendly, distraction-free learning experience
- Balance between playful engagement and academic credibility

## Core Design Elements

### A. Color Palette

**Primary Colors (Light Mode):**
- Primary Gradient: #005bea → #00c6fb (Navigation, CTAs, accents)
- Background: 0 0% 98% (Off-white for reduced eye strain)
- Surface: 0 0% 100% (Card backgrounds)
- Text Primary: 220 40% 15% (Dark blue-gray for readability)
- Text Secondary: 220 20% 45%

**Accent Colors:**
- Success (Quiz correct): 142 76% 45%
- Error (Quiz incorrect): 0 84% 60%
- Warning (Announcements): 38 92% 50%

### B. Typography
**Font Family:** Poppins (Google Fonts)
- Headings: Poppins SemiBold (600) - Hero: 2.5rem, Section: 1.875rem, Card: 1.25rem
- Body: Poppins Regular (400) - 1rem base, 1.6 line-height
- UI Elements: Poppins Medium (500) - Buttons, Navigation
- Notes Content: Poppins Light (300) - 1.125rem for better readability

### C. Layout System
**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-6 (cards), p-8 (sections)
- Section gaps: gap-8 (desktop), gap-4 (mobile)
- Container: max-w-7xl with px-4 padding

**Two-Column Layout:**
- Main Content: 70% width (lg:w-[70%])
- Ad Panel: 30% width (lg:w-[30%]) - Fixed on desktop, stacked on mobile
- Breakpoint: lg (1024px) for layout shift

### D. Component Library

**Navigation Bar:**
- Gradient background with backdrop blur
- Logo left, links center, search right
- Mobile: Hamburger menu with slide-in drawer
- Height: 64px, sticky position

**Hero Section:**
- Full-width gradient overlay (blue to cyan, 20% opacity)
- Background image: Students collaborating/studying (bright, diverse, aspirational)
- Centered content with max-w-4xl
- Tagline: 3rem bold, white text with subtle shadow
- CTA Button: Large (px-8 py-4), white bg with gradient on hover

**Class Cards (Interactive):**
- 4-column grid on desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
- Gradient border on hover (2px, matching primary gradient)
- Transform scale(1.05) on hover with smooth transition
- Box shadow: Soft (0 4px 6px -1px rgb(0 0 0 / 0.1))
- Icon: Large (48px) class number with gradient fill

**Subject Cards:**
- 2-column grid (md:grid-cols-2)
- Subject icons: Use Heroicons (academic-cap for general, beaker for Science, calculator for Math)
- Rounded corners: rounded-xl (12px)
- Hover effect: Shadow elevation + subtle background shift

**Quiz Interface:**
- Question card: White bg, prominent question text (1.5rem)
- Options: Radio buttons styled as full-width cards with hover states
- Submit button: Gradient background, disabled state until selection
- Results: Color-coded feedback (green/red) with animation

**Ad/Announcement Panel:**
- Fixed on desktop (sticky top-20)
- 3 ad spaces with clear borders and labels
- Rounded-lg corners, subtle shadow
- Placeholder text: "Advertisement" in muted color

**Admin Panel:**
- Login form: Centered card (max-w-md) with gradient header
- Dashboard: Sidebar navigation + main content area
- Forms: Clean input fields with focus states (blue ring)
- Action buttons: Gradient primary, outlined secondary

### E. Interactions & Animations
**Minimal, purposeful animations:**
- Button hover: Transform scale(1.02) + shadow increase (150ms ease)
- Card hover: Lift effect with translateY(-4px) (200ms ease)
- Page transitions: Fade in content (300ms)
- Quiz feedback: Pulse animation on correct/incorrect (400ms)
- Mobile menu: Slide-in from right (250ms ease-out)

**NO excessive animations** - focus on learning content

## Responsive Breakpoints
- Mobile: < 768px (Single column, stacked ads at bottom)
- Tablet: 768px - 1024px (2-column for some content)
- Desktop: > 1024px (Full two-column layout with fixed ad panel)

## Images

**Hero Section:**
- Large background image: Diverse students studying together, bright classroom/library setting, aspirational mood
- Dimensions: 1920x800px minimum, optimized for web
- Treatment: Slight gradient overlay (blue-to-cyan, 15-20% opacity) for text readability

**Class Cards (Optional Enhancement):**
- Small illustrative icons or abstract shapes representing each class level
- Can use gradient-filled SVG shapes instead of photos

**Subject Cards:**
- Icon-based approach using Heroicons library (no photos needed)

## Accessibility & Quality
- Contrast ratio: Minimum 4.5:1 for all text
- Focus indicators: 2px blue ring on all interactive elements
- Touch targets: Minimum 44x44px for mobile
- Alt text: Descriptive for all educational images
- Keyboard navigation: Full support for admin and quiz interfaces

## Mobile-First Considerations
- Navigation collapses to hamburger menu
- Ad panel moves below main content (not fixed)
- Class cards stack to single column
- Hero text size scales down (2rem on mobile)
- Touch-optimized quiz options (larger tap areas)
- Horizontal scrolling for chapter lists on small screens