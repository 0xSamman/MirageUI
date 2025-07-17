# سیستم جدول‌های پیشرفته میراژ

## معرفی

کامپوننت جدول‌های پیشرفته میراژ یک سیستم کامل برای نمایش و مدیریت داده‌ها در قالب جدول است که با طراحی RTL و پشتیبانی کامل از زبان فارسی ارائه می‌شود.

## ویژگی‌ها

- **طراحی RTL**: بهینه‌سازی شده برای خواندن راست به چپ
- **مرتب‌سازی**: قابلیت مرتب‌سازی ستون‌ها
- **فیلتر کردن**: فیلتر پیشرفته برای ستون‌ها
- **جستجو**: جستجوی سریع در تمام داده‌ها
- **انتخاب**: انتخاب تک یا چند ردیف
- **صفحه‌بندی**: نمایش داده‌ها در صفحات مختلف
- **عملیات گروهی**: اجرای عملیات روی چندین ردیف
- **ریسپانسیو**: سازگار با تمام اندازه‌های صفحه
- **اعداد فارسی**: تبدیل خودکار اعداد انگلیسی به فارسی
- **طراحی شیشه‌ای**: استفاده از Glass Morphism

## نحوه استفاده

### HTML پایه

```html
<div id="my-table"></div>
```

### CSS

```html
<link rel="stylesheet" href="components/table/table.css">
```

### JavaScript

```html
<script src="components/table/table.js"></script>
```

## راه‌اندازی اولیه

### جدول ساده

```javascript
const table = new MirageTable({
    container: '#my-table',
    data: [
        { id: 1, name: 'علی احمدی', email: 'ali@example.com', status: 'active' },
        { id: 2, name: 'فاطمه رضایی', email: 'fateme@example.com', status: 'inactive' }
    ],
    columns: [
        { key: 'id', label: 'شناسه', sortable: true },
        { key: 'name', label: 'نام', sortable: true },
        { key: 'email', label: 'ایمیل', sortable: true },
        { key: 'status', label: 'وضعیت', type: 'status' }
    ]
});
```

### جدول پیشرفته

```javascript
const advancedTable = new MirageTable({
    container: '#advanced-table',
    data: userData,
    columns: [
        { 
            key: 'user', 
            label: 'کاربر', 
            type: 'user',
            sortable: true 
        },
        { 
            key: 'created_at', 
            label: 'تاریخ ایجاد', 
            type: 'date',
            sortable: true 
        },
        { 
            key: 'amount', 
            label: 'مبلغ', 
            type: 'number',
            sortable: true 
        },
        { 
            key: 'status', 
            label: 'وضعیت', 
            type: 'status',
            filterable: true 
        }
    ],
    sortable: true,
    filterable: true,
    searchable: true,
    selectable: true,
    pagination: true,
    perPage: 10,
    bulkActions: true,
    title: 'لیست کاربران',
    onSort: (column, direction) => {
        console.log(`مرتب‌سازی براساس ${column} در جهت ${direction}`);
    },
    onRowClick: (row, index) => {
        console.log('کلیک روی ردیف:', row);
    }
});
```

## تنظیمات

### تنظیمات اصلی

| گزینه | نوع | پیش‌فرض | توضیحات |
|-------|-----|---------|---------|
| `container` | string/element | `null` | انتخابگر یا عنصر محتوا |
| `data` | Array | `[]` | داده‌های جدول |
| `columns` | Array | `[]` | تنظیمات ستون‌ها |
| `title` | string | `'جدول داده‌ها'` | عنوان جدول |
| `sortable` | boolean | `true` | فعال‌سازی مرتب‌سازی |
| `filterable` | boolean | `true` | فعال‌سازی فیلتر |
| `searchable` | boolean | `true` | فعال‌سازی جستجو |
| `selectable` | boolean | `true` | فعال‌سازی انتخاب |
| `pagination` | boolean | `true` | فعال‌سازی صفحه‌بندی |
| `perPage` | number | `10` | تعداد ردیف در صفحه |
| `bulkActions` | boolean | `true` | فعال‌سازی عملیات گروهی |
| `responsive` | boolean | `true` | فعال‌سازی ریسپانسیو |
| `persianNumbers` | boolean | `true` | تبدیل اعداد به فارسی |
| `rtl` | boolean | `true` | جهت راست به چپ |

### تنظیمات ستون‌ها

```javascript
const columns = [
    {
        key: 'name',           // کلید داده
        label: 'نام',          // برچسب ستون
        sortable: true,        // قابل مرتب‌سازی
        filterable: true,      // قابل فیلتر
        type: 'text',          // نوع داده
        width: '200px',        // عرض ستون
        className: 'text-center', // کلاس CSS
        render: (value, row, index) => {
            // تابع سفارشی برای رندر
            return `<strong>${value}</strong>`;
        }
    }
];
```

