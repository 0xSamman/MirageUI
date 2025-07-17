# کامپوننت منوی کشویی (Dropdown) - سیستم طراحی میراژ

## معرفی

کامپوننت منوی کشویی سیستم طراحی میراژ یک سیستم منوی تعاملی و جامع برای نمایش گزینه‌های مختلف در قالب یک منوی بازشو است. این کامپوننت با پشتیبانی کامل از RTL، طراحی Glass Morphism و تعامل کیبورد بهینه شده است.

## ویژگی‌ها

- **پشتیبانی RTL**: بهینه‌سازی کامل برای چیدمان راست به چپ
- **Glass Morphism**: افکت شیشه‌ای با blur و شفافیت
- **انواع مختلف**: پیش‌فرض، رنگی، مینیمال، پر شده
- **اندازه‌های مختلف**: کوچک، متوسط، بزرگ
- **موقعیت‌یابی هوشمند**: تشخیص خودکار موقعیت بهینه
- **جستجو**: قابلیت جستجو در آیتم‌های منو
- **ناوبری کیبورد**: پشتیبانی کامل از کیبورد
- **طراحی ریسپانسیو**: نمایش مناسب در موبایل
- **انیمیشن**: انتقال‌های نرم و طبیعی
- **وضعیت‌های مختلف**: فعال، غیرفعال، بارگیری
- **پیام‌های فارسی**: تمام متن‌ها و برچسب‌ها به فارسی

## استفاده پایه

```html
<div class="mir-dropdown">
    <button class="mir-dropdown-toggle">
        <span>انتخاب کنید</span>
        <i class="mir-dropdown-toggle-icon" data-feather="chevron-down"></i>
    </button>
    <div class="mir-dropdown-menu">
        <button class="mir-dropdown-item">
            <i class="mir-dropdown-item-icon" data-feather="user"></i>
            <span>پروفایل</span>
        </button>
        <button class="mir-dropdown-item">
            <i class="mir-dropdown-item-icon" data-feather="settings"></i>
            <span>تنظیمات</span>
        </button>
        <div class="mir-dropdown-divider"></div>
        <button class="mir-dropdown-item">
            <i class="mir-dropdown-item-icon" data-feather="log-out"></i>
            <span>خروج</span>
        </button>
    </div>
</div>
```

## انواع مختلف

### منوی پیش‌فرض
```html
<div class="mir-dropdown">
    <button class="mir-dropdown-toggle">
        <span>انتخاب کنید</span>
        <i class="mir-dropdown-toggle-icon" data-feather="chevron-down"></i>
    </button>
    <div class="mir-dropdown-menu">
        <!-- آیتم‌های منو -->
    </div>
</div>
```

### منوی رنگی (Primary)
```html
<div class="mir-dropdown mir-dropdown-primary">
    <button class="mir-dropdown-toggle">
        <span>انتخاب کنید</span>
        <i class="mir-dropdown-toggle-icon" data-feather="chevron-down"></i>
    </button>
    <div class="mir-dropdown-menu">
        <!-- آیتم‌های منو -->
    </div>
</div>
```

### منوی ثانویه
```html
<div class="mir-dropdown mir-dropdown-secondary">
    <button class="mir-dropdown-toggle">
        <span>انتخاب کنید</span>
        <i class="mir-dropdown-toggle-icon" data-feather="chevron-down"></i>
    </button>
    <div class="mir-dropdown-menu">
        <!-- آیتم‌های منو -->
    </div>
</div>
```

### منوی موفقیت
```html
<div class="mir-dropdown mir-dropdown-success">
    <button class="mir-dropdown-toggle">
        <span>انتخاب کنید</span>
        <i class="mir-dropdown-toggle-icon" data-feather="chevron-down"></i>
    </button>
    <div class="mir-dropdown-menu">
        <!-- آیتم‌های منو -->
    </div>
</div>
```

### منوی هشدار
```html
<div class="mir-dropdown mir-dropdown-warning">
    <button class="mir-dropdown-toggle">
        <span>انتخاب کنید</span>
        <i class="mir-dropdown-toggle-icon" data-feather="chevron-down"></i>
    </button>
    <div class="mir-dropdown-menu">
        <!-- آیتم‌های منو -->
    </div>
</div>
```

### منوی خطا
```html
<div class="mir-dropdown mir-dropdown-error">
    <button class="mir-dropdown-toggle">
        <span>انتخاب کنید</span>
        <i class="mir-dropdown-toggle-icon" data-feather="chevron-down"></i>
    </button>
    <div class="mir-dropdown-menu">
        <!-- آیتم‌های منو -->
    </div>
</div>
```

