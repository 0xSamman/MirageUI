# کامپوننت مراحل/ویزارد میراژ
# MirageUI Steps/Wizard Component

## معرفی کلی
کامپوننت مراحل میراژ برای ایجاد فرآیندهای چندمرحله‌ای مانند ثبت‌نام، تنظیمات، پرداخت، و سایر جریان‌های کاری که نیاز به راهنمایی مرحله‌ای دارند، طراحی شده است. این کامپوننت کاملاً با زبان فارسی و چیدمان راست‌به‌چپ سازگار است.

## ویژگی‌های کلیدی

### 🎨 طراحی
- **Glass Morphism**: استفاده از افکت شیشه‌ای در زمینه
- **RTL Support**: پشتیبانی کامل از چیدمان راست‌به‌چپ
- **Persian Numbers**: استفاده از اعداد فارسی (۰۱۲۳۴۵۶۷۸۹)
- **Visual Progress**: نمایش پیشرفت با نوار یا اتصال‌دهنده‌ها

### 🔧 قابلیت‌ها
- **چندین نوع نمایش**: Default، Simple، Outlined، Minimal
- **دو جهت**: افقی و عمودی
- **اندازه‌های مختلف**: کوچک، متوسط، بزرگ
- **ناوبری تعاملی**: کلیک روی مراحل، دکمه‌های ناوبری
- **اعتبارسنجی**: کنترل انتقال بین مراحل
- **حالت‌های مختلف**: تکمیل شده، فعال، خطا، هشدار
- **Accessibility**: سازگار با صفحه‌خوان‌ها

## نحوه استفاده

### HTML ساده
```html
<div id="registration-steps" class="mir-steps-auto" 
     data-variant="default" 
     data-show-navigation="true">
</div>
```

### JavaScript تعاملی
```javascript
const steps = new MirageSteps('#registration-steps', {
    steps: [
        {
            title: 'اطلاعات شخصی',
            description: 'نام، ایمیل و شماره تلفن',
            contentTitle: 'وارد کردن اطلاعات شخصی',
            contentText: 'لطفاً اطلاعات شخصی خود را با دقت وارد کنید.'
        },
        {
            title: 'تأیید هویت',
            description: 'بارگذاری مدارک',
            icon: 'shield-check'
        },
        {
            title: 'تکمیل ثبت‌نام',
            description: 'بررسی و تأیید نهایی'
        }
    ],
    
    onStepChange: function(newStep, oldStep) {
        console.log(`مرحله تغییر کرد: ${oldStep} به ${newStep}`);
    }
});
```

## گزینه‌های پیکربندی

### ساختار مراحل
```javascript
{
    steps: [
        {
            title: 'عنوان مرحله',           // اجباری
            description: 'توضیح مرحله',     // اختیاری
            icon: 'user',                   // آیکون Feather
            content: 'A',                   // محتوای سفارشی
            contentTitle: 'عنوان محتوا',    // عنوان صفحه محتوا
            contentText: 'متن محتوا',       // متن ساده محتوا
            contentHtml: '<div>...</div>',  // HTML محتوا
            state: 'completed',             // completed, error, warning
            disabled: false,                // غیرفعال کردن مرحله
            
            // توابع سفارشی
            validate: function(wizard) {    // اعتبارسنجی
                return true;
            },
            onRender: function(container, stepIndex, wizard) {
                // رندر سفارشی محتوا
            }
        }
    ],
    
    currentStep: 0                         // مرحله فعلی (شروع از ۰)
}
```

### ظاهر و نمایش
```javascript
{
    variant: 'default',    // default, simple, outlined, minimal
    size: 'md',           // sm, md, lg
    direction: 'horizontal', // horizontal, vertical
    
    showProgress: true,    // نمایش نوار پیشرفت
    showNavigation: true,  // نمایش دکمه‌های ناوبری
    showContent: true,     // نمایش ناحیه محتوا
    
    clickable: true,       // امکان کلیک روی مراحل
    allowSkip: false,      // امکان رد کردن مراحل
    validateOnNext: true   // اعتبارسنجی قبل از رفتن به مرحله بعد
}
```

