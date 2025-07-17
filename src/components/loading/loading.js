/**
 * MIRAGE LOADING COMPONENT - RTL PERSIAN OPTIMIZED
 * ==============================================
 * 
 * Loading states with Persian support and glass morphism design
 * Features: Spinners, skeleton screens, progress bars, RTL layout
 * 
 * @author Mirage Design System
 * @version 1.0.0
 */

class MirageLoading {
    constructor(options = {}) {
        this.options = {
            type: 'spinner', // spinner, skeleton, progress
            variant: 'circle', // circle, dots, pulse, bars, ring, ripple
            size: 'md', // xs, sm, md, lg, xl
            color: 'primary', // primary, success, warning, error
            text: '',
            position: 'center', // center, overlay, fullscreen
            target: null,
            duration: null,
            showProgress: false,
            progress: 0,
            overlay: false,
            ...options
        };

        this.element = null;
        this.targetElement = null;
        this.progressElement = null;
        this.textElement = null;
        this.id = 'mir-loading-' + Date.now() + Math.random().toString(36).substr(2, 9);
        this.isActive = false;
        
        this.init();
    }

    init() {
        this.createElement();
        this.bindEvents();
    }

    createElement() {
        // Create loading element
        this.element = document.createElement('div');
        this.element.className = this.getLoadingClasses();
        this.element.id = this.id;
        this.element.setAttribute('dir', 'rtl');
        this.element.setAttribute('role', 'status');
        this.element.setAttribute('aria-live', 'polite');
        this.element.setAttribute('aria-label', 'در حال بارگیری');

        // Create content based on type
        const content = this.createContent();
        this.element.appendChild(content);

        // Set target element if specified
        if (this.options.target) {
            this.targetElement = typeof this.options.target === 'string' 
                ? document.querySelector(this.options.target)
                : this.options.target;
        }
    }

    getLoadingClasses() {
        const classes = ['mir-loading'];
        
        // Add position class
        if (this.options.position === 'overlay') {
            classes.push('mir-loading-overlay');
        } else if (this.options.position === 'fullscreen') {
            classes.push('mir-loading-fullscreen');
        }
        
        // Add color class
        if (this.options.color !== 'primary') {
            classes.push(`mir-loading-${this.options.color}`);
        }

        return classes.join(' ');
    }

    createContent() {
        const content = document.createElement('div');
        content.className = 'mir-loading-content';

        // Add horizontal layout if text is present
        if (this.options.text) {
            content.classList.add('mir-loading-horizontal');
        }

        // Create main loading element based on type
        let loadingElement;
        switch (this.options.type) {
            case 'skeleton':
                loadingElement = this.createSkeleton();
                break;
            case 'progress':
                loadingElement = this.createProgress();
                break;
            case 'spinner':
            default:
                loadingElement = this.createSpinner();
                break;
        }

        if (loadingElement) {
            content.appendChild(loadingElement);
        }

        // Add text if specified
        if (this.options.text) {
            this.textElement = document.createElement('span');
            this.textElement.className = 'mir-loading-text';
            this.textElement.textContent = this.convertToPersianNumbers(this.options.text);
            content.appendChild(this.textElement);
        }

        // Add progress bar if requested
        if (this.options.showProgress && this.options.type !== 'progress') {
            const progressBar = this.createProgressBar();
            content.appendChild(progressBar);
        }

        return content;
    }

    createSpinner() {
        const spinner = document.createElement('div');
        spinner.className = this.getSpinnerClasses();

        switch (this.options.variant) {
            case 'dots':
                spinner.innerHTML = '<div class="mir-dot"></div><div class="mir-dot"></div><div class="mir-dot"></div>';
                break;
            case 'pulse':
                // Empty div for pulse animation
                break;
            case 'bars':
                spinner.innerHTML = '<div class="mir-bar"></div><div class="mir-bar"></div><div class="mir-bar"></div>';
                break;
            case 'ring':
                spinner.innerHTML = '<div></div><div></div><div></div><div></div>';
                break;
            case 'ripple':
                spinner.innerHTML = '<div></div><div></div>';
                break;
            case 'circle':
            default:
                // Empty div for circle animation
                break;
        }

        return spinner;
    }

