/**
 * MirageUI - Timeline Component
 * Persian RTL Design System - Activity Feed and History
 * 
 * Features:
 * - RTL layout and Persian date formatting
 * - Multiple timeline types (user, system, events)
 * - Various display formats (vertical, horizontal, compact)
 * - Real-time updates and animations
 * - Accessibility support
 * - Event callbacks
 */

class MirageTimeline {
    constructor(element, options = {}) {
        this.element = typeof element === 'string' ? document.querySelector(element) : element;
        
        if (!this.element) {
            console.error('MirageTimeline: Element not found');
            return;
        }

        // Default options
        this.options = {
            // Structure
            items: [],
            
            // Appearance
            variant: 'vertical', // vertical, horizontal, compact
            size: 'md', // sm, md, lg
            style: 'default', // default, simple, card, minimal
            
            // Features
            animated: true,
            showTime: true,
            showMeta: true,
            showActions: true,
            realTime: false,
            
            // Persian/RTL
            persianNumbers: true,
            persianDates: true,
            rtl: true,
            
            // Labels (Persian)
            labels: {
                loadMore: 'بارگیری بیشتر',
                loading: 'در حال بارگیری...',
                empty: 'هیچ فعالیتی موجود نیست',
                emptyDescription: 'هنوز هیچ فعالیتی ثبت نشده است',
                justNow: 'همین الان',
                minutesAgo: 'دقیقه پیش',
                hoursAgo: 'ساعت پیش',
                daysAgo: 'روز پیش',
                weeksAgo: 'هفته پیش',
                monthsAgo: 'ماه پیش',
                yearsAgo: 'سال پیش',
                ago: 'پیش',
                at: 'در',
                by: 'توسط',
                more: 'بیشتر',
                less: 'کمتر',
                reply: 'پاسخ',
                like: 'پسند',
                share: 'اشتراک'
            },
            
            // Callbacks
            onItemClick: null,
            onActionClick: null,
            onLoadMore: null,
            onItemAdd: null,
            onItemUpdate: null,
            onInit: null
        };

        // Merge options
        this.options = { ...this.options, ...options };
        
        // Initialize
        this.init();
    }

    init() {
        this.setupElement();
        this.render();
        this.bindEvents();
        
        if (this.options.realTime) {
            this.startRealTimeUpdates();
        }
        
        if (this.options.onInit) {
            this.options.onInit(this);
        }
    }

    setupElement() {
        // Add base classes
        this.element.classList.add('mir-timeline');
        
        // Add variant class
        if (this.options.variant !== 'vertical') {
            this.element.classList.add(`mir-timeline-${this.options.variant}`);
        }
        
        // Add size class
        if (this.options.size !== 'md') {
            this.element.classList.add(`mir-timeline-${this.options.size}`);
        }
        
        // Add style class
        if (this.options.style !== 'default') {
            this.element.classList.add(`mir-timeline-${this.options.style}`);
        }
        
        // Add RTL direction
        if (this.options.rtl) {
            this.element.style.direction = 'rtl';
        }
        
        // Add ARIA role
        this.element.setAttribute('role', 'list');
        this.element.setAttribute('aria-label', 'فهرست فعالیت‌ها');
    }

    render() {
        this.element.innerHTML = '';
        
        if (this.options.items.length === 0) {
            this.renderEmpty();
            return;
        }
        
        this.options.items.forEach((item, index) => {
            const itemElement = this.createTimelineItem(item, index);
            this.element.appendChild(itemElement);
            
            // Add animation if enabled
            if (this.options.animated) {
                setTimeout(() => {
                    itemElement.classList.add('mir-timeline-fade-in');
                }, index * 100);
            }
        });
    }

    createTimelineItem(item, index) {
        const itemEl = document.createElement('div');
        itemEl.className = 'mir-timeline-item';
        itemEl.setAttribute('role', 'listitem');
        itemEl.setAttribute('data-index', index);
        
        // Add type class
        if (item.type) {
            itemEl.classList.add(`mir-timeline-${item.type}`);
        }
        
        // Create indicator
        const indicator = this.createIndicator(item);
        itemEl.appendChild(indicator);
        
        // Create content
        const content = this.createContent(item);
        itemEl.appendChild(content);
        
        return itemEl;
    }

