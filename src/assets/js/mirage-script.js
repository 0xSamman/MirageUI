// ========================================
// MIRAGE DESIGN SYSTEM - INTERACTIVE COMPONENTS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    feather.replace();

    // Initialize Charts
    initializeCharts();

    // Initialize Form Interactions
    initializeFormInteractions();

    // Initialize Persian Number Conversions
    initializePersianNumbers();

    // Initialize Navigation
    initializeNavigation();

    // Initialize Responsive Sidebar
    initializeResponsiveSidebar();
});

// ========================================
// CHART INITIALIZATION
// ========================================

function initializeCharts() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
                datasets: [{
                    label: 'درآمد (تومان)',
                    data: [15000, 18000, 12000, 25000, 22000, 30000],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#6366f1',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            font: {
                                family: 'YekanBakh, sans-serif'
                            },
                            callback: function(value) {
                                return convertToPersianNumbers(value.toLocaleString()) + ' تومان';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                family: 'YekanBakh, sans-serif'
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                elements: {
                    point: {
                        hoverRadius: 8
                    }
                }
            }
        });
    }

    // Orders Distribution Chart
    const ordersCtx = document.getElementById('ordersChart');
    if (ordersCtx) {
        new Chart(ordersCtx, {
            type: 'doughnut',
            data: {
                labels: ['آنلاین', 'فروشگاه', 'موبایل'],
                datasets: [{
                    data: [45, 30, 25],
                    backgroundColor: [
                        '#6366f1',
                        '#10b981',
                        '#f59e0b'
                    ],
                    borderWidth: 0,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                family: 'YekanBakh, sans-serif',
                                size: 14
                            },
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    }
                },
                cutout: '60%'
            }
        });
    }
}

// ========================================
// FORM INTERACTIONS
// ========================================

function initializeFormInteractions() {
    // Range Slider Updates
    const rangeInputs = document.querySelectorAll('.mir-range');
    rangeInputs.forEach(range => {
        const valueDisplay = range.parentElement.querySelector('.mir-range-value');
        
        range.addEventListener('input', function() {
            const value = parseInt(this.value).toLocaleString();
            const persianValue = convertToPersianNumbers(value);
            if (valueDisplay) {
                valueDisplay.textContent = persianValue + ' تومان';
            }
        });
    });

    // Form Submission Handler
    const forms = document.querySelectorAll('.mir-form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state to submit button
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'در حال ذخیره...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Show success message (you can customize this)
                    showNotification('اطلاعات با موفقیت ذخیره شد', 'success');
                }, 2000);
            }
        });
    });

    // Input Focus Animations
    const inputs = document.querySelectorAll('.mir-input, .mir-select, .mir-textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ========================================
// PERSIAN NUMBER CONVERSION
// ========================================

function convertToPersianNumbers(str) {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';
    
    return str.toString().replace(/[0-9]/g, function(match) {
        return persianDigits[englishDigits.indexOf(match)];
    });
}

function initializePersianNumbers() {
    // Convert all elements with mir-persian-numbers class
    const persianNumberElements = document.querySelectorAll('.mir-persian-numbers');
    persianNumberElements.forEach(element => {
        const originalText = element.textContent;
        element.textContent = convertToPersianNumbers(originalText);
    });

    // Handle metric values
    const metricValues = document.querySelectorAll('.mir-metric-value');
    metricValues.forEach(element => {
        const originalText = element.textContent;
        element.textContent = convertToPersianNumbers(originalText);
    });
}

// ========================================
// NAVIGATION INTERACTIONS
// ========================================

function initializeNavigation() {
    // Sidebar navigation active states and page switching
    const navLinks = document.querySelectorAll('.mir-nav-link[data-page]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.getAttribute('data-page');
            
            // Remove active state from all navigation items
            document.querySelectorAll('.mir-nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active state to clicked item
            this.parentElement.classList.add('active');
            
            // Hide all page content
            document.querySelectorAll('.mir-page-content').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show target page content
            const targetPageElement = document.getElementById(`page-${targetPage}`);
            if (targetPageElement) {
                targetPageElement.classList.add('active');
                
                // Update page title in browser
                updatePageTitle(targetPage);
                
                // Initialize any page-specific functionality
                initializePageSpecificFeatures(targetPage);
            }
            
            // Add ripple effect
            createRippleEffect(this, e);
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.mir-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            // Implement search logic here
            console.log('جستجو برای:', searchTerm);
        });
    }

    // Notification button
    const notificationBtn = document.querySelector('.mir-notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            // Toggle notification panel (implement as needed)
            console.log('نمایش اعلان‌ها');
        });
    }

    // User profile dropdown
    const userProfile = document.querySelector('.mir-user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            // Toggle user menu (implement as needed)
            console.log('نمایش منوی کاربر');
        });
    }
}

// ========================================
// RESPONSIVE SIDEBAR
// ========================================

