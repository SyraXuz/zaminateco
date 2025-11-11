# ZAMINAT.eco Developer Quick Reference Guide

## 🚀 Getting Started

### Prerequisites
```bash
# Node.js 18+ required
node --version

# Install dependencies
npm install
# or
pnpm install
```

### Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📱 New Pages

### Partners Page
**Route:** `/partners`  
**Component:** `src/pages/Partners.tsx`

**Key Features:**
- Partner showcase with discount offers
- Coin-based redemption system
- Category filtering
- Step-by-step guide

**Usage:**
```tsx
// Link to partners page
import { Link } from 'react-router-dom';
<Link to="/partners">View Partners</Link>
```

### Team Page
**Route:** `/team`  
**Component:** `src/pages/Team.tsx`

**Key Features:**
- Team member profiles
- Skills and achievements
- Contact integration
- Animated cards

**Translation Keys:**
```json
{
  "team.title": "Meet Our Team",
  "team.members.sukhrobjon.name": "...",
  "team.members.azamat.name": "...",
  "team.members.khondamir.name": "...",
  "team.members.islombek.name": "..."
}
```

### Contacts Page
**Route:** `/contacts`  
**Component:** `src/pages/Contacts.tsx`

**Key Features:**
- Contact form with validation
- Social media links
- Contact information cards
- Emergency contact section

---

## 🎨 New UI Components

### 1. Loading Animation

**Import:**
```tsx
import { LoadingAnimation, BlockLoadingAnimation } from '@/components/ui/loading-animation';
```

**Types:**
- `spinner` - Classic spinner
- `eco` - Eco-themed rotating icons (default)
- `pulse` - Pulsing circle

**Sizes:**
- `sm` - Small (6x6)
- `md` - Medium (8x8) - default
- `lg` - Large (12x12)

**Examples:**
```tsx
// Basic eco loading
<LoadingAnimation type="eco" size="md" text="Loading..." />

// Spinner
<LoadingAnimation type="spinner" size="lg" text="Please wait..." />

// Full page loading
<BlockLoadingAnimation />
```

---

### 2. QR Code Generator

**Import:**
```tsx
import { QRGenerator } from '@/components/ui/qr-generator';
```

**Props:**
```typescript
interface QRGeneratorProps {
  data: string;        // The data to encode
  size?: number;       // QR code size (default: 128)
  title?: string;      // Alt text (default: "QR Code")
  className?: string;  // Additional CSS classes
}
```

**Example:**
```tsx
// Basic QR code
<QRGenerator 
  data="https://zaminat.eco/action/123"
  size={200}
  title="Action QR Code"
/>

// Event QR code
<QRGenerator 
  data={`https://zaminat.eco/event/${eventId}`}
  size={256}
  title={`QR Code for ${eventName}`}
  className="mx-auto"
/>
```

**Use Cases:**
- Event registration
- Action verification
- Partner offers
- User profiles
- Referral links

---

### 3. Interactive Voting Panel

**Import:**
```tsx
import { InteractiveVotingPanel } from '@/components/ui/interactive-voting-panel';
```

**Props:**
```typescript
interface VotingPanelProps {
  title: string;
  description: string;
  options: VotingOption[];
  totalVotes: number;
  timeLeft?: string;
  userVote?: string;
  onVote: (optionId: string) => void;
  isActive?: boolean;
}

interface VotingOption {
  id: string;
  title: string;
  description: string;
  votes: number;
  color: string;
}
```

**Example:**
```tsx
const votingOptions = [
  {
    id: 'option-1',
    title: 'Plant More Trees',
    description: 'Focus on urban tree planting',
    votes: 245,
    color: '#22c55e'
  },
  {
    id: 'option-2',
    title: 'Clean Waterways',
    description: 'River and lake cleanup projects',
    votes: 189,
    color: '#3b82f6'
  }
];

<InteractiveVotingPanel
  title="What should we focus on next?"
  description="Vote for our next community project"
  options={votingOptions}
  totalVotes={434}
  timeLeft="3 days"
  onVote={(optionId) => console.log('Voted for:', optionId)}
  isActive={true}
/>
```

**Features:**
- Real-time vote counting
- Percentage display
- Results visualization
- Animation during voting
- Time-limited polls
- User vote tracking

---

### 4. Progress Display

**Import:**
```tsx
import { ProgressDisplay, useRealTimeProgress } from '@/components/ui/progress-display';
```

**Props:**
```typescript
interface ProgressDisplayProps {
  title: string;
  items: ProgressItem[];
  showAnimation?: boolean;
  updateInterval?: number;
}

