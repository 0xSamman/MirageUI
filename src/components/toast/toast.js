/**
 * MIRAGE TOAST COMPONENT - RTL PERSIAN OPTIMIZED
 * ==============================================
 * 
 * Toast notifications with Persian support and glass morphism design
 * Features: Auto-dismiss, RTL layout, Persian numbers, accessibility, smooth animations
 * 
 * @author Mirage Design System
 * @version 1.0.0
 */

class MirageToast {
    constructor(options = {}) {
        this.options = {
            type: 'info',
            title: '',
            message: '',
            closable: true,
            autoClose: true,
            duration: 4000,
            position: 'top-right',
            size: 'md',
            showProgress: true,
            actions: [],
            icon: null,
            ...options
        };

        this.element = null;
        this.container = null;
        this.progressBar = null;
        this.autoCloseTimer = null;
        this.progressStartTime = null;
        this.remainingTime = null;
        this.isPaused = false;
        this.id = 'mir-toast-' + Date.now() + Math.random().toString(36).substr(2, 9);
        
        this.init();
    }

    init() {
        this.createElement();
        this.bindEvents();
        
        if (this.options.autoClose) {
            this.startAutoClose();
        }
    }

    createElement() {
        // Create toast element
        this.element = document.createElement('div');
        this.element.className = this.getToastClasses();
        this.element.id = this.id;
        this.element.setAttribute('role', this.options.type === 'error' ? 'alert' : 'status');
        this.element.setAttribute('aria-live', this.options.type === 'error' ? 'assertive' : 'polite');
        this.element.setAttribute('aria-atomic', 'true');
        this.element.setAttribute('dir', 'rtl');

        // Create icon
        const icon = this.createIcon();
        if (icon) {
            this.element.appendChild(icon);
        }

        // Create content
        const content = this.createContent();
        this.element.appendChild(content);

        // Add close button if closable
        if (this.options.closable) {
            const closeBtn = this.createCloseButton();
            this.element.appendChild(closeBtn);
        }

        // Add progress bar if needed
        if (this.options.showProgress && this.options.autoClose) {
            const progress = this.createProgressBar();
            this.element.appendChild(progress);
        }

        // Add actions if provided
        if (this.options.actions.length > 0) {
            const actions = this.createActions();
            content.appendChild(actions);
        }
    }

    getToastClasses() {
        const classes = ['mir-toast'];
        
        // Add type class
        classes.push(`mir-toast-${this.options.type}`);
        
        // Add size class
        if (this.options.size !== 'md') {
            classes.push(`mir-toast-${this.options.size}`);
        }
        
        // Add compact class if no title
        if (!this.options.title) {
            classes.push('mir-toast-compact');
        }
        
        // Add rich class if has actions
        if (this.options.actions.length > 0) {
            classes.push('mir-toast-rich');
        }

        return classes.join(' ');
    }

    createIcon() {
        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'mir-toast-icon';

        let iconName;
        if (this.options.icon) {
            iconName = this.options.icon;
        } else {
            // Default icons based on type
            switch (this.options.type) {
                case 'success':
                    iconName = 'check-circle';
                    break;
                case 'warning':
                    iconName = 'alert-triangle';
                    break;
                case 'error':
                    iconName = 'x-circle';
                    break;
                case 'loading':
                    iconName = 'loader';
                    break;
                case 'info':
                default:
                    iconName = 'info';
                    break;
            }
        }

        const icon = document.createElement('i');
        icon.setAttribute('data-feather', iconName);
        iconWrapper.appendChild(icon);

        return iconWrapper;
    }

    createContent() {
        const content = document.createElement('div');
        content.className = 'mir-toast-content';

        if (this.options.title) {
            const title = document.createElement('div');
            title.className = 'mir-toast-title';
            title.textContent = this.options.title;
            content.appendChild(title);
        }

        if (this.options.message) {
            const message = document.createElement('div');
            message.className = 'mir-toast-message';
            // Convert English numbers to Persian
            message.innerHTML = this.convertToPersianNumbers(this.options.message);
            content.appendChild(message);
        }

        return content;
    }

    createCloseButton() {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'mir-toast-close';
        closeBtn.setAttribute('aria-label', 'بستن اعلان');
        closeBtn.innerHTML = '<i data-feather="x"></i>';
        
        closeBtn.addEventListener('click', () => {
            this.close();
        });

        return closeBtn;
    }

    createProgressBar() {
        const progress = document.createElement('div');
        progress.className = 'mir-toast-progress';
        
        this.progressBar = document.createElement('div');
        this.progressBar.className = 'mir-toast-progress-bar';
        this.progressBar.style.transitionDuration = this.options.duration + 'ms';
        
        progress.appendChild(this.progressBar);
        return progress;
    }

    createActions() {
        const actions = document.createElement('div');
        actions.className = 'mir-toast-actions';

        this.options.actions.forEach(action => {
            const button = document.createElement('button');
            button.className = 'mir-toast-action';
            button.textContent = action.text;
            
            if (action.onClick) {
                button.addEventListener('click', (e) => {
                    action.onClick(e, this);
                });
            }

            actions.appendChild(button);
        });

        return actions;
    }

