/*
 * MirageUI Breadcrumb Component
 * Persian RTL Breadcrumb Navigation with Interactive Features
 * Version: 1.0.0
 */

class MirageBreadcrumb {
    constructor(element, options = {}) {
        if (typeof element === 'string') {
            this.element = document.querySelector(element);
        } else {
            this.element = element;
        }
        
        if (!this.element) {
            throw new Error('Breadcrumb element not found');
        }

        this.options = {
            separator: 'arrow', // arrow, chevron, slash, dot, dash
            variant: 'default', // default, minimal, outlined, filled
            size: 'md', // sm, md, lg
            maxItems: 5,
            showHome: true,
            homeIcon: 'home',
            homeText: 'خانه',
            showCurrent: true,
            collapsible: true,
            responsive: true,
            onClick: null,
            onItemClick: null,
            animation: true,
            ...options
        };

        this.items = [];
        this.isCollapsed = false;
        this.init();
    }

    // Initialize breadcrumb
    init() {
        this.setupBreadcrumb();
        this.setupEvents();
        this.setupResponsive();
        this.parseExistingItems();
    }

    // Setup breadcrumb structure
    setupBreadcrumb() {
        // Add classes to main element
        this.element.classList.add('mir-breadcrumb');
        
        if (this.options.variant !== 'default') {
            this.element.classList.add(`mir-breadcrumb-${this.options.variant}`);
        }
        
        if (this.options.size !== 'md') {
            this.element.classList.add(`mir-breadcrumb-${this.options.size}`);
        }

        // Create or find list element
        this.listElement = this.element.querySelector('.mir-breadcrumb-list');
        if (!this.listElement) {
            this.listElement = document.createElement('ul');
            this.listElement.className = 'mir-breadcrumb-list';
            this.element.appendChild(this.listElement);
        }
    }

    // Setup event listeners
    setupEvents() {
        // Click events for breadcrumb items
        this.element.addEventListener('click', (e) => {
            const link = e.target.closest('.mir-breadcrumb-link');
            if (link && !link.classList.contains('active')) {
                e.preventDefault();
                this.handleItemClick(link, e);
            }

            // Handle dropdown toggle
            const dropdownToggle = e.target.closest('.mir-breadcrumb-dropdown-toggle');
            if (dropdownToggle) {
                e.preventDefault();
                this.toggleDropdown(dropdownToggle);
            }

            // Handle collapse toggle
            const collapseToggle = e.target.closest('.mir-breadcrumb-collapse');
            if (collapseToggle) {
                e.preventDefault();
                this.toggleCollapse();
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.element.contains(e.target)) {
                this.closeAllDropdowns();
            }
        });

        // Keyboard navigation
        this.element.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
    }

    // Setup responsive behavior
    setupResponsive() {
        if (!this.options.responsive) return;

        const checkResponsive = () => {
            const containerWidth = this.element.offsetWidth;
            const listWidth = this.listElement.scrollWidth;
            
            if (listWidth > containerWidth && this.items.length > 3) {
                this.enableCollapse();
            } else {
                this.disableCollapse();
            }
        };

        // Initial check
        setTimeout(checkResponsive, 100);

        // Check on resize
        window.addEventListener('resize', checkResponsive);
    }

    // Parse existing items from DOM
    parseExistingItems() {
        const existingItems = this.element.querySelectorAll('.mir-breadcrumb-item');
        existingItems.forEach((item, index) => {
            const link = item.querySelector('.mir-breadcrumb-link');
            if (link) {
                const text = link.textContent.trim();
                const href = link.getAttribute('href') || '#';
                const icon = link.querySelector('.mir-breadcrumb-icon')?.getAttribute('data-feather');
                const isActive = link.classList.contains('active');
                
                this.items.push({
                    text: text,
                    href: href,
                    icon: icon,
                    active: isActive,
                    element: item
                });
            }
        });
    }

