# کامپوننت تایم‌لاین میراژ
# MirageUI Timeline Component

## معرفی کلی
کامپوننت تایم‌لاین میراژ برای نمایش فعالیت‌ها، تاریخچه رویدادها، و جریان‌های زمانی در وب‌سایت‌های فارسی طراحی شده است. این کامپوننت کاملاً با زبان فارسی و چیدمان راست‌به‌چپ سازگار است و انواع مختلف فعالیت‌ها را به صورت بصری و منطقی نمایش می‌دهد.

## ویژگی‌های کلیدی

### 🎨 طراحی
- **Glass Morphism**: استفاده از افکت شیشه‌ای در پس‌زمینه
- **RTL Support**: پشتیبانی کامل از چیدمان راست‌به‌چپ
- **Persian Numbers**: استفاده از اعداد فارسی (۰۱۲۳۴۵۶۷۸۹)
- **Persian Dates**: فرمت‌بندی تاریخ فارسی
- **Visual Hierarchy**: سلسله‌مراتب بصری واضح

### 🔧 قابلیت‌ها
- **چندین نوع نمایش**: عمودی، افقی، فشرده
- **انواع مختلف استایل**: پیش‌فرض، ساده، کارتی، حداقلی
- **اندازه‌های مختلف**: کوچک، متوسط، بزرگ
- **انواع فعالیت**: کاربری، سیستمی، موفقیت، هشدار، خطا
- **بروزرسانی لحظه‌ای**: تغییر زمان‌ها به صورت خودکار
- **Accessibility**: سازگار با صفحه‌خوان‌ها

## نحوه استفاده

### HTML ساده
```html
<div id="activity-timeline" class="mir-timeline-auto" 
     data-variant="vertical" 
     data-animated="true">
</div>
```

### JavaScript تعاملی
```javascript
const timeline = new MirageTimeline('#activity-timeline', {
    items: [
        {
            type: 'user',
            title: 'کاربر جدید ثبت‌نام کرد',
            subtitle: 'سارا کریمی',
            description: 'کاربر جدید با موفقیت در سیستم ثبت‌نام کرد',
            time: new Date('2024-01-15T10:30:00'),
            avatar: '/images/users/sara.jpg',
            actions: [
                { type: 'view', text: 'مشاهده پروفایل' },
                { type: 'message', text: 'ارسال پیام' }
            ]
        },
        {
            type: 'system',
            title: 'بروزرسانی سیستم',
            description: 'سیستم به نسخه ۲.۱.۰ بروزرسانی شد',
            time: new Date('2024-01-15T09:15:00'),
            icon: 'download',
            tags: [
                { text: 'نسخه ۲.۱.۰', type: 'info' },
                { text: 'خودکار', type: 'success' }
            ]
        }
    ],
    
    onItemClick: function(item, index) {
        console.log('کلیک روی آیتم:', item.title);
    }
});
```

## گزینه‌های پیکربندی

### ساختار آیتم‌ها
```javascript
{
    items: [
        {
            // اطلاعات اصلی
            type: 'user',                    // user, system, success, warning, error, info
            title: 'عنوان فعالیت',            // اجباری
            subtitle: 'زیرعنوان',            // اختیاری
            description: 'توضیحات کامل',     // اختیاری
            time: new Date(),               // زمان رویداد
            
            // نمایش بصری
            avatar: '/path/to/avatar.jpg',  // تصویر کاربر
            icon: 'user',                   // آیکون Feather
            number: '۱',                    // شماره یا متن
            
            // اطلاعات اضافی
            user: 'نام کاربر',              // نام کاربر
            meta: ['اطلاعات', 'متا'],       // آرایه متادیتا
            tags: [                         // برچسب‌ها
                { text: 'مهم', type: 'error' },
                { text: 'جدید', type: 'success' }
            ],
            
            // ضمیمه فایل
            attachment: {
                name: 'فایل.pdf',
                size: '۲.۳ مگابایت',
                icon: 'file',
                content: '<p>محتوای ضمیمه</p>'
            },
            
            // عملیات
            actions: [
                { type: 'view', text: 'مشاهده' },
                { type: 'edit', text: 'ویرایش' },
                { type: 'delete', text: 'حذف' }
            ]
        }
    ]
}
```

