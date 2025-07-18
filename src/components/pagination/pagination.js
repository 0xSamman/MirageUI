/**
 * MirageUI - Pagination Component
 * Persian RTL Design System - Interactive Page Navigation
 * 
 * Features:
 * - RTL layout support
 * - Persian number conversion
 * - Multiple variants and sizes
 * - Keyboard navigation
 * - Accessibility support
 * - Responsive design
 * - Event callbacks
 */

class MiragePagination {
    constructor(element, options = {}) {
        this.element = typeof element === 'string' ? document.querySelector(element) : element;
        
        if (!this.element) {
            console.error('MiragePagination: Element not found');
            return;
        }

        // Default options
        this.options = {
            // Data options
            currentPage: 1,
            totalPages: 10,
            totalItems: 0,
            itemsPerPage: 10,
            maxVisible: 7, // Maximum visible page numbers
            
            // Display options
            variant: 'default', // default, simple, outlined, minimal
            size: 'md', // sm, md, lg
            alignment: 'center', // start, center, end, between
            
            // Features
            showInfo: true,
            showNavigation: true,
            showFirstLast: true,
            showPrevNext: true,
            showEllipsis: true,
            showPageSizeSelector: false,
            pageSizeOptions: [10, 20, 50, 100],
            
            // Persian/RTL
            persianNumbers: true,
            rtl: true,
            
            // Labels (Persian)
            labels: {
                previous: 'قبلی',
                next: 'بعدی',
                first: 'اولین',
                last: 'آخرین',
                page: 'صفحه',
                of: 'از',
                items: 'آیتم',
                showing: 'نمایش',
                to: 'تا',
                results: 'نتیجه',
                itemsPerPage: 'آیتم در صفحه',
                goToPage: 'برو به صفحه',
                currentPage: 'صفحه فعلی'
            },
            
            // Callbacks
            onPageChange: null,
            onPageSizeChange: null,
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
        
        if (this.options.onInit) {
            this.options.onInit(this);
        }
    }

    setupElement() {
        // Add base classes
        this.element.classList.add('mir-pagination');
        
        // Add variant class
        if (this.options.variant !== 'default') {
            this.element.classList.add(`mir-pagination-${this.options.variant}`);
        }
        
        // Add size class
        if (this.options.size !== 'md') {
            this.element.classList.add(`mir-pagination-${this.options.size}`);
        }
        
        // Add alignment class
        if (this.options.alignment !== 'center') {
            this.element.classList.add(`mir-pagination-${this.options.alignment}`);
        }
        
        // Add RTL direction
        if (this.options.rtl) {
            this.element.style.direction = 'rtl';
        }
    }

    render() {
        this.element.innerHTML = '';
        
        // Create pagination container
        const paginationNav = this.createPaginationNav();
        this.element.appendChild(paginationNav);
        
        // Add info section if enabled
        if (this.options.showInfo) {
            const infoSection = this.createInfoSection();
            this.element.appendChild(infoSection);
        }
    }

    createPaginationNav() {
        const nav = document.createElement('nav');
        nav.className = 'mir-pagination-nav';
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'صفحه‌بندی');

        const items = this.getPaginationItems();
        
        items.forEach(item => {
            nav.appendChild(this.createPaginationItem(item));
        });

        return nav;
    }

    getPaginationItems() {
        const items = [];
        const current = this.options.currentPage;
        const total = this.options.totalPages;
        const maxVisible = this.options.maxVisible;

        // First page button
        if (this.options.showFirstLast && current > 1) {
            items.push({
                type: 'first',
                page: 1,
                label: this.options.labels.first,
                icon: 'chevrons-right' // RTL: right means first
            });
        }

        // Previous button
        if (this.options.showPrevNext && current > 1) {
            items.push({
                type: 'prev',
                page: current - 1,
                label: this.options.labels.previous,
                icon: 'chevron-right' // RTL: right means previous
            });
        }

        // Page numbers
        const pageItems = this.getPageNumbers();
        items.push(...pageItems);

        // Next button
        if (this.options.showPrevNext && current < total) {
            items.push({
                type: 'next',
                page: current + 1,
                label: this.options.labels.next,
                icon: 'chevron-left' // RTL: left means next
            });
        }

        // Last page button
        if (this.options.showFirstLast && current < total) {
            items.push({
                type: 'last',
                page: total,
                label: this.options.labels.last,
                icon: 'chevrons-left' // RTL: left means last
            });
        }

        return items;
    }

