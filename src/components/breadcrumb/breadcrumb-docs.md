# کامپوننت مسیر صفحه (Breadcrumb) - سیستم طراحی میراژ

## معرفی

کامپوننت مسیر صفحه سیستم طراحی میراژ یک سیستم ناوبری جامع برای نمایش مسیر صفحه فعلی و کمک به کاربران در درک موقعیت خود در سلسله مراتب سایت است. این کامپوننت با پشتیبانی کامل از RTL و طراحی Glass Morphism بهینه شده است.

## ویژگی‌ها

- **پشتیبانی RTL**: بهینه‌سازی کامل برای چیدمان راست به چپ
- **Glass Morphism**: افکت شیشه‌ای با blur و شفافیت
- **جداکننده‌های مختلف**: پیکان، شورون، اسلش، نقطه، خط
- **انواع مختلف**: پیش‌فرض، حداقلی، حاشیه‌دار، پر شده
- **اندازه‌های مختلف**: کوچک، متوسط، بزرگ
- **طراحی ریسپانسیو**: قابلیت جمع شدن در موبایل
- **قابلیت‌های تعاملی**: کلیک، کیبورد، منوی کشویی
- **انیمیشن**: افزودن و حذف آیتم‌ها با انیمیشن
- **وضعیت‌های رنگی**: موفقیت، خطا، هشدار، اطلاعیه
- **پیام‌های فارسی**: تمام متن‌ها و برچسب‌ها به فارسی

## استفاده پایه

```html
<nav class="mir-breadcrumb" aria-label="مسیر صفحه">
    <ul class="mir-breadcrumb-list">
        <li class="mir-breadcrumb-item">
            <a href="/" class="mir-breadcrumb-link">
                <i class="mir-breadcrumb-icon" data-feather="home"></i>
                <span>خانه</span>
            </a>
            <span class="mir-breadcrumb-separator arrow"></span>
        </li>
        <li class="mir-breadcrumb-item">
            <a href="/products" class="mir-breadcrumb-link">
                <span>محصولات</span>
            </a>
            <span class="mir-breadcrumb-separator arrow"></span>
        </li>
        <li class="mir-breadcrumb-item">
            <span class="mir-breadcrumb-current">جزئیات محصول</span>
        </li>
    </ul>
</nav>
```

## انواع جداکننده

### پیکان (Arrow)
```html
<span class="mir-breadcrumb-separator arrow"></span>
```

### شورون (Chevron)
```html
<span class="mir-breadcrumb-separator chevron"></span>
```

### اسلش (Slash)
```html
<span class="mir-breadcrumb-separator slash"></span>
```

### نقطه (Dot)
```html
<span class="mir-breadcrumb-separator dot"></span>
```

### خط (Dash)
```html
<span class="mir-breadcrumb-separator dash"></span>
```

## انواع مختلف

### مسیر پیش‌فرض
```html
<nav class="mir-breadcrumb">
    <!-- محتوای مسیر -->
</nav>
```

### مسیر حداقلی
```html
<nav class="mir-breadcrumb mir-breadcrumb-minimal">
    <!-- محتوای مسیر -->
</nav>
```

### مسیر حاشیه‌دار
```html
<nav class="mir-breadcrumb mir-breadcrumb-outlined">
    <!-- محتوای مسیر -->
</nav>
```

### مسیر پر شده
```html
<nav class="mir-breadcrumb mir-breadcrumb-filled">
    <!-- محتوای مسیر -->
</nav>
```

## اندازه‌ها

### کوچک
```html
<nav class="mir-breadcrumb mir-breadcrumb-sm">
    <!-- محتوای مسیر -->
</nav>
```

### متوسط (پیش‌فرض)
```html
<nav class="mir-breadcrumb">
    <!-- محتوای مسیر -->
</nav>
```

### بزرگ
```html
<nav class="mir-breadcrumb mir-breadcrumb-lg">
    <!-- محتوای مسیر -->
</nav>
```

## مسیر با منوی کشویی

```html
<li class="mir-breadcrumb-item mir-breadcrumb-dropdown">
    <button class="mir-breadcrumb-dropdown-toggle">
        <span>دسته‌بندی</span>
        <i data-feather="chevron-down"></i>
    </button>
    <div class="mir-breadcrumb-dropdown-menu">
        <a href="/category/tech" class="mir-breadcrumb-dropdown-item">فناوری</a>
        <a href="/category/design" class="mir-breadcrumb-dropdown-item">طراحی</a>
        <a href="/category/business" class="mir-breadcrumb-dropdown-item">کسب و کار</a>
    </div>
</li>
```

## وضعیت‌های رنگی

### موفقیت
```html
<nav class="mir-breadcrumb mir-breadcrumb-success">
    <!-- محتوای مسیر -->
</nav>
```

### خطا
```html
<nav class="mir-breadcrumb mir-breadcrumb-error">
    <!-- محتوای مسیر -->
</nav>
```

### هشدار
```html
<nav class="mir-breadcrumb mir-breadcrumb-warning">
    <!-- محتوای مسیر -->
</nav>
```

