/*
 * MirageUI Tabs Component
 * Persian RTL Tabs System with Interactive Features
 * Version: 1.0.0
 */

class MirageTabs {
    constructor(element, options = {}) {
        if (typeof element === 'string') {
            this.element = document.querySelector(element);
        } else {
            this.element = element;
        }
        
        if (!this.element) {
            throw new Error('Tabs element not found');
        }

        this.options = {
            activeIndex: 0,
            variant: 'default', // default, bordered, pills, underlined, vertical
            size: 'md', // sm, md, lg
            closable: false,
            scrollable: true,
            animation: true,
            onTabChange: null,
            onTabClose: null,
            beforeTabChange: null,
            keyboard: true,
            ...options
        };

        this.tabs = [];
        this.activeTab = null;
        this.isAnimating = false;

        this.init();
    }

    // Initialize tabs
    init() {
        this.setupTabs();
        this.setupEvents();
        this.setupKeyboard();
        this.setupScrollable();
        this.setActiveTab(this.options.activeIndex);
    }

    // Setup tabs structure
    setupTabs() {
        // Add classes to main element
        this.element.classList.add('mir-tabs');
        
        if (this.options.variant !== 'default') {
            this.element.classList.add(`mir-tabs-${this.options.variant}`);
        }
        
        if (this.options.size !== 'md') {
            this.element.classList.add(`mir-tabs-${this.options.size}`);
        }

        // Find nav and content elements
        this.navElement = this.element.querySelector('.mir-tabs-nav');
        this.contentElement = this.element.querySelector('.mir-tabs-content');

        if (!this.navElement || !this.contentElement) {
            throw new Error('Tabs structure incomplete. Need .mir-tabs-nav and .mir-tabs-content');
        }

        // Setup nav items
        this.navItems = Array.from(this.navElement.querySelectorAll('.mir-tabs-nav-item'));
        this.navLinks = Array.from(this.navElement.querySelectorAll('.mir-tabs-nav-link'));
        this.panes = Array.from(this.contentElement.querySelectorAll('.mir-tabs-pane'));

        // Setup tabs data
        this.tabs = this.navLinks.map((link, index) => ({
            id: link.dataset.tab || `tab-${index}`,
            link: link,
            pane: this.panes[index],
            index: index,
            disabled: link.hasAttribute('disabled') || link.classList.contains('disabled')
        }));

        // Add close buttons if closable
        if (this.options.closable) {
            this.addCloseButtons();
        }
    }

