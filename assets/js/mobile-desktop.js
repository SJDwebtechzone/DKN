/* ===================================
   COMPREHENSIVE MOBILE & DESKTOP JS
   Handles all interactive functionality
   =================================== */

(function() {
    'use strict';

    // ===================================
    // MOBILE MENU FUNCTIONALITY
    // ===================================
    
    function initMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile_menu');
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navigation = document.querySelector('#navigation');
        const body = document.body;
        
        // Handle mobile menu button click
        if (mobileMenuBtn && navigation) {
            mobileMenuBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleMobileMenu();
            });
        }
        
        // Handle navbar toggler click
        if (navbarToggler && navigation) {
            navbarToggler.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleMobileMenu();
            });
        }
        
        function toggleMobileMenu() {
            navigation.classList.toggle('active');
            body.classList.toggle('mobile-menu-open');
            
            // Animate hamburger icon
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.toggle('active');
            }
            if (navbarToggler) {
                navbarToggler.classList.toggle('active');
            }
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navigation && navigation.classList.contains('active')) {
                if (!navigation.contains(e.target) && 
                    !mobileMenuBtn?.contains(e.target) && 
                    !navbarToggler?.contains(e.target)) {
                    navigation.classList.remove('active');
                    body.classList.remove('mobile-menu-open');
                    mobileMenuBtn?.classList.remove('active');
                    navbarToggler?.classList.remove('active');
                }
            }
        });
        
        // Close mobile menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 991 && navigation) {
                navigation.classList.remove('active');
                body.classList.remove('mobile-menu-open');
                mobileMenuBtn?.classList.remove('active');
                navbarToggler?.classList.remove('active');
            }
        });
        
        // Handle dropdown menus in mobile
        const dropdownItems = document.querySelectorAll('.dropdown > a');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                if (window.innerWidth <= 991) {
                    e.preventDefault();
                    const dropdown = this.parentElement;
                    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                    
                    if (dropdownMenu) {
                        dropdownMenu.style.display = 
                            dropdownMenu.style.display === 'block' ? 'none' : 'block';
                    }
                }
            });
        });
    }

    // ===================================
    // RESPONSIVE IMAGE HANDLING
    // ===================================
    
    function initResponsiveImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading attribute for performance
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Handle image load errors
            img.addEventListener('error', function() {
                this.style.display = 'none';
                console.warn('Failed to load image:', this.src);
            });
            
            // Add loaded class when image loads
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        });
    }

    // ===================================
    // SCROLL ANIMATIONS
    // ===================================
    
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Observe all animation elements
        const animateElements = document.querySelectorAll(
            '.scroll-animate, .scroll-slide-left, .scroll-slide-right, ' +
            '.scroll-scale, .scroll-rotate, .scroll-bounce, ' +
            '.fade-up, .slide-in-left, .slide-in-right, .zoom-in, ' +
            '.rotate-in, .bounce-in, .flip-in, .slide-up, .elastic-bounce'
        );
        
        animateElements.forEach(el => observer.observe(el));
    }

    // ===================================
    // TOUCH GESTURES
    // ===================================
    
    function initTouchGestures() {
        let startX, startY, distX, distY;
        const threshold = 150;
        const restraint = 100;
        
        document.addEventListener('touchstart', function(e) {
            const touchobj = e.changedTouches[0];
            startX = touchobj.pageX;
            startY = touchobj.pageY;
        }, { passive: true });
        
        document.addEventListener('touchend', function(e) {
            const touchobj = e.changedTouches[0];
            distX = touchobj.pageX - startX;
            distY = touchobj.pageY - startY;
            
            // Swipe right to open mobile menu
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                if (distX > 0 && startX <= 50) { // Swipe right from left edge
                    const navigation = document.querySelector('#navigation');
                    if (navigation && !navigation.classList.contains('active')) {
                        navigation.classList.add('active');
                        document.body.classList.add('mobile-menu-open');
                    }
                }
                // Swipe left to close mobile menu
                else if (distX < 0) {
                    const navigation = document.querySelector('#navigation');
                    if (navigation && navigation.classList.contains('active')) {
                        navigation.classList.remove('active');
                        document.body.classList.remove('mobile-menu-open');
                    }
                }
            }
        }, { passive: true });
    }

    // ===================================
    // FORM ENHANCEMENTS
    // ===================================
    
    function initFormEnhancements() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                // Prevent zoom on iOS
                if (input.type === 'text' || input.type === 'email' || 
                    input.type === 'tel' || input.tagName === 'TEXTAREA') {
                    input.style.fontSize = '16px';
                }
                
                // Add floating labels effect
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    if (!this.value) {
                        this.parentElement.classList.remove('focused');
                    }
                });
            });
        });
    }

    // ===================================
    // PERFORMANCE OPTIMIZATIONS
    // ===================================
    
    function initPerformanceOptimizations() {
        // Debounce scroll events
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(function() {
                // Handle scroll-dependent functionality here
                updateScrollProgress();
            }, 16); // ~60fps
        }, { passive: true });
        
        // Debounce resize events
        let resizeTimeout;
        window.addEventListener('resize', function() {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(function() {
                handleResize();
            }, 250);
        });
        
        function updateScrollProgress() {
            const scrolled = window.pageYOffset;
            const maxHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (scrolled / maxHeight) * 100;
            
            // Update any scroll progress indicators
            const progressBars = document.querySelectorAll('.scroll-progress');
            progressBars.forEach(bar => {
                bar.style.width = progress + '%';
            });
        }
        
        function handleResize() {
            // Recalculate any size-dependent elements
            const viewportHeight = window.innerHeight;
            document.documentElement.style.setProperty('--vh', `${viewportHeight * 0.01}px`);
        }
        
        // Initial call
        handleResize();
    }

    // ===================================
    // IMAGE CAROUSEL FUNCTIONALITY
    // ===================================
    
    function initImageCarousels() {
        // Handle image switching for water treatment page
        if (typeof switchImage === 'undefined') {
            window.switchImage = function() {
                const mainImg = document.getElementById('mainImage');
                const altImg = document.getElementById('altImage');
                const thirdImg = document.getElementById('thirdImage');
                
                if (mainImg && altImg && thirdImg) {
                    const images = [mainImg, altImg, thirdImg];
                    let currentIndex = 0;
                    
                    // Find current visible image
                    images.forEach((img, index) => {
                        if (img.classList.contains('opacity-100')) {
                            currentIndex = index;
                        }
                    });
                    
                    // Hide current image
                    images[currentIndex].classList.remove('opacity-100');
                    images[currentIndex].classList.add('opacity-0');
                    
                    // Show next image
                    const nextIndex = (currentIndex + 1) % images.length;
                    images[nextIndex].classList.remove('opacity-0');
                    images[nextIndex].classList.add('opacity-100');
                }
            };
        }
        
        // Handle wind image switching for renewable energy page
        if (typeof switchWindImage === 'undefined') {
            window.switchWindImage = function() {
                const mainImg = document.getElementById('windMainImage');
                const altImg = document.getElementById('windAltImage');
                const thirdImg = document.getElementById('windThirdImage');
                
                if (mainImg && altImg && thirdImg) {
                    const images = [mainImg, altImg, thirdImg];
                    let currentIndex = 0;
                    
                    images.forEach((img, index) => {
                        if (img.classList.contains('opacity-100')) {
                            currentIndex = index;
                        }
                    });
                    
                    images[currentIndex].classList.remove('opacity-100');
                    images[currentIndex].classList.add('opacity-0');
                    
                    const nextIndex = (currentIndex + 1) % images.length;
                    images[nextIndex].classList.remove('opacity-0');
                    images[nextIndex].classList.add('opacity-100');
                }
            };
        }
    }

    // ===================================
    // ACCESSIBILITY ENHANCEMENTS
    // ===================================
    
    function initAccessibility() {
        // Add skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-to-content';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main landmark if not present
        if (!document.querySelector('main')) {
            const main = document.querySelector('.slider-area')?.parentElement;
            if (main && main.tagName !== 'MAIN') {
                main.setAttribute('role', 'main');
                main.id = 'main';
            }
        }
        
        // Enhance keyboard navigation
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        focusableElements.forEach(element => {
            element.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    if (this.tagName === 'A' || this.tagName === 'BUTTON') {
                        this.click();
                    }
                }
            });
        });
        
        // Add ARIA labels to interactive elements
        const mobileMenuBtn = document.querySelector('.mobile_menu');
        if (mobileMenuBtn && !mobileMenuBtn.getAttribute('aria-label')) {
            mobileMenuBtn.setAttribute('aria-label', 'Toggle mobile menu');
            mobileMenuBtn.setAttribute('role', 'button');
        }
        
        const navbarToggler = document.querySelector('.navbar-toggler');
        if (navbarToggler && !navbarToggler.getAttribute('aria-label')) {
            navbarToggler.setAttribute('aria-label', 'Toggle navigation menu');
        }
    }

    // ===================================
    // ERROR HANDLING
    // ===================================
    
    function initErrorHandling() {
        window.addEventListener('error', function(e) {
            console.error('JavaScript error:', e.error);
            // Optionally send error to analytics
        });
        
        window.addEventListener('unhandledrejection', function(e) {
            console.error('Unhandled promise rejection:', e.reason);
        });
    }

    // ===================================
    // INITIALIZATION
    // ===================================
    
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        try {
            initMobileMenu();
            initResponsiveImages();
            initScrollAnimations();
            initTouchGestures();
            initFormEnhancements();
            initPerformanceOptimizations();
            initImageCarousels();
            initAccessibility();
            initErrorHandling();
            
            console.log('Mobile & Desktop functionality initialized successfully');
        } catch (error) {
            console.error('Error initializing functionality:', error);
        }
    }

    // Start initialization
    init();

    // ===================================
    // UTILITY FUNCTIONS
    // ===================================
    
    // Expose utility functions globally
    window.MobileUtils = {
        isMobile: function() {
            return window.innerWidth <= 767;
        },
        
        isTablet: function() {
            return window.innerWidth > 767 && window.innerWidth <= 991;
        },
        
        isDesktop: function() {
            return window.innerWidth > 991;
        },
        
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
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
        }
    };

})();