### انواع ستون‌ها

#### ستون متنی (پیش‌فرض)
```javascript
{ key: 'name', label: 'نام', type: 'text' }
```

#### ستون کاربر
```javascript
{ 
    key: 'user', 
    label: 'کاربر', 
    type: 'user' 
}
```

داده باید شامل:
```javascript
{
    user: {
        name: 'علی احمدی',
        email: 'ali@example.com',
        avatar: 'path/to/avatar.jpg'
    }
}
```

#### ستون وضعیت
```javascript
{ key: 'status', label: 'وضعیت', type: 'status' }
```

مقادیر ممکن: `'success'`, `'warning'`, `'error'`, `'info'`, `'default'`

#### ستون تاریخ
```javascript
{ key: 'created_at', label: 'تاریخ ایجاد', type: 'date' }
```

#### ستون عددی
```javascript
{ key: 'amount', label: 'مبلغ', type: 'number' }
```

### عملیات ردیف

```javascript
const table = new MirageTable({
    // ... سایر تنظیمات
    rowActions: [
        {
            label: 'مشاهده',
            action: 'view',
            icon: 'eye',
            variant: 'view'
        },
        {
            label: 'ویرایش',
            action: 'edit',
            icon: 'edit',
            variant: 'edit'
        },
        {
            label: 'حذف',
            action: 'delete',
            icon: 'trash-2',
            variant: 'delete'
        }
    ],
    onRowAction: (action, row, index) => {
        switch(action) {
            case 'view':
                console.log('مشاهده:', row);
                break;
            case 'edit':
                console.log('ویرایش:', row);
                break;
            case 'delete':
                console.log('حذف:', row);
                break;
        }
    }
});
```

### عملیات گروهی

```javascript
const table = new MirageTable({
    // ... سایر تنظیمات
    bulkActions: [
        {
            label: 'حذف انتخاب شده‌ها',
            action: 'delete',
            variant: 'danger'
        },
        {
            label: 'صدور گزارش',
            action: 'export',
            variant: 'secondary'
        },
        {
            label: 'ارسال ایمیل',
            action: 'email',
            variant: 'primary'
        }
    ],
    onBulkAction: (action, selectedData, selectedIndices) => {
        console.log(`عملیات ${action} روی ${selectedData.length} مورد`);
    }
});
```

## API عمومی

### تنظیم داده‌ها

```javascript
// تنظیم داده‌های جدید
table.setData(newData);

// افزودن ردیف جدید
table.addRow({
    id: 3,
    name: 'حسن محمدی',
    email: 'hasan@example.com'
});

// حذف ردیف
table.deleteRow(rowIndex);

// به‌روزرسانی ردیف
table.updateRow(rowIndex, {
    name: 'نام جدید',
    email: 'new@example.com'
});
```

### کنترل انتخاب

```javascript
// دریافت ردیف‌های انتخاب شده
const selected = table.getSelectedRows();

// پاک کردن انتخاب‌ها
table.clearSelection();
```

### کنترل فیلتر و جستجو

```javascript
// پاک کردن فیلترها
table.clearFilters();

// پاک کردن جستجو
table.clearSearch();

// تازه‌سازی جدول
table.refresh();
```

### کنترل وضعیت بارگیری

```javascript
// نمایش وضعیت بارگیری
table.setLoading(true);

// مخفی کردن وضعیت بارگیری
table.setLoading(false);
```

### صدور داده‌ها

```javascript
// صدور تمام داده‌ها
table.exportData();

// صدور داده‌های انتخاب شده
const selected = table.getSelectedRows();
table.exportData(selected);
```

## رویدادها

### رویدادهای اصلی

```javascript
const table = new MirageTable({
    // ... سایر تنظیمات
    onSort: (column, direction) => {
        console.log(`مرتب‌سازی: ${column} - ${direction}`);
    },
    onFilter: (filters) => {
        console.log('فیلترها:', filters);
    },
    onSearch: (searchTerm) => {
        console.log('جستجو:', searchTerm);
    },
    onSelect: (selectedIndices) => {
        console.log('انتخاب شده:', selectedIndices);
    },
    onRowClick: (row, index) => {
        console.log('کلیک روی ردیف:', row);
    },
    onRowAction: (action, row, index) => {
        console.log('عملیات ردیف:', action, row);
    },
    onBulkAction: (action, selectedData, selectedIndices) => {
        console.log('عملیات گروهی:', action, selectedData);
    }
});
```

## شخصی‌سازی CSS

### کلاس‌های اصلی