    // Setup event listeners
    setupEvents() {
        // Tab click events
        this.navLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                if (!this.tabs[index].disabled) {
                    this.setActiveTab(index);
                }
            });
        });

        // Close button events
        if (this.options.closable) {
            this.element.addEventListener('click', (e) => {
                if (e.target.closest('.mir-tabs-nav-close')) {
                    e.preventDefault();
                    e.stopPropagation();
                    const tabIndex = this.getTabIndex(e.target.closest('.mir-tabs-nav-item'));
                    this.closeTab(tabIndex);
                }
            });
        }
    }

    // Setup keyboard navigation
    setupKeyboard() {
        if (!this.options.keyboard) return;

        this.navElement.addEventListener('keydown', (e) => {
            const activeIndex = this.getActiveTabIndex();
            let newIndex = activeIndex;

            switch (e.key) {
                case 'ArrowLeft':
                    newIndex = this.getNextTabIndex(activeIndex, -1);
                    break;
                case 'ArrowRight':
                    newIndex = this.getNextTabIndex(activeIndex, 1);
                    break;
                case 'Home':
                    newIndex = this.getNextTabIndex(-1, 1);
                    break;
                case 'End':
                    newIndex = this.getNextTabIndex(this.tabs.length, -1);
                    break;
                case 'Enter':
                case ' ':
                    // Already handled by click event
                    return;
                default:
                    return;
            }

            if (newIndex !== activeIndex) {
                e.preventDefault();
                this.setActiveTab(newIndex);
                this.navLinks[newIndex].focus();
            }
        });
    }

    // Setup scrollable tabs
    setupScrollable() {
        if (!this.options.scrollable) return;

        // Check if scrolling is needed
        const checkScroll = () => {
            const navWidth = this.navElement.offsetWidth;
            const scrollWidth = this.navElement.scrollWidth;
            
            if (scrollWidth > navWidth) {
                this.addScrollButtons();
            } else {
                this.removeScrollButtons();
            }
        };

        // Initial check
        checkScroll();

        // Check on resize
        window.addEventListener('resize', checkScroll);
    }

    // Add scroll buttons
    addScrollButtons() {
        if (this.element.querySelector('.mir-tabs-scroll-btn')) return;

        const container = document.createElement('div');
        container.className = 'mir-tabs-scroll-container';
        
        const leftBtn = document.createElement('button');
        leftBtn.className = 'mir-tabs-scroll-btn mir-tabs-scroll-btn-left';
        leftBtn.innerHTML = '<i data-feather="chevron-right"></i>';
        leftBtn.addEventListener('click', () => this.scrollTabs(-1));
        
        const rightBtn = document.createElement('button');
        rightBtn.className = 'mir-tabs-scroll-btn mir-tabs-scroll-btn-right';
        rightBtn.innerHTML = '<i data-feather="chevron-left"></i>';
        rightBtn.addEventListener('click', () => this.scrollTabs(1));

        // Wrap nav element
        this.navElement.parentNode.insertBefore(container, this.navElement);
        container.appendChild(leftBtn);
        container.appendChild(this.navElement);
        container.appendChild(rightBtn);

        // Update scroll button states
        this.updateScrollButtons();
        
        // Listen for scroll events
        this.navElement.addEventListener('scroll', () => {
            this.updateScrollButtons();
        });

        // Initialize feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    // Remove scroll buttons
    removeScrollButtons() {
        const container = this.element.querySelector('.mir-tabs-scroll-container');
        if (container) {
            const parent = container.parentNode;
            parent.insertBefore(this.navElement, container);
            parent.removeChild(container);
        }
    }

    // Scroll tabs
    scrollTabs(direction) {
        const scrollAmount = 100;
        this.navElement.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    }

    // Update scroll button states
    updateScrollButtons() {
        const container = this.element.querySelector('.mir-tabs-scroll-container');
        if (!container) return;

        const leftBtn = container.querySelector('.mir-tabs-scroll-btn-left');
        const rightBtn = container.querySelector('.mir-tabs-scroll-btn-right');
        
        const scrollLeft = this.navElement.scrollLeft;
        const maxScroll = this.navElement.scrollWidth - this.navElement.offsetWidth;

        leftBtn.disabled = scrollLeft <= 0;
        rightBtn.disabled = scrollLeft >= maxScroll;
    }

    // Add close buttons to tabs
    addCloseButtons() {
        this.navLinks.forEach((link, index) => {
            if (!link.querySelector('.mir-tabs-nav-close')) {
                const closeBtn = document.createElement('button');
                closeBtn.className = 'mir-tabs-nav-close';
                closeBtn.innerHTML = '<i class="mir-tabs-nav-close-icon" data-feather="x"></i>';
                closeBtn.setAttribute('aria-label', 'بستن تب');
                link.appendChild(closeBtn);
            }
        });

        // Initialize feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    // Get next enabled tab index
    getNextTabIndex(currentIndex, direction) {
        let newIndex = currentIndex;
        
        do {
            newIndex += direction;
            if (newIndex < 0) newIndex = this.tabs.length - 1;
            if (newIndex >= this.tabs.length) newIndex = 0;
        } while (this.tabs[newIndex].disabled && newIndex !== currentIndex);

        return newIndex;
    }

    // Get tab index from element
    getTabIndex(element) {
        return Array.from(this.navItems).indexOf(element);
    }

    // Get active tab index
    getActiveTabIndex() {
        return this.tabs.findIndex(tab => tab.link.classList.contains('active'));
    }

    // Set active tab
    setActiveTab(index) {
        if (this.isAnimating) return;

        const tab = this.tabs[index];
        if (!tab || tab.disabled) return;

        // Call beforeTabChange callback
        if (this.options.beforeTabChange) {
            const result = this.options.beforeTabChange(index, this.getActiveTabIndex());
            if (result === false) return;
        }

        this.isAnimating = true;

        // Remove active class from all tabs
        this.navLinks.forEach(link => link.classList.remove('active'));
        this.panes.forEach(pane => pane.classList.remove('active'));

        // Add active class to selected tab
        tab.link.classList.add('active');
        if (tab.pane) {
            tab.pane.classList.add('active');
        }

        // Update active tab reference
        this.activeTab = tab;

        // Scroll to active tab if needed
        this.scrollToActiveTab();

        // Call onTabChange callback
        if (this.options.onTabChange) {
            this.options.onTabChange(index, tab);
        }

        // Reset animation flag
        setTimeout(() => {
            this.isAnimating = false;
        }, 300);
    }

    // Scroll to active tab
    scrollToActiveTab() {
        const activeLink = this.activeTab.link;
        const navRect = this.navElement.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();

        if (linkRect.left < navRect.left) {
            this.navElement.scrollBy({
                left: linkRect.left - navRect.left - 20,
                behavior: 'smooth'
            });
        } else if (linkRect.right > navRect.right) {
            this.navElement.scrollBy({
                left: linkRect.right - navRect.right + 20,
                behavior: 'smooth'
            });
        }
    }

    // Close tab
    closeTab(index) {
        const tab = this.tabs[index];
        if (!tab) return;

        // Call onTabClose callback
        if (this.options.onTabClose) {
            const result = this.options.onTabClose(index, tab);
            if (result === false) return;
        }

        // Remove tab elements
        tab.link.parentNode.remove();
        if (tab.pane) {
            tab.pane.remove();
        }

        // Remove from tabs array
        this.tabs.splice(index, 1);

        // Update remaining tabs
        this.tabs.forEach((t, i) => {
            t.index = i;
        });

        // If closed tab was active, activate adjacent tab
        if (tab.link.classList.contains('active')) {
            const newIndex = Math.min(index, this.tabs.length - 1);
            if (newIndex >= 0) {
                this.setActiveTab(newIndex);
            }
        }

        // Update nav and content references
        this.navItems = Array.from(this.navElement.querySelectorAll('.mir-tabs-nav-item'));
        this.navLinks = Array.from(this.navElement.querySelectorAll('.mir-tabs-nav-link'));
        this.panes = Array.from(this.contentElement.querySelectorAll('.mir-tabs-pane'));
    }

    // Add new tab
    addTab(options) {
        const {
            id = `tab-${Date.now()}`,
            title = 'تب جدید',
            content = '',
            icon = null,
            badge = null,
            closable = this.options.closable,
            active = false
        } = options;

        // Create nav item
        const navItem = document.createElement('li');
        navItem.className = 'mir-tabs-nav-item';

        const navLink = document.createElement('button');
        navLink.className = 'mir-tabs-nav-link';
        navLink.dataset.tab = id;
        navLink.setAttribute('role', 'tab');
        navLink.setAttribute('aria-selected', 'false');

        let linkContent = '';
        if (icon) {
            linkContent += `<i class="mir-tabs-nav-icon" data-feather="${icon}"></i>`;
        }
        linkContent += `<span>${title}</span>`;
        if (badge) {
            linkContent += `<span class="mir-tabs-nav-badge">${badge}</span>`;
        }

        navLink.innerHTML = linkContent;
        navItem.appendChild(navLink);

        // Add close button if closable
        if (closable) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'mir-tabs-nav-close';
            closeBtn.innerHTML = '<i class="mir-tabs-nav-close-icon" data-feather="x"></i>';
            closeBtn.setAttribute('aria-label', 'بستن تب');
            navLink.appendChild(closeBtn);
        }

        // Create pane
        const pane = document.createElement('div');
        pane.className = 'mir-tabs-pane';
        pane.id = id;
        pane.setAttribute('role', 'tabpanel');
        pane.innerHTML = content;

        // Add to DOM
        this.navElement.appendChild(navItem);
        this.contentElement.appendChild(pane);

        // Update references
        this.navItems = Array.from(this.navElement.querySelectorAll('.mir-tabs-nav-item'));
        this.navLinks = Array.from(this.navElement.querySelectorAll('.mir-tabs-nav-link'));
        this.panes = Array.from(this.contentElement.querySelectorAll('.mir-tabs-pane'));

        // Add to tabs array
        const tabIndex = this.tabs.length;
        this.tabs.push({
            id: id,
            link: navLink,
            pane: pane,
            index: tabIndex,
            disabled: false
        });

        // Setup events for new tab
        navLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.setActiveTab(tabIndex);
        });

        // Initialize feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }

        // Set as active if requested
        if (active) {
            this.setActiveTab(tabIndex);
        }

        return tabIndex;
    }

    // Enable tab
    enableTab(index) {
        const tab = this.tabs[index];
        if (tab) {
            tab.disabled = false;
            tab.link.removeAttribute('disabled');
            tab.link.classList.remove('disabled');
        }
    }

    // Disable tab
    disableTab(index) {
        const tab = this.tabs[index];
        if (tab) {
            tab.disabled = true;
            tab.link.setAttribute('disabled', 'true');
            tab.link.classList.add('disabled');
        }
    }

    // Get active tab
    getActiveTab() {
        return this.activeTab;
    }

    // Get tab by ID
    getTab(id) {
        return this.tabs.find(tab => tab.id === id);
    }

    // Get all tabs
    getTabs() {
        return this.tabs;
    }

    // Update tab
    updateTab(index, options) {
        const tab = this.tabs[index];
        if (!tab) return;

        const { title, content, icon, badge } = options;

        if (title) {
            const titleElement = tab.link.querySelector('span');
            if (titleElement) {
                titleElement.textContent = title;
            }
        }

        if (content && tab.pane) {
            tab.pane.innerHTML = content;
        }

        if (icon) {
            let iconElement = tab.link.querySelector('.mir-tabs-nav-icon');
            if (!iconElement) {
                iconElement = document.createElement('i');
                iconElement.className = 'mir-tabs-nav-icon';
                tab.link.insertBefore(iconElement, tab.link.firstChild);
            }
            iconElement.setAttribute('data-feather', icon);
        }

        if (badge) {
            let badgeElement = tab.link.querySelector('.mir-tabs-nav-badge');
            if (!badgeElement) {
                badgeElement = document.createElement('span');
                badgeElement.className = 'mir-tabs-nav-badge';
                tab.link.appendChild(badgeElement);
            }
            badgeElement.textContent = badge;
        }

        // Re-initialize feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    // Destroy tabs
    destroy() {
        // Remove event listeners
        this.navLinks.forEach(link => {
            link.removeEventListener('click', this.setActiveTab);
        });

        // Remove scroll buttons
        this.removeScrollButtons();

        // Remove classes
        this.element.classList.remove('mir-tabs');
        this.element.classList.remove(`mir-tabs-${this.options.variant}`);
        this.element.classList.remove(`mir-tabs-${this.options.size}`);

        // Clear references
        this.tabs = [];
        this.activeTab = null;
        this.element = null;
    }

    // Static method to initialize all tabs on page
    static init(selector = '.mir-tabs') {
        const elements = document.querySelectorAll(selector);
        const instances = [];

        elements.forEach(element => {
            if (!element.mirageTabsInstance) {
                element.mirageTabsInstance = new MirageTabs(element);
                instances.push(element.mirageTabsInstance);
            }
        });

        return instances;
    }

    // Static method to create tabs
    static create(container, options = {}) {
        const tabsElement = document.createElement('div');
        tabsElement.className = 'mir-tabs';

        const nav = document.createElement('ul');
        nav.className = 'mir-tabs-nav';

        const content = document.createElement('div');
        content.className = 'mir-tabs-content';

        tabsElement.appendChild(nav);
        tabsElement.appendChild(content);

        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        container.appendChild(tabsElement);

        return new MirageTabs(tabsElement, options);
    }
}

// Initialize tabs on page load
document.addEventListener('DOMContentLoaded', function() {
    MirageTabs.init();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MirageTabs;
} else {
    window.MirageTabs = MirageTabs;
}