interface ProgressItem {
  id: string;
  label: string;
  current: number;
  target: number;
  unit: string;
  color: string;
  icon?: React.ReactNode;
}
```

**Example:**
```tsx
import { TreePine, Recycle, Users } from 'lucide-react';

const progressItems = [
  {
    id: 'trees',
    label: 'Trees Planted',
    current: 850,
    target: 1000,
    unit: 'trees',
    color: '#22c55e',
    icon: <TreePine className="h-5 w-5 text-green-600" />
  },
  {
    id: 'recycling',
    label: 'Waste Recycled',
    current: 12500,
    target: 20000,
    unit: 'kg',
    color: '#3b82f6',
    icon: <Recycle className="h-5 w-5 text-blue-600" />
  }
];

<ProgressDisplay
  title="2025 Eco Goals"
  items={progressItems}
  showAnimation={true}
  updateInterval={2000}
/>
```

**With Real-Time Updates:**
```tsx
import { useRealTimeProgress } from '@/components/ui/progress-display';

function MyComponent() {
  const items = useRealTimeProgress(initialItems, 5000); // Update every 5s
  
  return <ProgressDisplay title="Live Progress" items={items} />;
}
```

**Status Badges:**
- ✅ **Completed** - 100%
- 🟢 **On Track** - 75-99%
- 🟡 **In Progress** - 50-74%
- 🔴 **Needs Attention** - 0-49%

---

## 🎨 Mobile CSS Classes

### Touch Optimization
```html
<!-- Enhanced touch targets -->
<button class="touch-target">Click me</button>
<button class="btn-touch">Touch Button</button>

<!-- Touch feedback -->
<div class="touch-feedback">Interactive Element</div>
<div class="interactive-touch">Card</div>

<!-- Swipe support -->
<div class="swipe-container swipeable">Swipeable Content</div>
```

### Layout & Grid
```html
<!-- Flexible grid -->
<div class="grid-auto-fit">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Mobile responsive grid -->
<div class="mobile-grid-2">2 columns on mobile</div>
<div class="mobile-grid-3">3 columns on tablet</div>
<div class="mobile-grid-4">4 columns on desktop</div>

<!-- Container -->
<div class="container-fluid">Fluid container</div>
```

### Cards & Elements
```html
<!-- Mobile cards -->
<div class="mobile-card">Card content</div>
<div class="card-mobile-hover">Hoverable card</div>

<!-- Voting panels -->
<div class="voting-panel">
  <div class="voting-option">Option 1</div>
</div>

<!-- Progress displays -->
<div class="progress-container">
  <div class="progress-bar">
    <div class="progress-fill" style="width: 75%"></div>
  </div>
</div>
```

### Animations
```html
<!-- Fade in -->
<div class="fade-in">Fades in</div>

<!-- Slide up -->
<div class="slide-up">Slides up</div>

<!-- Bounce in -->
<div class="bounce-in">Bounces in</div>

<!-- Page transition -->
<div class="page-transition">Page content</div>

<!-- Skeleton loading -->
<div class="skeleton-mobile" style="width: 200px; height: 20px;"></div>
<div class="loading-skeleton" style="width: 100%; height: 100px;"></div>
```

### Typography
```html
<!-- Fluid text -->
<p class="text-mobile-fluid">Responsive text</p>
<h1 class="heading-mobile-fluid">Responsive heading</h1>

<!-- Text scaling -->
<p class="mobile-text-scale">Scaled text</p>

<!-- Truncation -->
<p class="truncate-mobile">Truncates with ellipsis...</p>
<p class="truncate-mobile-2">Truncates at 2 lines...</p>
<p class="truncate-mobile-3">Truncates at 3 lines...</p>
```

### Navigation
```html
<!-- Sticky header -->
<header class="sticky-mobile-header">Header content</header>

<!-- Bottom navigation -->
<nav class="bottom-nav-mobile">
  <a href="/">Home</a>
  <a href="/map">Map</a>
</nav>
```

### Effects
```html
<!-- Ripple effect -->
<button class="ripple-effect">Click me</button>

<!-- GPU accelerated -->
<div class="gpu-accelerated">Smooth animations</div>

<!-- Enhanced button -->
<button class="btn-mobile-enhanced">Enhanced Button</button>

<!-- Spinner -->
<div class="spinner-mobile"></div>
```

### Spacing
```html
<div class="space-mobile-sm">Small spacing</div>
<div class="space-mobile-md">Medium spacing</div>
<div class="space-mobile-lg">Large spacing</div>
```

### Shadows
```html
<div class="shadow-mobile-sm">Subtle shadow</div>
<div class="shadow-mobile-md">Medium shadow</div>
<div class="shadow-mobile-lg">Large shadow</div>
```

### Gradients
```html
<div class="gradient-mobile-eco">Eco gradient</div>
<div class="gradient-mobile-sky">Sky gradient</div>
```

### Modals
```html
<div class="modal-mobile-optimized">
  <div class="modal-content-mobile">
    Modal content here
  </div>
