/* ===================================
   IMAGE VALIDATION & ERROR HANDLING
   Checks for missing images and provides fallbacks
   =================================== */

(function() {
    'use strict';

    // Image validation and error handling
    function initImageValidation() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Handle image load errors
            img.addEventListener('error', function() {
                console.warn('Failed to load image:', this.src);
                
                // Provide fallback based on image context
                const fallbackSrc = getFallbackImage(this);
                if (fallbackSrc && this.src !== fallbackSrc) {
                    this.src = fallbackSrc;
                } else {
                    // Hide broken image if no fallback available
                    this.style.display = 'none';
                    
                    // Add placeholder if in a container
                    const container = this.closest('.about-img, .service-img, .wastewater-image, .meter-image');
                    if (container && !container.querySelector('.image-placeholder')) {
                        const placeholder = document.createElement('div');
                        placeholder.className = 'image-placeholder';
                        placeholder.innerHTML = '<i class="fas fa-image"></i><p>Image not available</p>';
                        placeholder.style.cssText = `
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            background: #f8f9fa;
                            border: 2px dashed #dee2e6;
                            border-radius: 8px;
                            padding: 40px;
                            color: #6c757d;
                            min-height: 200px;
                        `;
                        container.appendChild(placeholder);
                    }
                }
            });
            
            // Add loading class when image loads successfully
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        });
    }

    // Get appropriate fallback image based on context
    function getFallbackImage(imgElement) {
        const src = imgElement.src.toLowerCase();
        const alt = imgElement.alt.toLowerCase();
        
        // Logo fallbacks
        if (src.includes('logo') || alt.includes('logo')) {
            return 'assets/img/banner/b_logo.png';
        }
        
        // About page fallbacks
        if (src.includes('about') || alt.includes('about')) {
            return 'assets/img/banner/about.jpeg';
        }
        
        // Technology fallbacks
        if (src.includes('tech') || alt.includes('technology')) {
            return 'assets/img/banner/tech.jpg';
        }
        
        // Water treatment fallbacks
        if (src.includes('water') || alt.includes('water')) {
            return 'assets/img/banner/wplant.jpg';
        }
        
        // Environment fallbacks
        if (src.includes('environment') || alt.includes('environment')) {
            return 'assets/img/banner/rplant.jpg';
        }
        
        // Carbon monitoring fallbacks
        if (src.includes('carbon') || alt.includes('carbon')) {
            return 'assets/img/banner/cplant.jpg';
        }
        
        // Renewable energy fallbacks
        if (src.includes('renewable') || alt.includes('renewable')) {
            return 'assets/img/banner/rplant.jpg';
        }
        
        return null;
    }

    // Check for data-background images
    function initBackgroundImageValidation() {
        const elementsWithBg = document.querySelectorAll('[data-background]');
        
        elementsWithBg.forEach(element => {
            const bgImage = element.getAttribute('data-background');
            if (bgImage) {
                // Test if background image exists
                const testImg = new Image();
                testImg.onload = function() {
                    element.style.backgroundImage = `url(${bgImage})`;
                    element.style.backgroundSize = 'cover';
                    element.style.backgroundPosition = 'center';
                };
                testImg.onerror = function() {
                    console.warn('Failed to load background image:', bgImage);
                    // Use fallback background
                    element.style.backgroundImage = 'linear-gradient(135deg, #FF9800, #E53935)';
                };
                testImg.src = bgImage;
            }
        });
    }

    // Fix common image path issues
    function fixImagePaths() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            let src = img.src;
            
            // Fix empty or invalid paths
            if (!src || src.endsWith('/') || src.includes('undefined')) {
                const fallback = getFallbackImage(img);
                if (fallback) {
                    img.src = fallback;
                }
            }
            
            // Fix relative path issues
            if (src.includes('../') && !src.startsWith('http')) {
                img.src = src.replace(/\.\.\/+/g, '');
            }
        });
    }

    // Initialize when DOM is ready
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        try {
            fixImagePaths();
            initImageValidation();
            initBackgroundImageValidation();
            console.log('Image validation initialized');
        } catch (error) {
            console.error('Error initializing image validation:', error);
        }
    }

    // Start initialization
    init();

})();