### ظاهر و نمایش
```javascript
{
    variant: 'vertical',      // vertical, horizontal, compact
    size: 'md',              // sm, md, lg
    style: 'default',        // default, simple, card, minimal
    
    animated: true,          // انیمیشن ورود آیتم‌ها
    showTime: true,          // نمایش زمان
    showMeta: true,          // نمایش اطلاعات متا
    showActions: true,       // نمایش دکمه‌های عمل
    realTime: false          // بروزرسانی لحظه‌ای زمان
}
```

### زبان و محتوا
```javascript
{
    persianNumbers: true,    // استفاده از اعداد فارسی
    persianDates: true,      // فرمت تاریخ فارسی
    rtl: true,              // چیدمان راست‌به‌چپ
    
    labels: {
        loadMore: 'بارگیری بیشتر',
        loading: 'در حال بارگیری...',
        empty: 'هیچ فعالیتی موجود نیست',
        emptyDescription: 'هنوز هیچ فعالیتی ثبت نشده است',
        justNow: 'همین الان',
        minutesAgo: 'دقیقه پیش',
        hoursAgo: 'ساعت پیش',
        daysAgo: 'روز پیش',
        weeksAgo: 'هفته پیش',
        monthsAgo: 'ماه پیش',
        yearsAgo: 'سال پیش',
        ago: 'پیش',
        at: 'در',
        by: 'توسط',
        more: 'بیشتر',
        less: 'کمتر',
        reply: 'پاسخ',
        like: 'پسند',
        share: 'اشتراک'
    }
}
```

## انواع نمایش (Variants)

### عمودی (Vertical)
```html
<div class="mir-timeline mir-timeline-vertical">
    <!-- آیتم‌ها به صورت عمودی --></div>
```

### افقی (Horizontal)
```html
<div class="mir-timeline mir-timeline-horizontal">
    <!-- آیتم‌ها به صورت افقی --></div>
```

### فشرده (Compact)
```html
<div class="mir-timeline mir-timeline-compact">
    <!-- آیتم‌ها با فاصله کم --></div>
```

## انواع استایل

### پیش‌فرض (Default)
```html
<div class="mir-timeline">
    <!-- استایل شیشه‌ای با backdrop-filter --></div>
```

### ساده (Simple)
```html
<div class="mir-timeline mir-timeline-simple">
    <!-- بدون پس‌زمینه، تمیز --></div>
```

### کارتی (Card)
```html
<div class="mir-timeline mir-timeline-card">
    <!-- کارت‌های مجزا با سایه --></div>
```

### حداقلی (Minimal)
```html
<div class="mir-timeline mir-timeline-minimal">
    <!-- حداقل عناصر بصری --></div>
```

## اندازه‌ها

### کوچک
```html
<div class="mir-timeline mir-timeline-sm">
    <!-- برای نوارهای کناری --></div>
```

### متوسط (پیش‌فرض)
```html
<div class="mir-timeline">
    <!-- اندازه استاندارد --></div>
```

### بزرگ
```html
<div class="mir-timeline mir-timeline-lg">
    <!-- برای صفحات اصلی --></div>
```

## انواع فعالیت

### فعالیت کاربری
```javascript
{
    type: 'user',
    title: 'کاربر وارد شد',
    user: 'علی احمدی',
    avatar: '/images/users/ali.jpg'
}
```

### رویداد سیستمی
```javascript
{
    type: 'system',
    title: 'پشتیبان‌گیری خودکار',
    icon: 'database',
    description: 'پشتیبان‌گیری شب انجام شد'
}
```

### وضعیت موفقیت
```javascript
{
    type: 'success',
    title: 'تراکنش موفق',
    icon: 'check-circle',
    description: 'پرداخت با موفقیت انجام شد'
}
```

### هشدار
```javascript
{
    type: 'warning',
    title: 'فضای ذخیره‌سازی کم',
    icon: 'alert-triangle',
    description: 'فضای باقی‌مانده کمتر از ۱۰٪ است'
}
```

### خطا
```javascript
{
    type: 'error',
    title: 'خطا در ارسال ایمیل',
    icon: 'x-circle',
    description: 'امکان ارسال ایمیل وجود ندارد'
}
```

## رویدادها (Events)

### کلیک روی آیتم
```javascript
const timeline = new MirageTimeline('#timeline', {
    onItemClick: function(item, index, event, instance) {
        console.log(`کلیک روی آیتم ${index}:`, item.title);
        
        // باز کردن جزئیات
        showItemDetails(item);
    }
});
```

