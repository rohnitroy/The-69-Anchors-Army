# Component Reference Guide

## Overview
Reusable React components organized by category: layout, logos, sections, and UI components.

---

## Layout Components

### Navbar
**File:** `src/components/layout/Navbar.tsx`

Navigation header component displayed at top of page.

**Props:**
- None (uses global state)

**Features:**
- Sticky positioning
- Logo display
- Navigation links
- CTA button
- Mobile-responsive hamburger menu

**Usage:**
```tsx
import Navbar from '@/components/layout/Navbar';

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
```

---

### Footer
**File:** `src/components/layout/Footer.tsx`

Footer section at bottom of page.

**Props:**
- None

**Features:**
- Contact information
- Social links
- Copyright notice
- Links to privacy, terms

---

## Logo Components

### AnchorsArmyLogo
**File:** `src/components/logos/AnchorsArmyLogo.tsx`

69 Anchors Army premium logo.

**Props:**
```typescript
interface Props {
  size?: 'small' | 'medium' | 'large';  // Default: 'medium'
  className?: string;                   // Additional Tailwind classes
  animated?: boolean;                   // Enable entrance animation
}
```

**Usage:**
```tsx
<AnchorsArmyLogo size="large" animated />
```

---

### BolBBBolLogo
**File:** `src/components/logos/BolBBBolLogo.tsx`

Horizontal Bol BB Bol brand logo.

**Props:**
```typescript
interface Props {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}
```

---

### MicSymbol
**File:** `src/components/logos/MicSymbol.tsx`

Microphone symbol icon/logo.

**Props:**
```typescript
interface Props {
  size?: number;        // Width/height in pixels
  animated?: boolean;   // Loading animation
  className?: string;
}
```

**Usage:**
```tsx
<MicSymbol size={80} animated />
```

---

## Section Components

### HeroSection
**File:** `src/components/sections/HeroSection.tsx`

Landing page hero with headline, subheadline, and CTA buttons.

**Features:**
- Full-screen hero section
- Background video/image
- Animated headline reveal (GSAP)
- Dual CTA buttons
- Scroll indicator animation

**Structure:**
```
"— Anchor Bol BB Bol Presents —"
"baat karne se baat banti hai"
"The Next Generation Wedding Anchors"
[Request Admission] [Scroll to Explore]
```

---

### PositioningSection
**File:** `src/components/sections/PositioningSection.tsx`

Unique value proposition with key statistics.

**Features:**
- Headline: "This is Different"
- Key positioning statement
- 3-column stat layout
  - 69 Seats Only
  - ₹69,000 Investment
  - 2 Immersive Days

---

### MentorSection
**File:** `src/components/sections/MentorSection.tsx`

"Who is BB?" mentor biography section.

**Features:**
- Mentor photo/avatar
- Bio paragraph (500+ events, 40+ cities, 12+ years)
- 3 key statistics
- Signature display

---

### ProgramSection
**File:** `src/components/sections/ProgramSection.tsx`

7-module curriculum showcase.

**Features:**
- Section title: "The Curriculum"
- 7 ModuleCard components in grid
- Scroll reveal animation per module
- Interactive hover states

**Modules:**
1. Voice Craft & Career Architecture
2. Visual Transformation
3. The Pajama Circle
4. The Digital Edge
5. The Wedding Playbook
6. Referral Network Induction
7. The Personal Audit

---

### DeliverablesSection
**File:** `src/components/sections/DeliverablesSection.tsx`

Premium offerings and exclusive materials.

**Features:**
- DeliverableCard grid layout
- Badge labels (e.g., "Exclusive", "Bonus")
- Icon/image per deliverable
- Price or value display

---

### InclusionsSection
**File:** `src/components/sections/InclusionsSection.tsx`

What's included in bootcamp package.

**Features:**
- List of InclusionItem components
- Check icons
- Clear hierarchy

---

### InvestmentSection
**File:** `src/components/sections/InvestmentSection.tsx`

Pricing and payment details.

**Features:**
- Investment amount: ₹69,000
- Payment plans (if applicable)
- Seat availability (12/69)
- Payment method information

---

### PromoSection
**File:** `src/components/sections/PromoSection.tsx`

Promotional/special offer section.

**Features:**
- Limited-time offer messaging
- Urgency indicators
- Bonus offerings
- Call-to-action button

---

### RegistrationSection
**File:** `src/components/sections/RegistrationSection.tsx`

Call-to-action section encouraging registration.

**Features:**
- Headline
- Description
- Primary CTA button to /register
- Secondary support text

---

## UI Components

### Button
**File:** `src/components/ui/Button.tsx`

Reusable button component with variants.

**Props:**
```typescript
interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';  // Default: 'primary'
  size?: 'sm' | 'md' | 'lg';                       // Default: 'md'
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';           // Default: 'button'
}
```

**Variants:**
- **primary** - Gold/luxury button (main CTAs)
- **secondary** - Subtle alternative
- **outline** - Border-only style

**Usage:**
```tsx
<Button variant="primary" size="lg" onClick={() => {}}>
  Request Admission
</Button>
```

---

### DeliverableCard
**File:** `src/components/ui/DeliverableCard.tsx`

Card component for displaying deliverables.

**Props:**
```typescript
interface Props {
  number: string;      // e.g., "01"
  title: string;
  desc: string;
  badge?: string;      // e.g., "Exclusive"
  icon?: React.ReactNode;
}
```

**Usage:**
```tsx
<DeliverableCard
  number="01"
  title="The Wedding Playbook"
  desc="Every script and protocol..."
  badge="Exclusive"
/>
```

---

