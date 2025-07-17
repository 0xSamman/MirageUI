# سیستم اعتبارسنجی فرم میراژ

## معرفی

کامپوننت اعتبارسنجی فرم میراژ یک سیستم کامل و پیشرفته برای اعتبارسنجی فرم‌ها است که با طراحی RTL و پشتیبانی کامل از زبان فارسی ارائه می‌شود.

## ویژگی‌ها

- **اعتبارسنجی بی‌درنگ**: بررسی فوری هنگام تایپ
- **پیام‌های فارسی**: خطاها و هشدارها به زبان فارسی
- **طراحی RTL**: بهینه‌سازی شده برای خواندن راست به چپ
- **انواع اعتبارسنج**: ایمیل، تلفن، رمز عبور، نمونه و غیره
- **آیکون‌های وضعیت**: نمایش بصری وضعیت اعتبارسنجی
- **خلاصه خطاها**: نمایش کلی خطاهای فرم
- **انیمیشن‌ها**: انیمیشن‌های نرم برای خطاها
- **پشتیبانی از کیبورد**: قابل دسترسی برای تمام کاربران
- **اعداد فارسی**: تبدیل خودکار اعداد انگلیسی به فارسی
- **طراحی شیشه‌ای**: استفاده از Glass Morphism

## نحوه استفاده

### HTML پایه

```html
<form id="my-form">
  <div class="mir-form-field">
    <label for="username" class="mir-label">نام کاربری</label>
    <input type="text" id="username" name="username" class="mir-input">
  </div>
  <button type="submit" class="mir-btn mir-btn-primary">ارسال</button>
</form>
```

### CSS

```html
<link rel="stylesheet" href="components/form-validation/form-validation.css">
```

### JavaScript

```html
<script src="components/form-validation/form-validation.js"></script>
```

## راه‌اندازی اولیه

### فرم ساده

```javascript
const validator = new MirageFormValidation({
    form: '#my-form',
    fields: {
        username: {
            validators: ['required', 'minLength:3'],
            required: true
        },
        email: {
            validators: ['required', 'email'],
            required: true
        }
    }
});
```

### فرم پیشرفته

```javascript
const validator = new MirageFormValidation({
    form: '#advanced-form',
    fields: {
        fullName: {
            validators: [
                'required',
                { type: 'minLength', options: { min: 3 } },
                { type: 'maxLength', options: { max: 50 } },
                'persian'
            ],
            required: true,
            tooltip: 'نام کامل خود را با حروف فارسی وارد کنید'
        },
        email: {
            validators: ['required', 'email'],
            required: true
        },
        phone: {
            validators: ['required', 'phone'],
            required: true
        },
        password: {
            validators: [
                'required',
                { type: 'minLength', options: { min: 8 } },
                { type: 'pattern', options: { 
                    pattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)',
                    message: 'رمز عبور باید شامل حروف کوچک، بزرگ و عدد باشد'
                }}
            ],
            required: true,
            showProgress: true
        },
        confirmPassword: {
            validators: [
                'required',
                { type: 'confirm', options: { field: 'password' } }
            ],
            required: true
        }
    },
    validateOnInput: true,
    validateOnBlur: true,
    showSummary: true,
    showTooltips: true,
    onSubmit: (data, validator) => {
        console.log('فرم ارسال شد:', data);
    },
    onError: (errors, validator) => {
        console.log('خطاهای فرم:', errors);
    }
});
```

## تنظیمات

### تنظیمات اصلی

| گزینه | نوع | پیش‌فرض | توضیحات |
|-------|-----|---------|---------|
| `form` | string/element | `null` | انتخابگر یا عنصر فرم |
| `fields` | object | `{}` | تنظیمات فیلدها |
| `validateOnInput` | boolean | `true` | اعتبارسنجی هنگام تایپ |
| `validateOnBlur` | boolean | `true` | اعتبارسنجی هنگام خروج از فیلد |
| `validateOnSubmit` | boolean | `true` | اعتبارسنجی هنگام ارسال |
| `showSummary` | boolean | `true` | نمایش خلاصه خطاها |
| `showTooltips` | boolean | `false` | نمایش راهنمای فیلدها |
| `showProgress` | boolean | `false` | نمایش نوار پیشرفت |
| `realTimeValidation` | boolean | `true` | اعتبارسنجی بی‌درنگ |
| `persianNumbers` | boolean | `true` | تبدیل اعداد به فارسی |
| `animateErrors` | boolean | `true` | انیمیشن خطاها |
| `debounceTime` | number | `300` | تأخیر اعتبارسنجی (میلی‌ثانیه) |