### منوی مینیمال
```html
<div class="mir-dropdown mir-dropdown-ghost">
    <button class="mir-dropdown-toggle">
        <span>انتخاب کنید</span>
        <i class="mir-dropdown-toggle-icon" data-feather="chevron-down"></i>
    </button>
    <div class="mir-dropdown-menu">
        <!-- آیتم‌های منو -->
    </div>
</div>
```

## اندازه‌ها

### کوچک
```html
<div class="mir-dropdown mir-dropdown-sm">
    <button class="mir-dropdown-toggle">
        <span>انتخاب</span>
        <i class="mir-dropdown-toggle-icon" data-feather="chevron-down"></i>
    </button>
    <div class="mir-dropdown-menu">
        <!-- آیتم‌های منو -->
    </div>
</div>
```

### متوسط (پیش‌فرض)
```html
<div class="mir-dropdown">
    <button class="mir-dropdown-toggle">
        <span>انتخاب کنید</span>
        <i class="mir-dropdown-toggle-icon" data-feather="chevron-down"></i>
    </button>
    <div class="mir-dropdown-menu">
        <!-- آیتم‌های منو -->
    </div>
</div>
```

### بزرگ
```html
<div class="mir-dropdown mir-dropdown-lg">
    <button class="mir-dropdown-toggle">
        <span>انتخاب کنید</span>
        <i class="mir-dropdown-toggle-icon" data-feather="chevron-down"></i>
    </button>
    <div class="mir-dropdown-menu">
        <!-- آیتم‌های منو -->
    </div>
</div>
```

## موقعیت‌یابی منو

### بالا - راست
```html
<div class="mir-dropdown-menu top">
    <!-- آیتم‌های منو -->
</div>
```

### پایین - چپ
```html
<div class="mir-dropdown-menu left">
    <!-- آیتم‌های منو -->
</div>
```

### وسط
```html
<div class="mir-dropdown-menu center">
    <!-- آیتم‌های منو -->
</div>
```

## منو با جستجو

```html
<div class="mir-dropdown">
    <button class="mir-dropdown-toggle">
        <span>انتخاب کنید</span>
        <i class="mir-dropdown-toggle-icon" data-feather="chevron-down"></i>
    </button>
    <div class="mir-dropdown-menu">
        <div class="mir-dropdown-search">
            <input type="text" class="mir-dropdown-search-input" placeholder="جستجو..." dir="rtl">
        </div>
        <button class="mir-dropdown-item">
            <span>گزینه اول</span>
        </button>
        <button class="mir-dropdown-item">
            <span>گزینه دوم</span>
        </button>
        <button class="mir-dropdown-item">
            <span>گزینه سوم</span>
        </button>
    </div>
</div>
```

## آیتم‌های منو

### آیتم ساده
```html
<button class="mir-dropdown-item">
    <span>گزینه</span>
</button>
```

### آیتم با آیکون
```html
<button class="mir-dropdown-item">
    <i class="mir-dropdown-item-icon" data-feather="user"></i>
    <span>پروفایل</span>
</button>
```

### آیتم با نشان
```html
<button class="mir-dropdown-item">
    <i class="mir-dropdown-item-icon" data-feather="message-circle"></i>
    <span>پیام‌ها</span>
    <span class="mir-dropdown-item-badge">۵</span>
</button>
```

### آیتم فعال
```html
<button class="mir-dropdown-item active">
    <i class="mir-dropdown-item-icon" data-feather="home"></i>
    <span>خانه</span>
</button>
```

### آیتم غیرفعال
```html
<button class="mir-dropdown-item disabled">
    <i class="mir-dropdown-item-icon" data-feather="lock"></i>
    <span>محدود</span>
</button>
```

## عناصر اضافی

### جداکننده
```html
<div class="mir-dropdown-divider"></div>
```

### سربرگ
```html
<div class="mir-dropdown-header">دسته‌بندی</div>
```

### پاورقی
```html
<div class="mir-dropdown-footer">
    <small>مشاهده بیشتر</small>
</div>
```

### بارگیری
```html
<div class="mir-dropdown-loading">
    <div class="mir-dropdown-loading-spinner"></div>
    <span>در حال بارگیری...</span>
</div>
```

### حالت خالی
```html
<div class="mir-dropdown-empty">
    <span>موردی یافت نشد</span>
</div>
```

## JavaScript API