    getPageNumbers() {
        const items = [];
        const current = this.options.currentPage;
        const total = this.options.totalPages;
        const maxVisible = this.options.maxVisible;

        if (total <= maxVisible) {
            // Show all pages
            for (let i = 1; i <= total; i++) {
                items.push({
                    type: 'page',
                    page: i,
                    label: this.formatNumber(i),
                    active: i === current
                });
            }
        } else {
            // Complex pagination with ellipsis
            const halfVisible = Math.floor(maxVisible / 2);
            let startPage, endPage;

            if (current <= halfVisible + 1) {
                // Near the beginning
                startPage = 1;
                endPage = maxVisible - 1;
            } else if (current >= total - halfVisible) {
                // Near the end
                startPage = total - maxVisible + 2;
                endPage = total;
            } else {
                // In the middle
                startPage = current - halfVisible;
                endPage = current + halfVisible;
            }

            // First page
            if (startPage > 1) {
                items.push({
                    type: 'page',
                    page: 1,
                    label: this.formatNumber(1),
                    active: 1 === current
                });

                if (startPage > 2 && this.options.showEllipsis) {
                    items.push({
                        type: 'ellipsis',
                        label: '...'
                    });
                }
            }

            // Middle pages
            for (let i = startPage; i <= endPage; i++) {
                items.push({
                    type: 'page',
                    page: i,
                    label: this.formatNumber(i),
                    active: i === current
                });
            }

            // Last page
            if (endPage < total) {
                if (endPage < total - 1 && this.options.showEllipsis) {
                    items.push({
                        type: 'ellipsis',
                        label: '...'
                    });
                }

                items.push({
                    type: 'page',
                    page: total,
                    label: this.formatNumber(total),
                    active: total === current
                });
            }
        }

        return items;
    }

    createPaginationItem(item) {
        if (item.type === 'ellipsis') {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'mir-pagination-ellipsis';
            ellipsis.textContent = item.label;
            ellipsis.setAttribute('aria-hidden', 'true');
            return ellipsis;
        }

        const element = document.createElement('button');
        element.className = 'mir-pagination-item';
        element.type = 'button';

        // Add type-specific classes
        if (item.type !== 'page') {
            element.classList.add(`mir-pagination-${item.type}`);
        }

        if (item.active) {
            element.classList.add('mir-pagination-active');
            element.setAttribute('aria-current', 'page');
        }

        // Add content
        if (item.icon && ['first', 'last', 'prev', 'next'].includes(item.type)) {
            const icon = document.createElement('i');
            icon.className = 'mir-pagination-icon';
            icon.setAttribute('data-feather', item.icon);
            element.appendChild(icon);

            // Add screen reader text
            const srText = document.createElement('span');
            srText.className = 'mir-pagination-sr-only';
            srText.textContent = item.label;
            element.appendChild(srText);
        } else {
            element.textContent = item.label;
        }

        // Add accessibility attributes
        element.setAttribute('aria-label', `${this.options.labels.goToPage} ${item.page}`);
        element.setAttribute('data-page', item.page);

        // Disable if current page
        if (item.active) {
            element.disabled = true;
        }

        return element;
    }

    createInfoSection() {
        const info = document.createElement('div');
        info.className = 'mir-pagination-info';

        // Items info
        const infoText = this.createInfoText();
        info.appendChild(infoText);

        // Page size selector
        if (this.options.showPageSizeSelector) {
            const sizeSelector = this.createPageSizeSelector();
            info.appendChild(sizeSelector);
        }

        return info;
    }

