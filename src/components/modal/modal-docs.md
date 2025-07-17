# سیستم مودال میراژ - Mirage Modal System

## فهرست مطالب

- [معرفی](#معرفی)
- [نصب و راه‌اندازی](#نصب-و-راه‌اندازی)
- [استفاده اساسی](#استفاده-اساسی)
- [انواع مودال](#انواع-مودال)
- [اندازه‌ها و حالت‌ها](#اندازه‌ها-و-حالت‌ها)
- [روش‌های جاوا اسکریپت](#روش‌های-جاوا-اسکریپت)
- [نمونه‌های کاربردی](#نمونه‌های-کاربردی)
- [تنظیمات پیشرفته](#تنظیمات-پیشرفته)

## معرفی

سیستم مودال میراژ مجموعه‌ای کامل و بهینه‌شده از پنجره‌های بازشو برای رابط‌های کاربری فارسی است. این سیستم شامل انواع مختلف مودال، پشتیبانی کامل از RTL، انیمیشن‌های زیبا و قابلیت‌های دسترسی پیشرفته می‌باشد.

### ویژگی‌های کلیدی

- ✅ **پشتیبانی کامل RTL** - بهینه‌سازی برای متن فارسی
- ✅ **انواع مختلف مودال** - Alert، Confirm، Success، Error، Loading، Form
- ✅ **انیمیشن‌های زیبا** - ترانزیشن‌های نرم و طبیعی
- ✅ **مدیریت فوکوس** - Focus trap و keyboard navigation
- ✅ **قابل دسترس** - سازگاری کامل با screen readers
- ✅ **واکنش‌گرا** - سازگار با تمام اندازه‌های صفحه

## نصب و راه‌اندازی

### 1. وارد کردن فایل‌ها

```html
<!-- CSS -->
<link rel="stylesheet" href="components/modal/modal.css">

<!-- JavaScript -->
<script src="components/modal/modal.js"></script>

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

### مودال ساده

```javascript
// ایجاد مودال جدید
const modal = new MirageModal({
    size: 'md',
    variant: 'info'
});

// تنظیم محتوا
modal.setHeader('عنوان مودال', true);
modal.setBody('<p>محتوای مودال در اینجا قرار می‌گیرد.</p>');
modal.setFooter([
    {
        text: 'بستن',
        class: 'mir-btn-secondary',
        onclick: () => modal.close()
    }
]);

// نمایش مودال
modal.open();
```

### HTML Structure

```html
<div class="mir-modal-overlay">
    <div class="mir-modal mir-modal-md">
        <div class="mir-modal-header">
            <h3 class="mir-modal-title">عنوان مودال</h3>
            <button class="mir-modal-close" aria-label="بستن">
                <i data-feather="x"></i>
            </button>
        </div>
        <div class="mir-modal-body">
            <p>محتوای مودال</p>
        </div>
        <div class="mir-modal-footer">
            <button class="mir-btn mir-btn-primary">تایید</button>
            <button class="mir-btn mir-btn-secondary">لغو</button>
        </div>
    </div>
</div>
```

## انواع مودال

### 1. مودال اطلاعیه (Alert)

```javascript
MirageModal.alert('اطلاعیه', 'عملیات با موفقیت انجام شد!');
```

### 2. مودال تأیید (Confirm)

```javascript
MirageModal.confirm('تأیید حذف', 'آیا مطمئن هستید که می‌خواهید این آیتم را حذف کنید؟')
    .then(result => {
        if (result) {
            console.log('تأیید شد');
        } else {
            console.log('لغو شد');
        }
    });
```

### 3. مودال موفقیت (Success)

```javascript
MirageModal.success('موفقیت', 'اطلاعات با موفقیت ذخیره شد!');
```

### 4. مودال خطا (Error)

```javascript
MirageModal.error('خطا', 'خطایی در سیستم رخ داده است. لطفاً دوباره تلاش کنید.');
```

### 5. مودال بارگیری (Loading)

```javascript
const loadingModal = MirageModal.loading('در حال پردازش اطلاعات...');

// بعد از اتمام عملیات
setTimeout(() => {
    loadingModal.close();
}, 3000);
```

### 6. مودال فرم (Form)

```javascript
const formContent = `
    <form class="mir-form">
        <div class="mir-form-grid">
            <div class="mir-input-group">
                <input type="text" class="mir-input" placeholder=" " id="name">
                <label class="mir-label" for="name">نام</label>
            </div>
            <div class="mir-input-group">
                <input type="email" class="mir-input" placeholder=" " id="email">
                <label class="mir-label" for="email">ایمیل</label>
            </div>
        </div>
    </form>
`;

const formModal = MirageModal.form('اطلاعات کاربری', formContent);
```

## اندازه‌ها و حالت‌ها

### اندازه‌های مودال

```javascript
// اندازه‌های مختلف
new MirageModal({ size: 'sm' });   // کوچک
new MirageModal({ size: 'md' });   // متوسط (پیش‌فرض)
new MirageModal({ size: 'lg' });   // بزرگ
new MirageModal({ size: 'xl' });   // خیلی بزرگ
new MirageModal({ size: 'full' }); // تمام صفحه
```

### حالت‌های رنگی

```javascript
// حالت‌های مختلف
new MirageModal({ variant: 'info' });    // اطلاعیه
new MirageModal({ variant: 'success' }); // موفقیت
new MirageModal({ variant: 'warning' }); // هشدار
new MirageModal({ variant: 'error' });   // خطا
```

## روش‌های جاوا اسکریپت

### ایجاد و مدیریت مودال

```javascript
const modal = new MirageModal(options);

// روش‌های اساسی
modal.open();        // باز کردن مودال
modal.close();       // بستن مودال
modal.toggle();      // تغییر حالت
modal.destroy();     // حذف مودال

// تنظیم محتوا
modal.setHeader('عنوان', true);
modal.setBody('<p>محتوا</p>');
modal.setFooter([
    { text: 'تایید', class: 'mir-btn-primary', onclick: () => {} }
]);
```

### Event Listeners

```javascript
// گوش دادن به رویدادها
document.addEventListener('mirageModal:open', (e) => {
    console.log('مودال باز شد', e.detail.modal);
});

document.addEventListener('mirageModal:close', (e) => {
    console.log('مودال بسته شد', e.detail.modal);
});

document.addEventListener('mirageModal:destroy', (e) => {
    console.log('مودال حذف شد', e.detail.modal);
});
```

### Data Attributes

```html
<!-- مودال اطلاعیه -->
<button data-mir-modal="alert" 
        data-mir-modal-title="اطلاعیه" 
        data-mir-modal-message="پیام شما">
    نمایش اطلاعیه
</button>

<!-- مودال تأیید -->
<button data-mir-modal="confirm" 
        data-mir-modal-title="تأیید" 
        data-mir-modal-message="آیا مطمئن هستید؟">
    تأیید حذف
</button>

<!-- مودال سفارشی -->
<button data-mir-modal="#customModal" 
        data-mir-modal-size="lg">
    مودال سفارشی
</button>

<div id="customModal" style="display: none;">
    <div class="mir-modal-header">
        <h3 class="mir-modal-title">مودال سفارشی</h3>
        <button class="mir-modal-close">
            <i data-feather="x"></i>
        </button>
    </div>
    <div class="mir-modal-body">
        <p>محتوای مودال سفارشی</p>
    </div>
</div>
```

## نمونه‌های کاربردی

### مودال ویرایش کاربر

```javascript
function editUserModal(userId) {
    const formContent = `
        <form class="mir-form" id="editUserForm">
            <div class="mir-form-grid">
                <div class="mir-input-group">
                    <input type="text" class="mir-input" placeholder=" " id="firstName" required>
                    <label class="mir-label" for="firstName">نام</label>
                </div>
                <div class="mir-input-group">
                    <input type="text" class="mir-input" placeholder=" " id="lastName" required>
                    <label class="mir-label" for="lastName">نام خانوادگی</label>
                </div>
                <div class="mir-input-group">
                    <input type="email" class="mir-input" placeholder=" " id="email" required>
                    <label class="mir-label" for="email">ایمیل</label>
                </div>
                <div class="mir-input-group">
                    <select class="mir-select" id="role" required>
                        <option value="">انتخاب نقش</option>
                        <option value="admin">مدیر</option>
                        <option value="user">کاربر</option>
                        <option value="editor">ویرایشگر</option>
                    </select>
                    <label class="mir-label" for="role">نقش</label>
                </div>
            </div>
        </form>
    `;

    const modal = new MirageModal({
        size: 'md',
        variant: 'info'
    });

    modal.setHeader('ویرایش کاربر', true);
    modal.setBody(formContent);
    modal.setFooter([
        {
            text: 'لغو',
            class: 'mir-btn-secondary',
            onclick: () => modal.close()
        },
        {
            text: 'ذخیره تغییرات',
            class: 'mir-btn-primary',
            onclick: () => {
                const form = document.getElementById('editUserForm');
                if (form.checkValidity()) {
                    // پردازش فرم
                    console.log('فرم ذخیره شد');
                    modal.close();
                } else {
                    form.reportValidity();
                }
            }
        }
    ]);

    modal.open();
}
```

### مودال تأیید حذف گروهی

```javascript
function confirmBulkDelete(selectedItems) {
    const count = selectedItems.length;
    const message = `آیا مطمئن هستید که می‌خواهید ${count} آیتم انتخاب شده را حذف کنید؟`;

    MirageModal.confirm('تأیید حذف گروهی', message, {
        variant: 'warning'
    }).then(result => {
        if (result) {
            // نمایش مودال بارگیری
            const loadingModal = MirageModal.loading('در حال حذف آیتم‌ها...');
            
            // شبیه‌سازی عملیات حذف
            setTimeout(() => {
                loadingModal.close();
                MirageModal.success('موفقیت', `${count} آیتم با موفقیت حذف شد.`);
            }, 2000);
        }
    });
}
```

### مودال نمایش جزئیات

```javascript
function showDetailsModal(item) {
    const detailsContent = `
        <div class="mir-details-grid">
            <div class="mir-detail-item">
                <strong>نام:</strong>
                <span>${item.name}</span>
            </div>
            <div class="mir-detail-item">
                <strong>ایمیل:</strong>
                <span>${item.email}</span>
            </div>
            <div class="mir-detail-item">
                <strong>تاریخ عضویت:</strong>
                <span>${item.joinDate}</span>
            </div>
            <div class="mir-detail-item">
                <strong>وضعیت:</strong>
                <span class="mir-status mir-status-${item.status}">${item.statusText}</span>
            </div>
        </div>
    `;

    const modal = new MirageModal({
        size: 'lg',
        variant: 'info'
    });

    modal.setHeader('جزئیات کاربر', true);
    modal.setBody(detailsContent);
    modal.setFooter([
        {
            text: 'ویرایش',
            class: 'mir-btn-primary',
            onclick: () => {
                modal.close();
                editUserModal(item.id);
            }
        },
        {
            text: 'بستن',
            class: 'mir-btn-secondary',
            onclick: () => modal.close()
        }
    ]);

    modal.open();
}
```

## تنظیمات پیشرفته

### گزینه‌های سازندگی

```javascript
const modal = new MirageModal({
    size: 'md',              // اندازه مودال
    variant: 'info',         // نوع مودال
    closable: true,          // قابلیت بستن
    backdrop: true,          // کلیک روی پس‌زمینه برای بستن
    keyboard: true,          // کلید ESC برای بستن
    focus: true,             // فوکوس خودکار
    animation: true,         // انیمیشن باز/بسته شدن
    rtl: true,               // پشتیبانی RTL
    autoClose: 5000          // بستن خودکار بعد از 5 ثانیه
});
```

### CSS Classes سفارشی

```css
/* مودال سفارشی */
.mir-modal-custom {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.mir-modal-custom .mir-modal-header {
    border-bottom-color: rgba(255, 255, 255, 0.2);
}

.mir-modal-custom .mir-modal-title {
    color: white;
}

.mir-modal-custom .mir-modal-close {
    color: white;
}

.mir-modal-custom .mir-modal-close:hover {
    background: rgba(255, 255, 255, 0.1);
}
```

### مدیریت چندین مودال

```javascript
class ModalManager {
    constructor() {
        this.modals = [];
        this.zIndexBase = 9999;
    }

    create(options) {
        const modal = new MirageModal(options);
        this.modals.push(modal);
        
        // تنظیم z-index
        modal.overlay.style.zIndex = this.zIndexBase + this.modals.length;
        
        return modal;
    }

    closeAll() {
        this.modals.forEach(modal => modal.close());
        this.modals = [];
    }

    getTop() {
        return this.modals[this.modals.length - 1];
    }
}

// استفاده
const modalManager = new ModalManager();

const modal1 = modalManager.create({ size: 'md' });
const modal2 = modalManager.create({ size: 'sm' });

// بستن همه مودال‌ها
modalManager.closeAll();
```

## قابلیت‌های دسترسی

### کلیدهای میانبر

- `ESC` - بستن مودال
- `Tab` - حرکت بین عناصر قابل فوکوس
- `Shift + Tab` - حرکت برعکس بین عناصر
- `Enter` - فعال کردن دکمه فوکوس شده
- `Space` - فعال کردن دکمه فوکوس شده

### ARIA Attributes

```html
<div class="mir-modal-overlay" 
     role="dialog" 
     aria-modal="true" 
     aria-labelledby="modal-title"
     aria-describedby="modal-description">
    
    <div class="mir-modal" tabindex="-1">
        <div class="mir-modal-header">
            <h3 id="modal-title" class="mir-modal-title">عنوان مودال</h3>
            <button class="mir-modal-close" aria-label="بستن مودال">
                <i data-feather="x"></i>
            </button>
        </div>
        <div class="mir-modal-body" id="modal-description">
            محتوای مودال
        </div>
    </div>
</div>
```

## حل مشکلات رایج

### مشکل: مودال نمایش داده نمی‌شود

```javascript
// بررسی وارد کردن فایل‌ها
console.log(typeof MirageModal); // باید 'function' باشد

// بررسی وجود CSS
const cssLoaded = document.querySelector('link[href*="modal.css"]');
console.log(cssLoaded); // باید element برگرداند
```

### مشکل: انیمیشن کار نمی‌کند

```css
/* اطمینان از وجود transition */
.mir-modal-overlay {
    transition: all 0.3s ease;
}

.mir-modal {
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

### مشکل: RTL درست کار نمی‌کند

```css
/* تنظیم صحیح RTL */
.mir-modal-overlay {
    direction: rtl;
}

.mir-modal {
    direction: rtl;
    text-align: right;
}
```

## نکات بهینه‌سازی

### کارایی

```javascript
// استفاده مجدد از مودال
const modal = new MirageModal();

function showModal(content) {
    modal.setBody(content);
    modal.open();
}

// بهتر از ایجاد مودال جدید هر بار
```

### حافظه

```javascript
// حذف مودال بعد از استفاده
const modal = new MirageModal();
modal.open();

// بعد از بستن
modal.destroy(); // آزاد کردن حافظه
```

---

**میراژ دیزاین سیستم 2025** - سیستم مودال مدرن برای رابط‌های کاربری فارسی

*پشتیبانی کامل از RTL، انیمیشن‌های زیبا و قابلیت‌های دسترسی پیشرفته*