    createIndicator(item) {
        const indicator = document.createElement('div');
        indicator.className = 'mir-timeline-indicator';
        
        if (item.avatar) {
            const avatar = document.createElement('img');
            avatar.className = 'mir-timeline-avatar';
            avatar.src = item.avatar;
            avatar.alt = item.user || 'کاربر';
            indicator.appendChild(avatar);
        } else if (item.icon) {
            const icon = document.createElement('i');
            icon.className = 'mir-timeline-icon';
            icon.setAttribute('data-feather', item.icon);
            indicator.appendChild(icon);
        } else {
            const number = document.createElement('span');
            number.textContent = this.formatNumber(item.number || '•');
            indicator.appendChild(number);
        }
        
        return indicator;
    }

    createContent(item) {
        const content = document.createElement('div');
        content.className = 'mir-timeline-content';
        
        // Header
        const header = this.createHeader(item);
        content.appendChild(header);
        
        // Description
        if (item.description) {
            const description = document.createElement('p');
            description.className = 'mir-timeline-description';
            description.textContent = item.description;
            content.appendChild(description);
        }
        
        // Attachment
        if (item.attachment) {
            const attachment = this.createAttachment(item.attachment);
            content.appendChild(attachment);
        }
        
        // Meta information
        if (this.options.showMeta && (item.meta || item.tags)) {
            const meta = this.createMeta(item);
            content.appendChild(meta);
        }
        
        // Actions
        if (this.options.showActions && item.actions) {
            const actions = this.createActions(item.actions, item);
            content.appendChild(actions);
        }
        
        return content;
    }

    createHeader(item) {
        const header = document.createElement('div');
        header.className = 'mir-timeline-header';
        
        const titleContainer = document.createElement('div');
        
        // Title
        if (item.title) {
            const title = document.createElement('h4');
            title.className = 'mir-timeline-title';
            title.textContent = item.title;
            titleContainer.appendChild(title);
        }
        
        // Subtitle
        if (item.subtitle || item.user) {
            const subtitle = document.createElement('p');
            subtitle.className = 'mir-timeline-subtitle';
            subtitle.textContent = item.subtitle || `${this.options.labels.by} ${item.user}`;
            titleContainer.appendChild(subtitle);
        }
        
        header.appendChild(titleContainer);
        
        // Time
        if (this.options.showTime && item.time) {
            const time = document.createElement('div');
            time.className = 'mir-timeline-time';
            time.textContent = this.formatTime(item.time);
            time.setAttribute('title', this.formatFullDate(item.time));
            header.appendChild(time);
        }
        
        return header;
    }

    createAttachment(attachment) {
        const attachmentEl = document.createElement('div');
        attachmentEl.className = 'mir-timeline-attachment';
        
        const attachmentHeader = document.createElement('div');
        attachmentHeader.className = 'mir-timeline-attachment-header';
        
        if (attachment.icon) {
            const icon = document.createElement('i');
            icon.className = 'mir-timeline-attachment-icon';
            icon.setAttribute('data-feather', attachment.icon);
            attachmentHeader.appendChild(icon);
        }
        
        const name = document.createElement('span');
        name.className = 'mir-timeline-attachment-name';
        name.textContent = attachment.name;
        attachmentHeader.appendChild(name);
        
        if (attachment.size) {
            const size = document.createElement('span');
            size.className = 'mir-timeline-attachment-size';
            size.textContent = attachment.size;
            attachmentHeader.appendChild(size);
        }
        
        attachmentEl.appendChild(attachmentHeader);
        
        if (attachment.content) {
            const content = document.createElement('div');
            content.innerHTML = attachment.content;
            attachmentEl.appendChild(content);
        }
        
        return attachmentEl;
    }