### مقداردهی اولیه

```javascript
// مقداردهی خودکار
const dropdowns = MirageDropdown.init();

// مقداردهی دستی
const myDropdown = new MirageDropdown('#myDropdown', {
    position: 'bottom-right',
    trigger: 'click',
    closeOnClick: true,
    closeOnEscape: true,
    closeOnOutsideClick: true,
    animation: 'default',
    keyboard: true,
    searchable: false,
    onOpen: function() {
        console.log('منو باز شد');
    },
    onClose: function() {
        console.log('منو بسته شد');
    },
    onSelect: function(data) {
        console.log('آیتم انتخاب شد:', data);
    }
});
```

### تنظیمات

| تنظیم | نوع | پیش‌فرض | توضیح |
|-------|-----|---------|-------|
| `position` | String | `'bottom-right'` | موقعیت منو |
| `trigger` | String | `'click'` | نحوه باز شدن منو |
| `closeOnClick` | Boolean | `true` | بستن پس از کلیک |
| `closeOnEscape` | Boolean | `true` | بستن با کلید Escape |
| `closeOnOutsideClick` | Boolean | `true` | بستن با کلیک خارج |
| `animation` | String | `'default'` | نوع انیمیشن |
| `offset` | Number | `4` | فاصله از toggle |
| `autoPosition` | Boolean | `true` | موقعیت‌یابی خودکار |
| `keyboard` | Boolean | `true` | ناوبری کیبورد |
| `searchable` | Boolean | `false` | قابلیت جستجو |
| `maxHeight` | Number | `300` | حداکثر ارتفاع منو |

### متدها

#### `open()`
باز کردن منو

```javascript
dropdown.open();
```

#### `close()`
بستن منو

```javascript
dropdown.close();
```

#### `toggle()`
تغییر وضعیت منو

```javascript
dropdown.toggle();
```

#### `addItem(itemData)`
افزودن آیتم جدید

```javascript
dropdown.addItem({
    text: 'گزینه جدید',
    icon: 'plus',
    value: 'new-option',
    badge: 'جدید',
    disabled: false
});
```

#### `removeItem(index)`
حذف آیتم

```javascript
dropdown.removeItem(0);
```

#### `setItems(items)`
تنظیم تمام آیتم‌ها

```javascript
dropdown.setItems([
    { text: 'گزینه اول', value: 'option1' },
    { text: 'گزینه دوم', value: 'option2', icon: 'star' },
    { text: 'گزینه سوم', value: 'option3', disabled: true }
]);
```

#### `getActiveItem()`
دریافت آیتم فعال

```javascript
const activeItem = dropdown.getActiveItem();
```

#### `setActiveItem(index)`
تنظیم آیتم فعال

```javascript
dropdown.setActiveItem(1);
```

#### `enable()`
فعال کردن منو

```javascript
dropdown.enable();
```

#### `disable()`
غیرفعال کردن منو

```javascript
dropdown.disable();
```

#### `destroy()`
نابود کردن منو

```javascript
dropdown.destroy();
```

### رویدادها

#### `onOpen`
زمانی که منو باز می‌شود

```javascript
const dropdown = new MirageDropdown('#myDropdown', {
    onOpen: function() {
        console.log('منو باز شد');
    }
});
```

#### `onClose`
زمانی که منو بسته می‌شود

```javascript
const dropdown = new MirageDropdown('#myDropdown', {
    onClose: function() {
        console.log('منو بسته شد');
    }
});
```

#### `onSelect`
زمانی که آیتم انتخاب می‌شود

```javascript
const dropdown = new MirageDropdown('#myDropdown', {
    onSelect: function(data) {
        console.log('آیتم انتخاب شد:', data.text);
        console.log('مقدار:', data.value);
        console.log('شاخص:', data.index);
    }
});
```

### رویدادهای DOM

```javascript
// شنیدن رویدادها
dropdown.element.addEventListener('mir-dropdown:open', function(e) {
    console.log('منو باز شد:', e.detail);
});

dropdown.element.addEventListener('mir-dropdown:close', function(e) {
    console.log('منو بسته شد:', e.detail);
});

dropdown.element.addEventListener('mir-dropdown:select', function(e) {
    console.log('آیتم انتخاب شد:', e.detail);
});
```

### متدهای استاتیک

#### `MirageDropdown.init(selector)`
مقداردهی اولیه تمام منوها

```javascript
const dropdowns = MirageDropdown.init('.mir-dropdown');
```

