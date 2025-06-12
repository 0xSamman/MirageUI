# Mirage Design System 2025 - Persian Edition
*A next-generation RTL design system rooted in Persian aesthetics*

## Core Philosophy
Mirage embodies **Organic Minimalism** with deep Persian cultural roots - where digital interfaces feel alive, responsive, and naturally intuitive in right-to-left flow. Every element breathes with subtle motion, responds to user intent, and creates emotional connections through micro-interactions while honoring Persian design traditions and RTL reading patterns.

## Visual Foundation

### Color Palette
**Primary Spectrum (Adaptive)**
- `Mirage-primary`: Dynamic gradient from #6366f1 to #8b5cf6 (shifts based on time/context)
- `Mirage-primary-soft`: rgba(99, 102, 241, 0.12)
- `Mirage-primary-glow`: rgba(99, 102, 241, 0.4) with 20px blur

**Neutral Foundation (Warm-tinted)**
- `Mirage-gray-50`: #fafafa (warm white)
- `Mirage-gray-100`: #f5f5f4 (soft cream)
- `Mirage-gray-900`: #1c1917 (warm charcoal)
- `Mirage-gray-950`: #0f0e0d (deep cocoa)

**Semantic Colors**
- Success: #10b981 (vibrant emerald)
- Warning: #f59e0b (electric amber)
- Error: #ef4444 (passionate coral)
- Info: #06b6d4 (electric cyan)

### Typography
**Primary Font**: YekanBakh (Persian optimized) / YekanBakh (fallback) / Inter Variable (Latin fallback)
**Display Font**: YekanBakh (for all text) / YekanBakh (fallback)
**Persian Number Font**: YekanBakh (for consistent Persian numerals)

**RTL Typography Rules**:
- All text elements default to `direction: rtl`
- Persian text uses YekanBakh as the primary font with YekanBakh as fallback
- Latin text within Persian content maintains RTL flow but uses LTR direction locally
- Line-height optimized for Persian script (1.75 vs 1.5 for Latin)

**Scale (Fluid Typography - RTL Optimized)**
- Mirage-text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)
- Mirage-text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem)
- Mirage-text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem)
- Mirage-text-lg: clamp(1.125rem, 1rem + 0.6vw, 1.375rem)
- Mirage-text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.875rem)
- Mirage-text-2xl: clamp(1.5rem, 1.2rem + 1.2vw, 2.25rem)
- Mirage-text-3xl: clamp(1.875rem, 1.5rem + 1.5vw, 3rem)

### Spacing System (Golden Ratio Based)
- Mirage-space-1: 0.25rem (4px)
- Mirage-space-2: 0.375rem (6px)
- Mirage-space-3: 0.625rem (10px)
- Mirage-space-4: 1rem (16px)
- Mirage-space-5: 1.625rem (26px)
- Mirage-space-6: 2.625rem (42px)
- Mirage-space-7: 4.25rem (68px)
- Mirage-space-8: 6.875rem (110px)

## Component Architecture

### Buttons
**Primary Button (Mirage-btn-primary)**
```
Base State:
- Background: Linear gradient from Mirage-primary
- Padding: Mirage-space-3 Mirage-space-5
- Border-radius: 12px
- Font-weight: 600
- Transform: translateY(0)
- Box-shadow: 0 4px 14px rgba(99, 102, 241, 0.25)
- Transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)
- Direction: rtl
- Text-align: center

Hover State:
- Transform: translateY(-2px)
- Box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4)
- Background: Intensified gradient

Active State:
- Transform: translateY(1px)
- Scale: 0.98
```

**Secondary Button (Mirage-btn-secondary)**
```
Base State:
- Background: Mirage-gray-100
- Border: 1px solid rgba(99, 102, 241, 0.2)
- Color: Mirage-gray-900
- Backdrop-filter: blur(12px)
- Direction: rtl
- Text-align: center
```

**Ghost Button (Mirage-btn-ghost)**
```
Base State:
- Background: transparent
- Color: Mirage-primary
- Border: 1px solid transparent
- Direction: rtl

Hover State:
- Background: Mirage-primary-soft
- Border-color: Mirage-primary
```

