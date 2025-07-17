# سیستم کارت میراژ
## مستندات فارسی سیستم کارت‌های RTL

### نسخه: 1.0.0
### آخرین به‌روزرسانی: 2025-07-17

---

## 📋 معرفی

سیستم کارت میراژ مجموعه‌ای کامل از کارت‌های UI برای نمایش محتوا در رابط‌های کاربری فارسی است. این سیستم بر اساس اصول طراحی Glass Morphism و با بهینه‌سازی کامل برای راست‌چین (RTL) طراحی شده است.

## 🎯 ویژگی‌های اصلی

- **پشتیبانی کامل RTL**: تمام کارت‌ها برای متون فارسی بهینه‌سازی شده‌اند
- **Glass Morphism**: جلوه‌های شیشه‌ای مدرن با backdrop blur
- **انواع مختلف کارت**: آماری، کاربری، محصول، تصویری، آیکون
- **اندازه‌های مختلف**: کوچک، متوسط، بزرگ
- **وضعیت‌های مختلف**: موفقیت، خطا، هشدار، اطلاعیه
- **انیمیشن‌های روان**: ورود و خروج با انیمیشن‌های زیبا
- **رسپانسیو**: سازگار با تمام اندازه‌های صفحه

## 🛠 نصب و راه‌اندازی

### 1. اضافه کردن فایل‌ها

```html
<!-- CSS -->
<link rel="stylesheet" href="src/components/card/card.css">

<!-- JavaScript -->
<script src="src/components/card/card.js"></script>
```

### 2. وابستگی‌ها

```html
<!-- Feather Icons (برای آیکون‌ها) -->
<script src="https://unpkg.com/feather-icons"></script>

<!-- سیستم طراحی اصلی میراژ -->
<link rel="stylesheet" href="src/assets/css/mirage-styles.css">
```

## 📖 نحوه استفاده

### کارت ساده

```html
<div class="mir-card">
    <div class="mir-card-header">
        <h3 class="mir-card-title">عنوان کارت</h3>
        <p class="mir-card-subtitle">توضیحات کوتاه</p>
    </div>
    <div class="mir-card-body">
        محتوای کارت در اینجا قرار می‌گیرد.
    </div>
</div>
```

### کارت با JavaScript

```javascript
// کارت ساده
const card = new MirageCard({
    title: 'عنوان کارت',
    subtitle: 'توضیحات کوتاه',
    content: 'محتوای کارت در اینجا قرار می‌گیرد.'
});

// اضافه کردن به DOM
document.getElementById('container').appendChild(card.getElement());
```

## 🎨 انواع کارت‌ها

### 1. کارت آماری (Stat Card)

```javascript
const statCard = MirageCard.createStatCard(
    'کل فروش',           // عنوان
    '۱۲۵,۰۰۰',         // مقدار
    15,                 // درصد تغییر
    'dollar-sign',      // آیکون
    'success'           // وضعیت
);
```

### 2. کارت کاربری (User Card)

```javascript
const userCard = MirageCard.createUserCard(
    'علی احمدی',        // نام
    'مدیر سیستم',       // نقش
    'avatar.jpg',       // تصویر
    [                   // آمار
        { value: '۱۲۳', label: 'پست' },
        { value: '۴۵۶', label: 'دنبال‌کننده' }
    ]
);
```

### 3. کارت محصول (Product Card)

```javascript
const productCard = MirageCard.createProductCard(
    'نام محصول',         // عنوان
    '۵۰,۰۰۰',          // قیمت
    'توضیحات محصول',     // توضیحات
    'product.jpg',      // تصویر
    'جدید',             // برچسب
    [                   // عملیات
        { id: 'buy', text: 'خرید', onClick: handleBuy },
        { id: 'view', text: 'مشاهده', onClick: handleView }
    ]
);
```

### 4. کارت تصویری (Image Card)

```javascript
const imageCard = new MirageCard({
    type: 'image',
    image: 'image.jpg',
    title: 'عنوان تصویر',
    content: 'توضیحات تصویر',
    actions: [
        { text: 'مشاهده', onClick: handleView }
    ]
});
```