    createMeta(item) {
        const meta = document.createElement('div');
        meta.className = 'mir-timeline-meta';
        
        if (item.meta) {
            item.meta.forEach(metaItem => {
                const span = document.createElement('span');
                span.textContent = metaItem;
                meta.appendChild(span);
            });
        }
        
        if (item.tags) {
            item.tags.forEach(tag => {
                const badge = document.createElement('span');
                badge.className = `mir-timeline-badge mir-timeline-badge-${tag.type || 'info'}`;
                badge.textContent = tag.text || tag;
                meta.appendChild(badge);
            });
        }
        
        return meta;
    }

    createActions(actions, item) {
        const actionsEl = document.createElement('div');
        actionsEl.className = 'mir-timeline-actions';
        
        actions.forEach(action => {
            const actionBtn = document.createElement('button');
            actionBtn.className = 'mir-timeline-action';
            actionBtn.textContent = action.text;
            actionBtn.setAttribute('data-action', action.type);
            actionBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleActionClick(action, item, e);
            });
            actionsEl.appendChild(actionBtn);
        });
        
        return actionsEl;
    }

    renderEmpty() {
        const empty = document.createElement('div');
        empty.className = 'mir-timeline-empty';
        
        if (this.options.emptyIcon) {
            const icon = document.createElement('i');
            icon.className = 'mir-timeline-empty-icon';
            icon.setAttribute('data-feather', this.options.emptyIcon);
            empty.appendChild(icon);
        }
        
        const title = document.createElement('h3');
        title.className = 'mir-timeline-empty-title';
        title.textContent = this.options.labels.empty;
        empty.appendChild(title);
        
        const description = document.createElement('p');
        description.className = 'mir-timeline-empty-description';
        description.textContent = this.options.labels.emptyDescription;
        empty.appendChild(description);
        
        this.element.appendChild(empty);
    }

    bindEvents() {
        // Item clicks
        this.element.addEventListener('click', (e) => {
            const item = e.target.closest('.mir-timeline-item');
            if (item && !e.target.closest('.mir-timeline-action')) {
                const index = parseInt(item.dataset.index);
                this.handleItemClick(this.options.items[index], index, e);
            }
        });
    }

    handleItemClick(item, index, event) {
        if (this.options.onItemClick) {
            this.options.onItemClick(item, index, event, this);
        }
    }

    handleActionClick(action, item, event) {
        if (this.options.onActionClick) {
            this.options.onActionClick(action, item, event, this);
        }
    }

    formatTime(time) {
        if (!time) return '';
        
        const date = new Date(time);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        const diffWeeks = Math.floor(diffDays / 7);
        const diffMonths = Math.floor(diffDays / 30);
        const diffYears = Math.floor(diffDays / 365);
        
        if (diffMins < 1) {
            return this.options.labels.justNow;
        } else if (diffMins < 60) {
            return `${this.formatNumber(diffMins)} ${this.options.labels.minutesAgo}`;
        } else if (diffHours < 24) {
            return `${this.formatNumber(diffHours)} ${this.options.labels.hoursAgo}`;
        } else if (diffDays < 7) {
            return `${this.formatNumber(diffDays)} ${this.options.labels.daysAgo}`;
        } else if (diffWeeks < 4) {
            return `${this.formatNumber(diffWeeks)} ${this.options.labels.weeksAgo}`;
        } else if (diffMonths < 12) {
            return `${this.formatNumber(diffMonths)} ${this.options.labels.monthsAgo}`;
        } else {
            return `${this.formatNumber(diffYears)} ${this.options.labels.yearsAgo}`;
        }
    }

    formatFullDate(time) {
        if (!time) return '';
        
        const date = new Date(time);
        
        if (this.options.persianDates) {
            // Simple Persian date formatting
            const year = this.formatNumber(date.getFullYear());
            const month = this.formatNumber(String(date.getMonth() + 1).padStart(2, '0'));
            const day = this.formatNumber(String(date.getDate()).padStart(2, '0'));
            const hours = this.formatNumber(String(date.getHours()).padStart(2, '0'));
            const minutes = this.formatNumber(String(date.getMinutes()).padStart(2, '0'));
            
            return `${year}/${month}/${day} ${this.options.labels.at} ${hours}:${minutes}`;
        }
        
        return date.toLocaleString('fa-IR');
    }

    formatNumber(number) {
        if (!this.options.persianNumbers) {
            return number.toString();
        }
        
        // Convert English numbers to Persian
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return number.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
    }

    startRealTimeUpdates() {
        this.realTimeInterval = setInterval(() => {
            this.updateTimeStamps();
        }, 60000); // Update every minute
    }

    stopRealTimeUpdates() {
        if (this.realTimeInterval) {
            clearInterval(this.realTimeInterval);
        }
    }

    updateTimeStamps() {
        const timeElements = this.element.querySelectorAll('.mir-timeline-time');
        timeElements.forEach((timeEl, index) => {
            const item = this.options.items[index];
            if (item && item.time) {
                timeEl.textContent = this.formatTime(item.time);
            }
        });
    }

    // Public API methods
    addItem(item, prepend = true) {
        if (prepend) {
            this.options.items.unshift(item);
        } else {
            this.options.items.push(item);
        }
        
        this.render();
        
        if (this.options.onItemAdd) {
            this.options.onItemAdd(item, this);
        }
        
        // Refresh feather icons
        if (window.feather) {
            window.feather.replace();
        }
    }

    removeItem(index) {
        if (index >= 0 && index < this.options.items.length) {
            this.options.items.splice(index, 1);
            this.render();
            
            if (window.feather) {
                window.feather.replace();
            }
        }
    }

    updateItem(index, newItem) {
        if (index >= 0 && index < this.options.items.length) {
            this.options.items[index] = { ...this.options.items[index], ...newItem };
            this.render();
            
            if (this.options.onItemUpdate) {
                this.options.onItemUpdate(this.options.items[index], index, this);
            }
            
            if (window.feather) {
                window.feather.replace();
            }
        }
    }

    clearItems() {
        this.options.items = [];
        this.render();
    }

    getItems() {
        return this.options.items;
    }

    setLoading(loading) {
        if (loading) {
            this.element.classList.add('mir-timeline-loading');
        } else {
            this.element.classList.remove('mir-timeline-loading');
        }
    }

    refresh() {
        this.render();
        
        if (window.feather) {
            window.feather.replace();
        }
    }

    destroy() {
        this.stopRealTimeUpdates();
        this.element.innerHTML = '';
        this.element.className = '';
    }
}