### اطلاعیه
```html
<nav class="mir-breadcrumb mir-breadcrumb-info">
    <!-- محتوای مسیر -->
</nav>
```

## JavaScript API

### مقداردهی اولیه

```javascript
// مقداردهی خودکار
const breadcrumbs = MirageBreadcrumb.init();

// مقداردهی دستی
const myBreadcrumb = new MirageBreadcrumb('#myBreadcrumb', {
    separator: 'arrow',
    variant: 'outlined',
    size: 'md',
    maxItems: 5,
    showHome: true,
    onItemClick: function(item, index) {
        console.log('آیتم کلیک شد:', item, index);
    }
});
```

### تنظیمات

| تنظیم | نوع | پیش‌فرض | توضیح |
|-------|-----|---------|--------|
| `separator` | String | `'arrow'` | نوع جداکننده |
| `variant` | String | `'default'` | نوع مسیر |
| `size` | String | `'md'` | اندازه مسیر |
| `maxItems` | Number | `5` | حداکثر آیتم‌ها |
| `showHome` | Boolean | `true` | نمایش خانه |
| `homeIcon` | String | `'home'` | آیکون خانه |
| `homeText` | String | `'خانه'` | متن خانه |
| `showCurrent` | Boolean | `true` | نمایش صفحه فعلی |
| `collapsible` | Boolean | `true` | قابل جمع شدن |
| `responsive` | Boolean | `true` | ریسپانسیو |
| `animation` | Boolean | `true` | انیمیشن |
| `onClick` | Function | `null` | تابع کلیک |
| `onItemClick` | Function | `null` | تابع کلیک آیتم |

### متدها

#### `addItem(itemData)`
افزودن آیتم جدید

```javascript
breadcrumb.addItem({
    text: 'محصولات',
    href: '/products',
    icon: 'package',
    active: false
});
```

#### `removeItem(index)`
حذف آیتم

```javascript
breadcrumb.removeItem(1);
```

#### `updateItem(index, itemData)`
به‌روزرسانی آیتم

```javascript
breadcrumb.updateItem(0, {
    text: 'صفحه اصلی',
    href: '/',
    active: true
});
```

#### `setItems(items)`
تنظیم تمام آیتم‌ها

```javascript
breadcrumb.setItems([
    { text: 'خانه', href: '/', icon: 'home' },
    { text: 'محصولات', href: '/products' },
    { text: 'جزئیات', href: '#', active: true }
]);
```

#### `clear()`
پاک کردن تمام آیتم‌ها

```javascript
breadcrumb.clear();
```

#### `getItems()`
دریافت تمام آیتم‌ها

```javascript
const items = breadcrumb.getItems();
```

#### `getActiveItem()`
دریافت آیتم فعال

```javascript
const activeItem = breadcrumb.getActiveItem();
```

#### `getActiveIndex()`
دریافت شاخص آیتم فعال

```javascript
const activeIndex = breadcrumb.getActiveIndex();
```

#### `setActiveItem(index)`
تنظیم آیتم فعال

```javascript
breadcrumb.setActiveItem(2);
```

#### `updateOptions(options)`
به‌روزرسانی تنظیمات

```javascript
breadcrumb.updateOptions({
    separator: 'chevron',
    variant: 'filled'
});
```

### رویدادها

#### `onItemClick`
زمانی که آیتم کلیک می‌شود

```javascript
const breadcrumb = new MirageBreadcrumb('#myBreadcrumb', {
    onItemClick: function(item, index, event) {
        console.log(`آیتم ${index} کلیک شد:`, item);
        
        // برای جلوگیری از رفتن به لینک
        // event.preventDefault();
    }
});
```

#### `onClick`
رویداد کلیک عمومی

```javascript
const breadcrumb = new MirageBreadcrumb('#myBreadcrumb', {
    onClick: function(item, index, event) {
        console.log('مسیر کلیک شد:', item);
    }
});
```

### متدهای استاتیک

#### `MirageBreadcrumb.create(container, options)`
ایجاد مسیر جدید

```javascript
const breadcrumb = MirageBreadcrumb.create('#container', {
    separator: 'arrow',
    showHome: true
});
```

#### `MirageBreadcrumb.createFromPath(container, path, options)`
ایجاد مسیر از مسیر آرایه

```javascript
const path = [
    { text: 'محصولات', href: '/products' },
    { text: 'لپ‌تاپ', href: '/products/laptop' },
    { text: 'مک‌بوک', href: '/products/laptop/macbook' }
];

const breadcrumb = MirageBreadcrumb.createFromPath('#container', path, {
    showHome: true,
    homeText: 'فروشگاه'
});
```

## ناوبری کیبورد

- **فلش چپ/راست**: حرکت بین آیتم‌ها
- **Home**: رفتن به اولین آیتم
- **End**: رفتن به آخرین آیتم
- **Enter/Space**: فعال کردن آیتم
- **Tab**: حرکت به المان بعدی

## دسترسی (Accessibility)

- `aria-label` برای مسیر
- `role="navigation"` برای ناوبری
- `aria-current="page"` برای صفحه فعلی
- پشتیبانی کامل از کیبورد
- تضاد رنگی مناسب
- برچسب‌های مناسب

