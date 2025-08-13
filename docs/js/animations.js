/**
 * Animations functionality
 * Handles scroll animations and other visual effects
 */

// Intersection Observer per le animazioni
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-up, .slide-in').forEach(el => {
        observer.observe(el);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll down button functionality
    const scrollDownBtn = document.querySelector('.scroll-down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                window.scrollTo({
                    top: aboutSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });

        // Hide scroll indicator when hero is out of view (robust approach)
        const heroSection = document.querySelector('.hero');
        const aboutSection = document.querySelector('#about');
        const updateScrollIndicator = () => {
            if (!heroSection) return;
            const rect = heroSection.getBoundingClientRect();
            const heroVisible = rect.bottom > 80 && rect.top < window.innerHeight * 0.9;
            scrollDownBtn.classList.toggle('is-hidden', !heroVisible);
        };
        // Initial state
        updateScrollIndicator();
        // Update on scroll/resize
        window.addEventListener('scroll', updateScrollIndicator, { passive: true });
        window.addEventListener('resize', updateScrollIndicator);

        // Also hide as soon as the about section enters the viewport
        if (aboutSection && 'IntersectionObserver' in window) {
            const aboutObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        scrollDownBtn.classList.add('is-hidden');
                    }
                });
            }, { threshold: 0.01, rootMargin: '0px 0px -60% 0px' });
            aboutObserver.observe(aboutSection);
        }
    }
});
