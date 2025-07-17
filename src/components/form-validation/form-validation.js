/**
 * MIRAGE FORM VALIDATION COMPONENT - RTL PERSIAN OPTIMIZED
 * ========================================================
 * 
 * Advanced form validation with Persian support and glass morphism design
 * Features: Real-time validation, Persian error messages, RTL layout
 * 
 * @author Mirage Design System
 * @version 1.0.0
 */

class MirageFormValidation {
    constructor(options = {}) {
        this.options = {
            form: null,
            fields: {},
            validateOnInput: true,
            validateOnBlur: true,
            validateOnSubmit: true,
            showSummary: true,
            showTooltips: false,
            showProgress: false,
            realTimeValidation: true,
            persianNumbers: true,
            rtl: true,
            language: 'fa',
            animateErrors: true,
            debounceTime: 300,
            onValidate: null,
            onSubmit: null,
            onError: null,
            onSuccess: null,
            customValidators: {},
            ...options
        };

        this.state = {
            isValid: false,
            errors: {},
            warnings: {},
            successes: {},
            validating: {},
            touched: {},
            submitted: false,
            formData: {}
        };

        this.elements = {
            form: null,
            fields: {},
            messages: {},
            icons: {},
            summary: null,
            submitButton: null
        };

        this.validators = {
            required: this.validateRequired.bind(this),
            minLength: this.validateMinLength.bind(this),
            maxLength: this.validateMaxLength.bind(this),
            email: this.validateEmail.bind(this),
            phone: this.validatePhone.bind(this),
            number: this.validateNumber.bind(this),
            pattern: this.validatePattern.bind(this),
            confirm: this.validateConfirm.bind(this),
            persian: this.validatePersian.bind(this),
            url: this.validateUrl.bind(this),
            date: this.validateDate.bind(this),
            time: this.validateTime.bind(this),
            range: this.validateRange.bind(this),
            custom: this.validateCustom.bind(this)
        };

        this.messages = {
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
            range: 'مقدار باید بین {min} و {max} باشد',
            custom: 'مقدار وارد شده صحیح نیست'
        };

        this.debounceTimers = {};
        this.asyncValidators = {};

        this.init();
    }

    init() {
        this.validateOptions();
        this.setupForm();
        this.setupFields();
        this.setupSummary();
        this.bindEvents();
        this.initializeState();
    }

    validateOptions() {
        if (!this.options.form) {
            throw new Error('Form element is required');
        }

        this.elements.form = typeof this.options.form === 'string' 
            ? document.querySelector(this.options.form)
            : this.options.form;

        if (!this.elements.form) {
            throw new Error('Form element not found');
        }

        if (!this.options.fields || Object.keys(this.options.fields).length === 0) {
            throw new Error('Fields configuration is required');
        }
    }

    setupForm() {
        this.elements.form.classList.add('mir-form-validation');
        this.elements.form.setAttribute('novalidate', 'true');
        this.elements.form.setAttribute('dir', this.options.rtl ? 'rtl' : 'ltr');

        // Find submit button
        this.elements.submitButton = this.elements.form.querySelector('button[type="submit"], input[type="submit"]');
        if (this.elements.submitButton) {
            this.elements.submitButton.disabled = true;
        }
    }

    setupFields() {
        Object.keys(this.options.fields).forEach(fieldName => {
            const fieldConfig = this.options.fields[fieldName];
            const fieldElement = this.elements.form.querySelector(`[name="${fieldName}"], #${fieldName}`);

            if (!fieldElement) {
                console.warn(`Field "${fieldName}" not found in form`);
                return;
            }

            this.elements.fields[fieldName] = fieldElement;
            this.setupField(fieldName, fieldElement, fieldConfig);
        });
    }

