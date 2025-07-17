/**
 * MIRAGE ALERT COMPONENT - RTL PERSIAN OPTIMIZED
 * ==============================================
 * 
 * Complete alert/notification system with Persian support
 * Features: Auto-dismiss, RTL layout, Persian numbers, accessibility
 * 
 * @author Mirage Design System
 * @version 1.0.0
 */

class MirageAlert {
    constructor(options = {}) {
        this.options = {
            type: 'info',
            title: '',
            message: '',
            closable: true,
            autoClose: false,
            duration: 5000,
            inline: true,
            position: 'top-right',
            size: 'md',
            showProgress: false,
            actions: [],
            icon: null,
            ...options
        };

        this.element = null;
        this.container = null;
        this.progressBar = null;
        this.autoCloseTimer = null;
        this.progressTimer = null;
        this.id = 'mir-alert-' + Date.now() + Math.random().toString(36).substr(2, 9);
        
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
        // Create alert element
        this.element = document.createElement('div');
        this.element.className = this.getAlertClasses();
        this.element.id = this.id;
        this.element.setAttribute('role', this.options.type === 'error' ? 'alert' : 'status');
        this.element.setAttribute('aria-live', this.options.type === 'error' ? 'assertive' : 'polite');
        this.element.setAttribute('dir', 'rtl');

        // Create alert content
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

    getAlertClasses() {
        const classes = ['mir-alert'];
        
        // Add type class
        classes.push(`mir-alert-${this.options.type}`);
        
        // Add size class
        if (this.options.size !== 'md') {
            classes.push(`mir-alert-${this.options.size}`);
        }
        
        // Add progress class
        if (this.options.showProgress && this.options.autoClose) {
            classes.push('mir-alert-with-progress');
        }

        return classes.join(' ');
    }

    createContent() {
        const content = document.createElement('div');
        content.className = 'mir-alert-content';

        // Add icon
        const icon = this.createIcon();
        if (icon) {
            content.appendChild(icon);
        }

        // Add text content
        const textContent = document.createElement('div');
        
        if (this.options.title) {
            const title = document.createElement('div');
            title.className = 'mir-alert-title';
            title.textContent = this.options.title;
            textContent.appendChild(title);
        }

        if (this.options.message) {
            const message = document.createElement('div');
            message.className = 'mir-alert-message';
            message.innerHTML = this.options.message;
            textContent.appendChild(message);
        }

        content.appendChild(textContent);
        return content;
    }

    createIcon() {
        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'mir-alert-icon';

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

    createCloseButton() {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'mir-alert-close';
        closeBtn.setAttribute('aria-label', 'بستن هشدار');
        closeBtn.innerHTML = '<i data-feather="x"></i>';
        
        closeBtn.addEventListener('click', () => {
            this.close();
        });

        return closeBtn;
    }

    createProgressBar() {
        const progress = document.createElement('div');
        progress.className = 'mir-alert-progress';
        
        this.progressBar = document.createElement('div');
        this.progressBar.className = 'mir-alert-progress-bar';
        this.progressBar.style.transitionDuration = this.options.duration + 'ms';
        
        progress.appendChild(this.progressBar);
        return progress;
    }

    createActions() {
        const actions = document.createElement('div');
        actions.className = 'mir-alert-actions';

        this.options.actions.forEach(action => {
            const button = document.createElement('button');
            button.className = 'mir-alert-action';
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
        }
    }

    show(targetElement = null) {
        // For inline alerts, append to target element or document body
        if (this.options.inline && targetElement) {
            targetElement.appendChild(this.element);
        } else if (this.options.inline) {
            // If inline but no target, append to body
            document.body.appendChild(this.element);
        } else {
            // Default behavior for popup alerts
            this.container = this.getContainer();
            this.container.appendChild(this.element);
        }
        
        // Initialize feather icons
        if (window.feather) {
            window.feather.replace();
        }
        
        // Add entrance animation
        this.element.classList.add('mir-alert-enter');
        
        // Trigger animation
        requestAnimationFrame(() => {
            this.element.classList.add('mir-alert-enter-active');
            this.element.classList.remove('mir-alert-enter');
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
        this.element.classList.add('mir-alert-exit');
        
        // Trigger animation
        requestAnimationFrame(() => {
            this.element.classList.add('mir-alert-exit-active');
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
        if (this.autoCloseTimer) {
            clearTimeout(this.autoCloseTimer);
            this.autoCloseTimer = null;
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
        if (!this.options.autoClose || this.autoCloseTimer) return;

        // Calculate remaining time
        const remainingTime = this.options.duration * 0.3; // Approximate remaining time
        
        this.autoCloseTimer = setTimeout(() => {
            this.close();
        }, remainingTime);

        // Resume progress bar
        if (this.progressBar) {
            this.progressBar.style.transitionDuration = remainingTime + 'ms';
            this.progressBar.style.transform = 'scaleX(0)';
        }
    }

    clearTimers() {
        if (this.autoCloseTimer) {
            clearTimeout(this.autoCloseTimer);
            this.autoCloseTimer = null;
        }
        
        if (this.progressTimer) {
            clearTimeout(this.progressTimer);
            this.progressTimer = null;
        }
    }

    getContainer() {
        // For inline alerts, create a simple container
        if (this.options.inline) {
            const container = document.createElement('div');
            container.className = 'mir-alert-inline-container';
            return container;
        }
        
        // For popup alerts, create positioned container
        const position = this.options.position || 'top-right';
        const containerId = `mir-alert-container-${position}`;
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
        const classes = ['mir-alert-container'];
        
        // Add position classes for popup alerts
        if (!this.options.inline) {
            const position = this.options.position || 'top-right';
            switch (position) {
                case 'top-left':
                    classes.push('mir-alert-container-left');
                    break;
                case 'top-center':
                    classes.push('mir-alert-container-center');
                    break;
                case 'bottom-right':
                    classes.push('mir-alert-container-bottom');
                    break;
                case 'bottom-left':
                    classes.push('mir-alert-container-bottom', 'mir-alert-container-left');
                    break;
                case 'bottom-center':
                    classes.push('mir-alert-container-bottom', 'mir-alert-container-center');
                    break;
                case 'top-right':
                default:
                    // Default top-right position
                    break;
            }
        }
        
        return classes.join(' ');
    }

    emit(eventName) {
        const event = new CustomEvent(`mirageAlert:${eventName}`, {
            detail: { alert: this, id: this.id }
        });
        document.dispatchEvent(event);
    }

    // Static methods for popup alerts
    static success(title, message, options = {}) {
        return new MirageAlert({
            type: 'success',
            title,
            message,
            inline: false,
            autoClose: true,
            ...options
        }).show();
    }

    static warning(title, message, options = {}) {
        return new MirageAlert({
            type: 'warning',
            title,
            message,
            inline: false,
            autoClose: true,
            ...options
        }).show();
    }

    static error(title, message, options = {}) {
        return new MirageAlert({
            type: 'error',
            title,
            message,
            inline: false,
            autoClose: false,
            ...options
        }).show();
    }

    static info(title, message, options = {}) {
        return new MirageAlert({
            type: 'info',
            title,
            message,
            inline: false,
            autoClose: true,
            ...options
        }).show();
    }

    static notify(message, options = {}) {
        return new MirageAlert({
            type: 'info',
            message,
            inline: false,
            autoClose: true,
            showProgress: true,
            ...options
        }).show();
    }

    // Clear all alerts
    static clearAll() {
        const containers = document.querySelectorAll('[id^="mir-alert-container-"]');
        containers.forEach(container => {
            container.innerHTML = '';
        });
    }

    // Persian number conversion utility
    static convertToPersianNumbers(text) {
        const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return text.replace(/\d/g, (digit) => persianNumbers[parseInt(digit)]);
    }

    // Persian date formatting
    static formatPersianDate(date) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            calendar: 'persian'
        };
        return new Intl.DateTimeFormat('fa-IR', options).format(date);
    }
}

// Initialize data attribute handlers
document.addEventListener('DOMContentLoaded', function() {
    // Handle data-mir-alert attributes
    document.addEventListener('click', function(e) {
        const trigger = e.target.closest('[data-mir-alert]');
        if (!trigger) return;

        e.preventDefault();
        
        const alertType = trigger.getAttribute('data-mir-alert');
        const title = trigger.getAttribute('data-mir-alert-title') || '';
        const message = trigger.getAttribute('data-mir-alert-message') || '';
        const inline = trigger.getAttribute('data-mir-alert-inline') !== 'false';
        const autoClose = trigger.getAttribute('data-mir-alert-auto-close') !== 'false';
        const duration = parseInt(trigger.getAttribute('data-mir-alert-duration')) || 5000;
        const size = trigger.getAttribute('data-mir-alert-size') || 'md';

        const options = {
            inline,
            autoClose,
            duration,
            size,
            showProgress: autoClose
        };

        switch (alertType) {
            case 'success':
                MirageAlert.success(title, message, options);
                break;
            case 'warning':
                MirageAlert.warning(title, message, options);
                break;
            case 'error':
                MirageAlert.error(title, message, options);
                break;
            case 'info':
            default:
                MirageAlert.info(title, message, options);
                break;
        }
    });
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MirageAlert;
}
if (typeof window !== 'undefined') {
    window.MirageAlert = MirageAlert;
}