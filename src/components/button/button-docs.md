# Mirage Button Component System
## سیستم کامپوننت دکمه میراژ

A comprehensive button system designed for Persian RTL interfaces with modern glass morphism aesthetics and YekanBakh typography.

## ✨ Features

- **Persian RTL Optimization**: Complete right-to-left layout support
- **YekanBakh Typography**: Optimized Persian font rendering
- **Glass Morphism**: Modern backdrop blur effects
- **Ripple Animations**: Material Design inspired interactions
- **Loading States**: Built-in loading animations
- **Accessibility**: WCAG compliant with keyboard navigation
- **Responsive**: Mobile-first design with touch-friendly targets
- **7 Variants**: Primary, Secondary, Ghost, Outline, Success, Warning, Danger
- **5 Sizes**: XS, SM, MD, LG, XL
- **Multiple Shapes**: Default, Pill, Square, Full-width, FAB

## 🎯 Installation

```html
<!-- Include CSS -->
<link rel="stylesheet" href="components/button.css">

<!-- Include JavaScript -->
<script src="components/button.js"></script>

<!-- Include Icons (optional) -->
<script src="https://unpkg.com/feather-icons"></script>
```

## 📖 Basic Usage

### Simple Button
```html
<button class="mir-btn mir-btn-primary">دکمه اصلی</button>
```

### Button with Icon
```html
<button class="mir-btn mir-btn-secondary">
  <i data-feather="star" class="mir-btn-icon"></i>
  با آیکون
</button>
```

### Icon Only Button
```html
<button class="mir-btn mir-btn-primary mir-btn-square">
  <i data-feather="plus" class="mir-btn-icon"></i>
</button>
```

## 🎨 Button Variants

### Primary Button
```html
<button class="mir-btn mir-btn-primary">دکمه اصلی</button>
```
- **Use case**: Main actions, call-to-action buttons
- **Style**: Gradient background with white text

### Secondary Button
```html
<button class="mir-btn mir-btn-secondary">دکمه ثانویه</button>
```
- **Use case**: Secondary actions, supporting buttons
- **Style**: Glass morphism with subtle border

### Ghost Button
```html
<button class="mir-btn mir-btn-ghost">دکمه شفاف</button>
```
- **Use case**: Subtle actions, navigation items
- **Style**: Transparent background with colored text

### Outline Button
```html
<button class="mir-btn mir-btn-outline">دکمه خطی</button>
```
- **Use case**: Clear boundaries, form actions
- **Style**: Transparent background with colored border

### Semantic Variants
```html
<!-- Success -->
<button class="mir-btn mir-btn-success">تایید</button>

<!-- Warning -->
<button class="mir-btn mir-btn-warning">هشدار</button>

<!-- Danger -->
<button class="mir-btn mir-btn-danger">حذف</button>
```

## 📏 Button Sizes

```html
<button class="mir-btn mir-btn-primary mir-btn-xs">کوچک</button>
<button class="mir-btn mir-btn-primary mir-btn-sm">کم‌حجم</button>
<button class="mir-btn mir-btn-primary mir-btn-md">متوسط</button> <!-- Default -->
<button class="mir-btn mir-btn-primary mir-btn-lg">بزرگ</button>
<button class="mir-btn mir-btn-primary mir-btn-xl">خیلی بزرگ</button>
```

| Size | Class | Min Height | Padding | Use Case |
|------|-------|------------|---------|----------|
| XS | `mir-btn-xs` | 32px | 8px 12px | Compact spaces |
| SM | `mir-btn-sm` | 36px | 8px 16px | Dense layouts |
| MD | `mir-btn-md` | 44px | 12px 20px | Default size |
| LG | `mir-btn-lg` | 52px | 16px 24px | Prominent actions |
| XL | `mir-btn-xl` | 60px | 20px 28px | Hero sections |

## 🔷 Button Shapes

### Pill Button
```html
<button class="mir-btn mir-btn-primary mir-btn-pill">دایره‌ای</button>
```

### Square Button (Icon Only)
```html
<button class="mir-btn mir-btn-primary mir-btn-square">
  <i data-feather="settings" class="mir-btn-icon"></i>
</button>
```

### Full Width Button
```html
<button class="mir-btn mir-btn-primary mir-btn-full">تمام عرض</button>
```

### Floating Action Button
```html
<button class="mir-btn mir-btn-primary mir-btn-fab">
  <i data-feather="plus" class="mir-btn-icon"></i>
</button>
```

## 👥 Button Groups

### Horizontal Group
```html
<div class="mir-btn-group">
  <button class="mir-btn mir-btn-secondary">راست</button>
  <button class="mir-btn mir-btn-secondary">وسط</button>
  <button class="mir-btn mir-btn-secondary">چپ</button>
</div>
```

