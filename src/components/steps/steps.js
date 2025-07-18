/**
 * MirageUI - Steps/Wizard Component
 * Persian RTL Design System - Multi-step Process Navigation
 * 
 * Features:
 * - RTL layout and progression
 * - Persian number conversion
 * - Multiple variants and sizes
 * - Horizontal and vertical layouts
 * - Step validation and states
 * - Navigation controls
 * - Accessibility support
 * - Event callbacks
 */

class MirageSteps {
    constructor(element, options = {}) {
        this.element = typeof element === 'string' ? document.querySelector(element) : element;
        
        if (!this.element) {
            console.error('MirageSteps: Element not found');
            return;
        }

        // Default options
        this.options = {
            // Structure
            steps: [],
            currentStep: 0,
            
            // Appearance
            variant: 'default', // default, simple, outlined, minimal
            size: 'md', // sm, md, lg
            direction: 'horizontal', // horizontal, vertical
            
            // Features
            clickable: true,
            showProgress: true,
            showNavigation: true,
            showContent: true,
            
            // Validation
            allowSkip: false,
            validateOnNext: true,
            
            // Persian/RTL
            persianNumbers: true,
            rtl: true,
            
            // Labels (Persian)
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
            },
            
            // Callbacks
            onStepChange: null,
            onStepClick: null,
            onNext: null,
            onPrevious: null,
            onFinish: null,
            onValidate: null,
            onInit: null
        };

        // Merge options
        this.options = { ...this.options, ...options };
        
        // Validation
        this.options.currentStep = Math.max(0, Math.min(this.options.currentStep, this.options.steps.length - 1));
        