### زبان و محتوا
```javascript
{
    persianNumbers: true,  // استفاده از اعداد فارسی
    rtl: true,            // چیدمان راست‌به‌چپ
    
    labels: {
        next: 'بعدی',
        previous: 'قبلی',
        finish: 'پایان',
        skip: 'رد کردن',
        step: 'مرحله',
        of: 'از',
        completed: 'تکمیل شده',
        current: 'فعلی',
        pending: 'در انتظار',
        error: 'خطا',
        warning: 'هشدار'
    }
}
```

## انواع نمایش (Variants)

### پیش‌فرض (Default)
```html
<div class="mir-steps" data-variant="default">
    <!-- شیشه‌ای با افکت blur -->
</div>
```

### ساده (Simple)
```html
<div class="mir-steps mir-steps-simple">
    <!-- حداقل عناصر بصری -->
</div>
```

### خطی (Outlined)
```html
<div class="mir-steps mir-steps-outlined">
    <!-- تمرکز روی خطوط و حاشیه -->
</div>
```

### حداقلی (Minimal)
```html
<div class="mir-steps mir-steps-minimal">
    <!-- حداقل فضا و عناصر -->
</div>
```

## اندازه‌ها

### کوچک
```html
<div class="mir-steps mir-steps-sm">
    <!-- برای فضاهای محدود -->
</div>
```

### متوسط (پیش‌فرض)
```html
<div class="mir-steps">
    <!-- اندازه استاندارد -->
</div>
```

### بزرگ
```html
<div class="mir-steps mir-steps-lg">
    <!-- برای تأکید بیشتر -->
</div>
```

## جهت نمایش

### افقی (پیش‌فرض)
```html
<div class="mir-steps">
    <!-- مراحل در یک خط افقی -->
</div>
```

### عمودی
```html
<div class="mir-steps mir-steps-vertical">
    <!-- مراحل در یک ستون عمودی -->
</div>
```

## رویدادها (Events)

### تغییر مرحله
```javascript
const steps = new MirageSteps('#steps', {
    onStepChange: function(newStep, oldStep, instance) {
        console.log(`مرحله از ${oldStep} به ${newStep} تغییر کرد`);
        
        // بارگذاری محتوای مرحله جدید
        loadStepContent(newStep);
    }
});
```

### کلیک روی مرحله
```javascript
const steps = new MirageSteps('#steps', {
    onStepClick: function(stepIndex, step, instance) {
        console.log(`کلیک روی مرحله ${stepIndex}`);
        
        // اگر false برگردانده شود، انتقال انجام نمی‌شود
        if (stepIndex > instance.getCurrentStep() + 1) {
            return false; // جلوگیری از پرش بیش از یک مرحله
        }
        
        return true;
    }
});
```

### ناوبری
```javascript
const steps = new MirageSteps('#steps', {
    onNext: function(currentStep, instance) {
        console.log(`رفتن به مرحله بعدی از ${currentStep}`);
        
        // انجام عملیات قبل از انتقال
        return saveCurrentStepData();
    },
    
    onPrevious: function(currentStep, instance) {
        console.log(`بازگشت از مرحله ${currentStep}`);
        return true;
    },
    
    onFinish: function(instance) {
        console.log('تکمیل تمام مراحل');
        
        // ارسال داده‌های نهایی
        return submitWizardData();
    }
});
```

### اعتبارسنجی
```javascript
const steps = new MirageSteps('#steps', {
    validateOnNext: true,
    
    onValidate: function(stepIndex, step, instance) {
        console.log(`اعتبارسنجی مرحله ${stepIndex}`);
        
        // بررسی داده‌های مرحله فعلی
        const isValid = validateStepData(stepIndex);
        
        if (!isValid) {
            // نمایش پیام خطا
            showValidationError('لطفاً تمام فیلدها را پر کنید');
            return false;
        }
        
        return true;
    }
});
```

## API عمومی

