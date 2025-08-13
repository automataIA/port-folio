/**
 * Mobile Navigation Handler
 * Manages hamburger menu and responsive navigation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation elements
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listeners
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767) {
            closeMobileMenu();
        }
    });
    
    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    // Throttled scroll listener for performance
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll);
    
    // Initial call to set active link
    updateActiveNavLink();
});

/**
 * Touch gesture support for mobile navigation
 */
function initTouchGestures() {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navMenu) return;
    
    // Touch start
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });
    
    // Touch end
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    
    // Handle swipe gestures
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistanceX = touchEndX - touchStartX;
        const swipeDistanceY = Math.abs(touchEndY - touchStartY);
        
        // Only process horizontal swipes
        if (swipeDistanceY > swipeThreshold) return;
        
        // Swipe left to close menu (when menu is open)
        if (swipeDistanceX < -swipeThreshold && navMenu.classList.contains('active')) {
            document.querySelector('.hamburger').click();
        }
        
        // Swipe right to open menu (when menu is closed and near left edge)
        if (swipeDistanceX > swipeThreshold && !navMenu.classList.contains('active') && touchStartX < 50) {
            document.querySelector('.hamburger').click();
        }
    }
}

// Initialize touch gestures when DOM is loaded
document.addEventListener('DOMContentLoaded', initTouchGestures);

/**
 * Responsive image loading
 */
function initResponsiveImages() {
    // Add lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// Initialize responsive images
document.addEventListener('DOMContentLoaded', initResponsiveImages);

/**
 * Viewport height fix for mobile browsers
 */
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set initial viewport height
setViewportHeight();

// Update on resize and orientation change
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', () => {
    setTimeout(setViewportHeight, 100);
});

/**
 * Performance optimizations for mobile
 */
function initMobileOptimizations() {
    // Particle count is now managed in main.js based on screen size
    // No need to manually reduce particles here
    
    // Disable animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
        document.documentElement.style.setProperty('--animation-duration', '0s');
        document.documentElement.style.setProperty('--transition-duration', '0s');
    }
}

// Initialize mobile optimizations
document.addEventListener('DOMContentLoaded', initMobileOptimizations);