function initializeResponsiveSidebar() {
    // Mobile sidebar toggle
    if (window.innerWidth <= 768) {
        const sidebar = document.querySelector('.mir-sidebar');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mir-mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i data-feather="menu"></i>';
        mobileMenuBtn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            background: var(--mir-primary);
            border: none;
            border-radius: 10px;
            padding: 10px;
            color: white;
            cursor: pointer;
            display: none;
        `;
        
        document.body.appendChild(mobileMenuBtn);
        feather.replace();
        
        mobileMenuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
        
        // Close sidebar when clicking outside
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `mir-notification mir-notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        padding: 16px 20px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        z-index: 1000;
        font-family: 'YekanBakh', sans-serif;
        font-size: 14px;
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Set color based on type
    if (type === 'success') {
        notification.style.borderLeftColor = '#10b981';
        notification.style.color = '#065f46';
    } else if (type === 'error') {
        notification.style.borderLeftColor = '#ef4444';
        notification.style.color = '#7f1d1d';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS for ripple animation and page transitions
const rippleCSS = `
@keyframes ripple {
    to {
        transform: scale(2);
        opacity: 0;
    }
}

/* Page Content Transitions */
.mir-page-content {
    display: none;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
}

.mir-page-content.active {
    display: block;
    opacity: 1;
    transform: translateY(0);
    animation: fadeInUp 0.4s ease;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Smooth scrolling for page transitions */
.mir-main-content {
    scroll-behavior: smooth;
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// ========================================
// TABLE INTERACTIONS
// ========================================

// Add table row hover effects and actions
document.addEventListener('DOMContentLoaded', function() {
    const tableRows = document.querySelectorAll('.mir-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-2px)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Table action buttons
    const actionButtons = document.querySelectorAll('.mir-table-actions .mir-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.textContent.trim();
            console.log('اقدام:', action);
        });
    });
});

// ========================================
// THEME TOGGLE (BONUS FEATURE)
// ========================================

function initializeThemeToggle() {
    const toggles = document.querySelectorAll('.mir-toggle input[type="checkbox"]');
    toggles.forEach(toggle => {
        if (toggle.parentElement.parentElement.querySelector('.mir-label').textContent.includes('تاریک')) {
            toggle.addEventListener('change', function() {
                if (this.checked) {
                    document.body.classList.add('dark-theme');
                } else {
                    document.body.classList.remove('dark-theme');
                }
            });
        }
    });
}

// Initialize theme toggle after DOM loads
document.addEventListener('DOMContentLoaded', initializeThemeToggle);

// ========================================
// PAGE NAVIGATION HELPERS
// ========================================

function updatePageTitle(pageName) {
    const pageTitles = {
        'dashboard': 'داشبورد - میراژ داش',
        'orders': 'مدیریت سفارشات - میراژ داش',
        'products': 'مدیریت محصولات - میراژ داش',
        'customers': 'مدیریت مشتریان - میراژ داش',
        'analytics': 'آنالیتیکس و گزارشات - میراژ داش',
        'messages': 'مدیریت پیام‌ها - میراژ داش',
        'settings': 'تنظیمات سیستم - میراژ داش'
    };
    
    document.title = pageTitles[pageName] || 'پنل مدیریت میراژ - Mirage Admin Dashboard';
}

function initializePageSpecificFeatures(pageName) {
    switch(pageName) {
        case 'analytics':
            // Initialize analytics charts if they don't exist
            setTimeout(() => {
                initializeAnalyticsCharts();
            }, 100);
            break;
        case 'dashboard':
            // Re-initialize main dashboard charts
            setTimeout(() => {
                initializeCharts();
            }, 100);
            break;
        default:
            // No specific initialization needed
            break;
    }
}

function initializeAnalyticsCharts() {
    // Analytics Chart
    const analyticsCtx = document.getElementById('analyticsChart');
    if (analyticsCtx && !analyticsCtx.chartInstance) {
        analyticsCtx.chartInstance = new Chart(analyticsCtx, {
            type: 'bar',
            data: {
                labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
                datasets: [{
                    label: 'فروش (تومان)',
                    data: [45000, 52000, 38000, 61000, 48000, 67000],
                    backgroundColor: 'rgba(99, 102, 241, 0.8)',
                    borderColor: '#6366f1',
                    borderWidth: 1,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                family: 'YekanBakh, sans-serif'
                            },
                            callback: function(value) {
                                return convertToPersianNumbers(value.toLocaleString()) + ' تومان';
                            }
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                family: 'YekanBakh, sans-serif'
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Traffic Chart
    const trafficCtx = document.getElementById('trafficChart');
    if (trafficCtx && !trafficCtx.chartInstance) {
        trafficCtx.chartInstance = new Chart(trafficCtx, {
            type: 'pie',
            data: {
                labels: ['جستجوی گوگل', 'شبکه‌های اجتماعی', 'مستقیم', 'سایر منابع'],
                datasets: [{
                    data: [40, 25, 20, 15],
                    backgroundColor: [
                        '#6366f1',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444'
                    ],
                    borderWidth: 0,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                family: 'YekanBakh, sans-serif',
                                size: 12
                            },
                            padding: 15,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    }
                }
            }
        });
    }
}
