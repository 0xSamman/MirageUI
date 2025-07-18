# کامپوننت صفحه‌بندی میراژ
# MirageUI Pagination Component

## معرفی کلی
کامپوننت صفحه‌بندی میراژ برای ناوبری بین صفحات مختلف داده‌ها در جداول، لیست‌ها و مجموعه‌های بزرگ از اطلاعات طراحی شده است. این کامپوننت کاملاً با زبان فارسی و چیدمان راست‌به‌چپ سازگار است.

## ویژگی‌های کلیدی

### 🎨 طراحی
- **Glass Morphism**: استفاده از افکت شیشه‌ای در زمینه
- **RTL Support**: پشتیبانی کامل از چیدمان راست‌به‌چپ
- **Persian Numbers**: استفاده از اعداد فارسی (۰۱۲۳۴۵۶۷۸۹)
- **Responsive**: سازگار با انواع صفحه‌نمایش

### 🔧 قابلیت‌ها
- **چندین نوع نمایش**: Default، Simple، Outlined، Minimal
- **اندازه‌های مختلف**: کوچک، متوسط، بزرگ
- **ناوبری کیبورد**: پشتیبانی از کلیدهای جهت‌دار
- **اطلاعات صفحه**: نمایش تعداد کل آیتم‌ها
- **انتخاب تعداد آیتم**: امکان تغییر تعداد آیتم در هر صفحه
- **Accessibility**: سازگار با صفحه‌خوان‌ها

## نحوه استفاده

### HTML ساده
```html
<div id="pagination1" class="mir-pagination-auto" 
     data-current-page="1" 
     data-total-pages="10">
</div>
```

### JavaScript تعاملی
```javascript
const pagination = new MiragePagination('#pagination1', {
    currentPage: 1,
    totalPages: 10,
    totalItems: 95,
    itemsPerPage: 10,
    
    onPageChange: function(page, oldPage) {
        console.log(`صفحه تغییر کرد: ${oldPage} به ${page}`);
    }
});
```

## گزینه‌های پیکربندی

### داده‌های اصلی
```javascript
{
    currentPage: 1,        // صفحه فعلی
    totalPages: 10,        // کل صفحات
    totalItems: 95,        // کل آیتم‌ها
    itemsPerPage: 10,      // آیتم در هر صفحه
    maxVisible: 7          // حداکثر صفحات قابل مشاهده
}
```

### نمایش و ظاهر
```javascript
{
    variant: 'default',    // default, simple, outlined, minimal
    size: 'md',           // sm, md, lg
    alignment: 'center',   // start, center, end, between
    
    showInfo: true,        // نمایش اطلاعات آیتم‌ها
    showNavigation: true,  // نمایش دکمه‌های ناوبری
    showFirstLast: true,   // نمایش دکمه‌های اول/آخر
    showPrevNext: true,    // نمایش دکمه‌های قبلی/بعدی
    showEllipsis: true,    // نمایش سه‌نقطه
    showPageSizeSelector: false  // انتخابگر تعداد آیتم
}
```

### زبان و محتوا
```javascript
{
    persianNumbers: true,  // استفاده از اعداد فارسی
    rtl: true,            // چیدمان راست‌به‌چپ
    
    labels: {
        previous: 'قبلی',
        next: 'بعدی',
        first: 'اولین',
        last: 'آخرین',
        page: 'صفحه',
        of: 'از',
        items: 'آیتم',
        showing: 'نمایش',
        to: 'تا',
        results: 'نتیجه'
    }
}
```

## انواع نمایش (Variants)

### پیش‌فرض (Default)
```html
<div class="mir-pagination" data-variant="default">
    <!-- شیشه‌ای با افکت blur -->
</div>
```

### ساده (Simple)
```html
<div class="mir-pagination mir-pagination-simple">
    <!-- بدون پس‌زمینه، شفاف -->
</div>
```

### خطی (Outlined)
```html
<div class="mir-pagination mir-pagination-outlined">
    <!-- با حاشیه، بدون پس‌زمینه -->
</div>
```

### حداقلی (Minimal)
```html
<div class="mir-pagination mir-pagination-minimal">
    <!-- حداقل عناصر ممکن -->
</div>
```

## اندازه‌ها

### کوچک
```html
<div class="mir-pagination mir-pagination-sm">
    <!-- برای فضاهای محدود -->
</div>
```

### متوسط (پیش‌فرض)
```html
<div class="mir-pagination">
    <!-- اندازه استاندارد -->
</div>
```

### بزرگ
```html
<div class="mir-pagination mir-pagination-lg">
    <!-- برای عناصر برجسته -->
</div>
```

## چیدمان (Alignment)

### وسط (پیش‌فرض)
```html
<div class="mir-pagination">
    <!-- در وسط صفحه -->
</div>
```

### شروع (راست در RTL)
```html
<div class="mir-pagination mir-pagination-start">
    <!-- در سمت راست -->
</div>
```