### کلیک روی عملیات
```javascript
const timeline = new MirageTimeline('#timeline', {
    onActionClick: function(action, item, event, instance) {
        console.log(`عملیات ${action.type} روی آیتم ${item.title}`);
        
        switch(action.type) {
            case 'view':
                showItemDetails(item);
                break;
            case 'edit':
                editItem(item);
                break;
            case 'delete':
                deleteItem(item);
                break;
        }
    }
});
```

### بارگیری بیشتر
```javascript
const timeline = new MirageTimeline('#timeline', {
    onLoadMore: function(instance) {
        console.log('درخواست بارگیری آیتم‌های بیشتر');
        
        // بارگیری داده‌های جدید
        loadMoreItems().then(newItems => {
            newItems.forEach(item => {
                instance.addItem(item, false); // اضافه کردن به انتها
            });
        });
    }
});
```

### اضافه کردن آیتم
```javascript
const timeline = new MirageTimeline('#timeline', {
    onItemAdd: function(item, instance) {
        console.log('آیتم جدید اضافه شد:', item.title);
        
        // ارسال اعلان
        showNotification('فعالیت جدید اضافه شد');
    }
});
```

## API عمومی

### مدیریت آیتم‌ها
```javascript
// اضافه کردن آیتم جدید
timeline.addItem({
    type: 'user',
    title: 'فعالیت جدید',
    time: new Date()
}, true); // true = اضافه کردن به ابتدا

// حذف آیتم
timeline.removeItem(0); // حذف اولین آیتم

// بروزرسانی آیتم
timeline.updateItem(0, {
    title: 'عنوان جدید',
    description: 'توضیحات بروزرسانی شده'
});

// پاک کردن همه آیتم‌ها
timeline.clearItems();

// دریافت همه آیتم‌ها
const items = timeline.getItems();
```

### کنترل نمایش
```javascript
// نمایش حالت بارگیری
timeline.setLoading(true);

// بروزرسانی نمایش
timeline.refresh();

// حذف کامپوننت
timeline.destroy();
```

### بروزرسانی لحظه‌ای
```javascript
// شروع بروزرسانی زمان‌ها
timeline.startRealTimeUpdates();

// توقف بروزرسانی
timeline.stopRealTimeUpdates();

// بروزرسانی دستی زمان‌ها
timeline.updateTimeStamps();
```

## مثال‌های کاربردی

### فید فعالیت کاربران
```html
<div id="user-activity-feed"></div>

<script>
const userActivityFeed = new MirageTimeline('#user-activity-feed', {
    variant: 'vertical',
    size: 'md',
    style: 'default',
    animated: true,
    realTime: true,
    
    items: [
        {
            type: 'user',
            title: 'سارا کریمی وارد شد',
            subtitle: 'کاربر فعال',
            time: new Date('2024-01-15T10:30:00'),
            avatar: '/images/users/sara.jpg',
            actions: [
                { type: 'profile', text: 'مشاهده پروفایل' },
                { type: 'message', text: 'ارسال پیام' }
            ]
        },
        {
            type: 'user',
            title: 'محمد رضایی فایل آپلود کرد',
            subtitle: 'مدیر پروژه',
            time: new Date('2024-01-15T10:15:00'),
            avatar: '/images/users/mohammad.jpg',
            attachment: {
                name: 'گزارش-پروژه.pdf',
                size: '۲.۳ مگابایت',
                icon: 'file-text'
            },
            actions: [
                { type: 'download', text: 'دانلود' },
                { type: 'share', text: 'اشتراک' }
            ]
        },
        {
            type: 'system',
            title: 'پشتیبان‌گیری خودکار',
            description: 'پشتیبان‌گیری شبانه با موفقیت انجام شد',
            time: new Date('2024-01-15T02:00:00'),
            icon: 'database',
            tags: [
                { text: 'خودکار', type: 'info' },
                { text: 'موفق', type: 'success' }
            ]
        }
    ],
    
    onItemClick: function(item, index) {
        console.log('کلیک روی:', item.title);
    },
    
    onActionClick: function(action, item) {
        console.log(`عملیات ${action.type} روی ${item.title}`);
        
        switch(action.type) {
            case 'profile':
                showUserProfile(item.user);
                break;
            case 'message':
                openMessageDialog(item.user);
                break;
            case 'download':
                downloadFile(item.attachment);
                break;
            case 'share':
                shareItem(item);
                break;
        }
    }
});
</script>
```