### ناوبری بین مراحل
```javascript
// رفتن به مرحله خاص
steps.goToStep(2);

// مرحله بعدی
steps.nextStep();

// مرحله قبلی
steps.previousStep();

// رد کردن مرحله فعلی
steps.skipStep();

// پایان فرآیند
steps.finish();
```

### دریافت اطلاعات
```javascript
// مرحله فعلی
const currentStep = steps.getCurrentStep();

// کل مراحل
const totalSteps = steps.getTotalSteps();

// بررسی تکمیل مرحله
const isCompleted = steps.isStepCompleted(1);
```

### مدیریت مراحل
```javascript
// اضافه کردن مرحله جدید
steps.addStep({
    title: 'مرحله جدید',
    description: 'توضیح مرحله جدید'
}, 2); // در موقعیت ۲

// حذف مرحله
steps.removeStep(1);

// تنظیم وضعیت مرحله
steps.setStepState(0, 'completed');
steps.setStepState(1, 'error');
steps.setStepState(2, 'warning');
```

### حالت‌های کاری
```javascript
// نمایش حالت بارگیری
steps.setLoading(true);

// بازنشانی ویزارد
steps.reset();

// حذف کامپوننت
steps.destroy();
```

## ناوبری کیبورد

### کلیدهای پشتیبانی‌شده
- **فلش راست**: مرحله قبلی (در RTL)
- **فلش چپ**: مرحله بعدی (در RTL)
- **Home**: اولین مرحله
- **End**: آخرین مرحله
- **Enter/Space**: انتخاب مرحله فوکوس‌شده

### مثال ناوبری
```javascript
// فعال‌سازی ناوبری کیبورد
steps.element.setAttribute('tabindex', '0');
steps.element.focus();

// کاربر می‌تواند با کلیدهای جهت‌دار حرکت کند
```

## دسترسی‌پذیری (Accessibility)

### ویژگی‌های دسترسی
```html
<!-- کانتینر اصلی با نقش progressbar -->
<div class="mir-steps-container" role="progressbar" 
     aria-valuenow="2" aria-valuemin="1" aria-valuemax="4">
    
    <!-- هر مرحله با برچسب مناسب -->
    <button class="mir-step-indicator" 
            aria-label="مرحله ۲ از ۴: تأیید هویت">
        ۲
    </button>
</div>

<!-- اعلان‌های زنده برای صفحه‌خوان -->
<div aria-live="polite" aria-atomic="true" class="sr-only">
    مرحله ۲: تأیید هویت
</div>
```

### پشتیبانی از صفحه‌خوان
- اعلان تغییر مرحله
- برچسب‌های توضیحی برای هر مرحله
- نقش‌های مناسب ARIA
- پشتیبانی از فوکوس کیبورد

## مثال‌های کاربردی

### ثبت‌نام کاربر
```html
<div id="user-registration"></div>

<script>
const registrationSteps = new MirageSteps('#user-registration', {
    steps: [
        {
            title: 'اطلاعات پایه',
            description: 'نام، ایمیل، رمز عبور',
            contentTitle: 'ایجاد حساب کاربری',
            contentHtml: `
                <form id="basic-info-form">
                    <input type="text" placeholder="نام کامل" required>
                    <input type="email" placeholder="ایمیل" required>
                    <input type="password" placeholder="رمز عبور" required>
                </form>
            `,
            validate: function() {
                return document.getElementById('basic-info-form').checkValidity();
            }
        },
        {
            title: 'تأیید ایمیل',
            description: 'کد تأیید ارسال شده',
            icon: 'mail-check',
            contentTitle: 'تأیید آدرس ایمیل',
            contentText: 'کد تأیید به ایمیل شما ارسال شد. لطفاً آن را وارد کنید.'
        },
        {
            title: 'اطلاعات تکمیلی',
            description: 'پروفایل و تنظیمات',
            contentTitle: 'تکمیل پروفایل',
            contentText: 'برای بهبود تجربه، لطفاً اطلاعات تکمیلی را وارد کنید.'
        },
        {
            title: 'پایان',
            description: 'تکمیل موفق ثبت‌نام',
            icon: 'check-circle',
            contentTitle: 'ثبت‌نام موفقیت‌آمیز',
            contentText: 'حساب کاربری شما با موفقیت ایجاد شد!'
        }
    ],
    
    variant: 'default',
    showNavigation: true,
    validateOnNext: true,
    
    onFinish: function() {
        // ارسال داده‌های ثبت‌نام
        submitRegistration();
        
        // هدایت به داشبورد
        window.location.href = '/dashboard';
    }
});
</script>
```