### پایان (چپ در RTL)
```html
<div class="mir-pagination mir-pagination-end">
    <!-- در سمت چپ -->
</div>
```

### فاصله‌گذاری
```html
<div class="mir-pagination mir-pagination-between">
    <!-- با فاصله یکسان -->
</div>
```

## رویدادها (Events)

### تغییر صفحه
```javascript
const pagination = new MiragePagination('#pagination', {
    onPageChange: function(newPage, oldPage, instance) {
        console.log(`صفحه ${oldPage} به ${newPage} تغییر کرد`);
        
        // بارگذاری داده‌های جدید
        loadData(newPage);
    }
});
```

### تغییر تعداد آیتم در صفحه
```javascript
const pagination = new MiragePagination('#pagination', {
    showPageSizeSelector: true,
    pageSizeOptions: [10, 20, 50, 100],
    
    onPageSizeChange: function(newSize, oldSize, instance) {
        console.log(`تعداد آیتم از ${oldSize} به ${newSize} تغییر کرد`);
        
        // بازیابی داده‌ها با تعداد جدید
        reloadData(newSize);
    }
});
```

### راه‌اندازی اولیه
```javascript
const pagination = new MiragePagination('#pagination', {
    onInit: function(instance) {
        console.log('صفحه‌بندی آماده شد');
    }
});
```

## API عمومی

### رفتن به صفحه خاص
```javascript
pagination.goToPage(5);
```

### دریافت صفحه فعلی
```javascript
const currentPage = pagination.getCurrentPage();
```

### دریافت کل صفحات
```javascript
const totalPages = pagination.getTotalPages();
```

### تنظیم کل آیتم‌ها
```javascript
pagination.setTotalItems(150);
// صفحات بازمحاسبه می‌شود
```

### نمایش حالت بارگیری
```javascript
pagination.setLoading(true);  // شروع بارگیری
// ... بارگذاری داده‌ها
pagination.setLoading(false); // پایان بارگیری
```

### حذف کامپوننت
```javascript
pagination.destroy();
```

## ناوبری کیبورد

### کلیدهای پشتیبانی‌شده
- **فلش راست**: صفحه قبلی (در RTL)
- **فلش چپ**: صفحه بعدی (در RTL)
- **Home**: اولین صفحه
- **End**: آخرین صفحه
- **Tab**: حرکت بین دکمه‌ها

### مثال ناوبری
```javascript
// کاربر می‌تواند با کیبورد حرکت کند
pagination.element.focus(); // فوکس روی کامپوننت
// سپس از کلیدهای جهت‌دار استفاده کند
```

## دسترسی‌پذیری (Accessibility)

### ویژگی‌های دسترسی
```html
<!-- صفحه‌بندی با برچسب‌های مناسب -->
<nav role="navigation" aria-label="صفحه‌بندی">
    <button aria-label="برو به صفحه ۳" data-page="3">۳</button>
    <button aria-current="page" aria-label="صفحه فعلی ۴" data-page="4">۴</button>
</nav>

<!-- اعلان‌های زنده برای صفحه‌خوان -->
<div aria-live="polite" aria-atomic="true" class="sr-only">
    صفحه فعلی ۴ از ۱۰
</div>
```

### پشتیبانی از صفحه‌خوان
- اعلان تغییر صفحه
- برچسب‌های توضیحی
- نقش‌های مناسب ARIA
- پشتیبانی از فوکوس کیبورد

## مثال‌های کاربردی

### جدول با صفحه‌بندی
```html
<div class="table-container">
    <table class="mir-table">
        <!-- محتوای جدول -->
    </table>
    
    <div id="table-pagination" class="mir-pagination-auto"
         data-current-page="1"
         data-total-items="150"
         data-items-per-page="10"
         data-show-info="true"
         data-show-page-size="true">
    </div>
</div>
```

### گالری تصاویر
```html
<div class="image-gallery">
    <!-- تصاویر -->
</div>

<div id="gallery-pagination"></div>

<script>
const galleryPagination = new MiragePagination('#gallery-pagination', {
    currentPage: 1,
    totalItems: 84,
    itemsPerPage: 12,
    variant: 'minimal',
    alignment: 'center',
    
    onPageChange: function(page) {
        loadImages(page);
    }
});
</script>
```

### لیست محصولات
```javascript
// صفحه‌بندی پیشرفته برای فروشگاه
const productPagination = new MiragePagination('#products-pagination', {
    currentPage: 1,
    totalItems: 456,
    itemsPerPage: 20,
    maxVisible: 5,
    
    variant: 'outlined',
    size: 'lg',
    showPageSizeSelector: true,
    pageSizeOptions: [20, 40, 60],
    
    labels: {
        itemsPerPage: 'محصول در صفحه',
        showing: 'نمایش',
        results: 'محصول'
    },
    
    onPageChange: function(page) {
        fetchProducts({
            page: page,
            limit: this.options.itemsPerPage
        });
    },
    
    onPageSizeChange: function(size) {
        this.options.currentPage = 1; // بازگشت به صفحه اول
        fetchProducts({
            page: 1,
            limit: size
        });
    }
});
```