### تاریخچه تراکنش‌ها
```javascript
const transactionHistory = new MirageTimeline('#transaction-history', {
    variant: 'vertical',
    style: 'card',
    size: 'lg',
    
    items: [
        {
            type: 'success',
            title: 'واریز موفق',
            subtitle: 'از حساب ۱۲۳۴',
            description: 'مبلغ ۵۰۰,۰۰۰ تومان به حساب شما واریز شد',
            time: new Date('2024-01-15T14:30:00'),
            icon: 'trending-up',
            meta: ['شماره پیگیری: ۱۲۳۴۵۶۷۸۹'],
            tags: [
                { text: '۵۰۰,۰۰۰ تومان', type: 'success' },
                { text: 'فوری', type: 'info' }
            ]
        },
        {
            type: 'error',
            title: 'تراکنش ناموفق',
            subtitle: 'کارت ۱۲۳۴',
            description: 'موجودی کافی نیست',
            time: new Date('2024-01-15T12:15:00'),
            icon: 'x-circle',
            meta: ['کد خطا: ۴۰۰۱'],
            tags: [
                { text: '۱۰۰,۰۰۰ تومان', type: 'error' }
            ]
        }
    ]
});
```

### تایم‌لاین پروژه
```javascript
const projectTimeline = new MirageTimeline('#project-timeline', {
    variant: 'horizontal',
    style: 'minimal',
    size: 'md',
    
    items: [
        {
            type: 'info',
            title: 'شروع پروژه',
            time: new Date('2024-01-01'),
            icon: 'play-circle',
            description: 'کلنگ زنی و شروع رسمی پروژه'
        },
        {
            type: 'user',
            title: 'تشکیل تیم',
            time: new Date('2024-01-05'),
            icon: 'users',
            description: 'انتخاب اعضای تیم و تقسیم وظایف'
        },
        {
            type: 'warning',
            title: 'بررسی میانی',
            time: new Date('2024-01-15'),
            icon: 'eye',
            description: 'بررسی پیشرفت و تطبیق با برنامه'
        },
        {
            type: 'success',
            title: 'تحویل نهایی',
            time: new Date('2024-01-30'),
            icon: 'check-circle',
            description: 'تکمیل موفقیت‌آمیز پروژه'
        }
    ]
});
```

## سفارسی‌سازی پیشرفته

### تنظیم ظاهر
```css
:root {
    --mir-timeline-primary: var(--mir-primary);
    --mir-timeline-success: var(--mir-success);
    --mir-timeline-warning: var(--mir-warning);
    --mir-timeline-error: var(--mir-error);
    --mir-timeline-info: var(--mir-info);
    
    --mir-timeline-bg: rgba(255, 255, 255, 0.6);
    --mir-timeline-border: rgba(255, 255, 255, 0.2);
    --mir-timeline-connector: var(--mir-gray-300);
}
```

### انیمیشن‌های سفارشی
```css
.mir-timeline-item-custom {
    animation: customTimelineEntry 0.8s ease-out;
}

@keyframes customTimelineEntry {
    from {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* پالس برای آیتم‌های جدید */
.mir-timeline-item-new {
    animation: newItemPulse 2s ease-in-out;
}

@keyframes newItemPulse {
    0%, 100% {
        box-shadow: 0 0 0 0 rgba(var(--mir-primary-rgb), 0.4);
    }
    50% {
        box-shadow: 0 0 0 15px rgba(var(--mir-primary-rgb), 0);
    }
}
```

### تم تاریک
```css
@media (prefers-color-scheme: dark) {
    .mir-timeline-item {
        background: rgba(0, 0, 0, 0.3);
        border-color: rgba(255, 255, 255, 0.1);
    }
    
    .mir-timeline-title {
        color: var(--mir-gray-100);
    }
    
    .mir-timeline-description {
        color: var(--mir-gray-200);
    }
    
    .mir-timeline-time {
        color: var(--mir-gray-400);
    }
}
```

## بهینه‌سازی عملکرد