#### `MirageDropdown.closeAll(except)`
بستن تمام منوها

```javascript
MirageDropdown.closeAll(); // بستن همه
MirageDropdown.closeAll(myDropdown); // بستن به جز یکی
```

#### `MirageDropdown.create(container, options)`
ایجاد منوی جدید

```javascript
const dropdown = MirageDropdown.create('#container', {
    text: 'انتخاب کنید',
    variant: 'primary',
    size: 'lg',
    searchable: true,
    items: [
        { text: 'گزینه اول', value: 'option1', icon: 'user' },
        { text: 'گزینه دوم', value: 'option2', icon: 'settings' },
        { text: 'گزینه سوم', value: 'option3', icon: 'help-circle' }
    ]
});
```

## ناوبری کیبورد

- **فلش بالا/پایین**: حرکت بین آیتم‌ها
- **Home**: رفتن به اولین آیتم
- **End**: رفتن به آخرین آیتم
- **Enter/Space**: انتخاب آیتم
- **Escape**: بستن منو
- **Tab**: خروج از منو

## دسترسی (Accessibility)

- `aria-haspopup="true"` برای toggle
- `aria-expanded` برای وضعیت منو
- `role="menu"` برای منو
- `role="menuitem"` برای آیتم‌ها
- `tabindex="-1"` برای آیتم‌ها
- پشتیبانی کامل از کیبورد
- تضاد رنگی مناسب

## تنظیمات RTL

- جهت منو از راست به چپ
- موقعیت‌یابی RTL
- آیکون‌های RTL
- جستجوی RTL
- انیمیشن RTL

## طراحی ریسپانسیو

در صفحات کوچک:
- منو به صورت تمام صفحه نمایش داده می‌شود
- پس‌زمینه تاریک اضافه می‌شود
- امکان بستن با کلیک پس‌زمینه
- اندازه مناسب برای لمس

```css
@media (max-width: 768px) {
    .mir-dropdown-menu {
        position: fixed;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
        width: 90%;
        max-width: 320px;
    }
}
```

## مثال‌های پیشرفته

### منوی چند سطحی

```html
<div class="mir-dropdown">
    <button class="mir-dropdown-toggle">
        <span>فایل</span>
        <i class="mir-dropdown-toggle-icon" data-feather="chevron-down"></i>
    </button>
    <div class="mir-dropdown-menu">
        <button class="mir-dropdown-item">
            <span>جدید</span>
        </button>
        <button class="mir-dropdown-item">
            <span>باز کردن</span>
        </button>
        <div class="mir-dropdown-divider"></div>
        <button class="mir-dropdown-item">
            <span>ذخیره</span>
        </button>
    </div>
</div>
```

### منوی کاربر

```html
<div class="mir-dropdown">
    <button class="mir-dropdown-toggle">
        <img src="avatar.jpg" alt="آواتار" class="mir-user-avatar">
        <span>علی احمدی</span>
        <i class="mir-dropdown-toggle-icon" data-feather="chevron-down"></i>
    </button>
    <div class="mir-dropdown-menu">
        <div class="mir-dropdown-header">حساب کاربری</div>
        <button class="mir-dropdown-item">
            <i class="mir-dropdown-item-icon" data-feather="user"></i>
            <span>پروفایل</span>
        </button>
        <button class="mir-dropdown-item">
            <i class="mir-dropdown-item-icon" data-feather="settings"></i>
            <span>تنظیمات</span>
        </button>
        <div class="mir-dropdown-divider"></div>
        <button class="mir-dropdown-item">
            <i class="mir-dropdown-item-icon" data-feather="log-out"></i>
            <span>خروج</span>
        </button>
    </div>
</div>
```

### منوی اقدامات

```html
<div class="mir-dropdown">
    <button class="mir-dropdown-toggle">
        <i data-feather="more-horizontal"></i>
    </button>
    <div class="mir-dropdown-menu">
        <button class="mir-dropdown-item">
            <i class="mir-dropdown-item-icon" data-feather="edit"></i>
            <span>ویرایش</span>
        </button>
        <button class="mir-dropdown-item">
            <i class="mir-dropdown-item-icon" data-feather="copy"></i>
            <span>کپی</span>
        </button>
        <button class="mir-dropdown-item">
            <i class="mir-dropdown-item-icon" data-feather="share"></i>
            <span>اشتراک‌گذاری</span>
        </button>
        <div class="mir-dropdown-divider"></div>
        <button class="mir-dropdown-item">
            <i class="mir-dropdown-item-icon" data-feather="trash"></i>
            <span>حذف</span>
        </button>
    </div>
</div>
```