    setupField(fieldName, fieldElement, fieldConfig) {
        // Create field wrapper
        let fieldWrapper = fieldElement.closest('.mir-form-field');
        if (!fieldWrapper) {
            fieldWrapper = document.createElement('div');
            fieldWrapper.className = 'mir-form-field';
            fieldElement.parentNode.insertBefore(fieldWrapper, fieldElement);
            fieldWrapper.appendChild(fieldElement);
        }

        // Setup label
        const label = fieldWrapper.querySelector('label') || this.elements.form.querySelector(`label[for="${fieldElement.id}"]`);
        if (label && fieldConfig.required) {
            label.classList.add('mir-required');
        }

        // Create validation icons
        this.createValidationIcons(fieldWrapper, fieldName);

        // Create message container
        this.createMessageContainer(fieldWrapper, fieldName);

        // Create progress bar if needed
        if (this.options.showProgress && fieldConfig.showProgress) {
            this.createProgressBar(fieldWrapper, fieldName);
        }

        // Initialize field state
        this.state.errors[fieldName] = null;
        this.state.warnings[fieldName] = null;
        this.state.successes[fieldName] = null;
        this.state.touched[fieldName] = false;
        this.state.validating[fieldName] = false;
    }

    createValidationIcons(fieldWrapper, fieldName) {
        const iconsContainer = document.createElement('div');
        iconsContainer.style.position = 'absolute';
        iconsContainer.style.left = '12px';
        iconsContainer.style.top = '50%';
        iconsContainer.style.transform = 'translateY(-50%)';
        iconsContainer.style.zIndex = '5';

        // Error icon
        const errorIcon = document.createElement('i');
        errorIcon.className = 'mir-form-field-icon mir-error-icon';
        errorIcon.setAttribute('data-feather', 'alert-circle');

        // Success icon
        const successIcon = document.createElement('i');
        successIcon.className = 'mir-form-field-icon mir-success-icon';
        successIcon.setAttribute('data-feather', 'check-circle');

        // Warning icon
        const warningIcon = document.createElement('i');
        warningIcon.className = 'mir-form-field-icon mir-warning-icon';
        warningIcon.setAttribute('data-feather', 'alert-triangle');

        // Loading icon
        const loadingIcon = document.createElement('i');
        loadingIcon.className = 'mir-form-field-icon mir-loading-icon';
        loadingIcon.setAttribute('data-feather', 'loader');

        iconsContainer.appendChild(errorIcon);
        iconsContainer.appendChild(successIcon);
        iconsContainer.appendChild(warningIcon);
        iconsContainer.appendChild(loadingIcon);

        fieldWrapper.appendChild(iconsContainer);

        this.elements.icons[fieldName] = {
            error: errorIcon,
            success: successIcon,
            warning: warningIcon,
            loading: loadingIcon
        };
    }

    createMessageContainer(fieldWrapper, fieldName) {
        const messageContainer = document.createElement('div');
        messageContainer.className = 'mir-form-message';
        messageContainer.setAttribute('id', `${fieldName}-message`);
        messageContainer.setAttribute('role', 'alert');
        messageContainer.setAttribute('aria-live', 'polite');

        fieldWrapper.appendChild(messageContainer);
        this.elements.messages[fieldName] = messageContainer;
    }

    createProgressBar(fieldWrapper, fieldName) {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'mir-form-progress';

        const progressBar = document.createElement('div');
        progressBar.className = 'mir-form-progress-bar';

        progressContainer.appendChild(progressBar);
        fieldWrapper.appendChild(progressContainer);

        this.elements.progress = this.elements.progress || {};
        this.elements.progress[fieldName] = progressBar;
    }

    setupSummary() {
        if (!this.options.showSummary) return;

        this.elements.summary = document.createElement('div');
        this.elements.summary.className = 'mir-form-summary';
        this.elements.summary.setAttribute('role', 'alert');
        this.elements.summary.setAttribute('aria-live', 'polite');

        const summaryTitle = document.createElement('h4');
        summaryTitle.className = 'mir-form-summary-title';

        const summaryList = document.createElement('ul');
        summaryList.className = 'mir-form-summary-list';

        this.elements.summary.appendChild(summaryTitle);
        this.elements.summary.appendChild(summaryList);

        this.elements.form.insertBefore(this.elements.summary, this.elements.form.firstChild);
    }

    bindEvents() {
        // Form submit
        if (this.options.validateOnSubmit) {
            this.elements.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }

        // Field events
        Object.keys(this.elements.fields).forEach(fieldName => {
            const fieldElement = this.elements.fields[fieldName];

            // Input event
            if (this.options.validateOnInput) {
                fieldElement.addEventListener('input', (e) => {
                    this.handleInput(fieldName, e);
                });
            }

            // Blur event
            if (this.options.validateOnBlur) {
                fieldElement.addEventListener('blur', (e) => {
                    this.handleBlur(fieldName, e);
                });
            }

            // Focus event
            fieldElement.addEventListener('focus', (e) => {
                this.handleFocus(fieldName, e);
            });

            // Paste event
            fieldElement.addEventListener('paste', (e) => {
                setTimeout(() => {
                    this.handleInput(fieldName, e);
                }, 10);
            });
        });

        // Form reset
        this.elements.form.addEventListener('reset', () => {
            this.resetValidation();
        });
    }