    createInfoText() {
        const text = document.createElement('div');
        text.className = 'mir-pagination-info-text';

        const start = (this.options.currentPage - 1) * this.options.itemsPerPage + 1;
        const end = Math.min(start + this.options.itemsPerPage - 1, this.options.totalItems);
        const total = this.options.totalItems;

        text.innerHTML = `
            ${this.options.labels.showing} 
            <strong>${this.formatNumber(start)}</strong> 
            ${this.options.labels.to} 
            <strong>${this.formatNumber(end)}</strong> 
            ${this.options.labels.of} 
            <strong>${this.formatNumber(total)}</strong> 
            ${this.options.labels.results}
        `;

        return text;
    }

    createPageSizeSelector() {
        const container = document.createElement('div');
        container.className = 'mir-pagination-info-select';

        const label = document.createElement('label');
        label.textContent = this.options.labels.itemsPerPage + ':';
        label.htmlFor = `mir-pagination-size-${this.getUniqueId()}`;

        const select = document.createElement('select');
        select.id = label.htmlFor;
        select.className = 'mir-pagination-size-select';

        this.options.pageSizeOptions.forEach(size => {
            const option = document.createElement('option');
            option.value = size;
            option.textContent = this.formatNumber(size);
            option.selected = size === this.options.itemsPerPage;
            select.appendChild(option);
        });

        container.appendChild(label);
        container.appendChild(select);

        return container;
    }

    bindEvents() {
        // Page navigation
        this.element.addEventListener('click', (e) => {
            if (e.target.classList.contains('mir-pagination-item') && !e.target.disabled) {
                const page = parseInt(e.target.dataset.page);
                if (page && page !== this.options.currentPage) {
                    this.goToPage(page);
                }
            }
        });

        // Page size change
        const sizeSelect = this.element.querySelector('.mir-pagination-size-select');
        if (sizeSelect) {
            sizeSelect.addEventListener('change', (e) => {
                const newSize = parseInt(e.target.value);
                this.changePageSize(newSize);
            });
        }

        // Keyboard navigation
        this.element.addEventListener('keydown', (e) => {
            this.handleKeydown(e);
        });
    }

    handleKeydown(e) {
        const current = this.options.currentPage;
        const total = this.options.totalPages;

        switch (e.key) {
            case 'ArrowLeft':
                if (this.options.rtl) {
                    // RTL: ArrowLeft = Next
                    if (current < total) {
                        e.preventDefault();
                        this.goToPage(current + 1);
                    }
                } else {
                    // LTR: ArrowLeft = Previous
                    if (current > 1) {
                        e.preventDefault();
                        this.goToPage(current - 1);
                    }
                }
                break;
            case 'ArrowRight':
                if (this.options.rtl) {
                    // RTL: ArrowRight = Previous
                    if (current > 1) {
                        e.preventDefault();
                        this.goToPage(current - 1);
                    }
                } else {
                    // LTR: ArrowRight = Next
                    if (current < total) {
                        e.preventDefault();
                        this.goToPage(current + 1);
                    }
                }
                break;
            case 'Home':
                e.preventDefault();
                this.goToPage(1);
                break;
            case 'End':
                e.preventDefault();
                this.goToPage(total);
                break;
        }
    }

    goToPage(page) {
        if (page < 1 || page > this.options.totalPages || page === this.options.currentPage) {
            return;
        }

        const oldPage = this.options.currentPage;
        this.options.currentPage = page;

        // Re-render pagination
        this.render();
        this.bindEvents();

        // Initialize feather icons if available
        if (window.feather) {
            window.feather.replace();
        }

        // Trigger callback
        if (this.options.onPageChange) {
            this.options.onPageChange(page, oldPage, this);
        }

        // Announce page change for screen readers
        this.announcePageChange(page);
    }