### Input Fields
**Text Input (Mirage-input)**
```
Base State:
- Background: rgba(255, 255, 255, 0.8)
- Backdrop-filter: blur(12px)
- Border: 1px solid rgba(156, 163, 175, 0.3)
- Border-radius: 14px
- Padding: Mirage-space-4 Mirage-space-4
- Font-size: Mirage-text-base
- Transition: all 0.2s ease
- Direction: rtl
- Text-align: right

Focus State:
- Border-color: Mirage-primary
- Box-shadow: 0 0 0 3px Mirage-primary-soft
- Background: rgba(255, 255, 255, 0.95)

Label (Floating - RTL):
- Position: absolute
- Right: 16px (instead of left)
- Transform: translateY(-50%)
- Color: Mirage-gray-600
- Transition: all 0.2s ease
- Font-size: Mirage-text-sm

Label (Focused/Filled - RTL):
- Transform: translateY(-28px) scale(0.85)
- Right: 12px
- Color: Mirage-primary

Persian Number Input:
- Font-family: YekanBakh
- Direction: ltr (for number input only)
- Text-align: right
```

### Cards
**Primary Card (Mirage-card)**
```
Base State:
- Background: rgba(255, 255, 255, 0.9)
- Backdrop-filter: blur(16px)
- Border: 1px solid rgba(255, 255, 255, 0.2)
- Border-radius: 20px
- Box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08)
- Transition: all 0.3s ease

Hover State:
- Transform: translateY(-4px)
- Box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12)
```

**Feature Card (Mirage-card-feature)**
```
- Background: Linear gradient overlay
- Border: 1px solid rgba(99, 102, 241, 0.2)
- Glow effect on hover
```

### Navigation
**Top Navigation (Mirage-nav)**
```
- Background: rgba(255, 255, 255, 0.85)
- Backdrop-filter: blur(20px)
- Border-bottom: 1px solid rgba(0, 0, 0, 0.05)
- Height: 72px
- Direction: rtl
- Sticky positioning with smooth reveal/hide on scroll
- Logo/Brand: Positioned on right side
- Menu items: Flow from right to left
- User menu: Positioned on left side
```

**Side Navigation (Mirage-sidebar)**
```
- Width: 280px (collapsed: 80px)
- Background: rgba(28, 25, 23, 0.95)
- Backdrop-filter: blur(20px)
- Position: Right side (right: 0)
- Direction: rtl
- Icons: Positioned on right when expanded
- Text labels: Right-aligned
- Smooth expand/collapse with micro-animations
- Persian menu items with proper font rendering
```

## Motion Design Principles

### Easing Functions
- **Standard**: cubic-bezier(0.4, 0, 0.2, 1)
- **Decelerate**: cubic-bezier(0, 0, 0.2, 1)
- **Accelerate**: cubic-bezier(0.4, 0, 1, 1)
- **Spring**: cubic-bezier(0.175, 0.885, 0.32, 1.275)

### Animation Durations
- **Micro**: 100ms (button states)
- **Short**: 200ms (hover effects)
- **Medium**: 300ms (modal open/close)
- **Long**: 500ms (page transitions)

### Signature Animations
1. **Mirage Ripple**: Expanding circle effect on interaction
2. **Morph Transition**: Smooth shape transformation between states
3. **Breathing Effect**: Subtle scale animation (0.98 to 1.02) on focused elements
4. **Parallax Float**: Multi-layer depth movement

## RTL Layout System

### Base RTL Configuration
```css
html {
  direction: rtl;
  text-align: right;
}

body {
  font-family: 'YekanBakh', 'IRANSansX Variable', Tahoma, Arial, sans-serif;
  direction: rtl;
}

[dir="ltr"] {
  direction: ltr;
  text-align: left;
}
```

### Grid Structure (RTL)
- 12-column grid with fluid gutters (mirrored)
- Breakpoints: 640px, 768px, 1024px, 1280px, 1536px
- Container max-widths: 1200px (desktop), responsive padding
- Grid flows from right to left
- First column starts from right edge

### Spacing Rhythm (RTL Considerations)
- All components follow 8px base grid
- Vertical rhythm based on 1.618 (golden ratio)
- Generous whitespace with purposeful density
- Padding/margin adjustments for Persian text rendering
- Icon spacing optimized for RTL flow

## Common Page Templates

### 1. Login Page Template Prompt (Persian RTL)

**PROMPT FOR AI:**
"Create a Persian RTL login page using Mirage Design System 2025. Include:

**Base RTL Setup**:
- Set html direction to rtl
- Use YekanBakh font for Persian text
- All text alignment to right by default