### بارگیری تدریجی
```javascript
const lazyTimeline = new MirageTimeline('#lazy-timeline', {
    items: initialItems,
    
    onLoadMore: function(instance) {
        // بارگیری ۱۰ آیتم جدید
        loadNextPage(currentPage).then(newItems => {
            newItems.forEach(item => {
                instance.addItem(item, false);
            });
            currentPage++;
        });
    }
});
```

### مدیریت حافظه
```javascript
// محدود کردن تعداد آیتم‌ها
const maxItems = 50;

timeline.onItemAdd = function(item, instance) {
    const items = instance.getItems();
    if (items.length > maxItems) {
        // حذف آیتم‌های قدیمی
        instance.removeItem(items.length - 1);
    }
};
```

### کش کردن داده‌ها
```javascript
const timelineCache = new Map();

function loadTimelineData(userId) {
    if (timelineCache.has(userId)) {
        return Promise.resolve(timelineCache.get(userId));
    }
    
    return fetchUserActivity(userId).then(data => {
        timelineCache.set(userId, data);
        return data;
    });
}
```

## تست و عیب‌یابی

### مسائل متداول

**آیتم‌ها نمایش داده نمی‌شود:**
```javascript
// بررسی داده‌ها
console.log('Timeline items:', timeline.getItems());

// بررسی CSS
console.log(document.querySelector('link[href*="timeline.css"]'));
```

**زمان‌ها اشتباه نمایش داده می‌شود:**
```javascript
// بررسی تنظیمات زمان
const item = {
    time: new Date('2024-01-15T10:30:00'), // فرمت صحیح
    // time: '2024-01-15', // فرمت نادرست
};
```

**انیمیشن‌ها کار نمی‌کند:**
```javascript
// بررسی تنظیمات انیمیشن
const timeline = new MirageTimeline('#timeline', {
    animated: true, // فعال کردن انیمیشن
    items: timelineItems
});
```

### تست واحد
```javascript
// تست اضافه کردن آیتم
QUnit.test('Timeline Add Item', function(assert) {
    const timeline = new MirageTimeline('#test-timeline', {
        items: []
    });
    
    timeline.addItem({
        title: 'تست آیتم',
        time: new Date()
    });
    
    assert.equal(timeline.getItems().length, 1, 'آیتم اضافه شد');
});
```

## مثال کامل

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>نمونه کامل تایم‌لاین میراژ</title>
    <link rel="stylesheet" href="timeline.css">
