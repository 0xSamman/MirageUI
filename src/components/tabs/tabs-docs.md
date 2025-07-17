# کامپوننت تب (Tabs) - سیستم طراحی میراژ

## معرفی

کامپوننت تب سیستم طراحی میراژ یک سیستم جامع برای سازماندهی محتوا در بخش‌های مختلف است. این کامپوننت با پشتیبانی کامل از RTL و قابلیت‌های پیشرفته تعاملی طراحی شده است.

## ویژگی‌ها

- **پشتیبانی RTL**: بهینه‌سازی کامل برای چیدمان راست به چپ
- **Glass Morphism**: افکت شیشه‌ای با blur و شفافیت
- **انواع مختلف**: پیش‌فرض، حاشیه‌دار، قرص‌مانند، خط‌دار، عمودی
- **اندازه‌های مختلف**: کوچک، متوسط، بزرگ
- **قابلیت بستن**: تب‌هایی که قابل بسته شدن هستند
- **اسکرول افقی**: برای تب‌های زیاد
- **ناوبری کیبورد**: دسترسی کامل با کیبورد
- **انیمیشن**: تغییر تب‌ها با انیمیشن روان
- **پیام‌های فارسی**: تمام متن‌ها و پیام‌ها به فارسی
- **وضعیت‌های رنگی**: موفقیت، خطا، هشدار، اطلاعیه

## استفاده پایه

```html
<div class="mir-tabs">
    <ul class="mir-tabs-nav">
        <li class="mir-tabs-nav-item">
            <button class="mir-tabs-nav-link active" data-tab="tab1">
                <i class="mir-tabs-nav-icon" data-feather="home"></i>
                <span>خانه</span>
            </button>
        </li>
        <li class="mir-tabs-nav-item">
            <button class="mir-tabs-nav-link" data-tab="tab2">
                <i class="mir-tabs-nav-icon" data-feather="user"></i>
                <span>پروفایل</span>
            </button>
        </li>
        <li class="mir-tabs-nav-item">
            <button class="mir-tabs-nav-link" data-tab="tab3">
                <i class="mir-tabs-nav-icon" data-feather="settings"></i>
                <span>تنظیمات</span>
            </button>
        </li>
    </ul>
    
    <div class="mir-tabs-content">
        <div class="mir-tabs-pane active" id="tab1">
            <h3>محتوای خانه</h3>
            <p>این محتوای تب خانه است.</p>
        </div>
        <div class="mir-tabs-pane" id="tab2">
            <h3>محتوای پروفایل</h3>
            <p>این محتوای تب پروفایل است.</p>
        </div>
        <div class="mir-tabs-pane" id="tab3">
            <h3>محتوای تنظیمات</h3>
            <p>این محتوای تب تنظیمات است.</p>
        </div>
    </div>
</div>
```

## انواع تب

### تب پیش‌فرض
```html
<div class="mir-tabs">
    <!-- محتوای تب -->
</div>
```

### تب حاشیه‌دار
```html
<div class="mir-tabs mir-tabs-bordered">
    <!-- محتوای تب -->
</div>
```

### تب قرص‌مانند
```html
<div class="mir-tabs mir-tabs-pills">
    <!-- محتوای تب -->
</div>
```

### تب خط‌دار
```html
<div class="mir-tabs mir-tabs-underlined">
    <!-- محتوای تب -->
</div>
```

### تب عمودی
```html
<div class="mir-tabs mir-tabs-vertical">
    <!-- محتوای تب -->
</div>
```

## اندازه‌ها

### کوچک
```html
<div class="mir-tabs mir-tabs-sm">
    <!-- محتوای تب -->
</div>
```

### متوسط (پیش‌فرض)
```html
<div class="mir-tabs">
    <!-- محتوای تب -->
</div>
```

### بزرگ
```html
<div class="mir-tabs mir-tabs-lg">
    <!-- محتوای تب -->
</div>
```

## تب با Badge

```html
<button class="mir-tabs-nav-link" data-tab="messages">
    <i class="mir-tabs-nav-icon" data-feather="message-square"></i>
    <span>پیام‌ها</span>
    <span class="mir-tabs-nav-badge">۵</span>
</button>
```

## تب قابل بسته شدن

