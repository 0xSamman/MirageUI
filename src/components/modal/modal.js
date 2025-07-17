// ========================================
// MIRAGE MODAL COMPONENT - RTL PERSIAN OPTIMIZED
// ========================================

class MirageModal {
    constructor(options = {}) {
        this.options = {
            size: 'md',
            closable: true,
            backdrop: true,
            keyboard: true,
            focus: true,
            animation: true,
            rtl: true,
            ...options
        };
        
        this.isOpen = false;
        this.element = null;
        this.overlay = null;
        this.previousActiveElement = null;
        
        this.init();
    }
    
    init() {
        this.createModal();
        this.bindEvents();
    }
    
    createModal() {
        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'mir-modal-overlay';
        this.overlay.setAttribute('role', 'dialog');
        this.overlay.setAttribute('aria-modal', 'true');
        this.overlay.setAttribute('aria-hidden', 'true');
        
        // Create modal
        this.element = document.createElement('div');
        this.element.className = `mir-modal mir-modal-${this.options.size}`;
        this.element.setAttribute('tabindex', '-1');
        
        // Add variant classes
        if (this.options.variant) {
            this.element.classList.add(`mir-modal-${this.options.variant}`);
        }
        
        this.overlay.appendChild(this.element);
        document.body.appendChild(this.overlay);
    }
    
    setContent(content) {
        if (typeof content === 'string') {
            this.element.innerHTML = content;
        } else if (content instanceof HTMLElement) {
            this.element.innerHTML = '';
            this.element.appendChild(content);
        }
        
        // Re-bind events after content change
        this.bindModalEvents();
    }
    
    setHeader(title, closable = true) {
        const header = document.createElement('div');
        header.className = 'mir-modal-header';
        
        const titleElement = document.createElement('h3');
        titleElement.className = 'mir-modal-title';
        titleElement.textContent = title;
        
        header.appendChild(titleElement);
        
        if (closable) {
            const closeButton = document.createElement('button');
            closeButton.className = 'mir-modal-close';
            closeButton.setAttribute('aria-label', 'بستن');
            closeButton.innerHTML = '<i data-feather="x"></i>';
            header.appendChild(closeButton);
        }
        
        // Insert at the beginning
        this.element.insertBefore(header, this.element.firstChild);
        
        // Replace feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }
    
    setBody(content) {
        let body = this.element.querySelector('.mir-modal-body');
        if (!body) {
            body = document.createElement('div');
            body.className = 'mir-modal-body';
            this.element.appendChild(body);
        }
        
        if (typeof content === 'string') {
            body.innerHTML = content;
        } else if (content instanceof HTMLElement) {
            body.innerHTML = '';
            body.appendChild(content);
        }
    }
    
    setFooter(buttons = []) {
        let footer = this.element.querySelector('.mir-modal-footer');
        if (!footer) {
            footer = document.createElement('div');
            footer.className = 'mir-modal-footer';
            this.element.appendChild(footer);
        }
        
        footer.innerHTML = '';
        
        buttons.forEach(buttonConfig => {
            const button = document.createElement('button');
            button.className = `mir-btn ${buttonConfig.class || 'mir-btn-primary'}`;
            button.textContent = buttonConfig.text;
            
            if (buttonConfig.onclick) {
                button.addEventListener('click', buttonConfig.onclick);
            }
            
            footer.appendChild(button);
        });
    }
    
    open() {
        if (this.isOpen) return;
        
        this.isOpen = true;
        this.previousActiveElement = document.activeElement;
        
        // Add body class to prevent scrolling
        document.body.classList.add('mir-modal-open');
        
        // Show overlay
        this.overlay.setAttribute('aria-hidden', 'false');
        this.overlay.classList.add('mir-modal-open');
        
        // Focus management
        if (this.options.focus) {
            this.element.focus();
        }
        
        // Trigger open event
        this.trigger('open');
        
        // Auto-close after delay if specified
        if (this.options.autoClose) {
            setTimeout(() => {
                this.close();
            }, this.options.autoClose);
        }
    }
    
    close() {
        if (!this.isOpen) return;
        
        this.isOpen = false;
        
        // Remove body class
        document.body.classList.remove('mir-modal-open');
        
        // Hide overlay
        this.overlay.classList.remove('mir-modal-open');
        this.overlay.setAttribute('aria-hidden', 'true');
        
        // Restore focus
        if (this.previousActiveElement) {
            this.previousActiveElement.focus();
        }
        
        // Trigger close event
        this.trigger('close');
    }
    
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    destroy() {
        this.close();
        if (this.overlay && this.overlay.parentNode) {
            this.overlay.parentNode.removeChild(this.overlay);
        }
        this.trigger('destroy');
    }
    
    bindEvents() {
        // Backdrop click
        if (this.options.backdrop) {
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) {
                    this.close();
                }
            });
        }
        
        // Keyboard events
        if (this.options.keyboard) {
            document.addEventListener('keydown', (e) => {
                if (this.isOpen && e.key === 'Escape') {
                    this.close();
                }
            });
        }
        
        this.bindModalEvents();
    }
    
    bindModalEvents() {
        // Close button
        const closeButton = this.element.querySelector('.mir-modal-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.close();
            });
        }
        
        // Focus trap
        this.element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.handleTabKey(e);
            }
        });
    }
    
    handleTabKey(e) {
        const focusableElements = this.element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    }
    
    trigger(eventName) {
        const event = new CustomEvent(`mirageModal:${eventName}`, {
            detail: { modal: this }
        });
        document.dispatchEvent(event);
    }
}

