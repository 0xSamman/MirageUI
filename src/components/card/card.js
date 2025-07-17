/*
 * MirageUI Card Component
 * Persian RTL Card System with Interactive Features
 * Version: 1.0.0
 */

class MirageCard {
    constructor(options = {}) {
        this.options = {
            type: 'default', // default, stat, user, product, image, icon
            size: 'md', // sm, md, lg
            variant: 'default', // default, elevated, outlined, filled
            status: null, // success, warning, error, info
            title: '',
            subtitle: '',
            content: '',
            image: null,
            icon: null,
            actions: [],
            footer: null,
            data: {}, // Additional data for specific card types
            onClick: null,
            onHover: null,
            animateOnLoad: true,
            ...options
        };

        this.element = null;
        this.id = 'mir-card-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }

    // Create card element
    createElement() {
        const card = document.createElement('div');
        card.className = this.getCardClasses();
        card.id = this.id;
        card.dir = 'rtl';

        // Add loading state initially
        if (this.options.showLoading !== false) {
            this.showLoading(card);
            
            // Simulate loading time and then show content
            setTimeout(() => {
                this.hideLoading(card);
                this.addContent(card);
            }, this.options.loadingDuration || 800);
        } else {
            this.addContent(card);
        }

        this.element = card;
        this.attachEventListeners();

        return card;
    }

    // Add content to card
    addContent(card) {
        // Add content based on card type
        switch (this.options.type) {
            case 'stat':
                card.innerHTML = this.createStatCard();
                break;
            case 'user':
                card.innerHTML = this.createUserCard();
                break;
            case 'product':
                card.innerHTML = this.createProductCard();
                break;
            case 'image':
                card.innerHTML = this.createImageCard();
                break;
            case 'icon':
                card.innerHTML = this.createIconCard();
                break;
            default:
                card.innerHTML = this.createDefaultCard();
        }
        
        // Re-initialize feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    // Show loading state
    showLoading(card) {
        card.classList.add('loading');
        card.innerHTML = this.createSkeletonCard();
    }

    // Hide loading state
    hideLoading(card) {
        card.classList.remove('loading');
    }

    // Create skeleton loading card
    createSkeletonCard() {
        return `
            <div class="mir-card-skeleton">
                <div class="mir-card-header">
                    <div>
                        <div class="mir-card-title"></div>
                        <div class="mir-card-subtitle"></div>
                    </div>
                </div>
                <div class="mir-card-body"></div>
            </div>
        `;
    }

    // Get card CSS classes
    getCardClasses() {
        const classes = ['mir-card'];
        
        // Size classes
        if (this.options.size !== 'md') {
            classes.push(`mir-card-${this.options.size}`);
        }
        
        // Variant classes
        if (this.options.variant !== 'default') {
            classes.push(`mir-card-${this.options.variant}`);
        }
        
        // Status classes
        if (this.options.status) {
            classes.push(`mir-card-${this.options.status}`);
        }
        
        // Type classes
        if (this.options.type !== 'default') {
            classes.push(`mir-card-${this.options.type}`);
        }

        return classes.join(' ');
    }

    // Create default card
    createDefaultCard() {
        let html = '';
        
        // Header
        if (this.options.title || this.options.subtitle || this.options.actions.length > 0) {
            html += '<div class="mir-card-header">';
            
            if (this.options.title || this.options.subtitle) {
                html += '<div>';
                if (this.options.title) {
                    html += `<h3 class="mir-card-title">${this.options.title}</h3>`;
                }
                if (this.options.subtitle) {
                    html += `<p class="mir-card-subtitle">${this.options.subtitle}</p>`;
                }
                html += '</div>';
            }
            
            if (this.options.actions.length > 0) {
                html += '<div class="mir-card-actions">';
                this.options.actions.forEach(action => {
                    html += `<button class="mir-btn mir-btn-ghost mir-btn-sm" data-action="${action.id || ''}">${action.text}</button>`;
                });
                html += '</div>';
            }
            
            html += '</div>';
        }
        
        // Body
        if (this.options.content) {
            html += `<div class="mir-card-body">${this.options.content}</div>`;
        }
        
        // Footer
        if (this.options.footer) {
            html += `<div class="mir-card-footer">${this.options.footer}</div>`;
        }
        
        return html;
    }

    // Create stat card
    createStatCard() {
        const data = this.options.data;
        let html = '';
        
        if (this.options.icon) {
            html += `<div class="mir-card-icon-container">`;
            html += `<i data-feather="${this.options.icon}"></i>`;
            html += '</div>';
        }
        
        html += `<div class="mir-card-stat-value">${data.value || '0'}</div>`;
        html += `<div class="mir-card-stat-label">${this.options.title || 'آمار'}</div>`;
        
        if (data.change) {
            const changeClass = data.change > 0 ? 'positive' : data.change < 0 ? 'negative' : 'neutral';
            const changeIcon = data.change > 0 ? 'trending-up' : data.change < 0 ? 'trending-down' : 'minus';
            html += `<div class="mir-card-stat-change ${changeClass}">`;
            html += `<i data-feather="${changeIcon}"></i>`;
            html += `${data.change > 0 ? '+' : ''}${data.change}٪`;
            html += '</div>';
        }
        
        return html;
    }

    // Create user card
    createUserCard() {
        const data = this.options.data;
        let html = '';
        
        if (data.avatar) {
            html += `<img src="${data.avatar}" alt="${data.name || 'User'}" class="mir-card-user-avatar">`;
        }
        
        html += '<div class="mir-card-user-info">';
        html += `<div class="mir-card-user-name">${data.name || 'نام کاربر'}</div>`;
        html += `<div class="mir-card-user-role">${data.role || 'نقش'}</div>`;
        
        if (data.stats) {
            html += '<div class="mir-card-user-stats">';
            data.stats.forEach(stat => {
                html += '<div class="mir-card-user-stat">';
                html += `<div class="mir-card-user-stat-value">${stat.value}</div>`;
                html += `<div class="mir-card-user-stat-label">${stat.label}</div>`;
                html += '</div>';
            });
            html += '</div>';
        }
        
        html += '</div>';
        
        return html;
    }

    // Create product card
    createProductCard() {
        const data = this.options.data;
        let html = '';
        
        if (data.image) {
            html += `<img src="${data.image}" alt="${data.title || 'Product'}" class="mir-card-product-image">`;
        }
        
        if (data.badge) {
            html += `<div class="mir-card-product-badge">${data.badge}</div>`;
        }
        
        if (this.options.title) {
            html += `<h3 class="mir-card-title">${this.options.title}</h3>`;
        }
        
        if (data.price) {
            html += `<div class="mir-card-product-price">${data.price} تومان</div>`;
        }
        
        if (this.options.content) {
            html += `<div class="mir-card-product-description">${this.options.content}</div>`;
        }
        
        if (this.options.actions.length > 0) {
            html += '<div class="mir-card-actions">';
            this.options.actions.forEach(action => {
                html += `<button class="mir-btn mir-btn-primary mir-btn-sm" data-action="${action.id || ''}">${action.text}</button>`;
            });
            html += '</div>';
        }
        
        return html;
    }

    // Create image card
    createImageCard() {
        let html = '';
        
        html += '<div class="mir-card-image-container">';
        if (this.options.image) {
            html += `<img src="${this.options.image}" alt="${this.options.title || 'Image'}">`;
        }
        html += '</div>';
        
        html += '<div class="mir-card-content">';
        html += this.createDefaultCard();
        html += '</div>';
        
        return html;
    }

    // Create icon card
    createIconCard() {
        let html = '';
        
        if (this.options.icon) {
            html += `<div class="mir-card-icon-container">`;
            html += `<i data-feather="${this.options.icon}"></i>`;
            html += '</div>';
        }
        
        html += this.createDefaultCard();
        
        return html;
    }

    // Attach event listeners
    attachEventListeners() {
        if (!this.element) return;

        // Click handler
        if (this.options.onClick) {
            this.element.addEventListener('click', (e) => {
                if (!e.target.closest('.mir-card-actions')) {
                    this.options.onClick(e, this);
                }
            });
        }

        // Hover handler
        if (this.options.onHover) {
            this.element.addEventListener('mouseenter', (e) => {
                this.options.onHover(e, this, 'enter');
            });
            this.element.addEventListener('mouseleave', (e) => {
                this.options.onHover(e, this, 'leave');
            });
        }

        // Action button handlers
        const actionButtons = this.element.querySelectorAll('[data-action]');
        actionButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const actionId = button.dataset.action;
                const action = this.options.actions.find(a => a.id === actionId);
                if (action && action.onClick) {
                    action.onClick(e, this);
                }
            });
        });
    }

    // Animate card in
    animateIn() {
        if (!this.element) return;

        this.element.style.opacity = '0';
        this.element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            this.element.style.transition = 'all 0.3s ease';
            this.element.style.opacity = '1';
            this.element.style.transform = 'translateY(0)';
        }, 50);
    }

    // Update card content
    update(newOptions = {}) {
        this.options = { ...this.options, ...newOptions };
        
        if (this.element) {
            this.element.className = this.getCardClasses();
            
            // Update content based on type
            switch (this.options.type) {
                case 'stat':
                    this.element.innerHTML = this.createStatCard();
                    break;
                case 'user':
                    this.element.innerHTML = this.createUserCard();
                    break;
                case 'product':
                    this.element.innerHTML = this.createProductCard();
                    break;
                case 'image':
                    this.element.innerHTML = this.createImageCard();
                    break;
                case 'icon':
                    this.element.innerHTML = this.createIconCard();
                    break;
                default:
                    this.element.innerHTML = this.createDefaultCard();
            }
            
            this.attachEventListeners();
            
            // Re-initialize feather icons
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        }
    }

    // Remove card
    remove() {
        if (this.element && this.element.parentNode) {
            this.element.style.transition = 'all 0.3s ease';
            this.element.style.opacity = '0';
            this.element.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                this.element.parentNode.removeChild(this.element);
            }, 300);
        }
    }

    // Get card element
    getElement() {
        return this.element || this.createElement();
    }

    // Manual loading control
    startLoading() {
        if (this.element) {
            this.showLoading(this.element);
        }
    }

    stopLoading() {
        if (this.element) {
            this.hideLoading(this.element);
            this.addContent(this.element);
            this.attachEventListeners();
        }
    }

    // Static method to create and append card
    static create(options = {}) {
        const card = new MirageCard(options);
        return card.createElement();
    }

    // Static method to create stat card
    static createStatCard(title, value, change, icon, status, options = {}) {
        return MirageCard.create({
            type: 'stat',
            title: title,
            icon: icon,
            status: status,
            data: { value, change },
            ...options
        });
    }

    // Static method to create user card
    static createUserCard(name, role, avatar, stats, options = {}) {
        return MirageCard.create({
            type: 'user',
            data: { name, role, avatar, stats },
            ...options
        });
    }

    // Static method to create product card
    static createProductCard(title, price, description, image, badge, actions, options = {}) {
        return MirageCard.create({
            type: 'product',
            title: title,
            content: description,
            actions: actions || [],
            data: { price, image, badge },
            ...options
        });
    }
}

// Initialize cards on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize feather icons for any existing cards
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});

// Convert Persian numbers in card content
if (typeof convertToPersianNumbers !== 'undefined') {
    // This function should be available from the main mirage-script.js
    document.addEventListener('DOMContentLoaded', function() {
        const cards = document.querySelectorAll('.mir-card');
        cards.forEach(card => {
            convertToPersianNumbers(card);
        });
    });
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MirageCard;
} else {
    window.MirageCard = MirageCard;
}