    bindEvents() {
        // Handle keyboard events
        this.element.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.options.closable) {
                this.close();
            }
        });

        // Handle mouse events for auto-close
        if (this.options.autoClose) {
            this.element.addEventListener('mouseenter', () => {
                this.pauseAutoClose();
            });

            this.element.addEventListener('mouseleave', () => {
                this.resumeAutoClose();
            });

            this.element.addEventListener('focus', () => {
                this.pauseAutoClose();
            });

            this.element.addEventListener('blur', () => {
                this.resumeAutoClose();
            });
        }
    }

    show() {
        // Get or create container
        this.container = this.getContainer();
        
        // Add to container
        this.container.appendChild(this.element);
        
        // Initialize feather icons
        if (window.feather) {
            window.feather.replace();
        }
        
        // Add entrance animation
        this.element.classList.add('mir-toast-enter');
        
        // Trigger animation
        requestAnimationFrame(() => {
            this.element.classList.add('mir-toast-enter-active');
            this.element.classList.remove('mir-toast-enter');
        });

        // Emit event
        this.emit('show');
        
        return this;
    }

    close() {
        if (!this.element || !this.element.parentNode) return;

        // Clear timers
        this.clearTimers();

        // Add exit animation
        this.element.classList.add('mir-toast-exit');
        
        // Trigger animation
        requestAnimationFrame(() => {
            this.element.classList.add('mir-toast-exit-active');
        });

        // Remove after animation
        setTimeout(() => {
            this.remove();
        }, 300);

        // Emit event
        this.emit('close');
        
        return this;
    }

    remove() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        
        // Clean up container if empty
        if (this.container && this.container.children.length === 0) {
            this.container.parentNode.removeChild(this.container);
        }

        // Emit event
        this.emit('remove');
    }

    startAutoClose() {
        if (!this.options.autoClose) return;

        this.progressStartTime = Date.now();
        this.remainingTime = this.options.duration;

        this.autoCloseTimer = setTimeout(() => {
            this.close();
        }, this.options.duration);

        // Start progress bar animation
        if (this.progressBar) {
            setTimeout(() => {
                this.progressBar.style.transform = 'scaleX(0)';
            }, 50);
        }
    }

    pauseAutoClose() {
        if (!this.options.autoClose || this.isPaused) return;

        this.isPaused = true;
        
        if (this.autoCloseTimer) {
            clearTimeout(this.autoCloseTimer);
            this.autoCloseTimer = null;
            
            // Calculate remaining time
            const elapsed = Date.now() - this.progressStartTime;
            this.remainingTime = Math.max(0, this.options.duration - elapsed);
        }

        // Pause progress bar
        if (this.progressBar) {
            const computedStyle = window.getComputedStyle(this.progressBar);
            const transform = computedStyle.getPropertyValue('transform');
            this.progressBar.style.transform = transform;
            this.progressBar.style.transitionDuration = '0ms';
        }
    }

    resumeAutoClose() {
        if (!this.options.autoClose || !this.isPaused || this.remainingTime <= 0) return;

        this.isPaused = false;
        this.progressStartTime = Date.now();
        
        this.autoCloseTimer = setTimeout(() => {
            this.close();
        }, this.remainingTime);

        // Resume progress bar
        if (this.progressBar) {
            this.progressBar.style.transitionDuration = this.remainingTime + 'ms';
            this.progressBar.style.transform = 'scaleX(0)';
        }
    }

    clearTimers() {
        if (this.autoCloseTimer) {
            clearTimeout(this.autoCloseTimer);
            this.autoCloseTimer = null;
        }
        
        this.isPaused = false;
        this.remainingTime = null;
        this.progressStartTime = null;
    }

    getContainer() {
        const containerId = `mir-toast-container-${this.options.position}`;
        let container = document.getElementById(containerId);
        
        if (!container) {
            container = document.createElement('div');
            container.id = containerId;
            container.className = this.getContainerClasses();
            document.body.appendChild(container);
        }
        
        return container;
    }

    getContainerClasses() {
        const classes = ['mir-toast-container'];
        
        switch (this.options.position) {
            case 'top-left':
                classes.push('mir-toast-container-top-left');
                break;
            case 'top-center':
                classes.push('mir-toast-container-top-center');
                break;
            case 'bottom-right':
                classes.push('mir-toast-container-bottom-right');
                break;
            case 'bottom-left':
                classes.push('mir-toast-container-bottom-left');
                break;
            case 'bottom-center':
                classes.push('mir-toast-container-bottom-center');
                break;
            case 'top-right':
            default:
                classes.push('mir-toast-container-top-right');
                break;
        }
        
        return classes.join(' ');
    }

    emit(eventName) {
        const event = new CustomEvent(`mirageToast:${eventName}`, {
            detail: { toast: this, id: this.id }
        });
        document.dispatchEvent(event);
    }

    convertToPersianNumbers(text) {
        const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return text.replace(/\d/g, (digit) => persianNumbers[parseInt(digit)]);
    }

    // Static methods for easy usage
    static success(message, options = {}) {
        return new MirageToast({
            type: 'success',
            message,
            autoClose: true,
            duration: 3000,
            ...options
        }).show();
    }

    static warning(message, options = {}) {
        return new MirageToast({
            type: 'warning',
            message,
            autoClose: true,
            duration: 4000,
            ...options
        }).show();
    }

    static error(message, options = {}) {
        return new MirageToast({
            type: 'error',
            message,
            autoClose: true,
            duration: 5000,
            ...options
        }).show();
    }

    static info(message, options = {}) {
        return new MirageToast({
            type: 'info',
            message,
            autoClose: true,
            duration: 4000,
            ...options
        }).show();
    }

    static loading(message, options = {}) {
        return new MirageToast({
            type: 'loading',
            message,
            autoClose: false,
            closable: false,
            ...options
        }).show();
    }

    static notify(message, options = {}) {
        return new MirageToast({
            type: 'info',
            message,
            autoClose: true,
            duration: 3000,
            showProgress: true,
            ...options
        }).show();
    }

    // Clear all toasts
    static clearAll() {
        const containers = document.querySelectorAll('[id^="mir-toast-container-"]');
        containers.forEach(container => {
            const toasts = container.querySelectorAll('.mir-toast');
            toasts.forEach(toast => {
                toast.classList.add('mir-toast-exit', 'mir-toast-exit-active');
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            });
        });
    }

    // Clear toasts by type
    static clearByType(type) {
        const containers = document.querySelectorAll('[id^="mir-toast-container-"]');
        containers.forEach(container => {
            const toasts = container.querySelectorAll(`.mir-toast-${type}`);
            toasts.forEach(toast => {
                toast.classList.add('mir-toast-exit', 'mir-toast-exit-active');
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            });
        });
    }

    // Promise-based methods
    static promise(promise, messages = {}) {
        const defaultMessages = {
            loading: 'در حال پردازش...',
            success: 'عملیات موفق بود',
            error: 'خطایی رخ داد'
        };

        const loadingMessages = { ...defaultMessages, ...messages };
        
        // Show loading toast
        const loadingToast = MirageToast.loading(loadingMessages.loading);
        
        return promise
            .then(result => {
                loadingToast.close();
                MirageToast.success(loadingMessages.success);
                return result;
            })
            .catch(error => {
                loadingToast.close();
                MirageToast.error(loadingMessages.error);
                throw error;
            });
    }

    // Batch operations
    static queue(toasts, delay = 500) {
        toasts.forEach((toast, index) => {
            setTimeout(() => {
                new MirageToast(toast).show();
            }, index * delay);
        });
    }

    // Stack management
    static getActiveToasts() {
        const containers = document.querySelectorAll('[id^="mir-toast-container-"]');
        const toasts = [];
        
        containers.forEach(container => {
            const containerToasts = container.querySelectorAll('.mir-toast');
            containerToasts.forEach(toast => {
                toasts.push(toast);
            });
        });
        
        return toasts;
    }

    static getToastCount() {
        return MirageToast.getActiveToasts().length;
    }

    // Persian utilities
    static convertToPersianNumbers(text) {
        const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return text.replace(/\d/g, (digit) => persianNumbers[parseInt(digit)]);
    }

    static formatPersianTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        if (minutes > 0) {
            return `${MirageToast.convertToPersianNumbers(minutes.toString())} دقیقه و ${MirageToast.convertToPersianNumbers(remainingSeconds.toString())} ثانیه`;
        } else {
            return `${MirageToast.convertToPersianNumbers(remainingSeconds.toString())} ثانیه`;
        }
    }
}