### GoldDivider
**File:** `src/components/ui/GoldDivider.tsx`

Horizontal separator line with gold accent.

**Props:**
```typescript
interface Props {
  className?: string;
  width?: 'full' | 'half' | 'third';  // Default: 'full'
}
```

**Usage:**
```tsx
<GoldDivider width="half" />
```

---

### InclusionItem
**File:** `src/components/ui/InclusionItem.tsx`

List item for inclusions with check icon.

**Props:**
```typescript
interface Props {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}
```

---

### Loader
**File:** `src/components/ui/Loader.tsx`

Loading spinner/animation.

**Props:**
```typescript
interface Props {
  size?: 'sm' | 'md' | 'lg';  // Default: 'md'
  text?: string;               // Loading text
}
```

**Usage:**
```tsx
<Loader size="lg" text="Loading..." />
```

---

### Marquee
**File:** `src/components/ui/Marquee.tsx`

Horizontal scrolling text carousel (testimonials, social proof).

**Props:**
```typescript
interface Props {
  items: string[];
  speed?: number;        // Scroll speed (default: 50)
  direction?: 'left' | 'right';
}
```

**Usage:**
```tsx
<Marquee
  items={["500+ Events", "40+ Cities", "12+ Years"]}
  speed={40}
/>
```

---

### ModuleCard
**File:** `src/components/ui/ModuleCard.tsx`

Card component for program modules.

**Props:**
```typescript
interface Props {
  number: string;  // e.g., "01"
  title: string;
  desc: string;
  animated?: boolean;
}
```

**Usage:**
```tsx
<ModuleCard
  number="01"
  title="Voice Craft & Career Architecture"
  desc="Build the mic presence..."
  animated
/>
```

---

### SectionReveal
**File:** `src/components/ui/SectionReveal.tsx`

GSAP-powered section reveal animation on scroll.

**Props:**
```typescript
interface Props {
  children: React.ReactNode;
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight';
  delay?: number;        // Animation delay in seconds
}
```

**Usage:**
```tsx
<SectionReveal animation="fadeUp" delay={0.2}>
  <h2>Animated Heading</h2>
</SectionReveal>
```

---

### SpotProgress
**File:** `src/components/ui/SpotProgress.tsx`

Progress indicator with dot-based visualization.

**Props:**
```typescript
interface Props {
  current: number;   // Current step (1-based)
  total: number;     // Total steps
  showLabel?: boolean;
}
```

**Usage:**
```tsx
<SpotProgress current={3} total={7} showLabel />
```

---

### StatCounter
**File:** `src/components/ui/StatCounter.tsx`

Animated number counter (counts from 0 to final number).

**Props:**
```typescript
interface Props {
  value: number;      // Final number to count to
  label: string;      // Label below number
  suffix?: string;    // e.g., "+", "₹", "%"
  duration?: number;  // Animation duration in ms (default: 2000)
}
```

**Usage:**
```tsx
<StatCounter
  value={500}
  label="Events Anchored"
  suffix="+"
  duration={2500}
/>
```

---

## Component Hierarchy

```
Layout
├── Navbar
├── Main Content
│   ├── HeroSection
│   ├── PositioningSection
│   │   └── StatCounter (×3)
│   ├── MentorSection
│   │   └── StatCounter (×3)
│   ├── ProgramSection
│   │   └── ModuleCard (×7)
│   ├── DeliverablesSection
│   │   └── DeliverableCard (×N)
│   ├── InclusionsSection
│   │   └── InclusionItem (×N)
│   ├── InvestmentSection
│   └── RegistrationSection
│       └── Button
└── Footer
```

---

## Styling

### Tailwind CSS v4
All components use Tailwind utility classes.

**Key Classes Used:**
- `flex`, `grid` - Layouts
- `text-gold`, `bg-black` - Colors
- `text-lg`, `text-xl` - Typography
- `py-12`, `px-8` - Spacing
- `rounded-lg` - Border radius
- `shadow-lg` - Shadows
- `hover:` - Hover states
- `transition-all` - Smooth transitions

### Global Styles
Located in root layout component.

---

## Animation

### GSAP (GreenSock)
Used in:
- SectionReveal
- Page transitions
- Parallax effects
- Text reveals

### Framer Motion
Used in:
- Component entrance animations
- Interactive hover states
- Page load animations

---

## Best Practices

1. **Reuse Components** - Use existing components rather than duplicating
2. **Props Over Hard-coding** - Pass data as props
3. **Accessibility** - Include alt text, aria labels
4. **Mobile First** - Design for mobile, scale up
5. **Performance** - Lazy load images, optimize animations
6. **Type Safety** - Define PropTypes or TypeScript interfaces

---

## Adding New Components

1. Create file in `src/components/[category]/[Name].tsx`
2. Define TypeScript interface for props
3. Export default component
4. Document in this guide
5. Add to appropriate section export

**Template:**
```tsx
interface Props {
  // Define props
}

export default function NewComponent({ prop }: Props) {
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}
```

---

## Troubleshooting

### Component Not Rendering
- Check imports are correct
- Verify props are passed correctly
- Check console for errors

### Animation Not Working
- Verify GSAP/Framer Motion installed
- Check animation prop values
- Ensure component is mounted

### Styling Issues
- Check Tailwind class names
- Verify CSS module imports
- Clear `.next` cache and rebuild

---

## Performance Optimization

### Image Optimization
```tsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="description"
  width={800}
  height={600}
  priority={false}
/>
```

### Code Splitting
Components are automatically code-split by Next.js.

### Memoization
Use `React.memo` for expensive components:
```tsx
export default React.memo(StatCounter);
```