**Layout**: Centered card (400px width) on gradient background (#fafafa to #f5f5f4)

**Card Styling**: 
- Background: rgba(255, 255, 255, 0.9) with blur(16px)
- Border-radius: 20px
- Padding: 48px 40px
- Box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08)
- Direction: rtl

**Typography**:
- Heading: 'خوش آمدید' in YekanBakh, 2xl size, gray-900
- Subtext: 'وارد حساب کاربری خود شوید' in YekanBakh, base size, gray-600
- Text-align: right for all Persian text

**Form Elements**:
- Email/Password inputs with RIGHT-positioned floating labels
- Input direction: rtl, text-align: right
- Labels positioned on right side (right: 16px)
- Primary button: gradient background (#6366f1 to #8b5cf6)
- Button text: 'ورود' (Login in Persian)
- Add subtle hover animations (translateY(-2px))
- Include 'فراموشی رمز عبور؟' link in primary color (right-aligned)

**Micro-interactions**:
- Input focus: border glow with primary color
- Button hover: lift effect with enhanced shadow
- Form validation with smooth error states
- RTL-aware animations

**Background**: Subtle geometric pattern with low opacity
**Persian Elements**: Use Persian numerals, proper Persian typography spacing"

### 2. Dashboard Template Prompt (Persian RTL)

**PROMPT FOR AI:**
"Create a Persian RTL dashboard using Mirage Design System 2025. Include:

**Base RTL Configuration**:
- HTML direction: rtl
- Font-family: YekanBakh, IRANSansX Variable
- All layouts flow right to left

**Layout**: 
- Top navigation (72px height) with glass morphism effect
- RIGHT sidebar (280px) with dark theme
- Main content area with 24px padding
- Navigation logo on RIGHT side, user menu on LEFT

**Navigation**:
- Header: rgba(255, 255, 255, 0.85) with blur(20px)
- Sidebar: rgba(28, 25, 23, 0.95) with subtle glow accents
- Menu items: Right-aligned with Persian labels
- Icons: Positioned on right side of text

**Content Cards**:
- Metric cards: Glass morphism style with hover lift
- Chart containers: Clean backgrounds with subtle borders
- Use 20px border-radius consistently
- All text right-aligned, Persian numerals

**Persian Content**:
- Menu labels: 'داشبورد', 'گزارشات', 'تنظیمات', etc.
- Card titles in Persian with proper spacing
- Use Persian number formatting (۱۲۳۴ instead of 1234)

**Color Scheme**:
- Primary actions: #6366f1 gradient
- Success metrics: #10b981
- Backgrounds: Warm neutrals (#fafafa base)

**Typography**: YekanBakh throughout, golden ratio sizing
**Spacing**: Follow 8px grid system with generous whitespace
**Animations**: Smooth transitions (300ms) on all interactive elements
**RTL Considerations**: All icons, dropdowns, and interactive elements positioned for RTL flow"

### 3. Product Card Grid Template Prompt (Persian RTL)

**PROMPT FOR AI:**
"Create a Persian RTL product grid using Mirage Design System 2025. Include:

**RTL Base Setup**:
- Direction: rtl for all containers
- Font-family: YekanBakh for product descriptions
- Text-align: right for all Persian content

**Grid Layout**:
- Responsive columns (1-4 based on screen size)
- 24px gaps between cards
- Masonry-style layout for dynamic heights
- Grid flows right to left

**Product Cards**:
- Background: rgba(255, 255, 255, 0.9) with blur(16px)
- Border-radius: 20px
- Hover: translateY(-4px) with enhanced shadow
- Image: Rounded corners (16px), aspect ratio 4:3
- Content direction: rtl

**Content Structure (Persian)**:
- Product title: IRANSansX Variable, lg size, weight 600, right-aligned
- Price: Primary color (#6366f1), xl size, weight 700, Persian numerals (۱۲,۰۰۰ تومان)
- Description: YekanBakh, sm size, gray-600, right-aligned
- CTA button: 'افزودن به سبد' (Add to Cart) with smooth transitions

**Interactive States**:
- Card hover: Lift animation with shadow increase
- Button hover: Gradient shift with 2px lift
- Image hover: Subtle scale (1.05) with smooth transition
- RTL-aware hover effects

**Persian Elements**:
- Use Persian numerals throughout
- Proper currency formatting (تومان)
- Right-aligned price displays
- Persian product categories

**Typography Scale**: Use fluid sizing (clamp functions)
**Spacing**: Golden ratio based (Mirage-space system)"

### 4. Profile/Settings Page Template Prompt (Persian RTL)

**PROMPT FOR AI:**
"Create a Persian RTL profile settings page using Mirage Design System 2025. Include:

**RTL Foundation**:
- HTML direction: rtl
- All text right-aligned by default
- YekanBakh for body text, IRANSansX Variable for headings

**Layout Structure**:
- Two-column layout (RIGHT sidebar nav + main content)
- Settings navigation: Glass cards with active state indicators
- Form sections: Grouped in glass morphism containers
- Sidebar positioned on RIGHT side

**Persian Navigation**:
- Menu items: 'پروفایل شخصی', 'تنظیمات حساب', 'امنیت', 'اعلان‌ها'
- Right-aligned navigation with Persian labels
- Active state indicators on right border

**Visual Elements**:
- Avatar upload: Circular with gradient border when active
- Form inputs: RIGHT-positioned floating labels
- Input direction: rtl, text-align: right
- Toggle switches: Custom design with smooth animations
- Save button: 'ذخیره تغییرات' with primary gradient

**Form Fields (Persian)**:
- Labels: 'نام', 'نام خانوادگی', 'ایمیل', 'شماره تلفن'
- Placeholders in Persian
- Phone number field: RTL but numbers LTR
- Email field: LTR direction but right-aligned

**Styling Details**:
- Section cards: 20px border-radius, subtle shadows
- Input focus: Primary color glow (0 0 0 3px rgba(99, 102, 241, 0.12))
- Typography: Proper Persian typography hierarchy
- Colors: Warm neutral base with primary accents

**Interactions**:
- Form validation: Inline with smooth color transitions in Persian
- Save states: Loading spinner with success checkmark animation
- Navigation: Active state with subtle background and border glow
- RTL-aware animations and transitions

**Responsive**: Stack on mobile, maintain 24px padding throughout
**Persian UX**: Error messages in Persian, proper date formatting"

## Persian RTL Features

### Font Loading & Optimization
```css
@import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css');
@import url('https://cdn.jsdelivr.net/gh/fontiran/IRANSansX@v2.0/IRANSansX-font-face.css');

/* Fallback font stack for Persian */
.Mirage-persian-text {
  font-family: 'YekanBakh', Tahoma, Arial, sans-serif;
  direction: rtl;
  text-align: right;
}
```

### Persian Number System
```css
.Mirage-persian-numbers {
  font-feature-settings: "ss01" on; /* Persian numerals */
  direction: ltr; /* Numbers read left to right */
  text-align: right; /* But align right in RTL context */
  font-family: 'YekanBakh', sans-serif;
}

/* Convert to Persian numerals */
.persian-num::before {
  content: attr(data-num);
  font-family: 'YekanBakh';
}
```

### RTL-Specific Animations
```css
/* RTL slide animations */
@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slideInLeft {
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* RTL drawer animations */
.Mirage-drawer-rtl {
  right: 0;
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.Mirage-drawer-rtl.open {
  transform: translateX(0);
}
```

### Persian Cultural Elements
- **Color Psychology**: Preference for turquoise/teal accents (#14b8a6) alongside primary
- **Pattern Integration**: Subtle geometric patterns inspired by Persian art
- **Spacing**: Extra line-height (1.75) for Persian script readability
- **Icons**: RTL-flipped directional icons (arrows, chevrons)

### Dark Mode Support (Persian Optimized)
- Persian fonts maintain better readability in dark mode
- Adjusted contrast ratios for Persian script
- Cultural color preferences in dark theme
- Enhanced glow effects for Persian text

### Accessibility Standards (RTL)
- WCAG 2.1 AA compliance for RTL layouts
- Screen reader support for Persian content
- Keyboard navigation in RTL flow
- High contrast mode for Persian fonts
- Voice-over support for Persian interface elements

### Performance Considerations
- CSS custom properties for theme switching
- Minimal JavaScript for interactions
- Optimized for 60fps animations
- Progressive enhancement approach

---

**Implementation Note**: This Persian RTL design system prioritizes cultural authenticity through proper RTL layout flow, Persian typography optimization, and culturally-appropriate visual elements. Every component should feel natural for Persian users while maintaining the premium quality and engaging interactions that define the Mirage system. The design honors Persian design traditions while embracing modern digital aesthetics.