### فرآیند پرداخت
```javascript
const checkoutSteps = new MirageSteps('#checkout-process', {
    steps: [
        {
            title: 'سبد خرید',
            description: 'بررسی اقلام انتخابی',
            icon: 'shopping-cart'
        },
        {
            title: 'آدرس تحویل',
            description: 'انتخاب آدرس ارسال',
            icon: 'map-pin'
        },
        {
            title: 'روش پرداخت',
            description: 'انتخاب درگاه پرداخت',
            icon: 'credit-card'
        },
        {
            title: 'تأیید نهایی',
            description: 'بررسی و تکمیل سفارش',
            icon: 'check-circle'
        }
    ],
    
    variant: 'outlined',
    size: 'lg',
    direction: 'horizontal',
    
    onStepChange: function(newStep, oldStep) {
        // بارگذاری داده‌های مرحله
        loadCheckoutStepData(newStep);
        
        // بروزرسانی قیمت
        updatePricing();
    },
    
    onValidate: function(stepIndex) {
        switch(stepIndex) {
            case 0:
                return validateCart();
            case 1:
                return validateAddress();
            case 2:
                return validatePaymentMethod();
            case 3:
                return validateFinalOrder();
            default:
                return true;
        }
    }
});
```

### تنظیمات کاربر
```javascript
const settingsWizard = new MirageSteps('#settings-wizard', {
    steps: [
        {
            title: 'تنظیمات عمومی',
            description: 'زبان، منطقه زمانی',
            icon: 'settings'
        },
        {
            title: 'حریم خصوصی',
            description: 'سطح دسترسی اطلاعات',
            icon: 'shield'
        },
        {
            title: 'اعلان‌ها',
            description: 'تنظیم نحوه اطلاع‌رسانی',
            icon: 'bell'
        },
        {
            title: 'امنیت',
            description: 'رمز عبور و تأیید دومرحله‌ای',
            icon: 'lock'
        }
    ],
    
    variant: 'simple',
    direction: 'vertical',
    allowSkip: true,
    clickable: true,
    
    onStepClick: function(stepIndex, step, instance) {
        // اجازه پرش آزاد بین مراحل تنظیمات
        return true;
    },
    
    onFinish: function() {
        saveAllSettings();
        showSuccessMessage('تنظیمات با موفقیت ذخیره شد');
    }
});
```

## سفارسی‌سازی پیشرفته

### تنظیم ظاهر
```css
:root {
    --mir-steps-primary: var(--mir-primary);
    --mir-steps-success: var(--mir-success);
    --mir-steps-error: var(--mir-error);
    --mir-steps-warning: var(--mir-warning);
    
    --mir-steps-bg: rgba(255, 255, 255, 0.7);
    --mir-steps-border: rgba(255, 255, 255, 0.2);
    --mir-steps-connector: var(--mir-gray-300);
}
```

### انیمیشن‌های سفارشی
```css
.mir-step-custom-enter {
    animation: customStepEnter 0.6s ease-out;
}

@keyframes customStepEnter {
    from {
        opacity: 0;
        transform: translateX(30px) scale(0.9);
    }
    to {
        opacity: 1;
        transform: translateX(0) scale(1);
    }
}

/* پالس سفارشی برای مرحله فعال */
.mir-step-active .mir-step-indicator {
    animation: customPulse 2s ease-in-out infinite;
}

@keyframes customPulse {
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
    .mir-steps {
        --mir-steps-bg: rgba(0, 0, 0, 0.4);
        --mir-steps-border: rgba(255, 255, 255, 0.1);
        --mir-steps-connector: rgba(255, 255, 255, 0.2);
    }
    
    .mir-step-title {
        color: var(--mir-gray-100);
    }
    
    .mir-step-description {
        color: var(--mir-gray-300);
    }
}
```