</head>
<body>
    <!-- تایم‌لاین اصلی -->
    <div class="timeline-container">
        <h1>فعالیت‌های اخیر</h1>
        <div id="main-timeline"></div>
    </div>
    
    <script src="timeline.js"></script>
    <script>
        // داده‌های نمونه
        const sampleActivities = [
            {
                type: 'user',
                title: 'کاربر جدید عضو شد',
                subtitle: 'لیلا موسوی',
                description: 'کاربر از طریق دعوت‌نامه ایمیل عضو شد',
                time: new Date(Date.now() - 1000 * 60 * 5), // ۵ دقیقه پیش
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c000?w=40&h=40&fit=crop&crop=face',
                actions: [
                    { type: 'profile', text: 'مشاهده پروفایل' },
                    { type: 'welcome', text: 'ارسال پیام خوشآمدگویی' }
                ]
            },
            {
                type: 'success',
                title: 'فروش جدید ثبت شد',
                subtitle: 'سفارش #۱۲۳۴',
                description: 'محصول "لپ‌تاپ گیمینگ" به مبلغ ۲۵,۰۰۰,۰۰۰ تومان فروخته شد',
                time: new Date(Date.now() - 1000 * 60 * 15), // ۱۵ دقیقه پیش
                icon: 'shopping-cart',
                meta: ['مشتری: احمد احمدی', 'کد تخفیف: SAVE20'],
                tags: [
                    { text: '۲۵,۰۰۰,۰۰۰ تومان', type: 'success' },
                    { text: 'فوری', type: 'info' }
                ],
                actions: [
                    { type: 'view', text: 'مشاهده سفارش' },
                    { type: 'invoice', text: 'صدور فاکتور' }
                ]
            },
            {
                type: 'warning',
                title: 'موجودی کالا کم شده',
                subtitle: 'محصول: هدفون بی‌سیم',
                description: 'موجودی کالا به کمتر از ۱۰ عدد رسیده است',
                time: new Date(Date.now() - 1000 * 60 * 60 * 2), // ۲ ساعت پیش
                icon: 'alert-triangle',
                tags: [
                    { text: '۵ عدد باقی‌مانده', type: 'warning' }
                ],
                actions: [
                    { type: 'restock', text: 'سفارش تأمین' },
                    { type: 'notify', text: 'اطلاع به تأمین‌کننده' }
                ]
            },
            {
                type: 'system',
                title: 'پشتیبان‌گیری خودکار',
                description: 'پشتیبان‌گیری شبانه پایگاه داده با موفقیت انجام شد',
                time: new Date(Date.now() - 1000 * 60 * 60 * 12), // ۱۲ ساعت پیش
                icon: 'database',
                meta: ['حجم: ۲.۳ گیگابایت', 'مدت زمان: ۱۵ دقیقه'],
                tags: [
                    { text: 'خودکار', type: 'info' },
                    { text: 'موفق', type: 'success' }
                ]
            },
            {
                type: 'error',
                title: 'خطا در ارسال ایمیل',
                subtitle: 'سرویس خبرنامه',
                description: 'امکان ارسال ایمیل خبرنامه به ۱۲۳ کاربر وجود نداشت',
                time: new Date(Date.now() - 1000 * 60 * 60 * 24), // ۱ روز پیش
                icon: 'mail',
                meta: ['کد خطا: SMTP_500', 'تلاش مجدد: ۳ بار'],
                tags: [
                    { text: '۱۲۳ کاربر', type: 'error' }
                ],
                actions: [
                    { type: 'retry', text: 'تلاش مجدد' },
                    { type: 'logs', text: 'مشاهده لاگ‌ها' }
                ]
            }
        ];
        
        // راه‌اندازی تایم‌لاین
        const timeline = new MirageTimeline('#main-timeline', {
            items: sampleActivities,
            variant: 'vertical',
            size: 'md',
            style: 'default',
            
            animated: true,
            realTime: true,
            showTime: true,
            showMeta: true,
            showActions: true,
            
            onItemClick: function(item, index, event) {
                console.log(`کلیک روی آیتم ${index}:`, item.title);
                
                // نمایش جزئیات در مودال
                showItemDetails(item);
            },
            
            onActionClick: function(action, item, event) {
                console.log(`عملیات ${action.type} روی آیتم ${item.title}`);
                
                // پردازش عملیات
                handleAction(action.type, item);
            }
        });
        
        // شبیه‌سازی اضافه کردن آیتم جدید
        setTimeout(() => {
            timeline.addItem({
                type: 'info',
                title: 'کاربر آنلاین شد',
                subtitle: 'رضا کریمی',
                time: new Date(),
                icon: 'user-check',
                actions: [
                    { type: 'message', text: 'ارسال پیام' }
                ]
            });
        }, 5000);
        
        // توابع کمکی
        function showItemDetails(item) {
            alert(`جزئیات: ${item.title}\n${item.description || 'بدون توضیحات'}`);
        }
        
        function handleAction(actionType, item) {
            switch(actionType) {
                case 'profile':
                    alert(`نمایش پروفایل ${item.subtitle}`);
                    break;
                case 'welcome':
                    alert(`ارسال پیام خوشآمدگویی به ${item.subtitle}`);
                    break;
                case 'view':
                    alert(`مشاهده جزئیات ${item.title}`);
                    break;
                case 'invoice':
                    alert('صدور فاکتور...');
                    break;
                case 'restock':
                    alert('سفارش تأمین کالا...');
                    break;
                case 'notify':
                    alert('اطلاع‌رسانی به تأمین‌کننده...');
                    break;
                case 'retry':
                    alert('تلاش مجدد برای ارسال...');
                    break;
                case 'logs':
                    alert('نمایش لاگ‌های سیستم...');
                    break;
                case 'message':
                    alert(`ارسال پیام به ${item.subtitle}`);
                    break;
                default:
                    alert(`عملیات ${actionType} انجام شد`);
            }
        }
    </script>
</body>
</html>
```

این کامپوننت تایم‌لاین میراژ، راهکاری کامل و انعطاف‌پذیر برای نمایش فعالیت‌ها و تاریخچه رویدادها در وب‌سایت‌های فارسی ارائه می‌دهد.