    getSpinnerClasses() {
        const classes = ['mir-spinner', `mir-spinner-${this.options.variant}`];
        
        // Add size class
        if (this.options.size !== 'md') {
            classes.push(`mir-spinner-${this.options.size}`);
        }

        return classes.join(' ');
    }

    createSkeleton() {
        const skeleton = document.createElement('div');
        skeleton.className = 'mir-skeleton';

        // Create skeleton based on variant
        switch (this.options.variant) {
            case 'text':
                skeleton.classList.add('mir-skeleton-text');
                break;
            case 'avatar':
                skeleton.classList.add('mir-skeleton-avatar');
                if (this.options.size !== 'md') {
                    skeleton.classList.add(`mir-skeleton-avatar-${this.options.size}`);
                }
                break;
            case 'button':
                skeleton.classList.add('mir-skeleton-button');
                if (this.options.size !== 'md') {
                    skeleton.classList.add(`mir-skeleton-button-${this.options.size}`);
                }
                break;
            case 'card':
                skeleton.classList.add('mir-skeleton-card');
                skeleton.innerHTML = `
                    <div class="mir-skeleton-card-header">
                        <div class="mir-skeleton mir-skeleton-avatar"></div>
                        <div style="flex: 1;">
                            <div class="mir-skeleton mir-skeleton-text mir-skeleton-w-75"></div>
                            <div class="mir-skeleton mir-skeleton-text mir-skeleton-w-50"></div>
                        </div>
                    </div>
                    <div class="mir-skeleton-card-content">
                        <div class="mir-skeleton mir-skeleton-text mir-skeleton-w-full"></div>
                        <div class="mir-skeleton mir-skeleton-text mir-skeleton-w-full"></div>
                        <div class="mir-skeleton mir-skeleton-text mir-skeleton-w-75"></div>
                    </div>
                `;
                break;
            default:
                skeleton.classList.add('mir-skeleton-text');
                break;
        }

        return skeleton;
    }

    createProgress() {
        const progress = document.createElement('div');
        progress.className = 'mir-progress';

        this.progressElement = document.createElement('div');
        this.progressElement.className = 'mir-progress-bar';
        
        if (this.options.progress > 0) {
            this.progressElement.style.width = this.options.progress + '%';
        } else {
            this.progressElement.parentElement.classList.add('mir-progress-indeterminate');
        }

        progress.appendChild(this.progressElement);

        // Add progress text
        if (this.options.showProgress || this.options.progress > 0) {
            const progressText = document.createElement('div');
            progressText.className = 'mir-progress-text';
            progressText.textContent = this.convertToPersianNumbers(this.options.progress + '%');
            progress.appendChild(progressText);
        }

        return progress;
    }

    createProgressBar() {
        const container = document.createElement('div');
        container.className = 'mir-progress';
        container.style.marginTop = 'var(--mir-space-3)';

        const bar = document.createElement('div');
        bar.className = 'mir-progress-bar';
        bar.style.width = '0%';

        container.appendChild(bar);
        return container;
    }