    handleInput(fieldName, event) {
        this.state.touched[fieldName] = true;
        this.state.formData[fieldName] = event.target.value;

        if (this.options.realTimeValidation) {
            this.debounceValidation(fieldName);
        }
    }

    handleBlur(fieldName, event) {
        this.state.touched[fieldName] = true;
        this.state.formData[fieldName] = event.target.value;

        if (this.options.validateOnBlur) {
            this.validateField(fieldName);
        }
    }

    handleFocus(fieldName, event) {
        this.clearFieldMessage(fieldName);
        
        if (this.options.showTooltips) {
            this.showTooltip(fieldName);
        }
    }

    handleSubmit() {
        this.state.submitted = true;
        this.validateForm().then(isValid => {
            if (isValid) {
                this.showSuccessSummary();
                if (this.options.onSubmit) {
                    this.options.onSubmit(this.getFormData(), this);
                }
                if (this.options.onSuccess) {
                    this.options.onSuccess(this.getFormData(), this);
                }
            } else {
                this.showErrorSummary();
                if (this.options.onError) {
                    this.options.onError(this.state.errors, this);
                }
            }
        });
    }

    debounceValidation(fieldName) {
        if (this.debounceTimers[fieldName]) {
            clearTimeout(this.debounceTimers[fieldName]);
        }

        this.debounceTimers[fieldName] = setTimeout(() => {
            this.validateField(fieldName);
        }, this.options.debounceTime);
    }

    async validateField(fieldName) {
        const fieldConfig = this.options.fields[fieldName];
        const fieldElement = this.elements.fields[fieldName];
        const value = fieldElement.value;

        this.state.validating[fieldName] = true;
        this.showValidatingState(fieldName);

        try {
            const validationResult = await this.runValidators(fieldName, value, fieldConfig);
            
            this.state.validating[fieldName] = false;
            this.hideValidatingState(fieldName);

            if (validationResult.isValid) {
                this.setFieldSuccess(fieldName, validationResult.message);
            } else {
                this.setFieldError(fieldName, validationResult.message);
            }

            // Check for warnings
            if (validationResult.warning) {
                this.setFieldWarning(fieldName, validationResult.warning);
            }

            // Update progress if enabled
            if (this.options.showProgress && fieldConfig.showProgress) {
                this.updateProgress(fieldName, validationResult.strength);
            }

            this.updateFormState();
            this.updateSubmitButton();

            if (this.options.onValidate) {
                this.options.onValidate(fieldName, validationResult, this);
            }

        } catch (error) {
            this.state.validating[fieldName] = false;
            this.hideValidatingState(fieldName);
            this.setFieldError(fieldName, 'خطا در اعتبارسنجی');
            console.error('Validation error:', error);
        }
    }

    async runValidators(fieldName, value, fieldConfig) {
        const results = {
            isValid: true,
            message: null,
            warning: null,
            strength: 0
        };

        if (!fieldConfig.validators) {
            return results;
        }

        for (const validator of fieldConfig.validators) {
            const validatorName = validator.type || validator;
            const validatorOptions = validator.options || {};

            if (this.validators[validatorName]) {
                const result = await this.validators[validatorName](value, validatorOptions, fieldName);
                
                if (!result.isValid) {
                    results.isValid = false;
                    results.message = result.message || this.messages[validatorName];
                    break;
                }

                if (result.warning) {
                    results.warning = result.warning;
                }

                if (result.strength !== undefined) {
                    results.strength = Math.max(results.strength, result.strength);
                }
            }
        }

        return results;
    }

    // Validation methods
    validateRequired(value, options) {
        const isValid = value !== null && value !== undefined && value.toString().trim() !== '';
        return {
            isValid,
            message: isValid ? null : this.messages.required
        };
    }

    validateMinLength(value, options) {
        const min = options.min || 0;
        const isValid = !value || value.length >= min;
        return {
            isValid,
            message: isValid ? null : this.messages.minLength.replace('{min}', this.convertToPersianNumbers(min.toString()))
        };
    }