## نکات بهینه‌سازی

### کارایی
```javascript
// تنبلی در بارگذاری محتوا
const lazySteps = new MirageSteps('#lazy-steps', {
    steps: stepDefinitions,
    
    onStepChange: function(newStep) {
        // بارگذاری محتوا فقط هنگام نیاز
        if (!stepContentCache[newStep]) {
            loadStepContentAsync(newStep).then(content => {
                stepContentCache[newStep] = content;
                updateStepContent(newStep, content);
            });
        }
    }
});
```

### UX بهتر
```javascript
// ذخیره خودکار پیشرفت
const autoSaveSteps = new MirageSteps('#auto-save-steps', {
    steps: wizardSteps,
    
    onStepChange: function(newStep, oldStep) {
        // ذخیره پیشرفت در localStorage
        localStorage.setItem('wizardProgress', JSON.stringify({
            currentStep: newStep,
            timestamp: Date.now()
        }));
        
        // ذخیره داده‌های مرحله قبلی
        saveStepData(oldStep);
    }
});

// بازیابی پیشرفت قبلی
const savedProgress = localStorage.getItem('wizardProgress');
if (savedProgress) {
    const progress = JSON.parse(savedProgress);
    autoSaveSteps.goToStep(progress.currentStep);
}
```

### Responsive Design
```css
@media (max-width: 768px) {
    .mir-steps {
        /* تبدیل به حالت عمودی در موبایل */
        flex-direction: column;
    }
    
    .mir-step-description {
        /* مخفی کردن توضیحات در صفحات کوچک */
        display: none;
    }
    
    .mir-steps-navigation {
        /* سادهتر کردن ناوبری */
        justify-content: space-between;
    }
}
```

## عیب‌یابی

### مسائل متداول

**مراحل نمایش داده نمی‌شود:**
```javascript
// بررسی وجود داده‌های مراحل
console.log('Steps data:', steps.options.steps);

// بررسی صحت CSS
console.log(document.querySelector('link[href*="steps.css"]'));
```

**ناوبری کار نمی‌کند:**
```javascript
// بررسی وجود Feather Icons
console.log(window.feather);

// بررسی event listeners
steps.element.addEventListener('click', function(e) {
    console.log('Click detected:', e.target);
});
```

**اعتبارسنجی کار نمی‌کند:**
```javascript
// تست دستی اعتبارسنجی
const isValid = steps.validateStep(steps.getCurrentStep());
console.log('Validation result:', isValid);
```

## مثال کامل

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>نمونه کامل ویزارد میراژ</title>
    <link rel="stylesheet" href="steps.css">