```css
/* محتوای جدول */
.mir-table-container {
    /* استایل محتوای جدول */
}

/* هدر جدول */
.mir-table-header {
    /* استایل هدر */
}

/* جدول اصلی */
.mir-table {
    /* استایل جدول */
}

/* ردیف‌های انتخاب شده */
.mir-table tbody tr.mir-selected {
    /* استایل ردیف انتخاب شده */
}

/* دکمه‌های عملیات */
.mir-table-action-btn {
    /* استایل دکمه‌های عملیات */
}
```

### تم‌های رنگی

```css
/* تم سبز */
.mir-table-container.mir-theme-green {
    --mir-table-primary: var(--mir-green-500);
}

/* تم قرمز */
.mir-table-container.mir-theme-red {
    --mir-table-primary: var(--mir-red-500);
}

/* تم آبی */
.mir-table-container.mir-theme-blue {
    --mir-table-primary: var(--mir-blue-500);
}
```

## مثال‌های کاربردی

### جدول کاربران

```javascript
const usersTable = new MirageTable({
    container: '#users-table',
    title: 'مدیریت کاربران',
    data: [
        {
            id: 1,
            user: {
                name: 'علی احمدی',
                email: 'ali@example.com',
                avatar: 'https://via.placeholder.com/32'
            },
            role: 'admin',
            status: 'success',
            created_at: '2023-01-15',
            last_login: '2023-07-17'
        }
    ],
    columns: [
        { key: 'id', label: 'شناسه', sortable: true, width: '80px' },
        { key: 'user', label: 'کاربر', type: 'user', sortable: true },
        { key: 'role', label: 'نقش', filterable: true },
        { key: 'status', label: 'وضعیت', type: 'status', filterable: true },
        { key: 'created_at', label: 'تاریخ ایجاد', type: 'date', sortable: true },
        { key: 'last_login', label: 'آخرین ورود', type: 'date', sortable: true }
    ],
    rowActions: [
        { label: 'مشاهده', action: 'view', icon: 'eye' },
        { label: 'ویرایش', action: 'edit', icon: 'edit' },
        { label: 'حذف', action: 'delete', icon: 'trash-2' }
    ],
    bulkActions: [
        { label: 'فعال‌سازی', action: 'activate', variant: 'success' },
        { label: 'غیرفعال‌سازی', action: 'deactivate', variant: 'warning' },
        { label: 'حذف', action: 'delete', variant: 'danger' }
    ]
});
```

### جدول سفارشات

```javascript
const ordersTable = new MirageTable({
    container: '#orders-table',
    title: 'مدیریت سفارشات',
    data: ordersData,
    columns: [
        { key: 'order_id', label: 'شماره سفارش', sortable: true },
        { key: 'customer', label: 'مشتری', type: 'user', sortable: true },
        { key: 'amount', label: 'مبلغ', type: 'number', sortable: true },
        { key: 'status', label: 'وضعیت', type: 'status', filterable: true },
        { key: 'created_at', label: 'تاریخ ثبت', type: 'date', sortable: true }
    ],
    perPage: 15,
    onRowClick: (order) => {
        window.location.href = `/orders/${order.id}`;
    }
});
```

## نکات و بهترین شیوه‌ها

### بهینه‌سازی عملکرد

1. **داده‌های حجیم**: برای داده‌های بزرگ از pagination استفاده کنید
2. **رندر سفارشی**: از تابع `render` برای ستون‌های پیچیده استفاده کنید
3. **فیلتر هوشمند**: فیلترها را بر اساس نوع داده محدود کنید

### دسترسی‌پذیری

1. **کیبورد**: از کلیدهای میانبر پشتیبانی می‌کند
2. **صفحه‌خوان**: تمام عناصر دارای برچسب مناسب هستند
3. **تباین**: در حالت تباین بالا قابل استفاده است

### ریسپانسیو

1. **موبایل**: در صفحات کوچک ستون‌ها عمودی می‌شوند
2. **تبلت**: بهینه‌سازی برای صفحات متوسط
3. **دسکتاپ**: نمایش کامل تمام ویژگی‌ها

## عیب‌یابی

### مشکلات متداول

**جدول نمایش داده نمی‌شود:**
- بررسی کنید که CSS و JS لود شده باشند
- انتخابگر container را بررسی کنید
- از Developer Console خطاها را بررسی کنید

**داده‌ها نمایش داده نمی‌شوند:**
- فرمت columns و data را بررسی کنید
- کلیدهای columns با کلیدهای data مطابقت داشته باشند

**مشکل در RTL:**
- `dir="rtl"` به container اضافه شود
- گزینه `rtl: true` در تنظیمات قرار گیرد

### لاگ‌ها

```javascript
// فعال‌سازی لاگ‌ها برای عیب‌یابی
const table = new MirageTable({
    // ... سایر تنظیمات
    debug: true,
    onSort: (column, direction) => {
        console.log('Sort:', column, direction);
    },
    onFilter: (filters) => {
        console.log('Filters:', filters);
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