### تنظیمات فیلدها

```javascript
const fields = {
    fieldName: {
        validators: [
            'required',
            { type: 'minLength', options: { min: 3 } },
            { type: 'custom', options: { name: 'myValidator' } }
        ],
        required: true,
        tooltip: 'راهنمای فیلد',
        showProgress: true
    }
};
```

## انواع اعتبارسنج

### اعتبارسنج‌های داخلی

#### required (الزامی)
```javascript
validators: ['required']
```

#### minLength (حداقل طول)
```javascript
validators: [{ type: 'minLength', options: { min: 3 } }]
```

#### maxLength (حداکثر طول)
```javascript
validators: [{ type: 'maxLength', options: { max: 50 } }]
```

#### email (ایمیل)
```javascript
validators: ['email']
```

#### phone (تلفن)
```javascript
validators: ['phone']
```

#### number (عدد)
```javascript
validators: ['number']
```

#### pattern (نمونه)
```javascript
validators: [{
    type: 'pattern',
    options: {
        pattern: '^[a-zA-Z]+$',
        message: 'فقط حروف انگلیسی مجاز است'
    }
}]
```

#### confirm (تأیید)
```javascript
validators: [{
    type: 'confirm',
    options: { field: 'password' }
}]
```

#### persian (فارسی)
```javascript
validators: ['persian']
```

#### url (آدرس وب)
```javascript
validators: ['url']
```

#### date (تاریخ)
```javascript
validators: ['date']
```

#### time (زمان)
```javascript
validators: ['time']
```

#### range (محدوده)
```javascript
validators: [{
    type: 'range',
    options: { min: 18, max: 65 }
}]
```

### اعتبارسنج سفارشی

```javascript
const validator = new MirageFormValidation({
    form: '#my-form',
    fields: {
        username: {
            validators: [{
                type: 'custom',
                options: { name: 'uniqueUsername' }
            }]
        }
    },
    customValidators: {
        uniqueUsername: async (value, options) => {
            // بررسی یکتا بودن نام کاربری
            const response = await fetch(`/api/check-username/${value}`);
            const result = await response.json();
            
            return {
                isValid: result.isUnique,
                message: result.isUnique ? null : 'این نام کاربری قبلاً استفاده شده است'
            };
        }
    }
});
```

## پیام‌های خطا

### پیام‌های پیش‌فرض

```javascript
const messages = {
    required: 'این فیلد الزامی است',
    minLength: 'حداقل {min} کاراکتر وارد کنید',
    maxLength: 'حداکثر {max} کاراکتر مجاز است',
    email: 'آدرس ایمیل معتبر وارد کنید',
    phone: 'شماره تلفن معتبر وارد کنید',
    number: 'عدد معتبر وارد کنید',
    pattern: 'فرمت وارد شده صحیح نیست',
    confirm: 'تأیید مطابقت ندارد',
    persian: 'فقط حروف فارسی مجاز است',
    url: 'آدرس وب معتبر وارد کنید',
    date: 'تاریخ معتبر وارد کنید',
    time: 'زمان معتبر وارد کنید',
    range: 'مقدار باید بین {min} و {max} باشد'
};
```

### تغییر پیام‌ها

```javascript
validator.setCustomMessage('required', 'پر کردن این فیلد ضروری است');
validator.setCustomMessage('email', 'لطفاً ایمیل صحیح وارد کنید');
```

## API عمومی

### اعتبارسنجی فرم

```javascript
// اعتبارسنجی کل فرم
const isValid = await validator.validateForm();

// اعتبارسنجی فیلد خاص
await validator.validateField('username');
```

### مدیریت داده‌ها

```javascript
// تنظیم مقدار فیلد
validator.setFieldValue('username', 'علی');

// دریافت مقدار فیلد
const value = validator.getFieldValue('username');

// دریافت تمام داده‌های فرم
const formData = validator.getFormData();
```