## سفارسی‌سازی پیشرفته

### تنظیم رنگ‌ها
```css
:root {
    --mir-pagination-bg: rgba(255, 255, 255, 0.7);
    --mir-pagination-hover: rgba(99, 102, 241, 0.1);
    --mir-pagination-active: var(--mir-primary);
    --mir-pagination-disabled: var(--mir-gray-400);
}
```

### انیمیشن‌های سفارشی
```css
.mir-pagination-item {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mir-pagination-fade-in {
    animation: customFadeIn 0.5s ease-out;
}

@keyframes customFadeIn {
    from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}
```

### تم تاریک
```css
@media (prefers-color-scheme: dark) {
    .mir-pagination-item {
        background: rgba(0, 0, 0, 0.4);
        color: var(--mir-gray-100);
        border-color: rgba(255, 255, 255, 0.15);
    }
    
    .mir-pagination-item:hover {
        background: rgba(255, 255, 255, 0.1);
    }
}
```

## نکات بهینه‌سازی

### کارایی
- از رندر مجدد غیرضروری خودداری کنید
- تعداد صفحات قابل مشاهده را محدود کنید
- از lazy loading برای داده‌های بزرگ استفاده کنید

### UX بهتر
```javascript
// اضافه کردن loading state
pagination.setLoading(true);

fetch('/api/data?page=' + page)
    .then(response => response.json())
    .then(data => {
        updateTableData(data);
        pagination.setLoading(false);
    });
```

### Responsive Design
```css
@media (max-width: 768px) {
    .mir-pagination {
        justify-content: space-between;
    }
    
    .mir-pagination-item:not(.mir-pagination-active):not(.mir-pagination-nav) {
        display: none;
    }
}
```

## عیب‌یابی

### مسائل متداول

**صفحه‌بندی نمایش داده نمی‌شود:**
```javascript
// بررسی کنید که CSS لود شده باشد
console.log(document.querySelector('link[href*="pagination.css"]'));

// بررسی کنید که JavaScript اجرا شده باشد
console.log(window.MiragePagination);
```

**اعداد فارسی نمایش داده نمی‌شود:**
```javascript
// فعال‌سازی اعداد فارسی
const pagination = new MiragePagination('#pagination', {
    persianNumbers: true
});
```

**رویدادها کار نمی‌کنند:**
```javascript
// بررسی binding صحیح
pagination.element.addEventListener('click', function(e) {
    console.log('Click detected:', e.target);
});
```

## مثال کامل

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>نمونه صفحه‌بندی میراژ</title>
    <link rel="stylesheet" href="pagination.css">
</head>
<body>
    <!-- جدول داده‌ها -->
    <table class="data-table">
        <thead>
            <tr>
                <th>نام</th>
                <th>ایمیل</th>
                <th>تاریخ عضویت</th>
            </tr>
        </thead>
        <tbody id="data-tbody">
            <!-- داده‌ها با AJAX بارگذاری می‌شود -->
        </tbody>
    </table>
    
    <!-- صفحه‌بندی -->
    <div id="data-pagination"></div>
    
    <script src="pagination.js"></script>
    <script>
        // راه‌اندازی صفحه‌بندی
        const pagination = new MiragePagination('#data-pagination', {
            currentPage: 1,
            totalItems: 1250,
            itemsPerPage: 25,
            maxVisible: 7,
            
            variant: 'default',
            size: 'md',
            alignment: 'center',
            
            showInfo: true,
            showPageSizeSelector: true,
            pageSizeOptions: [25, 50, 100],
            
            persianNumbers: true,
            rtl: true,
            
            onPageChange: function(page, oldPage) {
                loadTableData(page, this.options.itemsPerPage);
            },
            
            onPageSizeChange: function(size, oldSize) {
                this.options.currentPage = 1;
                loadTableData(1, size);
            }
        });
        
        // بارگذاری داده‌ها
        function loadTableData(page, limit) {
            pagination.setLoading(true);
            
            fetch(`/api/users?page=${page}&limit=${limit}`)
                .then(response => response.json())
                .then(data => {
                    updateTable(data.users);
                    pagination.setTotalItems(data.total);
                    pagination.setLoading(false);
                })
                .catch(error => {
                    console.error('خطا در بارگیری داده‌ها:', error);
                    pagination.setLoading(false);
                });
        }
        
        function updateTable(users) {
            const tbody = document.getElementById('data-tbody');
            tbody.innerHTML = users.map(user => `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${new Date(user.created_at).toLocaleDateString('fa-IR')}</td>
                </tr>
            `).join('');
        }
        
        // بارگذاری اولیه
        loadTableData(1, 25);
    </script>
</body>
</html>
```

این کامپوننت صفحه‌بندی قدرتمند و انعطاف‌پذیر میراژ، تمام نیازهای شما برای ناوبری در داده‌های فارسی را برآورده می‌کند.