### Vertical Group
```html
<div class="mir-btn-group mir-btn-group-vertical">
  <button class="mir-btn mir-btn-outline">بالا</button>
  <button class="mir-btn mir-btn-outline">وسط</button>
  <button class="mir-btn mir-btn-outline">پایین</button>
</div>
```

## ⚡ Interactive States

### Loading State
```javascript
// Set loading state
document.querySelector('#myButton').setLoading(true);

// Remove loading state
document.querySelector('#myButton').setLoading(false);
```

### Disabled State
```html
<button class="mir-btn mir-btn-primary" disabled>غیرفعال</button>
```

## 🎭 Advanced Features

### Ripple Effect
Ripple effects are automatically added to all buttons. To disable:
```html
<button class="mir-btn mir-btn-primary mir-btn-no-ripple">بدون ریپل</button>
```

### Custom Ripple Color
```css
.my-custom-button::before {
  background-color: rgba(255, 0, 0, 0.3); /* Custom ripple color */
}
```

## 📱 Responsive Behavior

Buttons automatically adapt to mobile devices:
- Larger touch targets (48px minimum)
- Button groups stack vertically with `mir-btn-group-mobile-stack`
- Improved spacing for touch interaction

```html
<div class="mir-btn-group mir-btn-group-mobile-stack">
  <button class="mir-btn mir-btn-primary">دکمه ۱</button>
  <button class="mir-btn mir-btn-primary">دکمه ۲</button>
</div>
```

## ♿ Accessibility

### Keyboard Navigation
- `Enter` and `Space` keys trigger button actions
- `Arrow keys` navigate between buttons in groups
- Focus indicators with `outline`

### Screen Readers
```html
<button class="mir-btn mir-btn-primary" aria-label="ذخیره تغییرات">
  <i data-feather="save" class="mir-btn-icon" aria-hidden="true"></i>
  ذخیره
</button>
```

### High Contrast Support
Automatic border enhancement in high contrast mode.

## 🌙 Dark Mode Support

Buttons automatically adapt to dark mode preferences:
```css
@media (prefers-color-scheme: dark) {
  .mir-btn-secondary {
    background: rgba(31, 41, 55, 0.9);
    color: var(--mir-gray-100);
  }
}
```

## 🎨 Customization

### CSS Custom Properties
```css
:root {
  --mir-primary: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  --mir-primary-solid: #6366f1;
  --mir-success: #10b981;
  --mir-warning: #f59e0b;
  --mir-error: #ef4444;
}
```

### Creating Custom Variants
```css
.mir-btn-custom {
  background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
  color: white;
}

.mir-btn-custom:hover {
  background: linear-gradient(135deg, #ff5252 0%, #ffb300 100%);
}
```

## 🔧 JavaScript API

### Methods
```javascript
// Initialize button system
const mirageButtons = new MirageButton();

// Set loading state
button.setLoading(true);
button.setLoading(false);

// Refresh button instances
mirageButtons.refresh();

// Create button programmatically
const newButton = MirageButtonUtils.create({
  variant: 'primary',
  size: 'lg',
  text: 'دکمه جدید',
  icon: 'star',
  onClick: () => console.log('کلیک شد!')
});
```

### Events
```javascript
// Listen for button clicks
window.addEventListener('mirageButtonClick', (e) => {
  console.log('Button clicked:', e.detail);
});
```

## 📋 Best Practices

### Do's ✅
- Use Primary buttons for main actions
- Provide adequate spacing between buttons
- Use loading states for async operations
- Include icons for better recognition
- Test with Persian screen readers

### Don'ts ❌
- Don't use too many Primary buttons on one page
- Avoid tiny buttons on mobile devices
- Don't disable buttons without explanation
- Avoid long text in small buttons

## 🌍 RTL Considerations

- Icon positioning is automatically adjusted for RTL
- Button groups flow right-to-left
- Ripple effects originate from correct position
- Margin and padding follow RTL conventions
- FAB positioning uses `left` property in RTL

## 🚀 Performance

- Lightweight: ~15KB CSS + 8KB JS (uncompressed)
- GPU-accelerated animations
- No external dependencies (except Feather icons for demos)
- Lazy initialization of interactive features

## 🔍 Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+
- iOS Safari 14+
- Android Chrome 88+

## 📈 Changelog

### v1.0.0
- Initial release
- Complete button variant system
- Persian RTL optimization
- YekanBakh typography integration
- Accessibility features
- Mobile responsiveness

---

**Made with ❤️ for Persian developers**
*میراژ - سیستم طراحی مدرن فارسی* 