</head>
<body>
    <!-- کانتینر ویزارد -->
    <div class="wizard-container">
        <h1>فرآیند عضویت</h1>
        <div id="membership-wizard"></div>
    </div>
    
    <script src="steps.js"></script>
    <script>
        // تعریف مراحل
        const membershipSteps = [
            {
                title: 'انتخاب طرح',
                description: 'نوع عضویت مورد نظر',
                icon: 'package',
                contentTitle: 'انتخاب طرح عضویت',
                contentHtml: `
                    <div class="plan-selection">
                        <div class="plan-card" data-plan="basic">
                            <h3>طرح پایه</h3>
                            <p>۱۰۰,۰۰۰ تومان/ماه</p>
                        </div>
                        <div class="plan-card" data-plan="premium">
                            <h3>طرح ویژه</h3>
                            <p>۲۰۰,۰۰۰ تومان/ماه</p>
                        </div>
                    </div>
                `,
                validate: function() {
                    return document.querySelector('.plan-card.selected') !== null;
                }
            },
            {
                title: 'اطلاعات شخصی',
                description: 'نام، ایمیل، تلفن',
                icon: 'user',
                contentTitle: 'وارد کردن اطلاعات',
                contentHtml: `
                    <form id="personal-info" class="step-form">
                        <input type="text" name="name" placeholder="نام کامل" required>
                        <input type="email" name="email" placeholder="ایمیل" required>
                        <input type="tel" name="phone" placeholder="شماره تلفن" required>
                    </form>
                `,
                validate: function() {
                    const form = document.getElementById('personal-info');
                    return form.checkValidity();
                }
            },
            {
                title: 'پرداخت',
                description: 'تکمیل فرآیند پرداخت',
                icon: 'credit-card',
                contentTitle: 'پرداخت آنلاین',
                contentText: 'شما به درگاه پرداخت هدایت خواهید شد.',
                onRender: function(container, stepIndex, wizard) {
                    // شبیه‌سازی درگاه پرداخت
                    const paymentForm = document.createElement('div');
                    paymentForm.innerHTML = `
                        <div class="payment-info">
                            <p>مبلغ قابل پرداخت: <strong>۲۰۰,۰۰۰ تومان</strong></p>
                            <button type="button" onclick="processPayment()">
                                پرداخت امن
                            </button>
                        </div>
                    `;
                    container.appendChild(paymentForm);
                }
            },
            {
                title: 'تأیید نهایی',
                description: 'عضویت موفقیت‌آمیز',
                icon: 'check-circle',
                contentTitle: 'عضویت تکمیل شد',
                contentText: 'تبریک! عضویت شما با موفقیت فعال شد.',
                state: 'completed'
            }
        ];
        
        // راه‌اندازی ویزارد
        const wizard = new MirageSteps('#membership-wizard', {
            steps: membershipSteps,
            variant: 'default',
            size: 'md',
            direction: 'horizontal',
            
            showProgress: true,
            showNavigation: true,
            showContent: true,
            
            clickable: false, // فقط ناوبری ترتیبی
            validateOnNext: true,
            
            onStepChange: function(newStep, oldStep) {
                console.log(`مرحله تغییر کرد: ${oldStep + 1} به ${newStep + 1}`);
                
                // آمار گوگل آنالیتیکس
                gtag('event', 'wizard_step_change', {
                    step_number: newStep + 1,
                    step_name: this.options.steps[newStep].title
                });
            },
            
            onValidate: function(stepIndex, step) {
                console.log(`اعتبارسنجی مرحله ${stepIndex + 1}`);
                
                if (step.validate) {
                    const isValid = step.validate();
                    if (!isValid) {
                        this.setStepState(stepIndex, 'error');
                        showNotification('لطفاً تمام فیلدهای الزامی را پر کنید', 'error');
                    }
                    return isValid;
                }
                
                return true;
            },
            
            onFinish: function() {
                console.log('ویزارد تکمیل شد');
                
                // ارسال داده‌های نهایی
                const formData = collectAllStepData();
                
                fetch('/api/membership/create', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        showSuccessPage();
                    } else {
                        showErrorMessage(data.message);
                    }
                });
            }
        });
        
        // توابع کمکی
        function processPayment() {
            wizard.setLoading(true);
            
            // شبیه‌سازی پرداخت
            setTimeout(() => {
                wizard.setLoading(false);
                wizard.nextStep();
            }, 2000);
        }
        
        function collectAllStepData() {
            // جمع‌آوری تمام داده‌های فرم
            return {
                plan: document.querySelector('.plan-card.selected')?.dataset.plan,
                personalInfo: new FormData(document.getElementById('personal-info')),
                paymentCompleted: true
            };
        }
        
        function showNotification(message, type) {
            // نمایش اعلان
            alert(message);
        }
        
        function showSuccessPage() {
            // هدایت به صفحه موفقیت
            window.location.href = '/success';
        }
        
        // رویدادهای انتخاب طرح
        document.addEventListener('click', function(e) {
            if (e.target.closest('.plan-card')) {
                document.querySelectorAll('.plan-card').forEach(card => {
                    card.classList.remove('selected');
                });
                e.target.closest('.plan-card').classList.add('selected');
            }
        });
    </script>
</body>
</html>
```

این کامپوننت مراحل/ویزارد میراژ، راهکاری کامل و انعطاف‌پذیر برای ایجاد فرآیندهای چندمرحله‌ای در وب‌سایت‌های فارسی ارائه می‌دهد.