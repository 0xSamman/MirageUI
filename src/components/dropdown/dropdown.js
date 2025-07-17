/**
 * MirageUI Dropdown Component
 * Persian RTL Dropdown Menu with Glass Morphism
 * Version: 1.0.0
 */

class MirageDropdown {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            // Default options
            position: 'bottom-right',
            trigger: 'click',
            closeOnClick: true,
            closeOnEscape: true,
            closeOnOutsideClick: true,
            animation: 'default',
            offset: 4,
            autoPosition: true,
            keyboard: true,
            searchable: false,
            maxHeight: 300,
            ...options
        };

        this.isOpen = false;
        this.activeIndex = -1;
        this.items = [];
        this.searchTerm = '';
        this.focusedItem = null;

        this.init();
    }

    init() {
        this.setupElements();
        this.setupEvents();
        this.setupKeyboard();
        this.setupSearch();
        this.setupResponsive();
        this.collectItems();
        
        // Add to global registry
        MirageDropdown.instances.push(this);
    }

    setupElements() {
        this.toggle = this.element.querySelector('.mir-dropdown-toggle');
        this.menu = this.element.querySelector('.mir-dropdown-menu');
        this.toggleIcon = this.toggle.querySelector('.mir-dropdown-toggle-icon');
        
        if (!this.toggle || !this.menu) {
            console.error('Dropdown requires toggle and menu elements');
            return;
        }

        // Set ARIA attributes
        this.toggle.setAttribute('aria-haspopup', 'true');
        this.toggle.setAttribute('aria-expanded', 'false');
        this.menu.setAttribute('role', 'menu');
        this.menu.setAttribute('aria-labelledby', this.toggle.id || 'dropdown-toggle');

        // Set initial state
        this.close();
    }

    setupEvents() {
        // Toggle click event
        this.toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleDropdown();
        });

        // Item click events
        this.menu.addEventListener('click', (e) => {
            const item = e.target.closest('.mir-dropdown-item');
            if (!item || item.classList.contains('disabled')) return;

            const index = Array.from(this.menu.querySelectorAll('.mir-dropdown-item')).indexOf(item);
            this.selectItem(index, e);

            if (this.options.closeOnClick) {
                this.close();
            }
        });

        // Outside click
        if (this.options.closeOnOutsideClick) {
            document.addEventListener('click', (e) => {
                if (!this.element.contains(e.target) && this.isOpen) {
                    this.close();
                }
            });
        }

        // Escape key
        if (this.options.closeOnEscape) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                    this.toggle.focus();
                }
            });
        }

        // Hover events for desktop
        if (this.options.trigger === 'hover') {
            this.element.addEventListener('mouseenter', () => {
                this.open();
            });

            this.element.addEventListener('mouseleave', () => {
                this.close();
            });
        }

        // Window resize
        window.addEventListener('resize', () => {
            if (this.isOpen) {
                this.updatePosition();
            }
        });
    }

    setupKeyboard() {
        if (!this.options.keyboard) return;

        this.toggle.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    this.open();
                    this.focusFirstItem();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.open();
                    this.focusLastItem();
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    this.toggleDropdown();
                    break;
            }
        });

        this.menu.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    this.focusNextItem();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.focusPrevItem();
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    if (this.focusedItem) {
                        this.focusedItem.click();
                    }
                    break;
                case 'Home':
                    e.preventDefault();
                    this.focusFirstItem();
                    break;
                case 'End':
                    e.preventDefault();
                    this.focusLastItem();
                    break;
            }
        });
    }

    setupSearch() {
        if (!this.options.searchable) return;

        const searchInput = this.menu.querySelector('.mir-dropdown-search-input');
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            this.searchTerm = e.target.value;
            this.filterItems();
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.focusFirstVisibleItem();
            }
        });
    }

    setupResponsive() {
        // Mobile overlay for full-screen dropdown
        if (window.innerWidth <= 768) {
            this.overlay = document.createElement('div');
            this.overlay.className = 'mir-dropdown-overlay';
            this.element.appendChild(this.overlay);

            this.overlay.addEventListener('click', () => {
                this.close();
            });
        }
    }

    collectItems() {
        this.items = Array.from(this.menu.querySelectorAll('.mir-dropdown-item'));
        this.items.forEach((item, index) => {
            item.setAttribute('role', 'menuitem');
            item.setAttribute('tabindex', '-1');
            item.dataset.index = index;
        });
    }

    toggleDropdown() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        if (this.isOpen) return;

        // Close other dropdowns
        MirageDropdown.closeAll(this);

        this.isOpen = true;
        this.element.classList.add('open');
        this.toggle.setAttribute('aria-expanded', 'true');
        
        // Update position
        this.updatePosition();

        // Focus management
        if (this.options.keyboard) {
            this.menu.focus();
        }

        // Trigger event
        this.triggerEvent('open');

        // Add escape listener
        this.escapeListener = (e) => {
            if (e.key === 'Escape') {
                this.close();
                this.toggle.focus();
            }
        };
        document.addEventListener('keydown', this.escapeListener);
    }

    close() {
        if (!this.isOpen) return;

        this.isOpen = false;
        this.element.classList.remove('open');
        this.toggle.setAttribute('aria-expanded', 'false');
        this.activeIndex = -1;
        this.focusedItem = null;

        // Clear search
        const searchInput = this.menu.querySelector('.mir-dropdown-search-input');
        if (searchInput) {
            searchInput.value = '';
            this.searchTerm = '';
            this.filterItems();
        }

        // Remove escape listener
        if (this.escapeListener) {
            document.removeEventListener('keydown', this.escapeListener);
            this.escapeListener = null;
        }

        // Trigger event
        this.triggerEvent('close');
    }

    updatePosition() {
        if (!this.isOpen) return;

        const rect = this.toggle.getBoundingClientRect();
        const menuRect = this.menu.getBoundingClientRect();
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        let position = this.options.position;

        // Auto-position if enabled
        if (this.options.autoPosition) {
            const spaceBelow = viewport.height - rect.bottom;
            const spaceAbove = rect.top;
            const spaceRight = viewport.width - rect.left;
            const spaceLeft = rect.right;

            // Vertical positioning
            if (spaceBelow < menuRect.height && spaceAbove > spaceBelow) {
                position = position.replace('bottom', 'top');
            }

            // Horizontal positioning (RTL)
            if (spaceRight < menuRect.width && spaceLeft > spaceRight) {
                position = position.replace('right', 'left');
            }
        }

        // Apply position classes
        this.menu.className = this.menu.className.replace(/\b(top|bottom|left|right|center)\b/g, '');
        
        if (position.includes('top')) {
            this.menu.classList.add('top');
        }
        if (position.includes('left')) {
            this.menu.classList.add('left');
        }
        if (position.includes('center')) {
            this.menu.classList.add('center');
        }
    }

    focusFirstItem() {
        const firstItem = this.getFirstVisibleItem();
        this.focusItem(firstItem);
    }

    focusLastItem() {
        const lastItem = this.getLastVisibleItem();
        this.focusItem(lastItem);
    }

    focusNextItem() {
        const visibleItems = this.getVisibleItems();
        const currentIndex = visibleItems.indexOf(this.focusedItem);
        const nextIndex = (currentIndex + 1) % visibleItems.length;
        this.focusItem(visibleItems[nextIndex]);
    }

    focusPrevItem() {
        const visibleItems = this.getVisibleItems();
        const currentIndex = visibleItems.indexOf(this.focusedItem);
        const prevIndex = currentIndex <= 0 ? visibleItems.length - 1 : currentIndex - 1;
        this.focusItem(visibleItems[prevIndex]);
    }

    focusFirstVisibleItem() {
        const firstVisible = this.getFirstVisibleItem();
        this.focusItem(firstVisible);
    }

    focusItem(item) {
        if (!item) return;

        // Remove previous focus
        if (this.focusedItem) {
            this.focusedItem.classList.remove('focused');
        }

        // Set new focus
        this.focusedItem = item;
        item.classList.add('focused');
        item.focus();

        // Scroll into view
        item.scrollIntoView({ block: 'nearest' });
    }

    getVisibleItems() {
        return this.items.filter(item => 
            item.style.display !== 'none' && 
            !item.classList.contains('disabled')
        );
    }

    getFirstVisibleItem() {
        return this.getVisibleItems()[0];
    }

    getLastVisibleItem() {
        const visible = this.getVisibleItems();
        return visible[visible.length - 1];
    }

    selectItem(index, event) {
        const item = this.items[index];
        if (!item || item.classList.contains('disabled')) return;

        this.activeIndex = index;
        
        // Update active state
        this.items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Update toggle text if needed
        const text = item.textContent.trim();
        const toggleText = this.toggle.querySelector('span');
        if (toggleText && !this.options.multiSelect) {
            toggleText.textContent = text;
        }

        // Trigger event
        this.triggerEvent('select', {
            item: item,
            index: index,
            text: text,
            value: item.dataset.value || text,
            event: event
        });
    }

    filterItems() {
        if (!this.searchTerm) {
            this.items.forEach(item => {
                item.style.display = '';
            });
            return;
        }

        const term = this.searchTerm.toLowerCase();
        let hasVisibleItems = false;

        this.items.forEach(item => {
            const text = item.textContent.toLowerCase();
            const matches = text.includes(term);
            
            item.style.display = matches ? '' : 'none';
            if (matches) hasVisibleItems = true;
        });

        // Show/hide empty state
        this.toggleEmptyState(!hasVisibleItems);
    }

    toggleEmptyState(show) {
        let emptyState = this.menu.querySelector('.mir-dropdown-empty');
        
        if (show && !emptyState) {
            emptyState = document.createElement('div');
            emptyState.className = 'mir-dropdown-empty';
            emptyState.textContent = 'موردی یافت نشد';
            this.menu.appendChild(emptyState);
        } else if (!show && emptyState) {
            emptyState.remove();
        }
    }

    addItem(itemData) {
        const item = document.createElement('button');
        item.className = 'mir-dropdown-item';
        item.setAttribute('role', 'menuitem');
        item.setAttribute('tabindex', '-1');
        
        if (itemData.icon) {
            const icon = document.createElement('i');
            icon.className = 'mir-dropdown-item-icon';
            icon.setAttribute('data-feather', itemData.icon);
            item.appendChild(icon);
        }

        const text = document.createElement('span');
        text.textContent = itemData.text;
        item.appendChild(text);

        if (itemData.badge) {
            const badge = document.createElement('span');
            badge.className = 'mir-dropdown-item-badge';
            badge.textContent = itemData.badge;
            item.appendChild(badge);
        }

        if (itemData.disabled) {
            item.classList.add('disabled');
        }

        if (itemData.value) {
            item.dataset.value = itemData.value;
        }

        this.menu.appendChild(item);
        this.collectItems();

        // Re-initialize feather icons if available
        if (typeof feather !== 'undefined') {
            feather.replace();
        }

        return item;
    }

    removeItem(index) {
        if (this.items[index]) {
            this.items[index].remove();
            this.collectItems();
        }
    }

    setItems(items) {
        // Clear existing items
        this.items.forEach(item => item.remove());
        
        // Add new items
        items.forEach(itemData => {
            this.addItem(itemData);
        });
    }

    getActiveItem() {
        return this.items[this.activeIndex];
    }

    setActiveItem(index) {
        this.selectItem(index);
    }

    enable() {
        this.toggle.disabled = false;
        this.element.classList.remove('disabled');
    }

    disable() {
        this.toggle.disabled = true;
        this.element.classList.add('disabled');
        this.close();
    }

    destroy() {
        // Remove event listeners
        this.toggle.removeEventListener('click', this.toggleDropdown);
        
        // Remove from global registry
        const index = MirageDropdown.instances.indexOf(this);
        if (index > -1) {
            MirageDropdown.instances.splice(index, 1);
        }

        // Remove overlay if exists
        if (this.overlay) {
            this.overlay.remove();
        }

        // Clean up
        this.element = null;
        this.toggle = null;
        this.menu = null;
        this.items = [];
    }

    triggerEvent(eventName, data = {}) {
        const event = new CustomEvent(`mir-dropdown:${eventName}`, {
            detail: { dropdown: this, ...data }
        });
        
        this.element.dispatchEvent(event);

        // Call option callbacks
        const callbackName = `on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`;
        if (typeof this.options[callbackName] === 'function') {
            this.options[callbackName](data);
        }
    }

    // Static methods
    static init(selector = '.mir-dropdown') {
        const elements = document.querySelectorAll(selector);
        const instances = [];

        elements.forEach(element => {
            if (!element.mirageDropdown) {
                const instance = new MirageDropdown(element);
                element.mirageDropdown = instance;
                instances.push(instance);
            }
        });

        return instances;
    }

    static closeAll(except = null) {
        MirageDropdown.instances.forEach(instance => {
            if (instance !== except && instance.isOpen) {
                instance.close();
            }
        });
    }

    static create(container, options = {}) {
        const dropdown = document.createElement('div');
        dropdown.className = `mir-dropdown ${options.variant || ''} ${options.size || ''}`.trim();

        const toggle = document.createElement('button');
        toggle.className = 'mir-dropdown-toggle';
        toggle.innerHTML = `
            <span>${options.text || 'انتخاب کنید'}</span>
            <i class="mir-dropdown-toggle-icon" data-feather="chevron-down"></i>
        `;

        const menu = document.createElement('div');
        menu.className = 'mir-dropdown-menu';

        if (options.searchable) {
            const searchContainer = document.createElement('div');
            searchContainer.className = 'mir-dropdown-search';
            searchContainer.innerHTML = `
                <input type="text" class="mir-dropdown-search-input" placeholder="جستجو..." dir="rtl">
            `;
            menu.appendChild(searchContainer);
        }

        if (options.items) {
            options.items.forEach(itemData => {
                const item = document.createElement('button');
                item.className = 'mir-dropdown-item';
                item.innerHTML = `
                    ${itemData.icon ? `<i class="mir-dropdown-item-icon" data-feather="${itemData.icon}"></i>` : ''}
                    <span>${itemData.text}</span>
                    ${itemData.badge ? `<span class="mir-dropdown-item-badge">${itemData.badge}</span>` : ''}
                `;
                
                if (itemData.disabled) {
                    item.classList.add('disabled');
                }
                
                if (itemData.value) {
                    item.dataset.value = itemData.value;
                }
                
                menu.appendChild(item);
            });
        }

        dropdown.appendChild(toggle);
        dropdown.appendChild(menu);

        const containerElement = typeof container === 'string' ? 
            document.querySelector(container) : container;
        
        if (containerElement) {
            containerElement.appendChild(dropdown);
        }

        // Initialize feather icons if available
        if (typeof feather !== 'undefined') {
            feather.replace();
        }

        return new MirageDropdown(dropdown, options);
    }
}

// Global instances registry
MirageDropdown.instances = [];

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    MirageDropdown.init();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MirageDropdown;
}

// Global namespace
window.MirageDropdown = MirageDropdown;