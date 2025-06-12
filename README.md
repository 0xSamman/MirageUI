# 🚀 Mirage Design System - Admin Dashboard Template

A comprehensive Persian RTL admin dashboard template built with the **Mirage Design System 2025**. This template showcases all the components, controls, and design patterns of the Mirage system with a focus on Persian typography, RTL layout, and glass morphism aesthetics.

## ✨ Features

### 🎨 Design System Components
- **Navigation**: Top navigation with search and user menu + RTL sidebar navigation
- **Cards**: Glass morphism metric cards with hover animations
- **Forms**: Complete form components (inputs, selects, checkboxes, radio buttons, toggles, range sliders)
- **Tables**: Responsive tables with Persian content and action buttons
- **Charts**: Interactive charts with Persian labels and numbers
- **Buttons**: Primary, secondary, and ghost button variants with multiple sizes

### 🌍 Persian RTL Support
- **Typography**: YekanBakh as the primary font for all text with Vazirmatn Variable as fallback
- **Numbers**: Automatic Persian numeral conversion (۰۱۲۳۴۵۶۷۸۹)
- **Layout**: Right-to-left layout optimized for Persian content
- **Content**: Persian interface text and labels throughout

### 🎯 Interactive Features
- **Responsive Design**: Mobile-first approach with collapsible sidebar
- **Animations**: Smooth transitions and micro-interactions
- **Charts**: Real-time data visualization with Chart.js
- **Form Validation**: Interactive form states and validation
- **Persian Numbers**: Automatic conversion of English to Persian numerals

## 🏗️ Structure

```
Mirage-admin-dashboard/
├── index.html              # Main dashboard HTML
├── assets/
│   ├── css/
│   │   └── mirage-styles.css  # Complete Mirage Design System CSS
│   └── js/
│       └── mirage-script.js   # JavaScript interactions and charts
├── mirage.md               # Design system documentation
└── README.md               # This file
```

## 🚀 Quick Start

1. **Open the dashboard**: Simply open `index.html` in your browser
2. **Customize content**: Edit the Persian text and data in `index.html`
3. **Modify styles**: Adjust design tokens in the `:root` section of `assets/css/mirage-styles.css`
4. **Add functionality**: Extend `assets/js/mirage-script.js` for additional interactions

## 🎨 Component Showcase

### Dashboard Sections

1. **📊 Key Metrics Cards**
   - Revenue, Orders, Active Customers, Conversion Rate
   - Glass morphism design with gradient icons
   - Persian numbers and trend indicators

2. **📈 Analytics Charts**
   - Revenue trend line chart
   - Order distribution doughnut chart
   - Persian month labels and number formatting

3. **📝 Form Components Demo**
   - Text inputs with RTL support
   - Email and phone number fields
   - Select dropdowns with Persian options
   - Textarea with RTL text alignment
   - Checkboxes with Persian labels
   - Radio buttons for gender selection
   - Toggle switches (dark mode example)
   - Range sliders with Persian value display

4. **📋 Data Tables**
   - Recent orders table with Persian content
   - User avatars and status badges
   - Action buttons with hover effects
   - RTL table layout

## 🎯 Design Tokens

### Color Palette
```css
--Mirage-primary: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)
--Mirage-success: #10b981
--Mirage-warning: #f59e0b
--Mirage-error: #ef4444
--Mirage-info: #06b6d4
```

### Typography Scale
```css
--Mirage-text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)
--Mirage-text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem)
--Mirage-text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem)
--Mirage-text-lg: clamp(1.125rem, 1rem + 0.6vw, 1.375rem)
--Mirage-text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.875rem)
--Mirage-text-2xl: clamp(1.5rem, 1.2rem + 1.2vw, 2.25rem)
--Mirage-text-3xl: clamp(1.875rem, 1.5rem + 1.5vw, 3rem)
```

### Spacing System (Golden Ratio Based)
```css
--Mirage-space-1: 0.25rem    /* 4px */
--Mirage-space-2: 0.375rem   /* 6px */
--Mirage-space-3: 0.625rem   /* 10px */
--Mirage-space-4: 1rem       /* 16px */
--Mirage-space-5: 1.625rem   /* 26px */
--Mirage-space-6: 2.625rem   /* 42px */
--Mirage-space-7: 4.25rem    /* 68px */
--Mirage-space-8: 6.875rem   /* 110px */
```

## 🔧 Customization Guide

### Changing Colors
Edit the CSS custom properties in `:root`:
```css
:root {
  --Mirage-primary: your-primary-color;
  --Mirage-success: your-success-color;
  /* ... other colors */
}
```

### Adding New Components
Follow the BEM-like naming convention:
```css
.Mirage-component-name {
  /* Base styles */
}

.Mirage-component-name-variant {
  /* Variant styles */
}
```

### RTL Considerations
- Use `direction: rtl` for containers
- Position elements with `right` instead of `left`
- Use logical properties when possible: `margin-inline-start`, `padding-inline-end`

## 📱 Responsive Breakpoints

```css
/* Desktop First */
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 768px)  { /* Mobile Landscape */ }
@media (max-width: 480px)  { /* Mobile Portrait */ }
```

## 🌟 Best Practices

1. **Accessibility**: All components follow WCAG 2.1 AA guidelines
2. **Performance**: CSS custom properties for efficient theme switching
3. **Typography**: Proper Persian font stacks with fallbacks
4. **Animations**: 60fps animations with hardware acceleration
5. **RTL Support**: Comprehensive right-to-left layout optimization

## 🔮 Advanced Features

### Persian Number Conversion
```javascript
function convertToPersianNumbers(str) {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';
    return str.toString().replace(/[0-9]/g, function(match) {
        return persianDigits[englishDigits.indexOf(match)];
    });
}
```

### Glass Morphism Cards
```css
.Mirage-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}
```

## 🤝 Contributing

1. Follow the established naming conventions
2. Maintain RTL support in all new components
3. Test with Persian content
4. Ensure accessibility compliance
5. Document new components in this README

## 📄 License

This Mirage Design System template is provided as a demonstration of modern Persian RTL design patterns. Feel free to use and modify for your projects.

## 🔗 Resources

- **Persian Fonts**: [Vazirmatn](https://github.com/rastikerdar/vazirmatn) & [IRANSansX](https://github.com/fontiran/IRANSansX)
- **Icons**: [Feather Icons](https://feathericons.com/)
- **Charts**: [Chart.js](https://chartjs.org/)
- **RTL Guidelines**: [MDN RTL Guidelines](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Writing_Modes)

---

**Built with 💜 for the Persian development community**

*This template demonstrates the beauty of Persian typography and RTL design patterns in modern web applications.* 
