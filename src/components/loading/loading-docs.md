# سیستم حالت‌های بارگیری میراژ - Mirage Loading States

## فهرست مطالب

- [معرفی](#معرفی)
- [نصب و راه‌اندازی](#نصب-و-راه‌اندازی)
- [استفاده اساسی](#استفاده-اساسی)
- [انواع بارگیری](#انواع-بارگیری)
- [اسپینرها](#اسپینرها)
- [اسکلتون‌ها](#اسکلتون‌ها)
- [نوار پیشرفت](#نوار-پیشرفت)
- [روش‌های جاوا اسکریپت](#روش‌های-جاوا-اسکریپت)
- [نمونه‌های کاربردی](#نمونه‌های-کاربردی)

## معرفی

سیستم حالت‌های بارگیری میراژ مجموعه‌ای کامل از کامپوننت‌هایی است که تجربه کاربری بهتری در طول عملیات بارگیری ارائه می‌دهد. این سیستم شامل اسپینرها، اسکلتون‌ها، و نوار پیشرفت با پشتیبانی کامل از RTL فارسی است.

### ویژگی‌های کلیدی

- ✅ **انواع مختلف اسپینر** - دایره‌ای، نقطه‌ای، پالس، میله‌ای، حلقه‌ای، موج
- ✅ **اسکلتون‌های هوشمند** - متن، آواتار، دکمه، کارت، جدول
- ✅ **نوار پیشرفت** - معین و نامعین با پشتیبانی درصد
- ✅ **پشتیبانی RTL کامل** - بهینه‌سازی برای فارسی
- ✅ **اعداد فارسی** - تبدیل خودکار اعداد انگلیسی
- ✅ **انیمیشن‌های زیبا** - انیمیشن‌های نرم و حرفه‌ای
- ✅ **قابل دسترس** - سازگاری با screen readers
- ✅ **واکنش‌گرا** - سازگار با تمام اندازه‌ها
- ✅ **موقعیت‌یابی** - مرکز، overlay، تمام صفحه

## نصب و راه‌اندازی

### 1. وارد کردن فایل‌ها

```html
<!-- CSS -->
<link rel="stylesheet" href="components/loading/loading.css">

<!-- JavaScript -->
<script src="components/loading/loading.js"></script>
```

### 2. وابستگی‌ها

```html
<!-- میراژ دیزاین سیستم -->
<link rel="stylesheet" href="assets/css/mirage-styles.css">

<!-- فونت یکان باخ -->
<link rel="stylesheet" href="assets/css/fonts-yekanbakh.css">
```

## استفاده اساسی

### بارگیری ساده

```javascript
// ایجاد اسپینر ساده
const loading = MirageLoading.spinner({
    text: 'در حال بارگیری...',
    size: 'md'
});

// نمایش
loading.show();

// مخفی کردن
loading.hide();
```

### بارگیری با Promise

```javascript
// استفاده با Promise
const dataPromise = fetch('/api/data');

MirageLoading.promise(dataPromise, {
    text: 'در حال دریافت اطلاعات...',
    position: 'fullscreen'
});
```

## انواع بارگیری

### 1. اسپینر (Spinner)

```javascript
// اسپینر دایره‌ای
MirageLoading.spinner({
    variant: 'circle',
    text: 'در حال بارگیری...'
}).show();

// اسپینر نقطه‌ای
MirageLoading.dots({
    text: 'لطفاً صبر کنید...'
}).show();

// اسپینر پالس
MirageLoading.pulse({
    color: 'success',
    size: 'lg'
}).show();
```

### 2. اسکلتون (Skeleton)

```javascript
// اسکلتون متن
MirageLoading.skeleton({
    variant: 'text'
}).show();

// اسکلتون کارت
MirageLoading.skeleton({
    variant: 'card'
}).show();

// اسکلتون آواتار
MirageLoading.skeleton({
    variant: 'avatar',
    size: 'lg'
}).show();
```

### 3. نوار پیشرفت (Progress)

```javascript
// نوار پیشرفت معین
MirageLoading.progress({
    progress: 65,
    text: 'آپلود فایل...'
}).show();

// نوار پیشرفت نامعین
MirageLoading.progress({
    text: 'در حال پردازش...'
}).show();
```

## اسپینرها

### انواع اسپینر

```javascript
// دایره‌ای (Circle)
MirageLoading.spinner({ variant: 'circle' }).show();

// نقطه‌ای (Dots)
MirageLoading.dots().show();

// پالس (Pulse)
MirageLoading.pulse().show();

// میله‌ای (Bars)
MirageLoading.bars().show();

// حلقه‌ای (Ring)
MirageLoading.ring().show();

// موج (Ripple)
MirageLoading.ripple().show();
```

### اندازه‌های اسپینر

```javascript
// اندازه‌های مختلف
MirageLoading.spinner({ size: 'xs' }).show();  // خیلی کوچک
MirageLoading.spinner({ size: 'sm' }).show();  // کوچک
MirageLoading.spinner({ size: 'md' }).show();  // متوسط (پیش‌فرض)
MirageLoading.spinner({ size: 'lg' }).show();  // بزرگ
MirageLoading.spinner({ size: 'xl' }).show();  // خیلی بزرگ
```

### رنگ‌های اسپینر

```javascript
// رنگ‌های مختلف
MirageLoading.spinner({ color: 'primary' }).show();  // آبی (پیش‌فرض)
MirageLoading.spinner({ color: 'success' }).show();  // سبز
MirageLoading.spinner({ color: 'warning' }).show();  // زرد
MirageLoading.spinner({ color: 'error' }).show();    // قرمز
```

## اسکلتون‌ها

### انواع اسکلتون

```javascript
// اسکلتون متن
const textSkeleton = MirageLoading.skeletonText(3);
document.body.appendChild(textSkeleton);

// اسکلتون کارت
const cardSkeleton = MirageLoading.skeletonCard();
document.body.appendChild(cardSkeleton);

// اسکلتون جدول
const tableSkeleton = MirageLoading.skeletonTable(5, 4);
document.body.appendChild(tableSkeleton);
```

### اسکلتون سفارشی

```html
<!-- اسکلتون HTML -->
<div class="mir-skeleton-card">
    <div class="mir-skeleton-card-header">
        <div class="mir-skeleton mir-skeleton-avatar"></div>
        <div style="flex: 1;">
            <div class="mir-skeleton mir-skeleton-text mir-skeleton-w-75"></div>
            <div class="mir-skeleton mir-skeleton-text mir-skeleton-w-50"></div>
        </div>
    </div>
    <div class="mir-skeleton-card-content">
        <div class="mir-skeleton mir-skeleton-text mir-skeleton-w-full"></div>
        <div class="mir-skeleton mir-skeleton-text mir-skeleton-w-full"></div>
        <div class="mir-skeleton mir-skeleton-text mir-skeleton-w-75"></div>
    </div>
</div>
```

## نوار پیشرفت

### نوار پیشرفت معین

```javascript
// ایجاد نوار پیشرفت
const progressTracker = MirageLoading.progressTracker({
    text: 'در حال آپلود...',
    position: 'overlay',
    target: '#upload-area'
});

// به‌روزرسانی پیشرفت
progressTracker.update(25);  // ۲۵٪
progressTracker.update(50);  // ۵۰٪
progressTracker.update(75);  // ۷۵٪
progressTracker.complete();  // ۱۰۰٪
```

### نوار پیشرفت نامعین

```javascript
// نوار پیشرفت بدون درصد مشخص
MirageLoading.progress({
    text: 'در حال پردازش...',
    position: 'fullscreen'
}).show();
```

## روش‌های جاوا اسکریپت

### ایجاد و مدیریت

```javascript
const loading = new MirageLoading({
    type: 'spinner',
    variant: 'circle',
    text: 'در حال بارگیری...',
    position: 'center'
});

// روش‌های اساسی
loading.show();                    // نمایش
loading.hide();                    // مخفی کردن
loading.updateText('متن جدید');    // به‌روزرسانی متن
loading.updateProgress(75);        // به‌روزرسانی پیشرفت
```

### Event Listeners

```javascript
// گوش دادن به رویدادها
document.addEventListener('mirageLoading:show', (e) => {
    console.log('بارگیری شروع شد', e.detail.loading);
});

document.addEventListener('mirageLoading:hide', (e) => {
    console.log('بارگیری پایان یافت', e.detail.loading);
});
```

### موقعیت‌یابی

```javascript
// موقعیت‌های مختلف
MirageLoading.spinner({ position: 'center' }).show();      // مرکز
MirageLoading.overlay('#content').show();                  // روی عنصر
MirageLoading.fullscreen().show();                         // تمام صفحه
```

### Data Attributes

```html
<!-- اسپینر ساده -->
<button data-mir-loading="spinner" 
        data-mir-loading-text="در حال بارگیری..."
        data-mir-loading-duration="3000">
    نمایش اسپینر
</button>

<!-- بارگیری روی عنصر -->
<button data-mir-loading="overlay"
        data-mir-loading-target="#content"
        data-mir-loading-variant="dots">
    نمایش Overlay
</button>

<!-- بارگیری تمام صفحه -->
<button data-mir-loading="fullscreen"
        data-mir-loading-text="در حال پردازش..."
        data-mir-loading-size="lg">
    نمایش تمام صفحه
</button>
```

## نمونه‌های کاربردی

### بارگیری دکمه

```javascript
// بارگیری دکمه
function handleButtonClick() {
    const button = document.querySelector('#submit-btn');
    const buttonLoading = MirageLoading.button(button);
    
    // شبیه‌سازی عملیات
    setTimeout(() => {
        buttonLoading.stop();
    }, 3000);
}
```

### بارگیری فرم

```javascript
// بارگیری فرم
function submitForm() {
    const formLoading = MirageLoading.overlay('#form-container', {
        text: 'در حال ارسال فرم...',
        variant: 'pulse'
    });
    
    formLoading.show();
    
    // ارسال فرم
    fetch('/submit', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            formLoading.hide();
            // نمایش نتیجه
        })
        .catch(error => {
            formLoading.hide();
            // نمایش خطا
        });
}
```

### آپلود فایل با پیشرفت

```javascript
// آپلود فایل
function uploadFile(file) {
    const progressTracker = MirageLoading.progressTracker({
        text: `در حال آپلود ${file.name}...`,
        position: 'fullscreen'
    });
    
    const formData = new FormData();
    formData.append('file', file);
    
    const xhr = new XMLHttpRequest();
    
    xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            progressTracker.update(progress);
            progressTracker.updateText(`آپلود ${file.name} - ${progress}%`);
        }
    };
    
    xhr.onload = () => {
        if (xhr.status === 200) {
            progressTracker.complete();
        } else {
            progressTracker.hide();
        }
    };
    
    xhr.onerror = () => {
        progressTracker.hide();
    };
    
    xhr.open('POST', '/upload');
    xhr.send(formData);
}
```

### بارگیری صفحه

```javascript
// بارگیری صفحه
function loadPage(url) {
    const pageLoading = MirageLoading.fullscreen({
        text: 'در حال بارگیری صفحه...',
        variant: 'ring'
    });
    
    pageLoading.show();
    
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.body.innerHTML = html;
            pageLoading.hide();
        })
        .catch(error => {
            pageLoading.hide();
            console.error('خطا در بارگیری صفحه:', error);
        });
}
```

### بارگیری داده‌ها

```javascript
// بارگیری داده‌ها
async function loadData() {
    const dataLoading = MirageLoading.spinner({
        text: 'در حال دریافت اطلاعات...',
        position: 'overlay',
        target: '#data-container'
    });
    
    dataLoading.show();
    
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        
        // نمایش داده‌ها
        displayData(data);
    } catch (error) {
        // نمایش خطا
        console.error('خطا در دریافت داده‌ها:', error);
    } finally {
        dataLoading.hide();
    }
}
```

### اسکلتون جدول

```javascript
// نمایش اسکلتون جدول
function showTableSkeleton() {
    const tableContainer = document.querySelector('#table-container');
    const tableSkeleton = MirageLoading.skeletonTable(10, 5);
    
    tableContainer.innerHTML = '';
    tableContainer.appendChild(tableSkeleton);
    
    // بارگیری داده‌های واقعی
    loadTableData().then(data => {
        tableContainer.innerHTML = '';
        renderTable(data);
    });
}
```

### اسکلتون کارت‌ها

```javascript
// نمایش اسکلتون کارت‌ها
function showCardSkeletons(count = 6) {
    const cardsContainer = document.querySelector('#cards-container');
    cardsContainer.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        const cardSkeleton = MirageLoading.skeletonCard();
        cardsContainer.appendChild(cardSkeleton);
    }
    
    // بارگیری داده‌های واقعی
    loadCards().then(cards => {
        cardsContainer.innerHTML = '';
        renderCards(cards);
    });
}
```

### بارگیری تدریجی

```javascript
// بارگیری تدریجی
function loadWithSteps() {
    const steps = [
        'اتصال به سرور...',
        'دریافت اطلاعات...',
        'پردازش داده‌ها...',
        'نهایی‌سازی...'
    ];
    
    const progressTracker = MirageLoading.progressTracker({
        text: steps[0],
        position: 'fullscreen'
    });
    
    steps.forEach((step, index) => {
        setTimeout(() => {
            const progress = ((index + 1) / steps.length) * 100;
            progressTracker.update(progress);
            progressTracker.updateText(step);
        }, index * 1000);
    });
}
```

### مدیریت چندین بارگیری

```javascript
// مدیریت چندین بارگیری
class LoadingManager {
    constructor() {
        this.loadings = new Map();
    }
    
    start(id, options) {
        if (this.loadings.has(id)) {
            this.loadings.get(id).hide();
        }
        
        const loading = new MirageLoading(options);
        this.loadings.set(id, loading);
        loading.show();
        
        return loading;
    }
    
    stop(id) {
        if (this.loadings.has(id)) {
            this.loadings.get(id).hide();
            this.loadings.delete(id);
        }
    }
    
    stopAll() {
        this.loadings.forEach(loading => loading.hide());
        this.loadings.clear();
    }
    
    update(id, text) {
        if (this.loadings.has(id)) {
            this.loadings.get(id).updateText(text);
        }
    }
}

// استفاده
const loadingManager = new LoadingManager();

// شروع بارگیری
loadingManager.start('data-loading', {
    text: 'در حال بارگیری...',
    variant: 'dots'
});

// توقف بارگیری
loadingManager.stop('data-loading');
```

## یوتیلیتی‌های فارسی

### تبدیل اعداد فارسی

```javascript
// تبدیل خودکار اعداد
const persianText = MirageLoading.convertToPersianNumbers('پیشرفت: 75%');
// نتیجه: 'پیشرفت: ۷۵%'

// استفاده در بارگیری
MirageLoading.progress({
    progress: 50,
    text: 'آپلود شده: 50 مگابایت از 100 مگابایت'
}).show();
```

### پیام‌های فارسی

```javascript
// پیام‌های استاندارد فارسی
const PersianMessages = {
    loading: 'در حال بارگیری...',
    uploading: 'در حال آپلود...',
    downloading: 'در حال دانلود...',
    processing: 'در حال پردازش...',
    connecting: 'در حال اتصال...',
    saving: 'در حال ذخیره...',
    please_wait: 'لطفاً صبر کنید...'
};

// استفاده
MirageLoading.spinner({
    text: PersianMessages.loading
}).show();
```

## قابلیت‌های دسترسی

### ARIA Attributes

```html
<div class="mir-loading" 
     role="status" 
     aria-live="polite" 
     aria-label="در حال بارگیری"
     dir="rtl">
    
    <div class="mir-loading-content">
        <div class="mir-spinner mir-spinner-circle"></div>
        <span class="mir-loading-text">در حال بارگیری...</span>
    </div>
</div>
```

### کلیدهای میانبر

- `ESC` - بستن بارگیری تمام صفحه
- `Tab` - حرکت فوکوس (در صورت وجود عناصر تعاملی)

## بهینه‌سازی عملکرد

### تنظیمات موبایل

```javascript
// تنظیمات مخصوص موبایل
function isMobile() {
    return window.innerWidth <= 768;
}

function showMobileOptimizedLoading() {
    const options = {
        size: isMobile() ? 'sm' : 'md',
        variant: isMobile() ? 'dots' : 'circle',
        text: isMobile() ? 'بارگیری...' : 'در حال بارگیری...'
    };
    
    MirageLoading.spinner(options).show();
}
```

### مدیریت حافظه

```javascript
// پاک کردن تمام بارگیری‌ها
function cleanup() {
    MirageLoading.hideAll();
}

// پاک کردن خودکار
window.addEventListener('beforeunload', cleanup);
```

## حل مشکلات رایج

### مشکل: اسپینر نمایش داده نمی‌شود

```javascript
// بررسی وارد کردن فایل‌ها
console.log(typeof MirageLoading); // باید 'function' باشد

// بررسی CSS
const cssLoaded = document.querySelector('link[href*="loading.css"]');
console.log(cssLoaded); // باید element برگرداند
```

### مشکل: انیمیشن کار نمی‌کند

```css
/* اطمینان از وجود animation */
.mir-spinner-circle {
    animation: mir-spin 1s linear infinite;
}

@keyframes mir-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
```

### مشکل: RTL درست کار نمی‌کند

```css
/* تنظیم صحیح RTL */
.mir-loading {
    direction: rtl;
    text-align: center;
}

.mir-loading-text {
    text-align: right;
}
```

## نکات بهترین شیوه‌ها

### استفاده صحیح

```javascript
// ✅ درست
const loading = MirageLoading.spinner();
loading.show();

// عملیات
performOperation().then(() => {
    loading.hide();
});

// ❌ اشتباه
MirageLoading.spinner().show();
// فراموش کردن مخفی کردن
```

### انتخاب نوع مناسب

```javascript
// برای عملیات کوتاه
MirageLoading.spinner({ variant: 'dots' }).show();

// برای عملیات طولانی
MirageLoading.progress({
    text: 'در حال پردازش...',
    showProgress: true
}).show();

// برای بارگیری محتوا
MirageLoading.skeleton({ variant: 'card' }).show();
```

---

**میراژ دیزاین سیستم 2025** - سیستم حالت‌های بارگیری مدرن برای رابط‌های کاربری فارسی

*اسپینرهای زیبا، اسکلتون‌های هوشمند، نوار پیشرفت دقیق و بهینه‌سازی کامل RTL*