### منوی با بارگیری دینامیک

```javascript
const dropdown = new MirageDropdown('#dynamicDropdown', {
    onOpen: function() {
        // نمایش حالت بارگیری
        this.menu.innerHTML = `
            <div class="mir-dropdown-loading">
                <div class="mir-dropdown-loading-spinner"></div>
                <span>در حال بارگیری...</span>
            </div>
        `;
        
        // بارگیری داده‌ها
        fetch('/api/options')
            .then(response => response.json())
            .then(data => {
                this.setItems(data);
            })
            .catch(error => {
                this.menu.innerHTML = `
                    <div class="mir-dropdown-empty">
                        <span>خطا در بارگیری داده‌ها</span>
                    </div>
                `;
            });
    }
});
```

## سفارشی‌سازی

### تغییر رنگ‌ها

```css
:root {
    --mir-dropdown-bg: #your-bg-color;
    --mir-dropdown-border: #your-border-color;
    --mir-dropdown-item-hover: #your-hover-color;
    --mir-dropdown-item-active: #your-active-color;
}
```

### تغییر انیمیشن

```css
.mir-dropdown-menu {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mir-dropdown-menu.custom-animation {
    transform: translateY(-20px) scale(0.95);
}

.mir-dropdown.open .mir-dropdown-menu.custom-animation {
    transform: translateY(0) scale(1);
}
```

### تغییر اندازه

```css
.mir-dropdown-custom {
    --mir-dropdown-font-size: 16px;
    --mir-dropdown-padding: 12px 16px;
    --mir-dropdown-border-radius: 8px;
}
```

## نکات کاربردی

1. **تعداد آیتم‌ها**: بیش از ۱۰ آیتم از جستجو استفاده کنید
2. **متن واضح**: متن آیتم‌ها باید کوتاه و واضح باشد
3. **گروه‌بندی**: از جداکننده برای گروه‌بندی استفاده کنید
4. **آیکون‌ها**: آیکون‌های مناسب برای هر آیتم
5. **کارایی**: از lazy loading برای داده‌های زیاد استفاده کنید

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
    <title>منوی کشویی</title>
    <link rel="stylesheet" href="dropdown.css">
</head>
<body>
    <div class="mir-dropdown mir-dropdown-primary mir-dropdown-lg" id="myDropdown">
        <button class="mir-dropdown-toggle">
            <span>انتخاب کنید</span>
            <i class="mir-dropdown-toggle-icon" data-feather="chevron-down"></i>
        </button>
        <div class="mir-dropdown-menu">
            <div class="mir-dropdown-search">
                <input type="text" class="mir-dropdown-search-input" placeholder="جستجو..." dir="rtl">
            </div>
            <div class="mir-dropdown-header">کاربران</div>
            <button class="mir-dropdown-item">
                <i class="mir-dropdown-item-icon" data-feather="user"></i>
                <span>علی احمدی</span>
                <span class="mir-dropdown-item-badge">فعال</span>
            </button>
            <button class="mir-dropdown-item">
                <i class="mir-dropdown-item-icon" data-feather="user"></i>
                <span>مریم کریمی</span>
            </button>
            <button class="mir-dropdown-item disabled">
                <i class="mir-dropdown-item-icon" data-feather="user"></i>
                <span>حسن محمدی</span>
            </button>
            <div class="mir-dropdown-divider"></div>
            <div class="mir-dropdown-header">عملیات</div>
            <button class="mir-dropdown-item">
                <i class="mir-dropdown-item-icon" data-feather="plus"></i>
                <span>افزودن کاربر</span>
            </button>
            <button class="mir-dropdown-item">
                <i class="mir-dropdown-item-icon" data-feather="settings"></i>
                <span>مدیریت</span>
            </button>
        </div>
    </div>

    <script src="dropdown.js"></script>
    <script>
        // مقداردهی اولیه
        const dropdown = new MirageDropdown('#myDropdown', {
            searchable: true,
            closeOnClick: true,
            onSelect: function(data) {
                console.log('انتخاب شد:', data.text);
            }
        });
        
        // افزودن آیتم جدید
        dropdown.addItem({
            text: 'کاربر جدید',
            icon: 'user-plus',
            value: 'new-user'
        });
    </script>
</body>
</html>
```

---

## مجوز

این کامپوننت بخشی از سیستم طراحی میراژ است و تحت مجوز MIT منتشر شده است.