</div>
```

### Safe Areas
```html
<!-- Safe area padding for notched devices -->
<div class="safe-area-padding">Content</div>
```

### Scroll
```html
<!-- Smooth scrolling -->
<div class="smooth-scroll">Scrollable content</div>

<!-- Scroll snap carousel -->
<div class="scroll-snap-mobile">
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</div>
```

---

## 🌍 Internationalization

### Adding Translations

**Location:** `src/locales/{lang}/`

**For Partners Page:**
```json
// src/locales/en/translation.json
{
  "ourPartners": "Our Partners",
  "partnersDescription": "Discover eco-friendly businesses...",
  "carrefourTashkent": "Carrefour Tashkent",
  "yandexTaxi": "Yandex Taxi",
  // ... more keys
}
```

**For Team Page:**
```json
// src/locales/en/team-translations.json
{
  "team": {
    "title": "Meet Our Team",
    "members": {
      "sukhrobjon": {
        "name": "Sukhrobjon Rikhsiboev",
        "position": "CEO & Founder",
        "description": "...",
        "skills": ["Leadership", "Strategy"],
        "achievements": ["Founded ZAMINAT.eco"]
      }
    }
  }
}
```

### Using Translations

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

---

## 📱 Responsive Breakpoints

```css
/* Ultra-small mobile */
@media (min-width: 320px) { }

/* Small mobile */
@media (min-width: 375px) { }

/* Mobile */
@media (min-width: 480px) { }

/* Mobile (max) */
@media (max-width: 640px) { }

/* Tablet portrait */
@media (min-width: 768px) { }

/* Tablet landscape */
@media (min-width: 1024px) { }

/* Desktop */
@media (min-width: 1440px) { }

/* Foldable devices */
@media (min-width: 600px) and (max-width: 840px) { }
```

---

## 🎯 Best Practices

### Touch Targets
```tsx
// ✅ Good - 44px minimum
<button className="min-h-[44px] min-w-[44px] p-3">
  Click me
</button>

// ❌ Bad - Too small
<button className="p-1 text-xs">
  Click me
</button>
```

### Font Sizes (iOS Safari)
```tsx
// ✅ Good - Prevents zoom
<input className="text-base" /> {/* 16px */}

// ❌ Bad - Triggers zoom
<input className="text-sm" /> {/* 14px */}
```

### Animations
```tsx
// ✅ Good - Respects reduced motion
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>

// Reduced motion is handled by CSS
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
  }
}
```

### Performance
```tsx
// ✅ Good - GPU accelerated
<div className="gpu-accelerated transform transition-transform">
  Animated content
</div>

// ✅ Good - Lazy loading
<img loading="lazy" src="..." alt="..." />
```

---

## 🐛 Troubleshooting

### QR Code Not Displaying
```tsx
// Check data is URL encoded
const qrData = encodeURIComponent(data);

// Check size is reasonable (128-512)
<QRGenerator data={qrData} size={256} />
```

### Animations Not Working
```bash
# Check framer-motion is installed
npm list framer-motion

# Should see: framer-motion@11.18.2
```

### Mobile Styles Not Applied
```tsx
// Ensure CSS files are imported in App.tsx
import './styles/enhanced-mobile.css';
import './styles/mobile-responsive.css';
```

### Translation Keys Not Found
```tsx
// Check translation namespace
const { t } = useTranslation('team'); // For team-translations.json

// Check key exists in JSON
t('team.title') // Must exist in team-translations.json
```

---

## 📚 Additional Resources

### Component Libraries
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Icon library

### Documentation
- [React Router](https://reactrouter.com/) - Routing
- [i18next](https://www.i18next.com/) - Internationalization
- [Tailwind CSS](https://tailwindcss.com/) - Utility CSS

---

## 🎉 Quick Start Checklist

- [ ] Install dependencies: `npm install`
- [ ] Start dev server: `npm run dev`
- [ ] Visit `/partners` page
- [ ] Visit `/team` page
- [ ] Visit `/contacts` page
- [ ] Test voting panel on `/vote`
- [ ] Test loading animations
- [ ] Test QR code generation
- [ ] Test on mobile device (320px+)
- [ ] Test all three languages (EN/RU/UZ)
- [ ] Build for production: `npm run build`

---

**Happy Coding! 🌱**

For questions or issues, contact the team via the `/contacts` page.
