# سیستم هشدار میراژ - Mirage Alert System

## فهرست مطالب

- [معرفی](#معرفی)
- [نصب و راه‌اندازی](#نصب-و-راه‌اندازی)
- [استفاده اساسی](#استفاده-اساسی)
- [انواع هشدار](#انواع-هشدار)
- [موقعیت‌ها و اندازه‌ها](#موقعیت‌ها-و-اندازه‌ها)
- [روش‌های جاوا اسکریپت](#روش‌های-جاوا-اسکریپت)
- [نمونه‌های کاربردی](#نمونه‌های-کاربردی)
- [تنظیمات پیشرفته](#تنظیمات-پیشرفته)

## معرفی

سیستم هشدار میراژ مجموعه‌ای کامل و قدرتمند از کامپوننت‌های اطلاع‌رسانی برای رابط‌های کاربری فارسی است. این سیستم شامل انواع مختلف هشدارها، اعلان‌ها و پیام‌های وضعیت با پشتیبانی کامل از RTL، انیمیشن‌های زیبا و قابلیت‌های پیشرفته است.

### ویژگی‌های کلیدی

- ✅ **پشتیبانی کامل RTL** - بهینه‌سازی برای متن و اعداد فارسی
- ✅ **انواع مختلف هشدار** - موفقیت، هشدار، خطا، اطلاعیه
- ✅ **بسته شدن خودکار** - با تایمر و نوار پیشرفت
- ✅ **موقعیت‌یابی انعطاف‌پذیر** - ۶ موقعیت مختلف صفحه
- ✅ **انیمیشن‌های زیبا** - ورود و خروج نرم
- ✅ **قابل دسترس** - سازگاری کامل با screen readers
- ✅ **واکنش‌گرا** - سازگار با تمام اندازه‌های صفحه
- ✅ **اعمال سفارشی** - دکمه‌های عمل در هشدارها

## نصب و راه‌اندازی

### 1. وارد کردن فایل‌ها

```html
<!-- CSS -->
<link rel="stylesheet" href="components/alert/alert.css">

<!-- JavaScript -->
<script src="components/alert/alert.js"></script>

<!-- Feather Icons (برای آیکون‌ها) -->
<script src="https://unpkg.com/feather-icons"></script>
```

### 2. وابستگی‌ها

```html
<!-- میراژ دیزاین سیستم -->
<link rel="stylesheet" href="assets/css/mirage-styles.css">

<!-- فونت یکان باخ -->
<link rel="stylesheet" href="assets/css/fonts-yekanbakh.css">
```

## استفاده اساسی

### هشدار ساده

```javascript
// ایجاد هشدار جدید
const alert = new MirageAlert({
    type: 'success',
    title: 'عملیات موفق',
    message: 'اطلاعات با موفقیت ذخیره شد!',
    autoClose: true,
    duration: 5000
});

// نمایش هشدار
alert.show();
```

### HTML Structure

```html
<div class="mir-alert mir-alert-success">
    <div class="mir-alert-icon">
        <i data-feather="check-circle"></i>
    </div>
    <div class="mir-alert-content">
        <div class="mir-alert-title">عملیات موفق</div>
        <div class="mir-alert-message">اطلاعات با موفقیت ذخیره شد!</div>
    </div>
    <button class="mir-alert-close" aria-label="بستن هشدار">
        <i data-feather="x"></i>
    </button>
</div>
```

## انواع هشدار

### 1. هشدار موفقیت (Success)

```javascript
MirageAlert.success('عملیات موفق', 'اطلاعات با موفقیت ذخیره شد!');
```

### 2. هشدار خطا (Error)

```javascript
MirageAlert.error('خطا', 'خطایی در سیستم رخ داده است. لطفاً دوباره تلاش کنید.');
```

### 3. هشدار اخطار (Warning)

```javascript
MirageAlert.warning('هشدار', 'لطفاً تمام فیلدهای الزامی را پر کنید.');
```

### 4. هشدار اطلاعیه (Info)

```javascript
MirageAlert.info('اطلاعیه', 'سیستم به‌روزرسانی جدید دریافت کرده است.');
```

### 5. اعلان ساده (Notification)

```javascript
MirageAlert.notify('پیام جدید دریافت شد', {
    position: 'top-right',
    showProgress: true
});
```

## موقعیت‌ها و اندازه‌ها

### موقعیت‌های مختلف

```javascript
// موقعیت‌های مختلف
MirageAlert.success('موفقیت', 'پیام', { position: 'top-right' });    // راست بالا
MirageAlert.info('اطلاعیه', 'پیام', { position: 'top-left' });      // چپ بالا
MirageAlert.warning('هشدار', 'پیام', { position: 'top-center' });    // وسط بالا
MirageAlert.error('خطا', 'پیام', { position: 'bottom-right' });      // راست پایین
MirageAlert.info('اطلاعیه', 'پیام', { position: 'bottom-left' });    // چپ پایین
MirageAlert.success('موفقیت', 'پیام', { position: 'bottom-center' }); // وسط پایین
```

### اندازه‌های مختلف

```javascript
// اندازه‌های مختلف
new MirageAlert({ size: 'sm' });   // کوچک
new MirageAlert({ size: 'md' });   // متوسط (پیش‌فرض)
new MirageAlert({ size: 'lg' });   // بزرگ
```

## روش‌های جاوا اسکریپت

### ایجاد و مدیریت هشدار

```javascript
const alert = new MirageAlert(options);

// روش‌های اساسی
alert.show();        // نمایش هشدار
alert.close();       // بستن هشدار
alert.remove();      // حذف کامل هشدار

// مدیریت بسته شدن خودکار
alert.pauseAutoClose();  // متوقف کردن تایمر
alert.resumeAutoClose(); // ادامه تایمر
```

### Event Listeners

```javascript
// گوش دادن به رویدادها
document.addEventListener('mirageAlert:show', (e) => {
    console.log('هشدار نمایش داده شد', e.detail.alert);
});

document.addEventListener('mirageAlert:close', (e) => {
    console.log('هشدار بسته شد', e.detail.alert);
});

document.addEventListener('mirageAlert:remove', (e) => {
    console.log('هشدار حذف شد', e.detail.alert);
});
```

### Data Attributes

```html
<!-- هشدار موفقیت -->
<button data-mir-alert="success" 
        data-mir-alert-title="موفقیت" 
        data-mir-alert-message="عملیات انجام شد"
        data-mir-alert-position="top-right">
    نمایش موفقیت
</button>

<!-- هشدار خطا -->
<button data-mir-alert="error" 
        data-mir-alert-title="خطا" 
        data-mir-alert-message="خطایی رخ داده است"
        data-mir-alert-auto-close="false">
    نمایش خطا
</button>

<!-- هشدار با تنظیمات سفارشی -->
<button data-mir-alert="warning" 
        data-mir-alert-title="هشدار" 
        data-mir-alert-message="لطفاً توجه کنید"
        data-mir-alert-duration="3000"
        data-mir-alert-size="lg">
    نمایش هشدار
</button>
```

## نمونه‌های کاربردی

### هشدار ذخیره فرم

```javascript
function saveForm() {
    // شبیه‌سازی ذخیره فرم
    const loadingAlert = MirageAlert.info('در حال ذخیره...', 'لطفاً صبر کنید', {
        autoClose: false,
        closable: false
    });

    // شبیه‌سازی درخواست
    setTimeout(() => {
        loadingAlert.close();
        
        // نمایش نتیجه
        MirageAlert.success('ذخیره موفق', 'اطلاعات با موفقیت ذخیره شد!', {
            showProgress: true,
            duration: 3000
        });
    }, 2000);
}
```

### هشدار اعتبارسنجی فرم

```javascript
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name) {
        errors.push('نام الزامی است');
    }
    
    if (!formData.email) {
        errors.push('ایمیل الزامی است');
    } else if (!isValidEmail(formData.email)) {
        errors.push('ایمیل معتبر نیست');
    }
    
    if (errors.length > 0) {
        MirageAlert.error('خطا در اعتبارسنجی', errors.join('<br>'), {
            autoClose: false,
            actions: [
                {
                    text: 'متوجه شدم',
                    onClick: (e, alert) => alert.close()
                }
            ]
        });
        return false;
    }
    
    return true;
}
```

### هشدار تأیید عملیات

```javascript
function deleteItem(itemId) {
    const confirmAlert = new MirageAlert({
        type: 'warning',
        title: 'تأیید حذف',
        message: 'آیا مطمئن هستید که می‌خواهید این آیتم را حذف کنید؟',
        autoClose: false,
        actions: [
            {
                text: 'لغو',
                onClick: (e, alert) => alert.close()
            },
            {
                text: 'حذف',
                onClick: (e, alert) => {
                    alert.close();
                    performDelete(itemId);
                }
            }
        ]
    });
    
    confirmAlert.show();
}

function performDelete(itemId) {
    MirageAlert.info('در حال حذف...', '', {
        autoClose: false,
        closable: false
    });
    
    // شبیه‌سازی حذف
    setTimeout(() => {
        MirageAlert.clearAll();
        MirageAlert.success('حذف موفق', 'آیتم با موفقیت حذف شد');
    }, 1500);
}
```

### هشدار آپلود فایل

```javascript
function uploadFile(file) {
    const uploadAlert = new MirageAlert({
        type: 'info',
        title: 'آپلود فایل',
        message: `در حال آپلود ${file.name}...`,
        autoClose: false,
        closable: false,
        showProgress: true
    });
    
    uploadAlert.show();
    
    // شبیه‌سازی آپلود
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        
        if (progress >= 100) {
            clearInterval(interval);
            uploadAlert.close();
            
            MirageAlert.success('آپلود موفق', 'فایل با موفقیت آپلود شد!', {
                showProgress: true
            });
        }
    }, 200);
}
```

### هشدار اعلان در زمان واقعی

```javascript
class NotificationManager {
    constructor() {
        this.notifications = [];
    }
    
    addNotification(data) {
        const notification = MirageAlert.notify(data.message, {
            title: data.title || 'اعلان جدید',
            position: 'top-right',
            duration: 5000,
            showProgress: true,
            actions: data.actions || []
        });
        
        this.notifications.push(notification);
        return notification;
    }
    
    clearAll() {
        MirageAlert.clearAll();
        this.notifications = [];
    }
}

// استفاده
const notificationManager = new NotificationManager();

// اعلان پیام جدید
notificationManager.addNotification({
    title: 'پیام جدید',
    message: 'شما یک پیام جدید دریافت کرده‌اید',
    actions: [
        {
            text: 'مشاهده',
            onClick: () => console.log('مشاهده پیام')
        }
    ]
});
```

## تنظیمات پیشرفته

### گزینه‌های سازندگی

```javascript
const alert = new MirageAlert({
    type: 'success',           // نوع هشدار
    title: 'عنوان',           // عنوان هشدار
    message: 'پیام',          // متن پیام
    closable: true,           // قابلیت بستن
    autoClose: true,          // بسته شدن خودکار
    duration: 5000,           // مدت زمان (میلی‌ثانیه)
    position: 'top-right',    // موقعیت
    size: 'md',               // اندازه
    showProgress: true,       // نمایش نوار پیشرفت
    icon: 'custom-icon',      // آیکون سفارشی
    actions: [                // اعمال سفارشی
        {
            text: 'عمل',
            onClick: (e, alert) => {}
        }
    ]
});
```

### CSS Classes سفارشی

```css
/* هشدار سفارشی */
.mir-alert-custom {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.mir-alert-custom .mir-alert-icon {
    color: white;
}

.mir-alert-custom .mir-alert-close:hover {
    background: rgba(255, 255, 255, 0.2);
}

/* هشدار برای فرم‌ها */
.mir-alert-form {
    margin-bottom: var(--mir-space-3);
    padding: var(--mir-space-2) var(--mir-space-3);
    font-size: var(--mir-text-sm);
}
```

### مدیریت چندین هشدار

```javascript
class AlertManager {
    constructor() {
        this.alerts = [];
        this.maxAlerts = 5;
    }
    
    add(options) {
        // حذف هشدارهای اضافی
        if (this.alerts.length >= this.maxAlerts) {
            this.alerts[0].close();
            this.alerts.shift();
        }
        
        const alert = new MirageAlert(options);
        this.alerts.push(alert);
        
        // حذف از لیست هنگام بسته شدن
        alert.element.addEventListener('mirageAlert:remove', () => {
            const index = this.alerts.indexOf(alert);
            if (index > -1) {
                this.alerts.splice(index, 1);
            }
        });
        
        return alert.show();
    }
    
    clearAll() {
        this.alerts.forEach(alert => alert.close());
        this.alerts = [];
    }
    
    getByType(type) {
        return this.alerts.filter(alert => alert.options.type === type);
    }
}

// استفاده
const alertManager = new AlertManager();

alertManager.add({
    type: 'success',
    title: 'موفقیت',
    message: 'عملیات انجام شد'
});
```

## یوتیلیتی‌های فارسی

### تبدیل اعداد فارسی

```javascript
// تبدیل خودکار اعداد انگلیسی به فارسی
const persianMessage = MirageAlert.convertToPersianNumbers('شما 5 پیام جدید دارید');
// نتیجه: 'شما ۵ پیام جدید دارید'

MirageAlert.success('اعلان', persianMessage);
```

### فرمت تاریخ فارسی

```javascript
// فرمت تاریخ فارسی
const persianDate = MirageAlert.formatPersianDate(new Date());
// نتیجه: '۲۵ تیر ۱۴۰۳'

MirageAlert.info('تاریخ', `آخرین بروزرسانی: ${persianDate}`);
```

### قالب‌بندی پیام‌ها

```javascript
// قالب‌بندی پیام‌های رایج
const AlertTemplates = {
    saveSuccess: () => MirageAlert.success('ذخیره موفق', 'اطلاعات با موفقیت ذخیره شد'),
    deleteSuccess: () => MirageAlert.success('حذف موفق', 'آیتم با موفقیت حذف شد'),
    validationError: (errors) => MirageAlert.error('خطا در اعتبارسنجی', errors.join('<br>')),
    networkError: () => MirageAlert.error('خطای شبکه', 'مشکلی در ارتباط با سرور وجود دارد')
};

// استفاده
AlertTemplates.saveSuccess();
AlertTemplates.validationError(['نام الزامی است', 'ایمیل نامعتبر است']);
```

## قابلیت‌های دسترسی

### کلیدهای میانبر

- `ESC` - بستن هشدار
- `Tab` - حرکت بین دکمه‌های عمل
- `Enter` - فعال کردن دکمه فوکوس شده
- `Space` - فعال کردن دکمه فوکوس شده

### ARIA Attributes

```html
<div class="mir-alert" 
     role="alert" 
     aria-live="assertive" 
     aria-atomic="true"
     dir="rtl">
    
    <div class="mir-alert-content">
        <div class="mir-alert-title" id="alert-title">عنوان هشدار</div>
        <div class="mir-alert-message" id="alert-message">متن پیام</div>
    </div>
    
    <button class="mir-alert-close" 
            aria-label="بستن هشدار"
            aria-describedby="alert-title alert-message">
        <i data-feather="x"></i>
    </button>
</div>
```

## حل مشکلات رایج

### مشکل: هشدار نمایش داده نمی‌شود

```javascript
// بررسی وارد کردن فایل‌ها
console.log(typeof MirageAlert); // باید 'function' باشد

// بررسی وجود CSS
const cssLoaded = document.querySelector('link[href*="alert.css"]');
console.log(cssLoaded); // باید element برگرداند

// بررسی container
const container = document.querySelector('.mir-alert-container');
console.log(container); // باید element برگرداند
```

### مشکل: انیمیشن کار نمی‌کند

```css
/* اطمینان از وجود transition */
.mir-alert {
    transition: all 0.3s ease;
}

.mir-alert-enter-active {
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

### مشکل: RTL درست کار نمی‌کند

```css
/* تنظیم صحیح RTL */
.mir-alert {
    direction: rtl;
    text-align: right;
}

.mir-alert-container {
    direction: rtl;
}
```

## نکات بهینه‌سازی

### کارایی

```javascript
// استفاده مجدد از AlertManager
const alertManager = new AlertManager();

// بهتر از ایجاد هشدار جدید هر بار
function showAlert(type, message) {
    alertManager.add({ type, message });
}
```

### حافظه

```javascript
// پاک کردن هشدارها بعد از مدت زمان
setInterval(() => {
    MirageAlert.clearAll();
}, 300000); // هر 5 دقیقه
```

### عملکرد

```javascript
// محدود کردن تعداد هشدارها
const MAX_ALERTS = 3;

function addAlert(options) {
    const containers = document.querySelectorAll('.mir-alert');
    if (containers.length >= MAX_ALERTS) {
        // حذف قدیمی‌ترین هشدار
        containers[0].querySelector('.mir-alert-close').click();
    }
    
    return new MirageAlert(options).show();
}
```

---

**میراژ دیزاین سیستم 2025** - سیستم هشدار مدرن برای رابط‌های کاربری فارسی

*پشتیبانی کامل از RTL، انیمیشن‌های زیبا، بسته شدن خودکار و قابلیت‌های دسترسی پیشرفته*