# سیستم اعلان موقت میراژ - Mirage Toast System

## فهرست مطالب

- [معرفی](#معرفی)
- [نصب و راه‌اندازی](#نصب-و-راه‌اندازی)
- [استفاده اساسی](#استفاده-اساسی)
- [انواع اعلان](#انواع-اعلان)
- [موقعیت‌ها و اندازه‌ها](#موقعیت‌ها-و-اندازه‌ها)
- [روش‌های جاوا اسکریپت](#روش‌های-جاوا-اسکریپت)
- [تنظیمات پیشرفته](#تنظیمات-پیشرفته)
- [نمونه‌های کاربردی](#نمونه‌های-کاربردی)

## معرفی

سیستم اعلان موقت میراژ (Toast Messages) راه حلی مدرن و بهینه شده برای نمایش اعلان‌های زودگذر در رابط‌های کاربری فارسی است. این سیستم شامل انواع مختلف اعلان‌ها، انیمیشن‌های زیبا، و قابلیت‌های پیشرفته با پشتیبانی کامل از RTL است.

### ویژگی‌های کلیدی

- ✅ **پشتیبانی کامل RTL** - بهینه‌سازی برای متن و اعداد فارسی
- ✅ **انیمیشن‌های زیبا** - ورود و خروج نرم با حالت‌های مختلف
- ✅ **بسته شدن خودکار** - تایمر هوشمند با قابلیت توقف
- ✅ **موقعیت‌یابی انعطاف‌پذیر** - ۶ موقعیت مختلف صفحه
- ✅ **نوار پیشرفت** - نمایش زمان باقی‌مانده
- ✅ **قابل دسترس** - سازگاری کامل با screen readers
- ✅ **واکنش‌گرا** - بهینه‌سازی برای موبایل
- ✅ **اعمال سفارشی** - دکمه‌های عمل در اعلان‌ها
- ✅ **مدیریت پشته** - نمایش چندین اعلان همزمان

## نصب و راه‌اندازی

### 1. وارد کردن فایل‌ها

```html
<!-- CSS -->
<link rel="stylesheet" href="components/toast/toast.css">

<!-- JavaScript -->
<script src="components/toast/toast.js"></script>

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

### اعلان ساده

```javascript
// ایجاد اعلان موقت جدید
const toast = new MirageToast({
    type: 'success',
    message: 'عملیات با موفقیت انجام شد!',
    duration: 3000,
    position: 'top-right'
});

// نمایش اعلان
toast.show();
```

### استفاده سریع

```javascript
// روش‌های سریع
MirageToast.success('فایل با موفقیت ذخیره شد');
MirageToast.error('خطایی رخ داد');
MirageToast.warning('لطفاً توجه کنید');
MirageToast.info('اطلاعیه جدید');
```

## انواع اعلان

### 1. اعلان موفقیت (Success)

```javascript
MirageToast.success('عملیات موفق بود');
MirageToast.success('فایل آپلود شد', {
    title: 'موفقیت',
    position: 'top-center',
    duration: 3000
});
```

### 2. اعلان خطا (Error)

```javascript
MirageToast.error('خطایی رخ داده است');
MirageToast.error('اتصال به سرور برقرار نشد', {
    title: 'خطای شبکه',
    duration: 5000
});
```

### 3. اعلان اخطار (Warning)

```javascript
MirageToast.warning('لطفاً فیلدهای الزامی را پر کنید');
MirageToast.warning('حجم فایل زیاد است', {
    title: 'هشدار',
    actions: [
        {
            text: 'متوجه شدم',
            onClick: (e, toast) => toast.close()
        }
    ]
});
```

### 4. اعلان اطلاعیه (Info)

```javascript
MirageToast.info('سیستم به‌روزرسانی شد');
MirageToast.info('۵ پیام جدید دارید', {
    title: 'اطلاعیه',
    showProgress: true
});
```

### 5. اعلان در حال بارگیری (Loading)

```javascript
const loadingToast = MirageToast.loading('در حال پردازش...');

// بعد از اتمام کار
setTimeout(() => {
    loadingToast.close();
    MirageToast.success('پردازش تمام شد');
}, 3000);
```

### 6. اعلان ساده (Notification)

```javascript
MirageToast.notify('پیام جدید دریافت شد');
MirageToast.notify('کاربر جدید عضو شد', {
    position: 'bottom-right',
    duration: 4000
});
```

## موقعیت‌ها و اندازه‌ها

### موقعیت‌های مختلف

```javascript
// موقعیت‌های مختلف
MirageToast.success('پیام', { position: 'top-right' });    // راست بالا (پیش‌فرض)
MirageToast.info('پیام', { position: 'top-left' });       // چپ بالا
MirageToast.warning('پیام', { position: 'top-center' });  // وسط بالا
MirageToast.error('پیام', { position: 'bottom-right' });  // راست پایین
MirageToast.info('پیام', { position: 'bottom-left' });    // چپ پایین
MirageToast.success('پیام', { position: 'bottom-center' }); // وسط پایین
```

### اندازه‌های مختلف

```javascript
// اندازه‌های مختلف
MirageToast.info('پیام کوچک', { size: 'sm' });   // کوچک
MirageToast.info('پیام متوسط', { size: 'md' });  // متوسط (پیش‌فرض)
MirageToast.info('پیام بزرگ', { size: 'lg' });   // بزرگ
```

## روش‌های جاوا اسکریپت

### ایجاد و مدیریت اعلان

```javascript
const toast = new MirageToast(options);

// روش‌های اساسی
toast.show();           // نمایش اعلان
toast.close();          // بستن اعلان
toast.remove();         // حذف کامل اعلان

// مدیریت تایمر
toast.pauseAutoClose();  // متوقف کردن تایمر
toast.resumeAutoClose(); // ادامه تایمر
```

### Event Listeners

```javascript
// گوش دادن به رویدادها
document.addEventListener('mirageToast:show', (e) => {
    console.log('اعلان نمایش داده شد', e.detail.toast);
});

document.addEventListener('mirageToast:close', (e) => {
    console.log('اعلان بسته شد', e.detail.toast);
});

document.addEventListener('mirageToast:remove', (e) => {
    console.log('اعلان حذف شد', e.detail.toast);
});
```

### Data Attributes

```html
<!-- اعلان موفقیت -->
<button data-mir-toast="success" 
        data-mir-toast-message="عملیات موفق بود"
        data-mir-toast-position="top-right">
    نمایش موفقیت
</button>

<!-- اعلان خطا -->
<button data-mir-toast="error" 
        data-mir-toast-title="خطا"
        data-mir-toast-message="خطایی رخ داده است"
        data-mir-toast-duration="5000">
    نمایش خطا
</button>

<!-- اعلان با تنظیمات سفارشی -->
<button data-mir-toast="info" 
        data-mir-toast-title="اطلاعیه"
        data-mir-toast-message="پیام مهم"
        data-mir-toast-size="lg"
        data-mir-toast-progress="true">
    نمایش اطلاعیه
</button>
```

## تنظیمات پیشرفته

### گزینه‌های سازندگی

```javascript
const toast = new MirageToast({
    type: 'success',           // نوع اعلان
    title: 'عنوان',           // عنوان اعلان
    message: 'پیام',          // متن پیام
    closable: true,           // قابلیت بستن
    autoClose: true,          // بسته شدن خودکار
    duration: 4000,           // مدت زمان (میلی‌ثانیه)
    position: 'top-right',    // موقعیت
    size: 'md',               // اندازه
    showProgress: true,       // نمایش نوار پیشرفت
    icon: 'custom-icon',      // آیکون سفارشی
    actions: [                // اعمال سفارشی
        {
            text: 'عمل',
            onClick: (e, toast) => {}
        }
    ]
});
```

### مدیریت پشته

```javascript
// مدیریت تعداد اعلان‌ها
console.log(MirageToast.getToastCount()); // تعداد اعلان‌های فعال

// دریافت لیست اعلان‌های فعال
const activeToasts = MirageToast.getActiveToasts();

// پاک کردن همه اعلان‌ها
MirageToast.clearAll();

// پاک کردن اعلان‌ها بر اساس نوع
MirageToast.clearByType('error');
```

## نمونه‌های کاربردی

### اعلان آپلود فایل

```javascript
function uploadFile(file) {
    const uploadToast = MirageToast.loading(`در حال آپلود ${file.name}...`);
    
    // شبیه‌سازی آپلود
    const uploadPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.2) {
                resolve('success');
            } else {
                reject('error');
            }
        }, 3000);
    });
    
    uploadPromise
        .then(() => {
            uploadToast.close();
            MirageToast.success('فایل با موفقیت آپلود شد');
        })
        .catch(() => {
            uploadToast.close();
            MirageToast.error('خطا در آپلود فایل');
        });
}
```

### اعلان با استفاده از Promise

```javascript
// استفاده از روش promise
const saveDataPromise = fetch('/api/save', {
    method: 'POST',
    body: JSON.stringify(data)
});

MirageToast.promise(saveDataPromise, {
    loading: 'در حال ذخیره...',
    success: 'اطلاعات ذخیره شد',
    error: 'خطا در ذخیره اطلاعات'
});
```

### اعلان‌های متوالی

```javascript
// نمایش اعلان‌های متوالی
const notifications = [
    { type: 'info', message: 'شروع پردازش' },
    { type: 'success', message: 'مرحله اول تمام شد' },
    { type: 'success', message: 'مرحله دوم تمام شد' },
    { type: 'success', message: 'پردازش کامل شد' }
];

MirageToast.queue(notifications, 1000); // هر ثانیه یکی
```

### اعلان تأیید عملیات

```javascript
function confirmDelete(itemId) {
    MirageToast.warning('آیا مطمئن هستید؟', {
        title: 'تأیید حذف',
        autoClose: false,
        actions: [
            {
                text: 'لغو',
                onClick: (e, toast) => toast.close()
            },
            {
                text: 'حذف',
                onClick: (e, toast) => {
                    toast.close();
                    performDelete(itemId);
                }
            }
        ]
    });
}

function performDelete(itemId) {
    const deletePromise = fetch(`/api/delete/${itemId}`, {
        method: 'DELETE'
    });
    
    MirageToast.promise(deletePromise, {
        loading: 'در حال حذف...',
        success: 'آیتم حذف شد',
        error: 'خطا در حذف آیتم'
    });
}
```

### اعلان‌های لحظه‌ای

```javascript
// سیستم اعلان‌های لحظه‌ای
class LiveNotifications {
    constructor() {
        this.connect();
    }
    
    connect() {
        // اتصال به WebSocket یا SSE
        this.socket = new WebSocket('ws://localhost:8080');
        
        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.handleNotification(data);
        };
    }
    
    handleNotification(data) {
        const options = {
            position: 'top-right',
            duration: 5000,
            showProgress: true
        };
        
        switch (data.type) {
            case 'message':
                MirageToast.info(data.message, {
                    title: 'پیام جدید',
                    ...options,
                    actions: [
                        {
                            text: 'مشاهده',
                            onClick: () => this.openMessage(data.id)
                        }
                    ]
                });
                break;
                
            case 'order':
                MirageToast.success(data.message, {
                    title: 'سفارش جدید',
                    ...options
                });
                break;
                
            case 'warning':
                MirageToast.warning(data.message, {
                    title: 'اخطار سیستم',
                    ...options
                });
                break;
        }
    }
    
    openMessage(messageId) {
        // باز کردن پیام
        window.location.href = `/messages/${messageId}`;
    }
}

// شروع سیستم اعلان‌ها
const liveNotifications = new LiveNotifications();
```

### اعلان‌های فرم

```javascript
// اعتبارسنجی فرم با اعلان
function validateAndSubmitForm(formData) {
    const errors = validateForm(formData);
    
    if (errors.length > 0) {
        // نمایش خطاها
        errors.forEach((error, index) => {
            setTimeout(() => {
                MirageToast.error(error, {
                    position: 'top-center',
                    duration: 4000
                });
            }, index * 200);
        });
        return false;
    }
    
    // ارسال فرم
    const submitPromise = submitForm(formData);
    
    return MirageToast.promise(submitPromise, {
        loading: 'در حال ارسال فرم...',
        success: 'فرم با موفقیت ارسال شد',
        error: 'خطا در ارسال فرم'
    });
}
```

### اعلان‌های تعاملی

```javascript
// اعلان با اعمال پیشرفته
function showInteractiveNotification() {
    MirageToast.info('شما یک پیام جدید دارید', {
        title: 'اطلاعیه',
        autoClose: false,
        actions: [
            {
                text: 'مشاهده',
                onClick: (e, toast) => {
                    toast.close();
                    openMessage();
                }
            },
            {
                text: 'بعداً',
                onClick: (e, toast) => {
                    toast.close();
                    scheduleReminder();
                }
            },
            {
                text: 'حذف',
                onClick: (e, toast) => {
                    toast.close();
                    deleteMessage();
                }
            }
        ]
    });
}
```

## یوتیلیتی‌های فارسی

### تبدیل اعداد فارسی

```javascript
// تبدیل خودکار اعداد انگلیسی به فارسی
const persianMessage = MirageToast.convertToPersianNumbers('شما 5 پیام جدید دارید');
// نتیجه: 'شما ۵ پیام جدید دارید'

MirageToast.info(persianMessage);
```

### فرمت زمان فارسی

```javascript
// فرمت زمان فارسی
const timeString = MirageToast.formatPersianTime(125); // ۱۲۵ ثانیه
// نتیجه: '۲ دقیقه و ۵ ثانیه'

MirageToast.info(`زمان باقی‌مانده: ${timeString}`);
```

## قابلیت‌های دسترسی

### کلیدهای میانبر

- `ESC` - بستن اعلان
- `Tab` - حرکت بین دکمه‌های عمل
- `Enter` - فعال کردن دکمه فوکوس شده
- `Space` - فعال کردن دکمه فوکوس شده

### ARIA Attributes

```html
<div class="mir-toast" 
     role="status" 
     aria-live="polite" 
     aria-atomic="true"
     dir="rtl">
    
    <div class="mir-toast-content">
        <div class="mir-toast-message">پیام اعلان</div>
    </div>
    
    <button class="mir-toast-close" 
            aria-label="بستن اعلان">
        <i data-feather="x"></i>
    </button>
</div>
```

## حل مشکلات رایج

### مشکل: اعلان نمایش داده نمی‌شود

```javascript
// بررسی وارد کردن فایل‌ها
console.log(typeof MirageToast); // باید 'function' باشد

// بررسی وجود CSS
const cssLoaded = document.querySelector('link[href*="toast.css"]');
console.log(cssLoaded); // باید element برگرداند

// بررسی container
const container = document.querySelector('.mir-toast-container');
console.log(container); // باید element برگرداند
```

### مشکل: انیمیشن کار نمی‌کند

```css
/* اطمینان از وجود transition */
.mir-toast {
    transition: all 0.3s ease;
}

.mir-toast-enter-active {
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

### مشکل: RTL درست کار نمی‌کند

```css
/* تنظیم صحیح RTL */
.mir-toast {
    direction: rtl;
    text-align: right;
}

.mir-toast-container {
    direction: rtl;
}
```

## نکات بهینه‌سازی

### کارایی

```javascript
// محدود کردن تعداد اعلان‌ها
const MAX_TOASTS = 5;

function addToast(options) {
    const count = MirageToast.getToastCount();
    if (count >= MAX_TOASTS) {
        // پاک کردن قدیمی‌ترین اعلان
        MirageToast.clearByType('info');
    }
    
    return new MirageToast(options).show();
}
```

### حافظه

```javascript
// پاک کردن اعلان‌ها بعد از مدت زمان
setInterval(() => {
    MirageToast.clearAll();
}, 300000); // هر 5 دقیقه
```

### عملکرد موبایل

```javascript
// تنظیمات مخصوص موبایل
function isMobile() {
    return window.innerWidth <= 768;
}

function showMobileOptimizedToast(message) {
    const options = {
        position: isMobile() ? 'top-center' : 'top-right',
        duration: isMobile() ? 3000 : 4000,
        size: isMobile() ? 'sm' : 'md'
    };
    
    MirageToast.info(message, options);
}
```

---

**میراژ دیزاین سیستم 2025** - سیستم اعلان موقت مدرن برای رابط‌های کاربری فارسی

*اعلان‌های زیبا، بهینه‌سازی RTL، انیمیشن‌های نرم و قابلیت‌های دسترسی پیشرفته*