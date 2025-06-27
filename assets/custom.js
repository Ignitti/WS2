/**
 * IGNITTI SHOPIFY THEME - CUSTOM JAVASCRIPT
 * Handles animations, interactions, and theme functionality
 */

(function() {
  'use strict';

  // Theme Configuration
  const THEME_CONFIG = {
    animations: {
      duration: 300,
      easing: 'ease-out'
    },
    breakpoints: {
      mobile: 768,
      tablet: 1024,
      desktop: 1200
    }
  };

  // Utility Functions
  const utils = {
    // Debounce function for performance
    debounce: function(func, wait, immediate) {
      let timeout;
      return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    },

    // Throttle function for scroll events
    throttle: function(func, limit) {
      let inThrottle;
      return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },

    // Check if element is in viewport
    isInViewport: function(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    },

    // Get viewport width
    getViewportWidth: function() {
      return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    },

    // Check if mobile device
    isMobile: function() {
      return this.getViewportWidth() <= THEME_CONFIG.breakpoints.mobile;
    },

    // Smooth scroll to element
    scrollToElement: function(element, offset = 0) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Animation Observer for scroll-triggered animations
  const AnimationObserver = {
    observer: null,
    elements: [],

    init: function() {
      if (!window.IntersectionObserver) return;

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateElement(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      this.observeElements();
    },

    observeElements: function() {
      // Observe elements with animation attributes
      const elements = document.querySelectorAll('[data-aos]');
      elements.forEach(element => {
        this.observer.observe(element);
      });

      // Auto-observe common elements
      const autoObserveSelectors = [
        '.product-card',
        '.collection-card',
        '.tier-card',
        '.benefit-item',
        '.value-item',
        '.contact-item'
      ];

      autoObserveSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          if (!element.hasAttribute('data-aos')) {
            element.setAttribute('data-aos', 'fade-up');
            this.observer.observe(element);
          }
        });
      });
    },

    animateElement: function(element) {
      const animationType = element.getAttribute('data-aos') || 'fade-up';
      const delay = element.getAttribute('data-aos-delay') || 0;

      setTimeout(() => {
        element.classList.add('aos-animate');
        
        switch(animationType) {
          case 'fade-up':
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity ${THEME_CONFIG.animations.duration}ms ${THEME_CONFIG.animations.easing}, transform ${THEME_CONFIG.animations.duration}ms ${THEME_CONFIG.animations.easing}`;
            
            requestAnimationFrame(() => {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
            });
            break;
            
          case 'fade-left':
            element.style.opacity = '0';
            element.style.transform = 'translateX(-30px)';
            element.style.transition = `opacity ${THEME_CONFIG.animations.duration}ms ${THEME_CONFIG.animations.easing}, transform ${THEME_CONFIG.animations.duration}ms ${THEME_CONFIG.animations.easing}`;
            
            requestAnimationFrame(() => {
              element.style.opacity = '1';
              element.style.transform = 'translateX(0)';
            });
            break;
            
          case 'fade-right':
            element.style.opacity = '0';
            element.style.transform = 'translateX(30px)';
            element.style.transition = `opacity ${THEME_CONFIG.animations.duration}ms ${THEME_CONFIG.animations.easing}, transform ${THEME_CONFIG.animations.duration}ms ${THEME_CONFIG.animations.easing}`;
            
            requestAnimationFrame(() => {
              element.style.opacity = '1';
              element.style.transform = 'translateX(0)';
            });
            break;
            
          default:
            element.style.opacity = '0';
            element.style.transition = `opacity ${THEME_CONFIG.animations.duration}ms ${THEME_CONFIG.animations.easing}`;
            
            requestAnimationFrame(() => {
              element.style.opacity = '1';
            });
        }
      }, parseInt(delay));
    }
  };

  // Header functionality
  const Header = {
    header: null,
    mobileMenuToggle: null,
    mobileNavOverlay: null,
    searchToggle: null,
    searchOverlay: null,
    searchClose: null,
    lastScrollY: 0,

    init: function() {
      this.header = document.querySelector('.site-header');
      this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
      this.mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
      this.searchToggle = document.querySelector('.search-toggle');
      this.searchOverlay = document.querySelector('.search-overlay');
      this.searchClose = document.querySelector('.search-close');

      if (!this.header) return;

      this.bindEvents();
      this.handleScroll();
    },

    bindEvents: function() {
      // Mobile menu toggle
      if (this.mobileMenuToggle && this.mobileNavOverlay) {
        this.mobileMenuToggle.addEventListener('click', () => {
          this.toggleMobileMenu();
        });

        // Close mobile menu when clicking overlay
        this.mobileNavOverlay.addEventListener('click', (e) => {
          if (e.target === this.mobileNavOverlay) {
            this.closeMobileMenu();
          }
        });

        // Close mobile menu when clicking nav links
        const mobileNavLinks = this.mobileNavOverlay.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
          link.addEventListener('click', () => {
            this.closeMobileMenu();
          });
        });
      }

      // Search functionality
      if (this.searchToggle && this.searchOverlay) {
        this.searchToggle.addEventListener('click', () => {
          this.openSearch();
        });
      }

      if (this.searchClose && this.searchOverlay) {
        this.searchClose.addEventListener('click', () => {
          this.closeSearch();
        });

        // Close search when clicking overlay
        this.searchOverlay.addEventListener('click', (e) => {
          if (e.target === this.searchOverlay) {
            this.closeSearch();
          }
        });
      }

      // Escape key functionality
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeMobileMenu();
          this.closeSearch();
        }
      });

      // Scroll handling
      window.addEventListener('scroll', utils.throttle(() => {
        this.handleScroll();
      }, 100));

      // Resize handling
      window.addEventListener('resize', utils.debounce(() => {
        if (!utils.isMobile()) {
          this.closeMobileMenu();
        }
      }, 250));
    },

    toggleMobileMenu: function() {
      if (this.mobileNavOverlay.classList.contains('active')) {
        this.closeMobileMenu();
      } else {
        this.openMobileMenu();
      }
    },

    openMobileMenu: function() {
      this.mobileMenuToggle.classList.add('active');
      this.mobileNavOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    },

    closeMobileMenu: function() {
      this.mobileMenuToggle.classList.remove('active');
      this.mobileNavOverlay.classList.remove('active');
      document.body.style.overflow = '';
    },

    openSearch: function() {
      this.searchOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Focus on search input
      const searchInput = this.searchOverlay.querySelector('.search-input');
      if (searchInput) {
        setTimeout(() => {
          searchInput.focus();
        }, 100);
      }
    },

    closeSearch: function() {
      this.searchOverlay.classList.remove('active');
      document.body.style.overflow = '';
    },

    handleScroll: function() {
      const currentScrollY = window.scrollY;
      
      // Add/remove header background based on scroll
      if (currentScrollY > 50) {
        this.header.style.background = 'rgba(26, 26, 26, 0.98)';
        this.header.style.backdropFilter = 'blur(15px)';
      } else {
        this.header.style.background = 'rgba(26, 26, 26, 0.95)';
        this.header.style.backdropFilter = 'blur(10px)';
      }

      // Hide/show header on scroll (mobile only)
      if (utils.isMobile()) {
        if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
          // Scrolling down
          this.header.style.transform = 'translateY(-100%)';
        } else {
          // Scrolling up
          this.header.style.transform = 'translateY(0)';
        }
      }

      this.lastScrollY = currentScrollY;
    }
  };

  // Product functionality
  const Product = {
    init: function() {
      this.initProductCards();
      this.initQuantitySelectors();
      this.initVariantSelectors();
    },

    initProductCards: function() {
      const productCards = document.querySelectorAll('.product-card');
      
      productCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', () => {
          const image = card.querySelector('img');
          if (image) {
            image.style.transform = 'scale(1.1)';
          }
        });

        card.addEventListener('mouseleave', () => {
          const image = card.querySelector('img');
          if (image) {
            image.style.transform = 'scale(1)';
          }
        });
      });
    },

    initQuantitySelectors: function() {
      const quantitySelectors = document.querySelectorAll('.quantity-selector');
      
      quantitySelectors.forEach(selector => {
        const minusBtn = selector.querySelector('.quantity-minus');
        const plusBtn = selector.querySelector('.quantity-plus');
        const input = selector.querySelector('.quantity-input');

        if (!minusBtn || !plusBtn || !input) return;

        minusBtn.addEventListener('click', () => {
          const currentValue = parseInt(input.value) || 1;
          if (currentValue > 1) {
            input.value = currentValue - 1;
            this.updateCartQuantity(input);
          }
        });

        plusBtn.addEventListener('click', () => {
          const currentValue = parseInt(input.value) || 1;
          input.value = currentValue + 1;
          this.updateCartQuantity(input);
        });

        input.addEventListener('change', () => {
          const value = parseInt(input.value) || 1;
          input.value = Math.max(1, value);
          this.updateCartQuantity(input);
        });
      });
    },

    initVariantSelectors: function() {
      const variantSelectors = document.querySelectorAll('.variant-selector');
      
      variantSelectors.forEach(selector => {
        const options = selector.querySelectorAll('input[type="radio"]');
        
        options.forEach(option => {
          option.addEventListener('change', () => {
            this.updateProductVariant(option);
          });
        });
      });
    },

    updateCartQuantity: function(input) {
      // This would integrate with Shopify's cart API
      console.log('Updating cart quantity:', input.value);
    },

    updateProductVariant: function(option) {
      // This would integrate with Shopify's variant API
      console.log('Updating product variant:', option.value);
    }
  };

  // Cart functionality
  const Cart = {
    cartCount: null,

    init: function() {
      this.cartCount = document.getElementById('cart-count');
      this.bindEvents();
      this.updateCartCount();
    },

    bindEvents: function() {
      // Add to cart buttons
      const addToCartButtons = document.querySelectorAll('[data-add-to-cart]');
      
      addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          this.addToCart(button);
        });
      });
    },

    addToCart: function(button) {
      // Show loading state
      const originalText = button.textContent;
      button.textContent = 'Adding...';
      button.disabled = true;

      // Simulate API call (replace with actual Shopify cart API)
      setTimeout(() => {
        button.textContent = 'Added!';
        button.classList.add('success');
        
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
          button.classList.remove('success');
        }, 1500);

        this.updateCartCount();
      }, 1000);
    },

    updateCartCount: function() {
      // This would integrate with Shopify's cart API
      if (this.cartCount) {
        // Simulate cart count update
        const currentCount = parseInt(this.cartCount.textContent) || 0;
        // this.cartCount.textContent = newCount;
      }
    }
  };

  // Newsletter functionality
  const Newsletter = {
    init: function() {
      const newsletterForms = document.querySelectorAll('.newsletter-form, .footer-newsletter-form');
      
      newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
          this.handleNewsletterSubmit(e, form);
        });
      });
    },

    handleNewsletterSubmit: function(e, form) {
      const email = form.querySelector('input[type="email"]').value;
      
      if (!this.validateEmail(email)) {
        e.preventDefault();
        this.showError(form, 'Please enter a valid email address.');
        return;
      }

      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;

        // Re-enable after form submission
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 2000);
      }
    },

    validateEmail: function(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    showError: function(form, message) {
      let errorDiv = form.querySelector('.form-error');
      
      if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        form.appendChild(errorDiv);
      }
      
      errorDiv.textContent = message;
      
      setTimeout(() => {
        errorDiv.remove();
      }, 5000);
    }
  };

  // Loading states
  const LoadingStates = {
    init: function() {
      this.showPageLoader();
      this.initLazyLoading();
    },

    showPageLoader: function() {
      // Create and show page loader
      const loader = document.createElement('div');
      loader.className = 'page-loader';
      loader.innerHTML = `
        <div class="loader-content">
          <div class="loader-logo">IGNITTI</div>
          <div class="loader-spinner"></div>
        </div>
      `;
      
      // Add loader styles
      const loaderStyle = document.createElement('style');
      loaderStyle.textContent = `
        .page-loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #1a1a1a;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity 0.5s ease;
        }
        .loader-content {
          text-align: center;
        }
        .loader-logo {
          font-family: 'Montserrat', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          color: #D4AF37;
          letter-spacing: 0.3em;
          margin-bottom: 1rem;
        }
        .loader-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(212, 175, 55, 0.3);
          border-top: 3px solid #D4AF37;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      
      document.head.appendChild(loaderStyle);
      document.body.appendChild(loader);
      
      // Hide loader when page is loaded
      window.addEventListener('load', () => {
        setTimeout(() => {
          loader.style.opacity = '0';
          setTimeout(() => {
            loader.remove();
            loaderStyle.remove();
          }, 500);
        }, 500);
      });
    },

    initLazyLoading: function() {
      if (!window.IntersectionObserver) return;

      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
      });
    }
  };

  // Accessibility enhancements
  const Accessibility = {
    init: function() {
      this.enhanceFocusManagement();
      this.addAriaLabels();
      this.handleKeyboardNavigation();
    },

    enhanceFocusManagement: function() {
      // Skip to main content link
      const skipLink = document.querySelector('.skip-to-content-link');
      if (skipLink) {
        skipLink.addEventListener('click', (e) => {
          e.preventDefault();
          const mainContent = document.getElementById('MainContent');
          if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView();
          }
        });
      }

      // Focus trap for modals
      const modals = document.querySelectorAll('.modal, .mobile-nav-overlay, .search-overlay');
      modals.forEach(modal => {
        modal.addEventListener('keydown', (e) => {
          if (e.key === 'Tab') {
            this.trapFocus(e, modal);
          }
        });
      });
    },

    trapFocus: function(e, container) {
      const focusableElements = container.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
      );
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }

      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    },

    addAriaLabels: function() {
      // Add aria-labels to buttons without text
      const iconButtons = document.querySelectorAll('button:not([aria-label])');
      iconButtons.forEach(button => {
        if (!button.textContent.trim()) {
          // Add appropriate aria-label based on context
          if (button.classList.contains('search-toggle')) {
            button.setAttribute('aria-label', 'Open search');
          } else if (button.classList.contains('mobile-menu-toggle')) {
            button.setAttribute('aria-label', 'Toggle navigation menu');
          }
        }
      });
    },

    handleKeyboardNavigation: function() {
      // Enhanced keyboard navigation for dropdowns
      const dropdownTriggers = document.querySelectorAll('.nav-item');
      
      dropdownTriggers.forEach(trigger => {
        const submenu = trigger.querySelector('.sub-menu');
        if (!submenu) return;

        trigger.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            submenu.style.opacity = submenu.style.opacity === '1' ? '0' : '1';
            submenu.style.visibility = submenu.style.visibility === 'visible' ? 'hidden' : 'visible';
          }
        });
      });
    }
  };

  // Performance optimizations
  const Performance = {
    init: function() {
      this.preloadCriticalImages();
      this.optimizeAnimations();
    },

    preloadCriticalImages: function() {
      // Preload above-the-fold images
      const criticalImages = [
        // Add URLs of critical images here
      ];

      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    },

    optimizeAnimations: function() {
      // Reduce animations for users who prefer reduced motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const style = document.createElement('style');
        style.textContent = `
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        `;
        document.head.appendChild(style);
      }
    }
  };

  // Initialize all modules when DOM is ready
  function init() {
    // Check if DOM is already loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeTheme);
    } else {
      initializeTheme();
    }
  }

  function initializeTheme() {
    try {
      LoadingStates.init();
      AnimationObserver.init();
      Header.init();
      Product.init();
      Cart.init();
      Newsletter.init();
      Accessibility.init();
      Performance.init();

      // Announce to other scripts that theme is initialized
      document.dispatchEvent(new CustomEvent('ignitti:theme:loaded'));
    } catch (error) {
      console.error('Error initializing Ignitti theme:', error);
    }
  }

  // Global theme object for external access
  window.IgnittiTheme = {
    config: THEME_CONFIG,
    utils: utils,
    modules: {
      AnimationObserver,
      Header,
      Product,
      Cart,
      Newsletter,
      LoadingStates,
      Accessibility,
      Performance
    }
  };

  // Initialize theme
  init();
})();
