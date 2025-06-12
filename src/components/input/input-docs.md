# سیستم ورودی میراژ - Mirage Input System

## فهرست مطالب

- [معرفی](#معرفی)
- [نصب و راه‌اندازی](#نصب-و-راه‌اندازی)
- [انواع ورودی](#انواع-ورودی)
- [اندازه‌ها](#اندازه‌ها)
- [حالت‌های مختلف](#حالت‌های-مختلف)
- [ویژگی‌های خاص](#ویژگی‌های-خاص)
- [تأیید اعتبار](#تأیید-اعتبار)
- [API مراجع](#api-مراجع)
- [نمونه‌های کاربردی](#نمونه‌های-کاربردی)

## معرفی

سیستم ورودی میراژ مجموعه‌ای کامل و بهینه‌شده از کامپوننت‌های ورودی برای رابط‌های کاربری فارسی است. این سیستم شامل انواع مختلف ورودی‌ها، اعتبارسنجی، پشتیبانی از اعداد فارسی و بهینه‌سازی RTL می‌باشد.

### ویژگی‌های کلیدی

- ✅ **پشتیبانی کامل RTL** - بهینه‌سازی برای متن فارسی
- ✅ **تبدیل اعداد فارسی** - تبدیل خودکار اعداد انگلیسی به فارسی
- ✅ **اعتبارسنجی هوشمند** - تأیید اعتبار در زمان واقعی
- ✅ **تنوع بالا** - انواع مختلف ورودی و حالت‌ها
- ✅ **قابل دسترس** - سازگاری کامل با استانداردهای دسترسی
- ✅ **واکنش‌گرا** - سازگار با تمام اندازه‌های صفحه

## نصب و راه‌اندازی

### 1. وارد کردن فایل‌ها

```html
<!-- CSS -->
<link rel="stylesheet" href="components/input/input.css">

<!-- JavaScript -->
<script src="components/input/input.js"></script>
```

### 2. راه‌اندازی خودکار

```javascript
// راه‌اندازی خودکار همه ورودی‌ها
MirageInput.init();

// یا با تنظیمات سفارشی
MirageInput.init({
    persianNumbers: true,
    realTimeValidation: true
});
```

## انواع ورودی

### ورودی متنی - Text Input

```html
<div class="mir-input-group">
    <label class="mir-label">نام</label>
    <input type="text" class="mir-input" placeholder="نام خود را وارد کنید">
</div>
```

### ورودی ایمیل - Email Input

```html
<div class="mir-input-group">
    <label class="mir-label required">ایمیل</label>
    <input type="email" class="mir-input" placeholder="example@domain.com" dir="ltr">
</div>
```

### ورودی رمز عبور - Password Input

```html
<div class="mir-input-group">
    <label class="mir-label required">رمز عبور</label>
    <div class="mir-input-with-icon">
        <input type="password" class="mir-input" placeholder="رمز عبور خود را وارد کنید">
    </div>
</div>
```

### ورودی جستجو - Search Input

```html
<div class="mir-input-group">
    <label class="mir-label">جستجو</label>
    <div class="mir-input-with-icon">
        <input type="search" class="mir-input" placeholder="جستجو کنید...">
        <i data-feather="search" class="mir-input-icon mir-input-icon-right"></i>
    </div>
</div>
```

### ورودی شماره تلفن - Phone Input

```html
<div class="mir-input-group">
    <label class="mir-label">شماره تلفن</label>
    <input type="tel" class="mir-input mir-persian-numbers" placeholder="۰۹۱۲۳۴۵۶۷۸۹">
</div>
```

### منطقه متن - Textarea

```html
<div class="mir-input-group">
    <label class="mir-label">توضیحات</label>
    <textarea class="mir-textarea" rows="4" placeholder="توضیحات خود را بنویسید..."></textarea>
</div>
```

### لیست انتخاب - Select Dropdown

```html
<div class="mir-input-group">
    <label class="mir-label">دسته‌بندی</label>
    <select class="mir-select">
        <option>انتخاب کنید</option>
        <option>فناوری</option>
        <option>طراحی</option>
        <option>بازاریابی</option>
    </select>
</div>
```

## اندازه‌ها

### اندازه‌های مختلف

```html
<!-- خیلی کوچک -->
<input type="text" class="mir-input mir-input-xs" placeholder="XS">

<!-- کوچک -->
<input type="text" class="mir-input mir-input-sm" placeholder="SM">

<!-- متوسط (پیش‌فرض) -->
<input type="text" class="mir-input" placeholder="MD">

<!-- بزرگ -->
<input type="text" class="mir-input mir-input-lg" placeholder="LG">

<!-- خیلی بزرگ -->
<input type="text" class="mir-input mir-input-xl" placeholder="XL">
```

## حالت‌های مختلف

### حالت‌های رنگی

```html
<!-- اصلی -->
<input type="text" class="mir-input mir-input-primary" placeholder="Primary">

<!-- موفقیت -->
<input type="text" class="mir-input mir-input-success" placeholder="Success">

<!-- هشدار -->
<input type="text" class="mir-input mir-input-warning" placeholder="Warning">

<!-- خطا -->
<input type="text" class="mir-input mir-input-error" placeholder="Error">
```

### حالت غیرفعال

```html
<input type="text" class="mir-input" placeholder="غیرفعال" disabled>
```

## ویژگی‌های خاص

### ورودی با آیکون

```html
<div class="mir-input-with-icon">
    <input type="text" class="mir-input" placeholder="با آیکون">
    <i data-feather="user" class="mir-input-icon mir-input-icon-right"></i>
</div>
```

### برچسب شناور - Floating Label

```html
<div class="mir-floating-label">
    <input type="text" class="mir-input" placeholder=" ">
    <label class="mir-label">نام کاربری</label>
</div>
```

### افزودنی‌ها - Input Addons

```html
<div class="mir-input-addon-group">
    <span class="mir-input-addon mir-input-addon-right">https://</span>
    <input type="text" class="mir-input" placeholder="website.com">
    <span class="mir-input-addon mir-input-addon-left">.com</span>
</div>
```

### شمارنده کاراکتر

```html
<div class="mir-input-group">
    <label class="mir-label">پیام</label>
    <textarea class="mir-textarea" data-max-length="200" placeholder="پیام خود را بنویسید..."></textarea>
</div>
```

### تغییر اندازه خودکار Textarea

```html
<textarea class="mir-textarea" data-auto-resize placeholder="متن با تغییر اندازه خودکار"></textarea>
```

## تأیید اعتبار

### تنظیم اعتبارسنجی

```javascript
// تنظیم اعتبارسنجی برای یک ورودی
const emailInput = document.querySelector('#email');
new MirageInput(emailInput, {
    validation: {
        required: true,
        email: true
    }
});

// تنظیم اعتبارسنجی برای شماره تلفن
const phoneInput = document.querySelector('#phone');
new MirageInput(phoneInput, {
    validation: {
        required: true,
        phone: true
    }
});
```

### قوانین اعتبارسنجی

- `required: true` - فیلد الزامی
- `email: true` - فرمت ایمیل
- `phone: true` - فرمت شماره تلفن ایرانی
- `minLength: 6` - حداقل تعداد کاراکتر
- `maxLength: 50` - حداکثر تعداد کاراکتر
- `pattern: 'regex'` - الگوی سفارشی

### پیام‌های خطا

پیام‌های خطا به صورت خودکار به فارسی نمایش داده می‌شوند:

- "این فیلد الزامی است"
- "فرمت ایمیل صحیح نیست"
- "فرمت شماره تلفن صحیح نیست"
- "حداقل X کاراکتر وارد کنید"
- "حداکثر X کاراکتر مجاز است"

## API مراجع

### MirageInput کلاس

```javascript
const input = new MirageInput(element, options);
```

#### روش‌ها

- `getValue()` - دریافت مقدار
- `setValue(value)` - تنظیم مقدار
- `clear()` - پاک کردن
- `focus()` - فوکوس
- `disable()` - غیرفعال کردن
- `enable()` - فعال کردن
- `validate()` - اعتبارسنجی

### توابع کاربردی

```javascript
// تبدیل اعداد
MirageInput.persianToEnglish('۱۲۳۴'); // '1234'
MirageInput.englishToPersian('1234'); // '۱۲۳۴'

// اعتبارسنجی
MirageInput.validate(inputElement);
MirageInput.validateForm(formElement);
```

### ایجاد ورودی برنامه‌نویسی

```javascript
const input = MirageInput.createInput({
    type: 'text',
    placeholder: 'نام',
    variant: 'primary',
    size: 'lg',
    persianNumbers: true,
    validation: {
        required: true,
        minLength: 3
    }
});
```

## نمونه‌های کاربردی

### فرم ثبت‌نام کامل

```html
<form class="mir-form">
    <div class="mir-form-grid">
        <!-- نام -->
        <div class="mir-input-group">
            <label class="mir-label required">نام</label>
            <input type="text" class="mir-input" placeholder="نام خود را وارد کنید">
        </div>

        <!-- ایمیل -->
        <div class="mir-input-group">
            <label class="mir-label required">ایمیل</label>
            <input type="email" class="mir-input" placeholder="example@domain.com">
        </div>

        <!-- شماره تلفن -->
        <div class="mir-input-group">
            <label class="mir-label required">شماره تلفن</label>
            <input type="tel" class="mir-input mir-persian-numbers" placeholder="۰۹۱۲۳۴۵۶۷۸۹">
        </div>

        <!-- رمز عبور -->
        <div class="mir-input-group">
            <label class="mir-label required">رمز عبور</label>
            <div class="mir-input-with-icon">
                <input type="password" class="mir-input" placeholder="رمز عبور">
            </div>
        </div>

        <!-- توضیحات -->
        <div class="mir-input-group mir-form-group-full">
            <label class="mir-label">درباره شما</label>
            <textarea class="mir-textarea" data-max-length="500" placeholder="درباره خود بنویسید..."></textarea>
        </div>
    </div>
</form>
```

### فرم جستجوی پیشرفته

```html
<div class="search-form">
    <!-- جستجوی اصلی -->
    <div class="mir-input-group">
        <div class="mir-input-with-icon">
            <input type="search" class="mir-input mir-input-lg" placeholder="جستجو کنید...">
            <i data-feather="search" class="mir-input-icon mir-input-icon-right"></i>
        </div>
    </div>

    <!-- فیلترها -->
    <div class="filter-row">
        <div class="mir-input-group">
            <label class="mir-label">دسته‌بندی</label>
            <select class="mir-select">
                <option>همه</option>
                <option>فناوری</option>
                <option>طراحی</option>
            </select>
        </div>

        <div class="mir-input-group">
            <label class="mir-label">از تاریخ</label>
            <input type="date" class="mir-input">
        </div>

        <div class="mir-input-group">
            <label class="mir-label">تا تاریخ</label>
            <input type="date" class="mir-input">
        </div>
    </div>
</div>
```

### تنظیمات پیشرفته JavaScript

```javascript
// تنظیم کامل یک فرم
document.addEventListener('DOMContentLoaded', function() {
    // راه‌اندازی با تنظیمات سفارشی
    MirageInput.init({
        persianNumbers: true,
        realTimeValidation: true
    });

    // تنظیم اعتبارسنجی سفارشی
    const inputs = [
        {
            selector: '#name',
            validation: { required: true, minLength: 2 }
        },
        {
            selector: '#email',
            validation: { required: true, email: true }
        },
        {
            selector: '#phone',
            validation: { required: true, phone: true }
        }
    ];

    inputs.forEach(config => {
        const element = document.querySelector(config.selector);
        if (element) {
            new MirageInput(element, config);
        }
    });

    // تأیید اعتبار فرم
    const form = document.querySelector('.mir-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (MirageInput.validateForm(form)) {
            console.log('فرم معتبر است');
            // ارسال فرم
        } else {
            console.log('خطا در فرم');
        }
    });
});
```

## نکات مهم

### ✅ بهترین روش‌ها

- همیشه از `mir-input-group` برای گروه‌بندی استفاده کنید
- برای فیلدهای الزامی کلاس `required` را به برچسب اضافه کنید
- از `dir="ltr"` برای ورودی‌های انگلیسی استفاده کنید
- همیشه `placeholder` مناسب تعریف کنید

### ⚠️ نکات مهم

- برای اعداد فارسی حتماً کلاس `mir-persian-numbers` استفاده کنید
- در موبایل، `font-size` کمتر از ۱۶px باعث zoom می‌شود
- برای فرم‌های بزرگ، اعتبارسنجی در زمان واقعی را فعال کنید

### 🎨 سفارشی‌سازی

```css
/* تغییر رنگ اصلی */
:root {
    --mir-primary: #your-color;
}

/* سفارشی‌سازی ورودی */
.custom-input {
    border-radius: 20px;
    background: linear-gradient(45deg, #f0f0f0, #ffffff);
}
```

## پشتیبانی و به‌روزرسانی

برای آخرین نسخه و اطلاعات بیشتر، به مستندات اصلی میراژ مراجعه کنید.

---

**میراژ دیزاین سیستم 2025** - سیستم طراحی مدرن برای رابط‌های کاربری فارسی 