### مدیریت وضعیت

```javascript
// دریافت وضعیت اعتبارسنجی
const state = validator.getValidationState();

// پاک کردن اعتبارسنجی
validator.resetValidation();
```

### اعتبارسنج‌های سفارشی

```javascript
// افزودن اعتبارسنج جدید
validator.addCustomValidator('nationalCode', (value) => {
    // بررسی کد ملی
    const isValid = checkNationalCode(value);
    return {
        isValid,
        message: isValid ? null : 'کد ملی صحیح نیست'
    };
});
```

## رویدادها

### رویدادهای اصلی

```javascript
const validator = new MirageFormValidation({
    form: '#my-form',
    fields: { /* ... */ },
    onValidate: (fieldName, result, validator) => {
        console.log(`فیلد ${fieldName} اعتبارسنجی شد:`, result);
    },
    onSubmit: (data, validator) => {
        console.log('فرم ارسال شد:', data);
        // ارسال به سرور
        submitToServer(data);
    },
    onError: (errors, validator) => {
        console.log('خطاهای فرم:', errors);
        // نمایش خطاهای کلی
    },
    onSuccess: (data, validator) => {
        console.log('فرم معتبر است:', data);
        // نمایش پیام موفقیت
    }
});
```

## استفاده با HTML

### راه‌اندازی خودکار

```html
<form data-mir-validation>
    <div class="mir-form-field">
        <label for="email" class="mir-label">ایمیل</label>
        <input type="email" id="email" name="email" class="mir-input" 
               data-mir-validate="required,email" 
               data-mir-tooltip="آدرس ایمیل خود را وارد کنید"
               required>
    </div>
    
    <div class="mir-form-field">
        <label for="phone" class="mir-label">تلفن</label>
        <input type="tel" id="phone" name="phone" class="mir-input" 
               data-mir-validate="required,phone" 
               required>
    </div>
    
    <button type="submit" class="mir-btn mir-btn-primary">ارسال</button>
</form>
```

## نمونه‌های کاربردی

### فرم ثبت‌نام

```javascript
const registerForm = new MirageFormValidation({
    form: '#register-form',
    fields: {
        firstName: {
            validators: ['required', 'persian', 'minLength:2'],
            required: true,
            tooltip: 'نام خود را با حروف فارسی وارد کنید'
        },
        lastName: {
            validators: ['required', 'persian', 'minLength:2'],
            required: true,
            tooltip: 'نام خانوادگی خود را با حروف فارسی وارد کنید'
        },
        email: {
            validators: ['required', 'email'],
            required: true
        },
        phone: {
            validators: ['required', 'phone'],
            required: true
        },
        password: {
            validators: [
                'required',
                { type: 'minLength', options: { min: 8 } },
                {
                    type: 'pattern',
                    options: {
                        pattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)',
                        message: 'رمز عبور باید شامل حروف کوچک، بزرگ و عدد باشد'
                    }
                }
            ],
            required: true,
            showProgress: true
        },
        confirmPassword: {
            validators: [
                'required',
                { type: 'confirm', options: { field: 'password' } }
            ],
            required: true
        },
        terms: {
            validators: ['required'],
            required: true
        }
    },
    onSubmit: async (data) => {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                alert('ثبت‌نام با موفقیت انجام شد');
            } else {
                alert('خطا در ثبت‌نام');
            }
        } catch (error) {
            alert('خطا در ارتباط با سرور');
        }
    }
});
```

### فرم ورود

```javascript
const loginForm = new MirageFormValidation({
    form: '#login-form',
    fields: {
        username: {
            validators: ['required', 'minLength:3'],
            required: true
        },
        password: {
            validators: ['required', 'minLength:6'],
            required: true
        }
    },
    showSummary: false,
    onSubmit: async (data) => {
        // نمایش لودینگ
        const submitBtn = document.querySelector('#login-form button[type="submit"]');
        submitBtn.innerHTML = '<i class="mir-spinner"></i> در حال ورود...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                window.location.href = '/dashboard';
            } else {
                alert('نام کاربری یا رمز عبور اشتباه است');
            }
        } catch (error) {
            alert('خطا در ورود');
        } finally {
            submitBtn.innerHTML = 'ورود';
            submitBtn.disabled = false;
        }
    }
});
```