// Auto-initialize timeline components
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all elements with mir-timeline-auto class
    const timelineElements = document.querySelectorAll('.mir-timeline-auto');
    
    timelineElements.forEach(element => {
        // Get options from data attributes
        const options = {};
        
        if (element.dataset.variant) {
            options.variant = element.dataset.variant;
        }
        if (element.dataset.size) {
            options.size = element.dataset.size;
        }
        if (element.dataset.style) {
            options.style = element.dataset.style;
        }
        if (element.dataset.animated) {
            options.animated = element.dataset.animated === 'true';
        }
        if (element.dataset.realTime) {
            options.realTime = element.dataset.realTime === 'true';
        }
        if (element.dataset.showTime) {
            options.showTime = element.dataset.showTime === 'true';
        }
        if (element.dataset.showMeta) {
            options.showMeta = element.dataset.showMeta === 'true';
        }
        if (element.dataset.showActions) {
            options.showActions = element.dataset.showActions === 'true';
        }
        
        // Get items from data attribute
        if (element.dataset.items) {
            try {
                options.items = JSON.parse(element.dataset.items);
            } catch (e) {
                console.error('Invalid timeline items data:', e);
            }
        }
        
        // Initialize component if items are provided
        if (options.items && options.items.length > 0) {
            new MirageTimeline(element, options);
        } else {
            // Initialize empty timeline
            new MirageTimeline(element, options);
        }
    });
});

// Make it globally available
window.MirageTimeline = MirageTimeline;