    changePageSize(newSize) {
        const oldSize = this.options.itemsPerPage;
        this.options.itemsPerPage = newSize;

        // Recalculate total pages
        this.options.totalPages = Math.ceil(this.options.totalItems / newSize);

        // Adjust current page if necessary
        if (this.options.currentPage > this.options.totalPages) {
            this.options.currentPage = this.options.totalPages;
        }

        // Re-render pagination
        this.render();
        this.bindEvents();

        // Initialize feather icons if available
        if (window.feather) {
            window.feather.replace();
        }

        // Trigger callback
        if (this.options.onPageSizeChange) {
            this.options.onPageSizeChange(newSize, oldSize, this);
        }
    }

    announcePageChange(page) {
        // Create live region for screen reader announcements
        let liveRegion = document.getElementById('mir-pagination-live-region');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'mir-pagination-live-region';
            liveRegion.className = 'mir-pagination-sr-only';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            document.body.appendChild(liveRegion);
        }

        liveRegion.textContent = `${this.options.labels.currentPage} ${this.formatNumber(page)} ${this.options.labels.of} ${this.formatNumber(this.options.totalPages)}`;
    }

    formatNumber(number) {
        if (!this.options.persianNumbers) {
            return number.toString();
        }

        // Convert English numbers to Persian
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return number.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
    }

    getUniqueId() {
        return Math.random().toString(36).substr(2, 9);
    }

    // Public API methods
    getCurrentPage() {
        return this.options.currentPage;
    }

    getTotalPages() {
        return this.options.totalPages;
    }

    setTotalItems(totalItems) {
        this.options.totalItems = totalItems;
        this.options.totalPages = Math.ceil(totalItems / this.options.itemsPerPage);
        
        // Adjust current page if necessary
        if (this.options.currentPage > this.options.totalPages) {
            this.options.currentPage = this.options.totalPages || 1;
        }
        
        this.render();
        this.bindEvents();
        
        if (window.feather) {
            window.feather.replace();
        }
    }

    setLoading(loading) {
        if (loading) {
            this.element.classList.add('mir-pagination-loading');
        } else {
            this.element.classList.remove('mir-pagination-loading');
        }
    }

    destroy() {
        // Remove event listeners and clean up
        this.element.removeEventListener('click', this.boundClickHandler);
        this.element.removeEventListener('keydown', this.boundKeydownHandler);
        
        // Remove live region
        const liveRegion = document.getElementById('mir-pagination-live-region');
        if (liveRegion) {
            liveRegion.remove();
        }
        
        // Clear element
        this.element.innerHTML = '';
        this.element.className = '';
    }
}

// Auto-initialize pagination components
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all elements with mir-pagination-auto class
    const paginationElements = document.querySelectorAll('.mir-pagination-auto');
    
    paginationElements.forEach(element => {
        // Get options from data attributes
        const options = {};
        
        if (element.dataset.currentPage) {
            options.currentPage = parseInt(element.dataset.currentPage);
        }
        if (element.dataset.totalPages) {
            options.totalPages = parseInt(element.dataset.totalPages);
        }
        if (element.dataset.totalItems) {
            options.totalItems = parseInt(element.dataset.totalItems);
        }
        if (element.dataset.itemsPerPage) {
            options.itemsPerPage = parseInt(element.dataset.itemsPerPage);
        }
        if (element.dataset.variant) {
            options.variant = element.dataset.variant;
        }
        if (element.dataset.size) {
            options.size = element.dataset.size;
        }
        if (element.dataset.alignment) {
            options.alignment = element.dataset.alignment;
        }
        if (element.dataset.showInfo) {
            options.showInfo = element.dataset.showInfo === 'true';
        }
        if (element.dataset.showPageSize) {
            options.showPageSizeSelector = element.dataset.showPageSize === 'true';
        }
        
        // Initialize component
        new MiragePagination(element, options);
    });
});

// Make it globally available
window.MiragePagination = MiragePagination;