### فرم پروفایل

```javascript
const profileForm = new MirageFormValidation({
    form: '#profile-form',
    fields: {
        displayName: {
            validators: ['required', 'persian', 'minLength:2', 'maxLength:50'],
            required: true
        },
        bio: {
            validators: ['maxLength:500'],
            required: false
        },
        website: {
            validators: ['url'],
            required: false
        },
        birthDate: {
            validators: ['date'],
            required: false
        },
        gender: {
            validators: ['required'],
            required: true
        }
    },
    validateOnInput: true,
    showTooltips: true,
    onSubmit: async (data) => {
        // ذخیره پروفایل
        await saveProfile(data);
        alert('پروفایل با موفقیت به‌روزرسانی شد');
    }
});
```

## شخصی‌سازی CSS

### کلاس‌های اصلی

```css
/* فیلد با خطا */
.mir-form-field.mir-has-error {
    /* استایل فیلد دارای خطا */
}

/* فیلد موفق */
.mir-form-field.mir-has-success {
    /* استایل فیلد موفق */
}

/* پیام خطا */
.mir-form-message.mir-error {
    /* استایل پیام خطا */
}

/* خلاصه خطاها */
.mir-form-summary.mir-error {
    /* استایل خلاصه خطاها */
}
```

### تم‌های رنگی

```css
/* تم قرمز برای خطاها */
.mir-form-field.mir-has-error .mir-input {
    border-color: #ef4444;
    background: rgba(239, 68, 68, 0.05);
}

/* تم سبز برای موفقیت */
.mir-form-field.mir-has-success .mir-input {
    border-color: #10b981;
    background: rgba(16, 185, 129, 0.05);
}

/* تم زرد برای هشدار */
.mir-form-field.mir-has-warning .mir-input {
    border-color: #f59e0b;
    background: rgba(245, 158, 11, 0.05);
}
```

## نکات و بهترین شیوه‌ها

### بهینه‌سازی عملکرد

1. **Debounce**: از تأخیر مناسب برای اعتبارسنجی استفاده کنید
2. **Async**: اعتبارسنج‌های سرور را async تعریف کنید
3. **Cache**: نتایج اعتبارسنجی را کش کنید

### تجربه کاربری

1. **پیام‌های واضح**: خطاها را به زبان ساده و فارسی بنویسید
2. **راهنمایی**: از tooltip برای راهنمایی استفاده کنید
3. **انیمیشن**: از انیمیشن‌های نرم استفاده کنید

### دسترسی‌پذیری

1. **ARIA**: تمام پیام‌ها دارای ARIA labels هستند
2. **کیبورد**: قابل استفاده با کیبورد
3. **صفحه‌خوان**: سازگار با صفحه‌خوان‌ها

## عیب‌یابی

### مشکلات متداول

**اعتبارسنجی کار نمی‌کند:**
- بررسی کنید که CSS و JS لود شده باشند
- تنظیمات fields را بررسی کنید
- از console خطاها را بررسی کنید

**پیام‌های خطا نمایش داده نمی‌شوند:**
- ساختار HTML را بررسی کنید
- کلاس‌های CSS را بررسی کنید

**اعتبارسنج سفارشی کار نمی‌کند:**
- تابع اعتبارسنج را بررسی کنید
- مقدار برگشتی را بررسی کنید

### لاگ‌ها

```javascript
// فعال‌سازی لاگ‌ها
const validator = new MirageFormValidation({
    form: '#my-form',
    fields: { /* ... */ },
    onValidate: (fieldName, result) => {
        console.log('Validation:', fieldName, result);
    },
    onError: (errors) => {
        console.log('Form errors:', errors);
    }
});
```

## پشتیبانی

برای گزارش مشکلات یا درخواست ویژگی‌های جدید:

- **ایمیل**: support@mirage-ui.com
- **گیت‌هاب**: https://github.com/mirage-ui/issues
- **مستندات**: https://docs.mirage-ui.com

## لایسنس

این کامپوننت تحت لایسنس MIT منتشر شده است.