    // Handle item click
    handleItemClick(link, event) {
        const item = link.closest('.mir-breadcrumb-item');
        const itemIndex = Array.from(this.listElement.children).indexOf(item);
        const breadcrumbItem = this.items[itemIndex];

        // Call item click callback
        if (this.options.onItemClick) {
            const result = this.options.onItemClick(breadcrumbItem, itemIndex, event);
            if (result === false) return;
        }

        // Set active item
        this.setActiveItem(itemIndex);

        // Call general click callback
        if (this.options.onClick) {
            this.options.onClick(breadcrumbItem, itemIndex, event);
        }
    }

    // Handle keyboard navigation
    handleKeyboard(e) {
        const links = this.element.querySelectorAll('.mir-breadcrumb-link');
        const currentIndex = Array.from(links).findIndex(link => link === document.activeElement);
        
        let newIndex = currentIndex;
        
        switch (e.key) {
            case 'ArrowLeft':
                newIndex = Math.max(0, currentIndex - 1);
                break;
            case 'ArrowRight':
                newIndex = Math.min(links.length - 1, currentIndex + 1);
                break;
            case 'Home':
                newIndex = 0;
                break;
            case 'End':
                newIndex = links.length - 1;
                break;
            case 'Enter':
            case ' ':
                if (currentIndex >= 0) {
                    e.preventDefault();
                    links[currentIndex].click();
                }
                return;
            default:
                return;
        }

        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < links.length) {
            e.preventDefault();
            links[newIndex].focus();
        }
    }

    // Toggle dropdown
    toggleDropdown(toggle) {
        const dropdown = toggle.closest('.mir-breadcrumb-dropdown');
        const isOpen = dropdown.classList.contains('open');
        
        // Close all dropdowns first
        this.closeAllDropdowns();
        
        // Toggle current dropdown
        if (!isOpen) {
            dropdown.classList.add('open');
        }
    }

    // Close all dropdowns
    closeAllDropdowns() {
        const dropdowns = this.element.querySelectorAll('.mir-breadcrumb-dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('open');
        });
    }

    // Toggle collapse
    toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
        
        if (this.isCollapsed) {
            this.collapseItems();
        } else {
            this.expandItems();
        }
    }

    // Enable collapse for responsive
    enableCollapse() {
        if (this.items.length <= 3) return;
        
        this.element.classList.add('mir-breadcrumb-responsive');
        this.collapseItems();
    }

    // Disable collapse
    disableCollapse() {
        this.element.classList.remove('mir-breadcrumb-responsive');
        this.expandItems();
    }

    // Collapse items
    collapseItems() {
        const items = this.listElement.querySelectorAll('.mir-breadcrumb-item');
        
        items.forEach((item, index) => {
            if (index > 0 && index < items.length - 1) {
                item.style.display = 'none';
            }
        });

        // Add collapse indicator
        if (!this.element.querySelector('.mir-breadcrumb-collapse')) {
            const collapseButton = document.createElement('button');
            collapseButton.className = 'mir-breadcrumb-collapse';
            collapseButton.innerHTML = '... <i data-feather="chevron-down"></i>';
            collapseButton.setAttribute('aria-label', 'نمایش موارد بیشتر');
            
            // Insert after first item
            const firstItem = this.listElement.firstElementChild;
            if (firstItem && firstItem.nextElementSibling) {
                this.listElement.insertBefore(collapseButton, firstItem.nextElementSibling);
            }
            
            // Initialize feather icons
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        }
    }

    // Expand items
    expandItems() {
        const items = this.listElement.querySelectorAll('.mir-breadcrumb-item');
        items.forEach(item => {
            item.style.display = 'flex';
        });

        // Remove collapse indicator
        const collapseButton = this.element.querySelector('.mir-breadcrumb-collapse');
        if (collapseButton) {
            collapseButton.remove();
        }
    }

    // Set active item
    setActiveItem(index) {
        // Remove active class from all items
        this.listElement.querySelectorAll('.mir-breadcrumb-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to selected item
        const items = this.listElement.querySelectorAll('.mir-breadcrumb-item');
        if (items[index]) {
            const link = items[index].querySelector('.mir-breadcrumb-link');
            if (link) {
                link.classList.add('active');
            }
        }

        // Update items array
        this.items.forEach((item, i) => {
            item.active = i === index;
        });
    }

    // Add breadcrumb item
    addItem(itemData) {
        const {
            text = '',
            href = '#',
            icon = null,
            active = false,
            dropdown = null
        } = itemData;

        // Create item element
        const item = document.createElement('li');
        item.className = 'mir-breadcrumb-item';

        // Create link element
        const link = document.createElement('a');
        link.className = 'mir-breadcrumb-link';
        link.href = href;
        link.setAttribute('tabindex', '0');

        // Add icon if provided
        if (icon) {
            const iconElement = document.createElement('i');
            iconElement.className = 'mir-breadcrumb-icon';
            iconElement.setAttribute('data-feather', icon);
            link.appendChild(iconElement);
        }

        // Add text
        const textElement = document.createElement('span');
        textElement.textContent = text;
        link.appendChild(textElement);

        // Handle dropdown
        if (dropdown && Array.isArray(dropdown) && dropdown.length > 0) {
            item.classList.add('mir-breadcrumb-dropdown');
            
            // Create dropdown toggle
            const toggle = document.createElement('button');
            toggle.className = 'mir-breadcrumb-dropdown-toggle';
            toggle.innerHTML = `${link.outerHTML} <i data-feather="chevron-down"></i>`;
            
            // Create dropdown menu
            const menu = document.createElement('div');
            menu.className = 'mir-breadcrumb-dropdown-menu';
            
            dropdown.forEach(dropdownItem => {
                const menuItem = document.createElement('a');
                menuItem.className = 'mir-breadcrumb-dropdown-item';
                menuItem.href = dropdownItem.href || '#';
                menuItem.textContent = dropdownItem.text;
                menu.appendChild(menuItem);
            });
            
            item.appendChild(toggle);
            item.appendChild(menu);
        } else {
            item.appendChild(link);
        }

        // Add separator (except for last item)
        if (this.items.length > 0) {
            const separator = document.createElement('span');
            separator.className = `mir-breadcrumb-separator ${this.options.separator}`;
            item.appendChild(separator);
        }

        // Set active if specified
        if (active) {
            link.classList.add('active');
        }

        // Add to DOM
        this.listElement.appendChild(item);

        // Add to items array
        this.items.push({
            text: text,
            href: href,
            icon: icon,
            active: active,
            dropdown: dropdown,
            element: item
        });

        // Initialize feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }

        // Add animation if enabled
        if (this.options.animation) {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-10px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 50);
        }

        return this.items.length - 1;
    }

    // Remove breadcrumb item
    removeItem(index) {
        if (index < 0 || index >= this.items.length) return;

        const item = this.items[index];
        if (item.element) {
            if (this.options.animation) {
                item.element.style.transition = 'all 0.3s ease';
                item.element.style.opacity = '0';
                item.element.style.transform = 'translateX(-10px)';
                
                setTimeout(() => {
                    item.element.remove();
                }, 300);
            } else {
                item.element.remove();
            }
        }

        // Remove from items array
        this.items.splice(index, 1);

        // Update separators
        this.updateSeparators();
    }

    // Update item
    updateItem(index, itemData) {
        if (index < 0 || index >= this.items.length) return;

        const item = this.items[index];
        const element = item.element;
        
        if (!element) return;

        // Update item data
        Object.assign(item, itemData);

        // Update DOM
        const link = element.querySelector('.mir-breadcrumb-link');
        if (link) {
            if (itemData.text) {
                const textElement = link.querySelector('span');
                if (textElement) {
                    textElement.textContent = itemData.text;
                }
            }
            
            if (itemData.href) {
                link.href = itemData.href;
            }
            
            if (itemData.icon) {
                let iconElement = link.querySelector('.mir-breadcrumb-icon');
                if (!iconElement) {
                    iconElement = document.createElement('i');
                    iconElement.className = 'mir-breadcrumb-icon';
                    link.insertBefore(iconElement, link.firstChild);
                }
                iconElement.setAttribute('data-feather', itemData.icon);
            }
            
            if (itemData.active !== undefined) {
                if (itemData.active) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        }

        // Re-initialize feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    // Update separators
    updateSeparators() {
        const separators = this.element.querySelectorAll('.mir-breadcrumb-separator');
        separators.forEach(separator => {
            separator.className = `mir-breadcrumb-separator ${this.options.separator}`;
        });
    }

    // Clear all items
    clear() {
        this.items = [];
        this.listElement.innerHTML = '';
    }

    // Set items from array
    setItems(items) {
        this.clear();
        items.forEach(item => this.addItem(item));
    }

    // Get current items
    getItems() {
        return this.items;
    }

    // Get active item
    getActiveItem() {
        return this.items.find(item => item.active);
    }

    // Get active item index
    getActiveIndex() {
        return this.items.findIndex(item => item.active);
    }

    // Update options
    updateOptions(newOptions) {
        this.options = { ...this.options, ...newOptions };
        
        // Update classes
        this.element.className = 'mir-breadcrumb';
        if (this.options.variant !== 'default') {
            this.element.classList.add(`mir-breadcrumb-${this.options.variant}`);
        }
        if (this.options.size !== 'md') {
            this.element.classList.add(`mir-breadcrumb-${this.options.size}`);
        }
        
        // Update separators
        this.updateSeparators();
    }

    // Destroy breadcrumb
    destroy() {
        // Remove event listeners
        this.element.removeEventListener('click', this.handleItemClick);
        this.element.removeEventListener('keydown', this.handleKeyboard);

        // Remove classes
        this.element.classList.remove('mir-breadcrumb');
        this.element.classList.remove(`mir-breadcrumb-${this.options.variant}`);
        this.element.classList.remove(`mir-breadcrumb-${this.options.size}`);

        // Clear references
        this.items = [];
        this.element = null;
        this.listElement = null;
    }

    // Static method to initialize all breadcrumbs on page
    static init(selector = '.mir-breadcrumb') {
        const elements = document.querySelectorAll(selector);
        const instances = [];

        elements.forEach(element => {
            if (!element.mirageBreadcrumbInstance) {
                element.mirageBreadcrumbInstance = new MirageBreadcrumb(element);
                instances.push(element.mirageBreadcrumbInstance);
            }
        });

        return instances;
    }

    // Static method to create breadcrumb
    static create(container, options = {}) {
        const breadcrumbElement = document.createElement('nav');
        breadcrumbElement.className = 'mir-breadcrumb';
        breadcrumbElement.setAttribute('aria-label', 'مسیر صفحه');

        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        container.appendChild(breadcrumbElement);

        return new MirageBreadcrumb(breadcrumbElement, options);
    }

    // Static method to create from path
    static createFromPath(container, path, options = {}) {
        const breadcrumb = MirageBreadcrumb.create(container, options);
        
        // Add home if enabled
        if (options.showHome !== false) {
            breadcrumb.addItem({
                text: options.homeText || 'خانه',
                href: options.homeHref || '/',
                icon: options.homeIcon || 'home'
            });
        }

        // Add path items
        path.forEach((item, index) => {
            breadcrumb.addItem({
                ...item,
                active: index === path.length - 1
            });
        });

        return breadcrumb;
    }
}

// Initialize breadcrumbs on page load
document.addEventListener('DOMContentLoaded', function() {
    MirageBreadcrumb.init();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MirageBreadcrumb;
} else {
    window.MirageBreadcrumb = MirageBreadcrumb;
}