    validateMaxLength(value, options) {
        const max = options.max || Infinity;
        const isValid = !value || value.length <= max;
        return {
            isValid,
            message: isValid ? null : this.messages.maxLength.replace('{max}', this.convertToPersianNumbers(max.toString()))
        };
    }

    validateEmail(value, options) {
        if (!value) return { isValid: true };
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(value);
        return {
            isValid,
            message: isValid ? null : this.messages.email
        };
    }

    validatePhone(value, options) {
        if (!value) return { isValid: true };
        
        const phoneRegex = /^(\+98|0)?9\d{9}$/;
        const isValid = phoneRegex.test(value.replace(/\s/g, ''));
        return {
            isValid,
            message: isValid ? null : this.messages.phone
        };
    }

    validateNumber(value, options) {
        if (!value) return { isValid: true };
        
        const numberRegex = /^-?\d+\.?\d*$/;
        const isValid = numberRegex.test(value);
        return {
            isValid,
            message: isValid ? null : this.messages.number
        };
    }

    validatePattern(value, options) {
        if (!value) return { isValid: true };
        
        const pattern = new RegExp(options.pattern);
        const isValid = pattern.test(value);
        return {
            isValid,
            message: isValid ? null : options.message || this.messages.pattern
        };
    }

    validateConfirm(value, options) {
        if (!value) return { isValid: true };
        
        const confirmField = this.elements.fields[options.field];
        const isValid = confirmField && value === confirmField.value;
        return {
            isValid,
            message: isValid ? null : this.messages.confirm
        };
    }

    validatePersian(value, options) {
        if (!value) return { isValid: true };
        
        const persianRegex = /^[\u0600-\u06FF\s]*$/;
        const isValid = persianRegex.test(value);
        return {
            isValid,
            message: isValid ? null : this.messages.persian
        };
    }

    validateUrl(value, options) {
        if (!value) return { isValid: true };
        
        try {
            new URL(value);
            return { isValid: true };
        } catch {
            return {
                isValid: false,
                message: this.messages.url
            };
        }
    }

    validateDate(value, options) {
        if (!value) return { isValid: true };
        
        const date = new Date(value);
        const isValid = !isNaN(date.getTime());
        return {
            isValid,
            message: isValid ? null : this.messages.date
        };
    }

    validateTime(value, options) {
        if (!value) return { isValid: true };
        
        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        const isValid = timeRegex.test(value);
        return {
            isValid,
            message: isValid ? null : this.messages.time
        };
    }

    validateRange(value, options) {
        if (!value) return { isValid: true };
        
        const numValue = parseFloat(value);
        const min = options.min !== undefined ? options.min : -Infinity;
        const max = options.max !== undefined ? options.max : Infinity;
        const isValid = !isNaN(numValue) && numValue >= min && numValue <= max;
        
        return {
            isValid,
            message: isValid ? null : this.messages.range
                .replace('{min}', this.convertToPersianNumbers(min.toString()))
                .replace('{max}', this.convertToPersianNumbers(max.toString()))
        };
    }

    async validateCustom(value, options) {
        if (!value) return { isValid: true };
        
        const customValidator = this.options.customValidators[options.name];
        if (!customValidator) {
            return { isValid: true };
        }

        try {
            const result = await customValidator(value, options);
            return {
                isValid: result.isValid !== false,
                message: result.message || this.messages.custom,
                warning: result.warning,
                strength: result.strength
            };
        } catch (error) {
            return {
                isValid: false,
                message: this.messages.custom
            };
        }
    }

    // State management
    setFieldError(fieldName, message) {
        this.state.errors[fieldName] = message;
        this.state.warnings[fieldName] = null;
        this.state.successes[fieldName] = null;
        this.updateFieldDisplay(fieldName, 'error', message);
    }

    setFieldSuccess(fieldName, message) {
        this.state.errors[fieldName] = null;
        this.state.warnings[fieldName] = null;
        this.state.successes[fieldName] = message;
        this.updateFieldDisplay(fieldName, 'success', message);
    }

    setFieldWarning(fieldName, message) {
        this.state.warnings[fieldName] = message;
        this.updateFieldDisplay(fieldName, 'warning', message);
    }