    bindEvents() {
        // Handle keyboard events
        if (this.options.position === 'fullscreen') {
            this.element.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.hide();
                }
            });
        }
    }

    show() {
        if (this.isActive) return this;

        this.isActive = true;

        // Add to target or document body
        if (this.targetElement) {
            if (this.options.position === 'overlay') {
                this.targetElement.style.position = 'relative';
                this.targetElement.appendChild(this.element);
            } else {
                this.targetElement.appendChild(this.element);
            }
        } else {
            document.body.appendChild(this.element);
        }

        // Add visible class
        this.element.classList.add('mir-loading-visible');

        // Focus management for fullscreen
        if (this.options.position === 'fullscreen') {
            this.element.setAttribute('tabindex', '-1');
            this.element.focus();
        }

        // Auto-hide after duration
        if (this.options.duration) {
            setTimeout(() => {
                this.hide();
            }, this.options.duration);
        }

        // Emit event
        this.emit('show');

        return this;
    }

    hide() {
        if (!this.isActive) return this;

        this.isActive = false;

        // Remove from DOM
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }

        // Emit event
        this.emit('hide');

        return this;
    }

    updateProgress(progress) {
        if (!this.progressElement) return this;

        this.options.progress = Math.max(0, Math.min(100, progress));
        this.progressElement.style.width = this.options.progress + '%';

        // Update progress text
        const progressText = this.element.querySelector('.mir-progress-text');
        if (progressText) {
            progressText.textContent = this.convertToPersianNumbers(this.options.progress + '%');
        }

        // Auto-hide when complete
        if (this.options.progress >= 100) {
            setTimeout(() => {
                this.hide();
            }, 500);
        }

        return this;
    }

    updateText(text) {
        if (!this.textElement) return this;

        this.options.text = text;
        this.textElement.textContent = this.convertToPersianNumbers(text);

        return this;
    }

    emit(eventName) {
        const event = new CustomEvent(`mirageLoading:${eventName}`, {
            detail: { loading: this, id: this.id }
        });
        document.dispatchEvent(event);
    }

    convertToPersianNumbers(text) {
        const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return text.replace(/\d/g, (digit) => persianNumbers[parseInt(digit)]);
    }

    // Static methods for common use cases
    static spinner(options = {}) {
        return new MirageLoading({
            type: 'spinner',
            variant: 'circle',
            ...options
        });
    }

    static dots(options = {}) {
        return new MirageLoading({
            type: 'spinner',
            variant: 'dots',
            ...options
        });
    }

    static pulse(options = {}) {
        return new MirageLoading({
            type: 'spinner',
            variant: 'pulse',
            ...options
        });
    }

    static bars(options = {}) {
        return new MirageLoading({
            type: 'spinner',
            variant: 'bars',
            ...options
        });
    }

    static ring(options = {}) {
        return new MirageLoading({
            type: 'spinner',
            variant: 'ring',
            ...options
        });
    }

    static ripple(options = {}) {
        return new MirageLoading({
            type: 'spinner',
            variant: 'ripple',
            ...options
        });
    }

    static skeleton(options = {}) {
        return new MirageLoading({
            type: 'skeleton',
            variant: 'text',
            ...options
        });
    }

    static progress(options = {}) {
        return new MirageLoading({
            type: 'progress',
            showProgress: true,
            ...options
        });
    }

    static overlay(target, options = {}) {
        return new MirageLoading({
            position: 'overlay',
            target: target,
            ...options
        });
    }

    static fullscreen(options = {}) {
        return new MirageLoading({
            position: 'fullscreen',
            ...options
        });
    }

    // Button loading state
    static button(buttonElement, options = {}) {
        const button = typeof buttonElement === 'string' 
            ? document.querySelector(buttonElement)
            : buttonElement;

        if (!button) return null;

        // Store original content
        const originalContent = button.innerHTML;
        const originalDisabled = button.disabled;

        // Add loading state
        button.classList.add('mir-btn-loading');
        button.disabled = true;

        // Create spinner
        const spinner = document.createElement('div');
        spinner.className = 'mir-spinner mir-spinner-circle mir-spinner-sm';
        button.appendChild(spinner);

        return {
            stop: () => {
                button.classList.remove('mir-btn-loading');
                button.disabled = originalDisabled;
                button.innerHTML = originalContent;
            }
        };
    }

    // Promise-based loading
    static promise(promise, options = {}) {
        const loading = new MirageLoading({
            text: 'در حال بارگیری...',
            ...options
        }).show();

        return promise
            .then(result => {
                loading.hide();
                return result;
            })
            .catch(error => {
                loading.hide();
                throw error;
            });
    }

    // Progress tracking
    static progressTracker(options = {}) {
        const loading = new MirageLoading({
            type: 'progress',
            progress: 0,
            showProgress: true,
            ...options
        }).show();

        return {
            update: (progress) => loading.updateProgress(progress),
            updateText: (text) => loading.updateText(text),
            complete: () => loading.updateProgress(100),
            hide: () => loading.hide()
        };
    }

    // Skeleton loaders
    static skeletonText(count = 3, options = {}) {
        const container = document.createElement('div');
        
        for (let i = 0; i < count; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'mir-skeleton mir-skeleton-text';
            
            // Vary width for more realistic look
            if (i === count - 1) {
                skeleton.classList.add('mir-skeleton-w-75');
            } else if (i % 2 === 0) {
                skeleton.classList.add('mir-skeleton-w-full');
            } else {
                skeleton.classList.add('mir-skeleton-w-50');
            }
            
            container.appendChild(skeleton);
        }

        return container;
    }

    static skeletonCard(options = {}) {
        return new MirageLoading({
            type: 'skeleton',
            variant: 'card',
            ...options
        }).element;
    }

    static skeletonTable(rows = 5, columns = 4, options = {}) {
        const table = document.createElement('table');
        table.className = 'mir-skeleton-table';

        for (let i = 0; i < rows; i++) {
            const row = document.createElement('tr');
            
            for (let j = 0; j < columns; j++) {
                const cell = document.createElement('td');
                const skeleton = document.createElement('div');
                skeleton.className = 'mir-skeleton mir-skeleton-table-cell';
                cell.appendChild(skeleton);
                row.appendChild(cell);
            }
            
            table.appendChild(row);
        }

        return table;
    }

    // Utility methods
    static hideAll() {
        const loadingElements = document.querySelectorAll('[id^="mir-loading-"]');
        loadingElements.forEach(element => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
    }

    static getActive() {
        return document.querySelectorAll('[id^="mir-loading-"].mir-loading-visible');
    }

    static convertToPersianNumbers(text) {
        const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return text.replace(/\d/g, (digit) => persianNumbers[parseInt(digit)]);
    }
}