```html
<button class="mir-tabs-nav-link" data-tab="closable">
    <i class="mir-tabs-nav-icon" data-feather="file-text"></i>
    <span>سند</span>
    <button class="mir-tabs-nav-close">
        <i class="mir-tabs-nav-close-icon" data-feather="x"></i>
    </button>
</button>
```

## تب غیرفعال

```html
<button class="mir-tabs-nav-link disabled" data-tab="disabled">
    <span>غیرفعال</span>
</button>
```

## وضعیت‌های رنگی

### موفقیت
```html
<div class="mir-tabs mir-tabs-success">
    <!-- محتوای تب -->
</div>
```

### خطا
```html
<div class="mir-tabs mir-tabs-error">
    <!-- محتوای تب -->
</div>
```

### هشدار
```html
<div class="mir-tabs mir-tabs-warning">
    <!-- محتوای تب -->
</div>
```

### اطلاعیه
```html
<div class="mir-tabs mir-tabs-info">
    <!-- محتوای تب -->
</div>
```

## JavaScript API

### مقداردهی اولیه

```javascript
// مقداردهی خودکار
const tabs = MirageTabs.init();

// مقداردهی دستی
const myTabs = new MirageTabs('#myTabs', {
    activeIndex: 0,
    variant: 'pills',
    size: 'lg',
    closable: true,
    onTabChange: function(index, tab) {
        console.log('تب تغییر کرد:', index, tab);
    }
});
```

### تنظیمات

| تنظیم | نوع | پیش‌فرض | توضیح |
|-------|-----|---------|--------|
| `activeIndex` | Number | `0` | شاخص تب فعال |
| `variant` | String | `'default'` | نوع تب |
| `size` | String | `'md'` | اندازه تب |
| `closable` | Boolean | `false` | قابل بسته شدن |
| `scrollable` | Boolean | `true` | اسکرول افقی |
| `animation` | Boolean | `true` | انیمیشن |
| `keyboard` | Boolean | `true` | ناوبری کیبورد |
| `onTabChange` | Function | `null` | تابع تغییر تب |
| `onTabClose` | Function | `null` | تابع بستن تب |
| `beforeTabChange` | Function | `null` | تابع قبل از تغییر |

### متدها

#### `setActiveTab(index)`
فعال کردن تب با شاخص مشخص

```javascript
tabs.setActiveTab(2);
```

#### `addTab(options)`
افزودن تب جدید

```javascript
tabs.addTab({
    id: 'newTab',
    title: 'تب جدید',
    content: '<p>محتوای تب جدید</p>',
    icon: 'plus',
    badge: '۱',
    active: true
});
```

#### `closeTab(index)`
بستن تب

```javascript
tabs.closeTab(1);
```

#### `updateTab(index, options)`
به‌روزرسانی تب

```javascript
tabs.updateTab(0, {
    title: 'عنوان جدید',
    content: '<p>محتوای جدید</p>',
    badge: '۳'
});
```

#### `enableTab(index)` / `disableTab(index)`
فعال/غیرفعال کردن تب

```javascript
tabs.enableTab(1);
tabs.disableTab(2);
```

#### `getActiveTab()`
دریافت تب فعال

```javascript
const activeTab = tabs.getActiveTab();
```

#### `getTab(id)`
دریافت تب با شناسه

```javascript
const tab = tabs.getTab('myTab');
```

#### `getTabs()`
دریافت تمام تب‌ها

```javascript
const allTabs = tabs.getTabs();
```

### رویدادها

#### `onTabChange`
زمانی که تب تغییر می‌کند

```javascript
const tabs = new MirageTabs('#myTabs', {
    onTabChange: function(index, tab) {
        console.log(`تب ${index} فعال شد`);
    }
});
```

#### `onTabClose`
زمانی که تب بسته می‌شود

```javascript
const tabs = new MirageTabs('#myTabs', {
    onTabClose: function(index, tab) {
        console.log(`تب ${index} بسته شد`);
    }
});
```

#### `beforeTabChange`
قبل از تغییر تب

```javascript
const tabs = new MirageTabs('#myTabs', {
    beforeTabChange: function(newIndex, oldIndex) {
        // return false برای جلوگیری از تغییر
        return confirm('آیا مطمئن هستید؟');
    }
});
```

## ناوبری کیبورد

- **فلش چپ/راست**: حرکت بین تب‌ها
- **Home**: رفتن به اولین تب
- **End**: رفتن به آخرین تب
- **Enter/Space**: فعال کردن تب
- **Tab**: حرکت به المان بعدی