        // Initialize
        this.init();
    }

    init() {
        this.setupElement();
        this.render();
        this.bindEvents();
        
        if (this.options.onInit) {
            this.options.onInit(this);
        }
    }

    setupElement() {
        // Add base classes
        this.element.classList.add('mir-steps');
        
        // Add variant class
        if (this.options.variant !== 'default') {
            this.element.classList.add(`mir-steps-${this.options.variant}`);
        }
        
        // Add size class
        if (this.options.size !== 'md') {
            this.element.classList.add(`mir-steps-${this.options.size}`);
        }
        
        // Add direction class
        if (this.options.direction === 'vertical') {
            this.element.classList.add('mir-steps-vertical');
        }
        
        // Add RTL direction
        if (this.options.rtl) {
            this.element.style.direction = 'rtl';
        }
    }

    render() {
        this.element.innerHTML = '';
        
        // Create steps container
        const stepsContainer = this.createStepsContainer();
        this.element.appendChild(stepsContainer);
        
        // Add progress bar if enabled
        if (this.options.showProgress) {
            const progressBar = this.createProgressBar();
            stepsContainer.appendChild(progressBar);
        }
        
        // Add content area if enabled
        if (this.options.showContent) {
            const contentArea = this.createContentArea();
            this.element.appendChild(contentArea);
        }
        
        // Add navigation if enabled
        if (this.options.showNavigation) {
            const navigation = this.createNavigation();
            this.element.appendChild(navigation);
        }
        
        // Update progress
        this.updateProgress();
    }

    createStepsContainer() {
        const container = document.createElement('div');
        container.className = 'mir-steps-container';
        container.setAttribute('role', 'progressbar');
        container.setAttribute('aria-valuenow', this.options.currentStep + 1);
        container.setAttribute('aria-valuemin', 1);
        container.setAttribute('aria-valuemax', this.options.steps.length);

        this.options.steps.forEach((step, index) => {
            const stepElement = this.createStepElement(step, index);
            container.appendChild(stepElement);
        });

        return container;
    }

    createStepElement(step, index) {
        const stepEl = document.createElement('div');
        stepEl.className = 'mir-step';
        stepEl.setAttribute('data-step', index);
        
        // Add state classes
        if (index < this.options.currentStep) {
            stepEl.classList.add('mir-step-completed');
        } else if (index === this.options.currentStep) {
            stepEl.classList.add('mir-step-active');
        } else {
            stepEl.classList.add('mir-step-pending');
        }
        
        // Add step state from data
        if (step.state) {
            stepEl.classList.add(`mir-step-${step.state}`);
        }
        
        if (step.disabled) {
            stepEl.classList.add('mir-step-disabled');
        }

        // Create indicator
        const indicator = this.createStepIndicator(step, index);
        stepEl.appendChild(indicator);

        // Create content
        if (step.title || step.description) {
            const content = this.createStepContent(step, index);
            stepEl.appendChild(content);
        }

        // Create connector
        if (index < this.options.steps.length - 1) {
            const connector = this.createStepConnector();
            stepEl.appendChild(connector);
        }

        return stepEl;
    }

    createStepIndicator(step, index) {
        const indicator = document.createElement('button');
        indicator.className = 'mir-step-indicator';
        indicator.type = 'button';
        indicator.setAttribute('aria-label', `${this.options.labels.step} ${this.formatNumber(index + 1)} ${this.options.labels.of} ${this.formatNumber(this.options.steps.length)}`);
        
        if (!this.options.clickable || step.disabled) {
            indicator.disabled = true;
        }

        // Add content based on step state and type
        if (step.icon && !this.isStepCompleted(index)) {
            const icon = document.createElement('i');
            icon.className = 'mir-step-icon';
            icon.setAttribute('data-feather', step.icon);
            indicator.appendChild(icon);
        } else if (step.content && !this.isStepCompleted(index)) {
            indicator.innerHTML = step.content;
        } else if (!this.isStepCompleted(index)) {
            const number = document.createElement('span');
            number.className = 'mir-step-number';
            number.textContent = this.formatNumber(index + 1);
            indicator.appendChild(number);
        }

        return indicator;
    }

    createStepContent(step, index) {
        const content = document.createElement('div');
        content.className = 'mir-step-content';

        if (step.title) {
            const title = document.createElement('div');
            title.className = 'mir-step-title';
            title.textContent = step.title;
            content.appendChild(title);
        }

        if (step.description) {
            const description = document.createElement('div');
            description.className = 'mir-step-description';
            description.textContent = step.description;
            content.appendChild(description);
        }

        return content;
    }

    createStepConnector() {
        const connector = document.createElement('div');
        connector.className = 'mir-step-connector';
        return connector;
    }

    createProgressBar() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'mir-steps-progress';

        const progressBar = document.createElement('div');
        progressBar.className = 'mir-steps-progress-bar';
        progressContainer.appendChild(progressBar);

        return progressContainer;
    }

    createContentArea() {
        const contentArea = document.createElement('div');
        contentArea.className = 'mir-step-content-area';
        contentArea.setAttribute('aria-live', 'polite');

        this.updateContentArea(contentArea);

        return contentArea;
    }

    updateContentArea(contentArea = null) {
        if (!contentArea) {
            contentArea = this.element.querySelector('.mir-step-content-area');
        }
        
        if (!contentArea) return;

        const currentStep = this.options.steps[this.options.currentStep];
        if (!currentStep) return;

        contentArea.innerHTML = '';

        if (currentStep.contentTitle) {
            const title = document.createElement('h3');
            title.textContent = currentStep.contentTitle;
            contentArea.appendChild(title);
        }

        if (currentStep.contentHtml) {
            const content = document.createElement('div');
            content.innerHTML = currentStep.contentHtml;
            contentArea.appendChild(content);
        } else if (currentStep.contentText) {
            const content = document.createElement('p');
            content.textContent = currentStep.contentText;
            contentArea.appendChild(content);
        }

        // Custom content callback
        if (currentStep.onRender && typeof currentStep.onRender === 'function') {
            currentStep.onRender(contentArea, this.options.currentStep, this);
        }
    }

    createNavigation() {
        const navigation = document.createElement('div');
        navigation.className = 'mir-steps-navigation';

        // Previous button
        const leftNav = document.createElement('div');
        leftNav.className = 'mir-steps-nav-left';

        if (this.options.currentStep > 0) {
            const prevBtn = this.createNavButton('previous', this.options.labels.previous, 'chevron-right');
            leftNav.appendChild(prevBtn);
        }

        navigation.appendChild(leftNav);

        // Center info
        const centerNav = document.createElement('div');
        centerNav.className = 'mir-steps-nav-center';
        centerNav.innerHTML = `
            ${this.options.labels.step} ${this.formatNumber(this.options.currentStep + 1)} 
            ${this.options.labels.of} ${this.formatNumber(this.options.steps.length)}
        `;
        navigation.appendChild(centerNav);

        // Next/Finish button
        const rightNav = document.createElement('div');
        rightNav.className = 'mir-steps-nav-right';

        const isLastStep = this.options.currentStep === this.options.steps.length - 1;
        const nextBtn = this.createNavButton(
            isLastStep ? 'finish' : 'next',
            isLastStep ? this.options.labels.finish : this.options.labels.next,
            isLastStep ? 'check' : 'chevron-left'
        );
        rightNav.appendChild(nextBtn);

        // Skip button if allowed
        if (this.options.allowSkip && !isLastStep) {
            const skipBtn = this.createNavButton('skip', this.options.labels.skip, 'skip-forward');
            skipBtn.classList.add('mir-btn-ghost');
            rightNav.appendChild(skipBtn);
        }

        navigation.appendChild(rightNav);

        return navigation;
    }

    createNavButton(type, text, icon) {
        const button = document.createElement('button');
        button.className = `mir-btn mir-btn-${type === 'previous' ? 'secondary' : 'primary'}`;
        button.type = 'button';
        button.setAttribute('data-action', type);

        if (icon) {
            const iconEl = document.createElement('i');
            iconEl.className = 'mir-btn-icon';
            iconEl.setAttribute('data-feather', icon);
            button.appendChild(iconEl);
        }

        const textEl = document.createElement('span');
        textEl.textContent = text;
        button.appendChild(textEl);

        return button;
    }

    bindEvents() {
        // Step indicator clicks
        this.element.addEventListener('click', (e) => {
            if (e.target.closest('.mir-step-indicator')) {
                const stepEl = e.target.closest('.mir-step');
                const stepIndex = parseInt(stepEl.dataset.step);
                this.handleStepClick(stepIndex);
            }
        });

        // Navigation button clicks
        this.element.addEventListener('click', (e) => {
            const action = e.target.closest('[data-action]')?.dataset.action;
            if (action) {
                this.handleNavigation(action);
            }
        });

        // Keyboard navigation
        this.element.addEventListener('keydown', (e) => {
            this.handleKeydown(e);
        });
    }

    handleStepClick(stepIndex) {
        if (!this.options.clickable) return;
        
        const step = this.options.steps[stepIndex];
        if (!step || step.disabled) return;

        // Only allow clicking on completed steps or current step
        if (stepIndex > this.options.currentStep && !this.options.allowSkip) {
            return;
        }

        // Trigger callback
        if (this.options.onStepClick) {
            const result = this.options.onStepClick(stepIndex, step, this);
            if (result === false) return;
        }

        this.goToStep(stepIndex);
    }

    handleNavigation(action) {
        switch (action) {
            case 'previous':
                this.previousStep();
                break;
            case 'next':
                this.nextStep();
                break;
            case 'finish':
                this.finish();
                break;
            case 'skip':
                this.skipStep();
                break;
        }
    }

    handleKeydown(e) {
        const current = this.options.currentStep;
        const total = this.options.steps.length;

        switch (e.key) {
            case 'ArrowLeft':
                if (this.options.rtl) {
                    // RTL: ArrowLeft = Next
                    e.preventDefault();
                    this.nextStep();
                } else {
                    // LTR: ArrowLeft = Previous
                    e.preventDefault();
                    this.previousStep();
                }
                break;
            case 'ArrowRight':
                if (this.options.rtl) {
                    // RTL: ArrowRight = Previous
                    e.preventDefault();
                    this.previousStep();
                } else {
                    // LTR: ArrowRight = Next
                    e.preventDefault();
                    this.nextStep();
                }
                break;
            case 'Home':
                e.preventDefault();
                this.goToStep(0);
                break;
            case 'End':
                e.preventDefault();
                this.goToStep(total - 1);
                break;
            case 'Enter':
            case ' ':
                if (e.target.classList.contains('mir-step-indicator')) {
                    e.preventDefault();
                    const stepEl = e.target.closest('.mir-step');
                    const stepIndex = parseInt(stepEl.dataset.step);
                    this.handleStepClick(stepIndex);
                }
                break;
        }
    }

    nextStep() {
        if (this.options.currentStep >= this.options.steps.length - 1) {
            return this.finish();
        }

        // Validate current step if required
        if (this.options.validateOnNext && !this.validateStep(this.options.currentStep)) {
            return;
        }

        // Trigger callback
        if (this.options.onNext) {
            const result = this.options.onNext(this.options.currentStep, this);
            if (result === false) return;
        }

        this.goToStep(this.options.currentStep + 1);
    }

    previousStep() {
        if (this.options.currentStep <= 0) return;

        // Trigger callback
        if (this.options.onPrevious) {
            const result = this.options.onPrevious(this.options.currentStep, this);
            if (result === false) return;
        }

        this.goToStep(this.options.currentStep - 1);
    }

    skipStep() {
        if (!this.options.allowSkip) return;
        
        this.nextStep();
    }

    finish() {
        // Validate final step if required
        if (this.options.validateOnNext && !this.validateStep(this.options.currentStep)) {
            return;
        }

        // Trigger callback
        if (this.options.onFinish) {
            const result = this.options.onFinish(this);
            if (result === false) return;
        }

        // Mark as completed
        this.setStepState(this.options.currentStep, 'completed');
        
        this.announceCompletion();
    }

    goToStep(stepIndex) {
        if (stepIndex < 0 || stepIndex >= this.options.steps.length) {
            return;
        }

        if (stepIndex === this.options.currentStep) {
            return;
        }

        const oldStep = this.options.currentStep;
        const newStep = stepIndex;

        // Mark previous step as completed if moving forward
        if (newStep > oldStep) {
            for (let i = oldStep; i < newStep; i++) {
                this.setStepState(i, 'completed');
            }
        }

        this.options.currentStep = newStep;

        // Update visual state
        this.updateStepsDisplay();
        this.updateProgress();
        this.updateContentArea();
        this.updateNavigation();

        // Update ARIA
        const container = this.element.querySelector('.mir-steps-container');
        if (container) {
            container.setAttribute('aria-valuenow', this.options.currentStep + 1);
        }

        // Trigger callback
        if (this.options.onStepChange) {
            this.options.onStepChange(newStep, oldStep, this);
        }

        // Announce step change for screen readers
        this.announceStepChange(newStep);
    }

    updateStepsDisplay() {
        const steps = this.element.querySelectorAll('.mir-step');
        
        steps.forEach((stepEl, index) => {
            // Remove all state classes
            stepEl.classList.remove('mir-step-active', 'mir-step-completed', 'mir-step-pending');
            
            // Add appropriate state class
            if (index < this.options.currentStep) {
                stepEl.classList.add('mir-step-completed');
            } else if (index === this.options.currentStep) {
                stepEl.classList.add('mir-step-active');
            } else {
                stepEl.classList.add('mir-step-pending');
            }
        });
    }

    updateProgress() {
        const progressBar = this.element.querySelector('.mir-steps-progress-bar');
        if (!progressBar) return;

        const progress = ((this.options.currentStep + 1) / this.options.steps.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    updateNavigation() {
        const navigation = this.element.querySelector('.mir-steps-navigation');
        if (!navigation) return;

        // Remove existing navigation
        navigation.remove();

        // Create new navigation
        const newNavigation = this.createNavigation();
        this.element.appendChild(newNavigation);

        // Initialize feather icons if available
        if (window.feather) {
            window.feather.replace();
        }
    }

    validateStep(stepIndex) {
        const step = this.options.steps[stepIndex];
        if (!step) return true;

        // Custom validation callback
        if (this.options.onValidate) {
            const result = this.options.onValidate(stepIndex, step, this);
            if (result === false) {
                this.setStepState(stepIndex, 'error');
                return false;
            }
        }

        // Step-specific validation
        if (step.validate && typeof step.validate === 'function') {
            const result = step.validate(this);
            if (result === false) {
                this.setStepState(stepIndex, 'error');
                return false;
            }
        }

        return true;
    }

    setStepState(stepIndex, state) {
        const step = this.options.steps[stepIndex];
        if (!step) return;

        step.state = state;

        const stepEl = this.element.querySelector(`[data-step="${stepIndex}"]`);
        if (stepEl) {
            // Remove existing state classes
            stepEl.classList.remove('mir-step-error', 'mir-step-warning', 'mir-step-completed');
            
            // Add new state class
            if (state && state !== 'pending' && state !== 'active') {
                stepEl.classList.add(`mir-step-${state}`);
            }
        }
    }

    isStepCompleted(stepIndex) {
        return stepIndex < this.options.currentStep || 
               this.options.steps[stepIndex]?.state === 'completed';
    }

    announceStepChange(stepIndex) {
        // Create live region for screen reader announcements
        let liveRegion = document.getElementById('mir-steps-live-region');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'mir-steps-live-region';
            liveRegion.className = 'mir-steps-sr-only';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            document.body.appendChild(liveRegion);
        }

        const step = this.options.steps[stepIndex];
        liveRegion.textContent = `${this.options.labels.step} ${this.formatNumber(stepIndex + 1)}: ${step.title || ''}`;
    }

    announceCompletion() {
        let liveRegion = document.getElementById('mir-steps-live-region');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'mir-steps-live-region';
            liveRegion.className = 'mir-steps-sr-only';
            liveRegion.setAttribute('aria-live', 'polite');
            document.body.appendChild(liveRegion);
        }

        liveRegion.textContent = `همه مراحل با موفقیت تکمیل شد`;
    }

    formatNumber(number) {
        if (!this.options.persianNumbers) {
            return number.toString();
        }

        // Convert English numbers to Persian
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return number.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
    }

    // Public API methods
    getCurrentStep() {
        return this.options.currentStep;
    }

    getTotalSteps() {
        return this.options.steps.length;
    }

    addStep(step, index = null) {
        if (index === null) {
            this.options.steps.push(step);
        } else {
            this.options.steps.splice(index, 0, step);
        }
        
        this.render();
        this.bindEvents();
        
        if (window.feather) {
            window.feather.replace();
        }
    }

    removeStep(index) {
        if (index < 0 || index >= this.options.steps.length) return;
        
        this.options.steps.splice(index, 1);
        
        // Adjust current step if necessary
        if (this.options.currentStep >= index) {
            this.options.currentStep = Math.max(0, this.options.currentStep - 1);
        }
        
        this.render();
        this.bindEvents();
        
        if (window.feather) {
            window.feather.replace();
        }
    }

    setLoading(loading) {
        if (loading) {
            this.element.classList.add('mir-steps-loading');
        } else {
            this.element.classList.remove('mir-steps-loading');
        }
    }

    reset() {
        this.options.currentStep = 0;
        
        // Reset all step states
        this.options.steps.forEach(step => {
            delete step.state;
        });
        
        this.render();
        this.bindEvents();
        
        if (window.feather) {
            window.feather.replace();
        }
    }

    destroy() {
        // Remove event listeners
        this.element.removeEventListener('click', this.boundClickHandler);
        this.element.removeEventListener('keydown', this.boundKeydownHandler);
        
        // Remove live region
        const liveRegion = document.getElementById('mir-steps-live-region');
        if (liveRegion) {
            liveRegion.remove();
        }
        
        // Clear element
        this.element.innerHTML = '';
        this.element.className = '';
    }
}