// Static Methods for Common Modal Types
MirageModal.alert = function(title, message, options = {}) {
    const modal = new MirageModal({
        size: 'sm',
        variant: 'info',
        ...options
    });
    
    modal.setHeader(title, false);
    modal.setBody(`<p style="text-align: center; margin-bottom: var(--mir-space-4);">${message}</p>`);
    modal.setFooter([
        {
            text: 'تایید',
            class: 'mir-btn-primary',
            onclick: () => modal.close()
        }
    ]);
    
    modal.open();
    return modal;
};

MirageModal.confirm = function(title, message, options = {}) {
    return new Promise((resolve) => {
        const modal = new MirageModal({
            size: 'sm',
            variant: 'warning',
            ...options
        });
        
        modal.setHeader(title, false);
        modal.setBody(`
            <div class="mir-modal-confirm">
                <div class="mir-modal-icon">
                    <i data-feather="help-circle"></i>
                </div>
                <p>${message}</p>
            </div>
        `);
        
        modal.setFooter([
            {
                text: 'لغو',
                class: 'mir-btn-secondary',
                onclick: () => {
                    modal.close();
                    resolve(false);
                }
            },
            {
                text: 'تایید',
                class: 'mir-btn-primary',
                onclick: () => {
                    modal.close();
                    resolve(true);
                }
            }
        ]);
        
        modal.open();
        
        // Replace feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    });
};

MirageModal.success = function(title, message, options = {}) {
    const modal = new MirageModal({
        size: 'sm',
        variant: 'success',
        autoClose: 3000,
        ...options
    });
    
    modal.setHeader(title, true);
    modal.setBody(`
        <div class="mir-modal-confirm">
            <div class="mir-modal-icon">
                <i data-feather="check-circle"></i>
            </div>
            <p>${message}</p>
        </div>
    `);
    
    modal.open();
    
    // Replace feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    
    return modal;
};

MirageModal.error = function(title, message, options = {}) {
    const modal = new MirageModal({
        size: 'sm',
        variant: 'error',
        ...options
    });
    
    modal.setHeader(title, true);
    modal.setBody(`
        <div class="mir-modal-confirm">
            <div class="mir-modal-icon">
                <i data-feather="alert-circle"></i>
            </div>
            <p>${message}</p>
        </div>
    `);
    
    modal.setFooter([
        {
            text: 'بستن',
            class: 'mir-btn-danger',
            onclick: () => modal.close()
        }
    ]);
    
    modal.open();
    
    // Replace feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    
    return modal;
};

MirageModal.loading = function(message = 'در حال بارگیری...', options = {}) {
    const modal = new MirageModal({
        size: 'sm',
        closable: false,
        backdrop: false,
        keyboard: false,
        ...options
    });
    
    modal.setBody(`
        <div class="mir-modal-loading">
            <div class="mir-loading-spinner"></div>
            <p>${message}</p>
        </div>
    `);
    
    modal.open();
    return modal;
};

MirageModal.form = function(title, formContent, options = {}) {
    const modal = new MirageModal({
        size: 'md',
        variant: 'form',
        ...options
    });
    
    modal.setHeader(title, true);
    modal.setBody(formContent);
    
    modal.open();
    return modal;
};

// jQuery-like API (Optional)
if (typeof $ !== 'undefined') {
    $.fn.mirageModal = function(options) {
        return this.each(function() {
            const $this = $(this);
            let modal = $this.data('mirageModal');
            
            if (!modal) {
                modal = new MirageModal(options);
                $this.data('mirageModal', modal);
            }
            
            if (typeof options === 'string') {
                modal[options]();
            }
        });
    };
}

// Auto-initialize modals with data attributes
document.addEventListener('DOMContentLoaded', function() {
    // Auto-initialize modal triggers
    document.querySelectorAll('[data-mir-modal]').forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = this.getAttribute('data-mir-modal');
            const size = this.getAttribute('data-mir-modal-size') || 'md';
            const variant = this.getAttribute('data-mir-modal-variant');
            
            if (target === 'alert') {
                const title = this.getAttribute('data-mir-modal-title') || 'اطلاعیه';
                const message = this.getAttribute('data-mir-modal-message') || 'پیام پیش‌فرض';
                MirageModal.alert(title, message, { size, variant });
            } else if (target === 'confirm') {
                const title = this.getAttribute('data-mir-modal-title') || 'تأیید';
                const message = this.getAttribute('data-mir-modal-message') || 'آیا مطمئن هستید؟';
                MirageModal.confirm(title, message, { size, variant }).then(result => {
                    if (result) {
                        console.log('تأیید شد');
                    }
                });
            } else {
                // Custom modal
                const modal = new MirageModal({ size, variant });
                const content = document.querySelector(target);
                if (content) {
                    modal.setContent(content.innerHTML);
                    modal.open();
                }
            }
        });
    });
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MirageModal;
}

// Global assignment
window.MirageModal = MirageModal;