## تنظیمات RTL

- جهت مسیر از راست به چپ
- پیکان‌های RTL
- جداکننده‌های فارسی
- آیکون‌ها در سمت راست

## طراحی ریسپانسیو

در صفحات کوچک:
- آیتم‌های میانی پنهان می‌شوند
- نمایش "..." برای آیتم‌های پنهان
- امکان باز کردن آیتم‌های پنهان
- اندازه فونت کوچک‌تر

```css
@media (max-width: 768px) {
    .mir-breadcrumb-item:not(:last-child):not(:first-child) {
        display: none;
    }
    
    .mir-breadcrumb-collapse {
        display: flex;
    }
}
```

## مثال‌های پیشرفته

### مسیر با بارگیری دینامیک

```javascript
const breadcrumb = new MirageBreadcrumb('#dynamicBreadcrumb', {
    onItemClick: function(item, index) {
        // بارگیری دینامیک صفحه
        loadPage(item.href);
        
        // به‌روزرسانی مسیر
        breadcrumb.setActiveItem(index);
    }
});
```

### مسیر با اعتبارسنجی

```javascript
const breadcrumb = new MirageBreadcrumb('#validatedBreadcrumb', {
    onItemClick: function(item, index, event) {
        // اعتبارسنجی قبل از تغییر صفحه
        if (hasUnsavedChanges()) {
            event.preventDefault();
            
            if (confirm('تغییرات ذخیره نشده دارید. آیا مطمئن هستید؟')) {
                window.location.href = item.href;
            }
        }
    }
});
```

### مسیر با کش محلی

```javascript
const breadcrumb = new MirageBreadcrumb('#cachedBreadcrumb', {
    onItemClick: function(item, index) {
        // ذخیره در کش محلی
        localStorage.setItem('breadcrumb', JSON.stringify(breadcrumb.getItems()));
    }
});

// بازیابی از کش
document.addEventListener('DOMContentLoaded', function() {
    const cached = localStorage.getItem('breadcrumb');
    if (cached) {
        breadcrumb.setItems(JSON.parse(cached));
    }
});
```

## سفارشی‌سازی

### تغییر رنگ‌ها

```css
:root {
    --mir-breadcrumb-color: #your-color;
    --mir-breadcrumb-active-color: #your-active-color;
    --mir-breadcrumb-separator-color: #your-separator-color;
}
```

### تغییر جداکننده‌ها

```css
.mir-breadcrumb-separator.custom::before {
    content: "→";
    font-size: 14px;
    color: var(--mir-primary);
}
```

### تغییر انیمیشن

```css
.mir-breadcrumb-item {
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
}
```

## نکات کاربردی

1. **تعداد آیتم‌ها**: بیش از ۵ آیتم توصیه نمی‌شود
2. **متن کوتاه**: متن آیتم‌ها باید کوتاه و واضح باشد
3. **لینک‌ها**: همیشه لینک معتبر ارائه دهید
4. **صفحه فعلی**: آخرین آیتم معمولاً لینک ندارد
5. **موبایل**: از قابلیت جمع شدن استفاده کنید

## پشتیبانی مرورگر

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Internet Explorer 11+ (با polyfill)

## مثال کامل

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>مسیر صفحه</title>
    <link rel="stylesheet" href="breadcrumb.css">
</head>
<body>
    <nav class="mir-breadcrumb mir-breadcrumb-outlined" id="myBreadcrumb">
        <ul class="mir-breadcrumb-list">
            <li class="mir-breadcrumb-item">
                <a href="/" class="mir-breadcrumb-link">
                    <i class="mir-breadcrumb-icon" data-feather="home"></i>
                    <span>خانه</span>
                </a>
                <span class="mir-breadcrumb-separator arrow"></span>
            </li>
            <li class="mir-breadcrumb-item">
                <a href="/products" class="mir-breadcrumb-link">
                    <i class="mir-breadcrumb-icon" data-feather="package"></i>
                    <span>محصولات</span>
                </a>
                <span class="mir-breadcrumb-separator arrow"></span>
            </li>
            <li class="mir-breadcrumb-item">
                <a href="/products/laptop" class="mir-breadcrumb-link">
                    <span>لپ‌تاپ</span>
                </a>
                <span class="mir-breadcrumb-separator arrow"></span>
            </li>
            <li class="mir-breadcrumb-item">
                <span class="mir-breadcrumb-current">مک‌بوک پرو</span>
            </li>
        </ul>
    </nav>

    <script src="breadcrumb.js"></script>
    <script>
        // مقداردهی اولیه
        const breadcrumb = new MirageBreadcrumb('#myBreadcrumb', {
            onItemClick: function(item, index) {
                console.log('آیتم کلیک شد:', item);
            }
        });
        
        // افزودن آیتم جدید
        breadcrumb.addItem({
            text: 'مشخصات فنی',
            href: '/products/laptop/macbook/specs',
            active: true
        });
    </script>
</body>
</html>
```

---

## مجوز

این کامپوننت بخشی از سیستم طراحی میراژ است و تحت مجوز MIT منتشر شده است.