// Auto-initialize steps components
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all elements with mir-steps-auto class
    const stepsElements = document.querySelectorAll('.mir-steps-auto');
    
    stepsElements.forEach(element => {
        // Get options from data attributes
        const options = {};
        
        if (element.dataset.currentStep) {
            options.currentStep = parseInt(element.dataset.currentStep);
        }
        if (element.dataset.variant) {
            options.variant = element.dataset.variant;
        }
        if (element.dataset.size) {
            options.size = element.dataset.size;
        }
        if (element.dataset.direction) {
            options.direction = element.dataset.direction;
        }
        if (element.dataset.clickable) {
            options.clickable = element.dataset.clickable === 'true';
        }
        if (element.dataset.showProgress) {
            options.showProgress = element.dataset.showProgress === 'true';
        }
        if (element.dataset.showNavigation) {
            options.showNavigation = element.dataset.showNavigation === 'true';
        }
        if (element.dataset.allowSkip) {
            options.allowSkip = element.dataset.allowSkip === 'true';
        }
        
        // Get steps from data attribute or child elements
        if (element.dataset.steps) {
            try {
                options.steps = JSON.parse(element.dataset.steps);
            } catch (e) {
                console.error('Invalid steps data:', e);
            }
        }
        
        // Initialize component if steps are provided
        if (options.steps && options.steps.length > 0) {
            new MirageSteps(element, options);
        }
    });
});

// Make it globally available
window.MirageSteps = MirageSteps;