### 5. کارت آیکون (Icon Card)

```javascript
const iconCard = new MirageCard({
    type: 'icon',
    icon: 'star',
    title: 'ویژگی ویژه',
    content: 'توضیحات این ویژگی',
    status: 'success'
});
```

## 📏 اندازه‌های مختلف

### کوچک (Small)
```javascript
const smallCard = new MirageCard({
    size: 'sm',
    title: 'کارت کوچک',
    content: 'محتوای کوتاه'
});
```

### متوسط (Medium) - پیش‌فرض
```javascript
const mediumCard = new MirageCard({
    size: 'md', // یا حذف این خط
    title: 'کارت متوسط',
    content: 'محتوای متوسط'
});
```

### بزرگ (Large)
```javascript
const largeCard = new MirageCard({
    size: 'lg',
    title: 'کارت بزرگ',
    content: 'محتوای بیشتر'
});
```

## 🎭 حالت‌های مختلف

### پیش‌فرض (Default)
```javascript
const defaultCard = new MirageCard({
    variant: 'default',
    title: 'کارت معمولی'
});
```

### برجسته (Elevated)
```javascript
const elevatedCard = new MirageCard({
    variant: 'elevated',
    title: 'کارت برجسته'
});
```

### حاشیه‌دار (Outlined)
```javascript
const outlinedCard = new MirageCard({
    variant: 'outlined',
    title: 'کارت حاشیه‌دار'
});
```

### پرشده (Filled)
```javascript
const filledCard = new MirageCard({
    variant: 'filled',
    title: 'کارت پرشده'
});
```

## 🎨 وضعیت‌های رنگی

### موفقیت (Success)
```javascript
const successCard = new MirageCard({
    status: 'success',
    title: 'عملیات موفق',
    content: 'کارت با حالت موفقیت'
});
```

### خطا (Error)
```javascript
const errorCard = new MirageCard({
    status: 'error',
    title: 'خطا رخ داده',
    content: 'کارت با حالت خطا'
});
```

### هشدار (Warning)
```javascript
const warningCard = new MirageCard({
    status: 'warning',
    title: 'توجه',
    content: 'کارت با حالت هشدار'
});
```

### اطلاعیه (Info)
```javascript
const infoCard = new MirageCard({
    status: 'info',
    title: 'اطلاعیه',
    content: 'کارت با حالت اطلاعیه'
});
```

## 🎬 رویدادها و تعامل

### کلیک روی کارت
```javascript
const card = new MirageCard({
    title: 'کارت قابل کلیک',
    onClick: (event, cardInstance) => {
        console.log('کارت کلیک شد!');
    }
});
```

### قرار گرفتن ماوس
```javascript
const card = new MirageCard({
    title: 'کارت با رویداد hover',
    onHover: (event, cardInstance, type) => {
        if (type === 'enter') {
            console.log('ماوس وارد کارت شد');
        } else if (type === 'leave') {
            console.log('ماوس از کارت خارج شد');
        }
    }
});
```

### دکمه‌های عمل
```javascript
const card = new MirageCard({
    title: 'کارت با دکمه‌ها',
    actions: [
        {
            id: 'edit',
            text: 'ویرایش',
            onClick: (event, cardInstance) => {
                console.log('دکمه ویرایش کلیک شد');
            }
        },
        {
            id: 'delete',
            text: 'حذف',
            onClick: (event, cardInstance) => {
                console.log('دکمه حذف کلیک شد');
            }
        }
    ]
});
```

## 🔄 به‌روزرسانی و کنترل

### به‌روزرسانی محتوا
```javascript
const card = new MirageCard({
    title: 'کارت اولیه',
    content: 'محتوای اولیه'
});

// به‌روزرسانی
card.update({
    title: 'کارت به‌روزرسانی شده',
    content: 'محتوای جدید',
    status: 'success'
});
```

### حذف کارت
```javascript
// حذف با انیمیشن
card.remove();
```

## 🎨 سفارشی‌سازی CSS