// Initialize data attribute handlers
document.addEventListener('DOMContentLoaded', function() {
    // Handle data-mir-loading attributes
    document.addEventListener('click', function(e) {
        const trigger = e.target.closest('[data-mir-loading]');
        if (!trigger) return;

        const loadingType = trigger.getAttribute('data-mir-loading');
        const target = trigger.getAttribute('data-mir-loading-target');
        const text = trigger.getAttribute('data-mir-loading-text') || 'در حال بارگیری...';
        const duration = parseInt(trigger.getAttribute('data-mir-loading-duration')) || null;
        const variant = trigger.getAttribute('data-mir-loading-variant') || 'circle';
        const size = trigger.getAttribute('data-mir-loading-size') || 'md';
        const color = trigger.getAttribute('data-mir-loading-color') || 'primary';

        const options = {
            variant,
            size,
            color,
            text,
            duration,
            target: target ? document.querySelector(target) : null
        };

        let loading;
        switch (loadingType) {
            case 'spinner':
                loading = MirageLoading.spinner(options);
                break;
            case 'dots':
                loading = MirageLoading.dots(options);
                break;
            case 'pulse':
                loading = MirageLoading.pulse(options);
                break;
            case 'bars':
                loading = MirageLoading.bars(options);
                break;
            case 'ring':
                loading = MirageLoading.ring(options);
                break;
            case 'ripple':
                loading = MirageLoading.ripple(options);
                break;
            case 'skeleton':
                loading = MirageLoading.skeleton(options);
                break;
            case 'progress':
                loading = MirageLoading.progress(options);
                break;
            case 'overlay':
                loading = MirageLoading.overlay(options.target, options);
                break;
            case 'fullscreen':
                loading = MirageLoading.fullscreen(options);
                break;
            case 'button':
                loading = MirageLoading.button(trigger, options);
                return; // Button loading doesn't need .show()
            default:
                loading = MirageLoading.spinner(options);
                break;
        }

        loading.show();
    });
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MirageLoading;
}
if (typeof window !== 'undefined') {
    window.MirageLoading = MirageLoading;
}