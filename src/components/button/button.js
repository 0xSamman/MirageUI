/* ========================================
   MIRAGE BUTTON COMPONENT JAVASCRIPT
   ======================================== 
   
   Interactive behaviors for button components
   Includes ripple effects, loading states, and accessibility
   ======================================== */

class MirageButton {
  constructor() {
    this.buttons = document.querySelectorAll('.mir-btn');
    this.init();
  }

  init() {
    this.buttons.forEach(button => {
      this.setupButton(button);
    });
  }

  setupButton(button) {
    if (!button.disabled) {
      this.addRippleEffect(button);
    }
    this.setupLoadingState(button);

    // Add keyboard navigation
    this.setupKeyboardNavigation(button);

    // Setup click analytics (if needed)
    this.setupAnalytics(button);
  }

  addRippleEffect(button) {
    button.addEventListener('click', (e) => {
      if (button.disabled || button.classList.contains('mir-btn-loading')) {
        return;
      }

      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: mir-ripple 0.6s ease-out;
        background-color: rgba(255, 255, 255, 0.3);
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
      `;

      if (getComputedStyle(button).position === 'static') {
        button.style.position = 'relative';
      }
      button.style.overflow = 'hidden';
      button.appendChild(ripple);

      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 600);
    });

    this.addRippleCSS();
  }

  addRippleCSS() {
    if (!document.getElementById('mir-ripple-css')) {
      const style = document.createElement('style');
      style.id = 'mir-ripple-css';
      style.textContent = `
        @keyframes mir-ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  setupLoadingState(button) {
    button.setLoading = (loading = true) => {
      if (loading) {
        button.classList.add('mir-btn-loading');
        button.disabled = true;
        if (!button.dataset.originalContent) {
          button.dataset.originalContent = button.innerHTML;
        }
        button.innerHTML = `<span class="mir-btn-content">${button.dataset.originalContent}</span>`;
      } else {
        button.classList.remove('mir-btn-loading');
        button.disabled = false;
        if (button.dataset.originalContent) {
          button.innerHTML = button.dataset.originalContent;
        }
      }
    };

    // Auto-loading for forms
    if (button.type === 'submit') {
      const form = button.closest('form');
      if (form) {
        form.addEventListener('submit', (e) => {
          // Only set loading if form is valid
          if (form.checkValidity()) {
            button.setLoading(true);
            
            // Auto-remove loading after 3 seconds as fallback
            setTimeout(() => {
              button.setLoading(false);
            }, 3000);
          }
        });
      }
    }
  }

  setupKeyboardNavigation(button) {
    button.addEventListener('keydown', (e) => {
      // Enter and Space should trigger click
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }

      // Arrow keys for button groups
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const buttonGroup = button.closest('.mir-btn-group');
        if (buttonGroup) {
          const buttons = Array.from(buttonGroup.querySelectorAll('.mir-btn:not(:disabled)'));
          const currentIndex = buttons.indexOf(button);
          
          let nextIndex;
          if (e.key === 'ArrowRight') {
            // In RTL, right arrow goes to previous button
            nextIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
          } else {
            // In RTL, left arrow goes to next button
            nextIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
          }
          
          buttons[nextIndex].focus();
          e.preventDefault();
        }
      }
    });
  }

  setupAnalytics(button) {
    // Track button clicks for analytics
    button.addEventListener('click', () => {
      const buttonText = button.textContent.trim();
      const buttonType = this.getButtonType(button);
      const buttonSize = this.getButtonSize(button);
      
      // Dispatch custom event for analytics
      window.dispatchEvent(new CustomEvent('mirageButtonClick', {
        detail: {
          text: buttonText,
          type: buttonType,
          size: buttonSize,
          element: button
        }
      }));
    });
  }

  getButtonType(button) {
    const classes = button.className;
    if (classes.includes('mir-btn-primary')) return 'primary';
    if (classes.includes('mir-btn-secondary')) return 'secondary';
    if (classes.includes('mir-btn-ghost')) return 'ghost';
    if (classes.includes('mir-btn-outline')) return 'outline';
    if (classes.includes('mir-btn-danger')) return 'danger';
    if (classes.includes('mir-btn-success')) return 'success';
    if (classes.includes('mir-btn-warning')) return 'warning';
    return 'default';
  }

  getButtonSize(button) {
    const classes = button.className;
    if (classes.includes('mir-btn-xs')) return 'xs';
    if (classes.includes('mir-btn-sm')) return 'sm';
    if (classes.includes('mir-btn-lg')) return 'lg';
    if (classes.includes('mir-btn-xl')) return 'xl';
    return 'md';
  }

  // Public method to refresh button instances
  refresh() {
    this.buttons = document.querySelectorAll('.mir-btn');
    this.init();
  }

  // Public method to add button programmatically
  addButton(buttonElement) {
    this.setupButton(buttonElement);
  }
}

// Utility functions for button manipulation
const MirageButtonUtils = {
  // Create button programmatically
  create(options = {}) {
    const button = document.createElement(options.tag || 'button');
    
    // Base classes
    button.className = 'mir-btn';
    
    // Add variant classes
    if (options.variant) {
      button.classList.add(`mir-btn-${options.variant}`);
    }
    
    // Add size classes
    if (options.size) {
      button.classList.add(`mir-btn-${options.size}`);
    }
    
    // Add shape classes
    if (options.shape) {
      button.classList.add(`mir-btn-${options.shape}`);
    }
    
    // Add content
    if (options.icon && options.text) {
      button.innerHTML = `<i data-feather="${options.icon}" class="mir-btn-icon"></i>${options.text}`;
    } else if (options.icon) {
      button.innerHTML = `<i data-feather="${options.icon}" class="mir-btn-icon"></i>`;
      button.classList.add('mir-btn-square');
    } else if (options.text) {
      button.textContent = options.text;
    }
    
    // Add attributes
    if (options.disabled) {
      button.disabled = true;
    }
    
    if (options.type) {
      button.type = options.type;
    }
    
    if (options.onClick) {
      button.addEventListener('click', options.onClick);
    }
    
    // Initialize feather icons if icon was added
    if (options.icon && typeof feather !== 'undefined') {
      setTimeout(() => feather.replace(), 0);
    }
    
    return button;
  },

  // Show notification using button
  showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `mir-notification mir-notification-${type}`;
    notification.style.cssText = `
      position: fixed;
      top: var(--mir-space-4);
      right: var(--mir-space-4);
      background: white;
      padding: var(--mir-space-4);
      border-radius: 14px;
      box-shadow: var(--mir-shadow-lg);
      z-index: 9999;
      direction: rtl;
      text-align: right;
      font-family: 'YekanBakh', 'Vazirmatn Variable', sans-serif;
      border-right: 4px solid var(--mir-${type === 'info' ? 'primary-solid' : type});
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, duration);
  },

  // Convert numbers to Persian
  toPersianNumbers(str) {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';
    
    return str.toString().replace(/[0-9]/g, function(match) {
      return persianDigits[englishDigits.indexOf(match)];
    });
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.mirageButtons = new MirageButton();
});

// Re-initialize when new content is added
document.addEventListener('DOMNodeInserted', (e) => {
  if (e.target.nodeType === 1 && e.target.querySelector && e.target.querySelector('.mir-btn')) {
    if (window.mirageButtons) {
      window.mirageButtons.refresh();
    }
  }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MirageButton, MirageButtonUtils };
} 