## دسترسی (Accessibility)

- `role="tab"` برای تب‌ها
- `role="tabpanel"` برای محتوای تب‌ها
- `aria-selected` برای تب فعال
- `aria-label` برای دکمه بستن
- پشتیبانی کامل از کیبورد
- تضاد رنگی مناسب

## تنظیمات RTL

- جهت تب‌ها از راست به چپ
- آیکون‌ها در سمت راست
- انیمیشن‌ها RTL
- اسکرول به سمت راست

## مثال‌های پیشرفته

### تب با محتوای دینامیک

```javascript
const tabs = new MirageTabs('#dynamicTabs', {
    onTabChange: function(index, tab) {
        // بارگیری محتوای دینامیک
        if (tab.id === 'dynamic') {
            tab.pane.innerHTML = '<p>بارگیری...</p>';
            
            // شبیه‌سازی بارگیری
            setTimeout(() => {
                tab.pane.innerHTML = '<p>محتوای بارگیری شده</p>';
            }, 1000);
        }
    }
});
```

### تب با اعتبارسنجی

```javascript
const tabs = new MirageTabs('#validatedTabs', {
    beforeTabChange: function(newIndex, oldIndex) {
        // اعتبارسنجی فرم قبل از تغییر تب
        const form = document.querySelector('#form' + oldIndex);
        if (form && !form.checkValidity()) {
            alert('لطفاً ابتدا فرم را تکمیل کنید');
            return false;
        }
        return true;
    }
});
```

## سفارشی‌سازی

### تغییر رنگ‌ها

```css
:root {
    --mir-tabs-primary: #your-color;
    --mir-tabs-background: rgba(255, 255, 255, 0.1);
    --mir-tabs-border: rgba(255, 255, 255, 0.2);
}
```

### تغییر انیمیشن

```css
.mir-tabs-pane {
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
}
```

## نکات کاربردی

1. **عملکرد**: برای تب‌های زیاد از lazy loading استفاده کنید
2. **دسترسی**: همیشه label مناسب برای تب‌ها قرار دهید
3. **موبایل**: در موبایل از تب‌های اسکرول‌پذیر استفاده کنید
4. **محتوا**: محتوای تب‌ها باید مستقل باشد
5. **وضعیت**: وضعیت تب فعال را حفظ کنید

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
    <title>نمایش تب‌ها</title>
    <link rel="stylesheet" href="tabs.css">
</head>
<body>
    <div class="mir-tabs mir-tabs-pills" id="myTabs">
        <ul class="mir-tabs-nav">
            <li class="mir-tabs-nav-item">
                <button class="mir-tabs-nav-link active" data-tab="dashboard">
                    <i class="mir-tabs-nav-icon" data-feather="home"></i>
                    <span>داشبورد</span>
                </button>
            </li>
            <li class="mir-tabs-nav-item">
                <button class="mir-tabs-nav-link" data-tab="users">
                    <i class="mir-tabs-nav-icon" data-feather="users"></i>
                    <span>کاربران</span>
                    <span class="mir-tabs-nav-badge">۱۲</span>
                </button>
            </li>
            <li class="mir-tabs-nav-item">
                <button class="mir-tabs-nav-link" data-tab="settings">
                    <i class="mir-tabs-nav-icon" data-feather="settings"></i>
                    <span>تنظیمات</span>
                </button>
            </li>
        </ul>
        
        <div class="mir-tabs-content">
            <div class="mir-tabs-pane active" id="dashboard">
                <h3>داشبورد</h3>
                <p>اطلاعات کلی سیستم</p>
            </div>
            <div class="mir-tabs-pane" id="users">
                <h3>مدیریت کاربران</h3>
                <p>لیست کاربران سیستم</p>
            </div>
            <div class="mir-tabs-pane" id="settings">
                <h3>تنظیمات</h3>
                <p>تنظیمات سیستم</p>
            </div>
        </div>
    </div>

    <script src="tabs.js"></script>
    <script>
        // مقداردهی اولیه
        const tabs = new MirageTabs('#myTabs', {
            onTabChange: function(index, tab) {
                console.log('تب تغییر کرد:', tab.id);
            }
        });
    </script>
</body>
</html>
```

---

## مجوز

این کامپوننت بخشی از سیستم طراحی میراژ است و تحت مجوز MIT منتشر شده است.