// Initialize data attribute handlers
document.addEventListener('DOMContentLoaded', function() {
    // Handle data-mir-toast attributes
    document.addEventListener('click', function(e) {
        const trigger = e.target.closest('[data-mir-toast]');
        if (!trigger) return;

        e.preventDefault();
        
        const toastType = trigger.getAttribute('data-mir-toast');
        const title = trigger.getAttribute('data-mir-toast-title') || '';
        const message = trigger.getAttribute('data-mir-toast-message') || '';
        const position = trigger.getAttribute('data-mir-toast-position') || 'top-right';
        const autoClose = trigger.getAttribute('data-mir-toast-auto-close') !== 'false';
        const duration = parseInt(trigger.getAttribute('data-mir-toast-duration')) || 4000;
        const size = trigger.getAttribute('data-mir-toast-size') || 'md';
        const showProgress = trigger.getAttribute('data-mir-toast-progress') !== 'false';

        const options = {
            title,
            position,
            autoClose,
            duration,
            size,
            showProgress
        };

        switch (toastType) {
            case 'success':
                MirageToast.success(message, options);
                break;
            case 'warning':
                MirageToast.warning(message, options);
                break;
            case 'error':
                MirageToast.error(message, options);
                break;
            case 'loading':
                MirageToast.loading(message, options);
                break;
            case 'info':
            default:
                MirageToast.info(message, options);
                break;
        }
    });
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MirageToast;
}
if (typeof window !== 'undefined') {
    window.MirageToast = MirageToast;
}