### تغییر رنگ‌ها
```css
.mir-card {
    --card-bg: rgba(255, 255, 255, 0.8);
    --card-border: rgba(255, 255, 255, 0.2);
    --card-shadow: rgba(0, 0, 0, 0.1);
}
```

### تغییر انیمیشن‌ها
```css
.mir-card {
    transition: all 0.3s ease;
}

.mir-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.18);
}
```

## 📱 رسپانسیو

```css
/* تبلت */
@media (max-width: 768px) {
    .mir-card {
        padding: var(--mir-space-4);
    }
}

/* موبایل */
@media (max-width: 480px) {
    .mir-card-header {
        flex-direction: column;
    }
}
```

## 🌙 حالت تاریک

```css
@media (prefers-color-scheme: dark) {
    .mir-card {
        background: rgba(31, 41, 55, 0.8);
        border-color: rgba(255, 255, 255, 0.1);
    }
}
```

## 🧪 نمونه‌های کاربردی

### کارت آمار فروش
```javascript
const salesCard = MirageCard.createStatCard(
    'فروش امروز',
    '۱۲۵,۰۰۰',
    12.5,
    'trending-up',
    'success'
);
```

### کارت پروفایل کاربر
```javascript
const profileCard = MirageCard.createUserCard(
    'سارا کریمی',
    'طراح رابط کاربری',
    'https://example.com/avatar.jpg',
    [
        { value: '۴۲', label: 'پروژه' },
        { value: '۹۸', label: 'امتیاز' }
    ]
);
```

### کارت محصول فروشگاه
```javascript
const shopCard = MirageCard.createProductCard(
    'کیف چرمی مردانه',
    '۲۵۰,۰۰۰',
    'کیف چرمی با کیفیت بالا و طراحی مدرن',
    'https://example.com/product.jpg',
    'محبوب',
    [
        { id: 'cart', text: 'افزودن به سبد', onClick: addToCart },
        { id: 'wishlist', text: 'علاقه‌مندی', onClick: addToWishlist }
    ]
);
```

## 🐛 رفع مشکلات

### کارت نمایش داده نمی‌شود
- مطمئن شوید فایل CSS لود شده باشد
- بررسی کنید که عنصر والد مناسب باشد
- کنسول مرورگر را بررسی کنید

### آیکون‌ها نمایش داده نمی‌شوند
- مطمئن شوید Feather Icons لود شده باشد
- `feather.replace()` را بعد از اضافه کردن کارت صدا بزنید

### مشکل RTL
- مطمئن شوید `dir="rtl"` روی عنصر والد تنظیم شده باشد
- بررسی کنید که فونت فارسی لود شده باشد

## 🔗 API کامل

### کلاس MirageCard

#### constructor(options)
- `type`: نوع کارت (default, stat, user, product, image, icon)
- `size`: اندازه کارت (sm, md, lg)
- `variant`: حالت کارت (default, elevated, outlined, filled)
- `status`: وضعیت رنگی (success, error, warning, info)
- `title`: عنوان کارت
- `subtitle`: زیرعنوان کارت
- `content`: محتوای کارت
- `actions`: آرایه دکمه‌های عمل
- `onClick`: رویداد کلیک
- `onHover`: رویداد قرار گرفتن ماوس

#### متدهای عمومی
- `createElement()`: ایجاد عنصر DOM
- `update(options)`: به‌روزرسانی کارت
- `remove()`: حذف کارت
- `getElement()`: دریافت عنصر DOM

#### متدهای استاتیک
- `MirageCard.create(options)`: ایجاد کارت جدید
- `MirageCard.createStatCard(title, value, change, icon, status)`: ایجاد کارت آماری
- `MirageCard.createUserCard(name, role, avatar, stats)`: ایجاد کارت کاربری
- `MirageCard.createProductCard(title, price, description, image, badge, actions)`: ایجاد کارت محصول

---

## 📚 مثال‌های بیشتر

برای مشاهده مثال‌های کاربردی بیشتر، فایل `card-demo.html` را مطالعه کنید.

## 🤝 مشارکت

این مستندات بخشی از سیستم طراحی میراژ است. برای گزارش باگ یا پیشنهادات، با تیم توسعه تماس بگیرید.