    clearFieldMessage(fieldName) {
        this.state.errors[fieldName] = null;
        this.state.warnings[fieldName] = null;
        this.state.successes[fieldName] = null;
        this.updateFieldDisplay(fieldName, 'clear');
    }

    updateFieldDisplay(fieldName, type, message) {
        const fieldElement = this.elements.fields[fieldName];
        const fieldWrapper = fieldElement.closest('.mir-form-field');
        const messageElement = this.elements.messages[fieldName];

        // Clear previous states
        fieldWrapper.classList.remove('mir-has-error', 'mir-has-success', 'mir-has-warning');

        if (type === 'clear') {
            messageElement.classList.remove('mir-show', 'mir-error', 'mir-success', 'mir-warning');
            messageElement.textContent = '';
            return;
        }

        // Set new state
        fieldWrapper.classList.add(`mir-has-${type}`);
        messageElement.classList.add('mir-show', `mir-${type}`);
        messageElement.textContent = message || '';

        // Animate error if enabled
        if (type === 'error' && this.options.animateErrors) {
            fieldWrapper.classList.add('mir-shake');
            setTimeout(() => {
                fieldWrapper.classList.remove('mir-shake');
            }, 500);
        }

        // Re-initialize icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    showValidatingState(fieldName) {
        const fieldWrapper = this.elements.fields[fieldName].closest('.mir-form-field');
        fieldWrapper.classList.add('mir-validating');
        
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    hideValidatingState(fieldName) {
        const fieldWrapper = this.elements.fields[fieldName].closest('.mir-form-field');
        fieldWrapper.classList.remove('mir-validating');
    }

    updateProgress(fieldName, strength) {
        const progressBar = this.elements.progress && this.elements.progress[fieldName];
        if (!progressBar) return;

        const percentage = Math.min(100, Math.max(0, strength));
        progressBar.style.width = `${percentage}%`;

        // Update progress bar color based on strength
        progressBar.classList.remove('mir-weak', 'mir-medium', 'mir-strong');
        if (percentage < 30) {
            progressBar.classList.add('mir-weak');
        } else if (percentage < 70) {
            progressBar.classList.add('mir-medium');
        } else {
            progressBar.classList.add('mir-strong');
        }
    }

    updateFormState() {
        const hasErrors = Object.values(this.state.errors).some(error => error !== null);
        const allTouched = Object.values(this.state.touched).every(touched => touched);
        
        this.state.isValid = !hasErrors && allTouched;
    }

    updateSubmitButton() {
        if (this.elements.submitButton) {
            this.elements.submitButton.disabled = !this.state.isValid;
        }
    }

    showErrorSummary() {
        if (!this.elements.summary) return;

        const errors = Object.entries(this.state.errors)
            .filter(([field, error]) => error !== null)
            .map(([field, error]) => ({ field, message: error }));

        if (errors.length === 0) return;

        this.elements.summary.classList.add('mir-show', 'mir-error');
        this.elements.summary.classList.remove('mir-success');

        const title = this.elements.summary.querySelector('.mir-form-summary-title');
        title.innerHTML = `<i data-feather="alert-circle"></i>خطاهای فرم (${this.convertToPersianNumbers(errors.length.toString())})`;

        const list = this.elements.summary.querySelector('.mir-form-summary-list');
        list.innerHTML = errors.map(error => `<li class="mir-form-summary-item">${error.message}</li>`).join('');

        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    showSuccessSummary() {
        if (!this.elements.summary) return;

        this.elements.summary.classList.add('mir-show', 'mir-success');
        this.elements.summary.classList.remove('mir-error');

        const title = this.elements.summary.querySelector('.mir-form-summary-title');
        title.innerHTML = `<i data-feather="check-circle"></i>فرم با موفقیت ارسال شد`;

        const list = this.elements.summary.querySelector('.mir-form-summary-list');
        list.innerHTML = '<li class="mir-form-summary-item">تمام فیلدها معتبر هستند</li>';

        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    hideSummary() {
        if (this.elements.summary) {
            this.elements.summary.classList.remove('mir-show', 'mir-error', 'mir-success');
        }
    }

    showTooltip(fieldName) {
        const fieldConfig = this.options.fields[fieldName];
        if (!fieldConfig.tooltip) return;

        const fieldWrapper = this.elements.fields[fieldName].closest('.mir-form-field');
        let tooltip = fieldWrapper.querySelector('.mir-form-tooltip');

        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'mir-form-tooltip';
            fieldWrapper.appendChild(tooltip);
        }

        tooltip.textContent = fieldConfig.tooltip;
        tooltip.classList.add('mir-show');

        setTimeout(() => {
            tooltip.classList.remove('mir-show');
        }, 3000);
    }

    // Public API
    async validateForm() {
        const validationPromises = Object.keys(this.options.fields).map(fieldName => {
            return this.validateField(fieldName);
        });

        await Promise.all(validationPromises);
        this.updateFormState();
        return this.state.isValid;
    }

    resetValidation() {
        Object.keys(this.options.fields).forEach(fieldName => {
            this.state.errors[fieldName] = null;
            this.state.warnings[fieldName] = null;
            this.state.successes[fieldName] = null;
            this.state.touched[fieldName] = false;
            this.state.validating[fieldName] = false;
            this.clearFieldMessage(fieldName);
        });

        this.state.isValid = false;
        this.state.submitted = false;
        this.hideSummary();
        this.updateSubmitButton();
    }

    setFieldValue(fieldName, value) {
        const fieldElement = this.elements.fields[fieldName];
        if (fieldElement) {
            fieldElement.value = value;
            this.state.formData[fieldName] = value;
            this.validateField(fieldName);
        }
    }

    getFieldValue(fieldName) {
        return this.state.formData[fieldName] || '';
    }

    getFormData() {
        const formData = {};
        Object.keys(this.elements.fields).forEach(fieldName => {
            formData[fieldName] = this.elements.fields[fieldName].value;
        });
        return formData;
    }

    getValidationState() {
        return {
            isValid: this.state.isValid,
            errors: { ...this.state.errors },
            warnings: { ...this.state.warnings },
            successes: { ...this.state.successes },
            touched: { ...this.state.touched }
        };
    }

    addCustomValidator(name, validator) {
        this.options.customValidators[name] = validator;
    }

    setCustomMessage(validatorName, message) {
        this.messages[validatorName] = message;
    }

    initializeState() {
        Object.keys(this.elements.fields).forEach(fieldName => {
            const fieldElement = this.elements.fields[fieldName];
            this.state.formData[fieldName] = fieldElement.value;
        });
    }

    convertToPersianNumbers(text) {
        if (!this.options.persianNumbers) return text;
        const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return text.replace(/\d/g, (digit) => persianNumbers[parseInt(digit)]);
    }

    destroy() {
        // Clear timers
        Object.values(this.debounceTimers).forEach(timer => clearTimeout(timer));
        
        // Remove event listeners
        this.elements.form.removeEventListener('submit', this.handleSubmit);
        
        Object.keys(this.elements.fields).forEach(fieldName => {
            const fieldElement = this.elements.fields[fieldName];
            fieldElement.removeEventListener('input', this.handleInput);
            fieldElement.removeEventListener('blur', this.handleBlur);
            fieldElement.removeEventListener('focus', this.handleFocus);
        });

        // Clean up DOM
        if (this.elements.summary) {
            this.elements.summary.remove();
        }

        // Clear references
        this.elements = {};
        this.state = {};
        this.options = {};
    }
}

// Initialize data attribute handlers
document.addEventListener('DOMContentLoaded', function() {
    // Auto-initialize forms with data attributes
    const forms = document.querySelectorAll('[data-mir-validation]');
    forms.forEach(form => {
        const options = {
            form: form,
            fields: {}
        };

        // Parse field configurations from data attributes
        const fields = form.querySelectorAll('[data-mir-validate]');
        fields.forEach(field => {
            const fieldName = field.name || field.id;
            const validators = field.getAttribute('data-mir-validate').split(',');
            
            options.fields[fieldName] = {
                validators: validators.map(validator => {
                    const [type, ...params] = validator.split(':');
                    return {
                        type: type.trim(),
                        options: params.length > 0 ? JSON.parse(params.join(':')) : {}
                    };
                }),
                required: field.hasAttribute('required'),
                tooltip: field.getAttribute('data-mir-tooltip')
            };
        });

        new MirageFormValidation(options);
    });
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MirageFormValidation;
}
if (typeof window !== 'undefined') {
    window.MirageFormValidation = MirageFormValidation;
}