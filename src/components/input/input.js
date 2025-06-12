/**
 * Mirage Input Component System - JavaScript
 * RTL-Optimized Persian Input Components
 * Version: 1.0.0
 */

(function() {
    'use strict';

    // Persian to English number mapping
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    // Persian to English conversion
    function persianToEnglish(str) {
        if (!str) return str;
        for (let i = 0; i < persianNumbers.length; i++) {
            str = str.replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i]);
        }
        return str;
    }
    
    // English to Persian conversion
    function englishToPersian(str) {
        if (!str) return str;
        for (let i = 0; i < englishNumbers.length; i++) {
            str = str.replace(new RegExp(englishNumbers[i], 'g'), persianNumbers[i]);
        }
        return str;
    }

    // ==========================================================================
    // Input Validation
    // ==========================================================================

    const validators = {
        email: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        },
        
        phone: (value) => {
            // Persian phone number validation
            const phoneRegex = /^(\+98|0098|98|0)?9\d{9}$/;
            return phoneRegex.test(persianToEnglish(value).replace(/\s/g, ''));
        },
        
        required: (value) => {
            return value && value.trim().length > 0;
        },
        
        minLength: (value, min) => {
            return value && value.length >= min;
        },
        
        maxLength: (value, max) => {
            return !value || value.length <= max;
        },
        
        pattern: (value, pattern) => {
            const regex = new RegExp(pattern);
            return regex.test(value);
        }
    };

    // ==========================================================================
    // Input Enhancement Class
    // ==========================================================================

    class MirageInput {
        constructor(element, options = {}) {
            this.element = element;
            this.options = {
                persianNumbers: false,
                validation: {},
                realTimeValidation: true,
                ...options
            };
            this.init();
        }

        init() {
            this.setupPersianNumbers();
            this.setupValidation();
            this.setupFloatingLabel();
            this.bindEvents();
        }

        setupPersianNumbers() {
            if (this.element.classList.contains('mir-persian-numbers') || this.options.persianNumbers) {
                this.element.addEventListener('input', (e) => {
                    const cursorPos = e.target.selectionStart;
                    const oldValue = e.target.value;
                    const newValue = englishToPersian(persianToEnglish(oldValue));
                    
                    if (oldValue !== newValue) {
                        e.target.value = newValue;
                        e.target.setSelectionRange(cursorPos, cursorPos);
                    }
                });
            }
        }

        setupValidation() {
            if (Object.keys(this.options.validation).length > 0) {
                this.validationRules = this.options.validation;
                
                if (this.options.realTimeValidation) {
                    this.element.addEventListener('blur', () => this.validate());
                    this.element.addEventListener('input', () => {
                        if (this.hasBeenValidated) {
                            this.validate();
                        }
                    });
                }
            }
        }

        setupFloatingLabel() {
            const parent = this.element.closest('.mir-floating-label');
            if (parent) {
                this.element.addEventListener('input', () => {
                    parent.classList.toggle('has-value', this.element.value.length > 0);
                });
            }
        }

        validate() {
            this.hasBeenValidated = true;
            const value = this.element.value;
            const rules = this.validationRules;
            let isValid = true;
            let errorMessage = '';

            // Check each validation rule
            for (const [rule, ruleValue] of Object.entries(rules)) {
                if (rule === 'required' && ruleValue && !validators.required(value)) {
                    isValid = false;
                    errorMessage = 'این فیلد الزامی است';
                    break;
                }
                
                if (rule === 'email' && ruleValue && value && !validators.email(value)) {
                    isValid = false;
                    errorMessage = 'فرمت ایمیل صحیح نیست';
                    break;
                }
                
                if (rule === 'phone' && ruleValue && value && !validators.phone(value)) {
                    isValid = false;
                    errorMessage = 'فرمت شماره تلفن صحیح نیست';
                    break;
                }
                
                if (rule === 'minLength' && value && !validators.minLength(value, ruleValue)) {
                    isValid = false;
                    errorMessage = `حداقل ${ruleValue} کاراکتر وارد کنید`;
                    break;
                }
                
                if (rule === 'maxLength' && value && !validators.maxLength(value, ruleValue)) {
                    isValid = false;
                    errorMessage = `حداکثر ${ruleValue} کاراکتر مجاز است`;
                    break;
                }
                
                if (rule === 'pattern' && value && !validators.pattern(value, ruleValue)) {
                    isValid = false;
                    errorMessage = 'فرمت وارد شده صحیح نیست';
                    break;
                }
            }

            this.updateValidationState(isValid, errorMessage);
            return isValid;
        }

        updateValidationState(isValid, message) {
            // Remove existing validation classes
            this.element.classList.remove('mir-input-success', 'mir-input-error');
            
            // Add appropriate class
            if (isValid && this.element.value) {
                this.element.classList.add('mir-input-success');
            } else if (!isValid) {
                this.element.classList.add('mir-input-error');
            }

            // Update message
            this.updateMessage(isValid ? 'success' : 'error', message);
        }

        updateMessage(type, message) {
            const parent = this.element.closest('.mir-input-group');
            if (!parent) return;

            // Remove existing message
            const existingMessage = parent.querySelector('.mir-input-message');
            if (existingMessage) {
                existingMessage.remove();
            }

            // Add new message if provided
            if (message) {
                const messageElement = document.createElement('div');
                messageElement.className = `mir-input-message mir-input-message-${type}`;
                
                const icon = document.createElement('i');
                icon.className = 'mir-input-message-icon';
                icon.setAttribute('data-feather', type === 'success' ? 'check-circle' : 'alert-circle');
                
                messageElement.appendChild(icon);
                messageElement.appendChild(document.createTextNode(message));
                
                parent.appendChild(messageElement);
                
                // Replace feather icons if available
                if (typeof feather !== 'undefined') {
                    feather.replace();
                }
            }
        }

        bindEvents() {
            // Focus enhancement
            this.element.addEventListener('focus', () => {
                this.element.classList.add('focused');
            });

            this.element.addEventListener('blur', () => {
                this.element.classList.remove('focused');
            });
        }

        // Public methods
        getValue() {
            return this.element.value;
        }

        setValue(value) {
            this.element.value = value;
            this.element.dispatchEvent(new Event('input'));
        }

        clear() {
            this.setValue('');
        }

        focus() {
            this.element.focus();
        }

        disable() {
            this.element.disabled = true;
        }

        enable() {
            this.element.disabled = false;
        }
    }

    // ==========================================================================
    // Password Toggle Functionality
    // ==========================================================================

    class PasswordToggle {
        constructor(element) {
            this.passwordInput = element;
            this.init();
        }

        init() {
            this.createToggleButton();
            this.bindEvents();
        }

        createToggleButton() {
            const parent = this.passwordInput.parentElement;
            parent.classList.add('mir-input-with-toggle');

            this.toggleButton = document.createElement('button');
            this.toggleButton.type = 'button';
            this.toggleButton.className = 'mir-password-toggle';
            this.toggleButton.innerHTML = '<i data-feather="eye"></i>';
            this.toggleButton.setAttribute('aria-label', 'نمایش رمز عبور');

            parent.appendChild(this.toggleButton);

            // Replace feather icons if available
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        }

        bindEvents() {
            this.toggleButton.addEventListener('click', () => {
                this.toggle();
            });

            this.passwordInput.addEventListener('input', () => {
                this.toggleButton.style.display = this.passwordInput.value ? 'flex' : 'none';
            });
        }

        toggle() {
            const isPassword = this.passwordInput.type === 'password';
            this.passwordInput.type = isPassword ? 'text' : 'password';
            
            const icon = this.toggleButton.querySelector('i');
            icon.setAttribute('data-feather', isPassword ? 'eye-off' : 'eye');
            
            this.toggleButton.setAttribute('aria-label', isPassword ? 'مخفی کردن رمز عبور' : 'نمایش رمز عبور');

            // Replace feather icons if available
            if (typeof feather !== 'undefined') {
                feather.replace();
            }

            // Focus back to input
            this.passwordInput.focus();
        }
    }

    // ==========================================================================
    // Search Input Functionality
    // ==========================================================================

    class SearchInput {
        constructor(element) {
            this.searchInput = element;
            this.init();
        }

        init() {
            this.createClearButton();
            this.bindEvents();
        }

        createClearButton() {
            const parent = this.searchInput.parentElement;
            parent.classList.add('mir-search-input');

            this.clearButton = document.createElement('button');
            this.clearButton.type = 'button';
            this.clearButton.className = 'mir-search-clear';
            this.clearButton.innerHTML = '<i data-feather="x"></i>';
            this.clearButton.setAttribute('aria-label', 'پاک کردن جستجو');

            parent.appendChild(this.clearButton);

            // Replace feather icons if available
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        }

        bindEvents() {
            this.clearButton.addEventListener('click', () => {
                this.clear();
            });

            this.searchInput.addEventListener('input', () => {
                this.updateClearButton();
            });

            this.searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.clear();
                }
            });
        }

        updateClearButton() {
            const hasValue = this.searchInput.value.length > 0;
            this.clearButton.classList.toggle('show', hasValue);
            this.searchInput.parentElement.classList.toggle('has-value', hasValue);
        }

        clear() {
            this.searchInput.value = '';
            this.searchInput.focus();
            this.updateClearButton();
            this.searchInput.dispatchEvent(new Event('input'));
        }
    }

    // ==========================================================================
    // Auto-resize Textarea
    // ==========================================================================

    class AutoResizeTextarea {
        constructor(element) {
            this.textarea = element;
            this.init();
        }

        init() {
            this.textarea.style.resize = 'none';
            this.textarea.style.overflow = 'hidden';
            this.bindEvents();
            this.resize();
        }

        bindEvents() {
            this.textarea.addEventListener('input', () => this.resize());
            this.textarea.addEventListener('focus', () => this.resize());
        }

        resize() {
            this.textarea.style.height = 'auto';
            this.textarea.style.height = this.textarea.scrollHeight + 'px';
        }
    }

    // ==========================================================================
    // Character Counter
    // ==========================================================================

    class CharacterCounter {
        constructor(element, maxLength) {
            this.element = element;
            this.maxLength = maxLength;
            this.init();
        }

        init() {
            this.createCounter();
            this.bindEvents();
            this.updateCounter();
        }

        createCounter() {
            const parent = this.element.closest('.mir-input-group');
            if (!parent) return;

            this.counter = document.createElement('div');
            this.counter.className = 'mir-character-counter';
            this.counter.style.cssText = `
                font-size: var(--mir-text-xs);
                color: var(--mir-gray-500);
                text-align: right;
                margin-top: var(--mir-space-1);
                direction: rtl;
            `;

            parent.appendChild(this.counter);
        }

        bindEvents() {
            this.element.addEventListener('input', () => this.updateCounter());
        }

        updateCounter() {
            if (!this.counter) return;

            const currentLength = this.element.value.length;
            const persianCurrentLength = englishToPersian(currentLength.toString());
            const persianMaxLength = englishToPersian(this.maxLength.toString());

            this.counter.textContent = `${persianCurrentLength}/${persianMaxLength}`;

            // Change color based on usage
            if (currentLength > this.maxLength * 0.9) {
                this.counter.style.color = 'var(--mir-red-500)';
            } else if (currentLength > this.maxLength * 0.7) {
                this.counter.style.color = 'var(--mir-yellow-500)';
            } else {
                this.counter.style.color = 'var(--mir-gray-500)';
            }
        }
    }

    // ==========================================================================
    // Public API
    // ==========================================================================

    window.MirageInput = {
        // Initialize all inputs
        init: function(options = {}) {
            // Initialize regular inputs
            document.querySelectorAll('.mir-input, .mir-textarea').forEach(element => {
                if (!element.mirageInput) {
                    element.mirageInput = new MirageInput(element, options);
                }
            });

            // Initialize password toggles
            document.querySelectorAll('input[type="password"].mir-input').forEach(element => {
                if (!element.passwordToggle) {
                    element.passwordToggle = new PasswordToggle(element);
                }
            });

            // Initialize search inputs
            document.querySelectorAll('.mir-input[type="search"], .mir-search-input .mir-input').forEach(element => {
                if (!element.searchInput) {
                    element.searchInput = new SearchInput(element);
                }
            });

            // Initialize auto-resize textareas
            document.querySelectorAll('.mir-textarea[data-auto-resize]').forEach(element => {
                if (!element.autoResize) {
                    element.autoResize = new AutoResizeTextarea(element);
                }
            });

            // Initialize character counters
            document.querySelectorAll('[data-max-length]').forEach(element => {
                const maxLength = parseInt(element.dataset.maxLength);
                if (maxLength && !element.characterCounter) {
                    element.characterCounter = new CharacterCounter(element, maxLength);
                }
            });
        },

        // Create input programmatically
        createInput: function(config) {
            const input = document.createElement(config.type === 'textarea' ? 'textarea' : 'input');
            
            // Set basic attributes
            if (config.type && config.type !== 'textarea') {
                input.type = config.type;
            }
            
            if (config.placeholder) {
                input.placeholder = config.placeholder;
            }
            
            if (config.value) {
                input.value = config.value;
            }

            // Add classes
            const baseClass = config.type === 'textarea' ? 'mir-textarea' : 'mir-input';
            input.className = baseClass;
            
            if (config.variant) {
                input.classList.add(`${baseClass}-${config.variant}`);
            }
            
            if (config.size) {
                input.classList.add(`${baseClass}-${config.size}`);
            }
            
            if (config.persianNumbers) {
                input.classList.add('mir-persian-numbers');
            }

            // Initialize functionality
            if (config.validation) {
                input.mirageInput = new MirageInput(input, { validation: config.validation });
            }

            return input;
        },

        // Utility functions
        persianToEnglish: persianToEnglish,
        englishToPersian: englishToPersian,
        
        // Validation
        validate: function(element) {
            if (element.mirageInput) {
                return element.mirageInput.validate();
            }
            return true;
        },

        // Bulk validation
        validateForm: function(formElement) {
            const inputs = formElement.querySelectorAll('.mir-input, .mir-textarea');
            let isValid = true;

            inputs.forEach(input => {
                if (input.mirageInput) {
                    const inputValid = input.mirageInput.validate();
                    if (!inputValid) {
                        isValid = false;
                    }
                }
            });

            return isValid;
        }
    };

    // Auto-initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            MirageInput.init();
        });
    } else {
        MirageInput.init();
    }

})(); 