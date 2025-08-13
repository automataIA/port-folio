/**
 * Main JavaScript file
 * Initializes components and handles main functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize theme toggle
    toggleTheme();
    
    // Initialize particles.js for hero section background
    if (document.getElementById('particles-js')) {
        let particlesInstance = null;
        
        // Function to convert HSL to hex
        function hslToHex(hslString) {
            // Parse HSL string like "hsl(195, 100%, 55%)"
            const match = hslString.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
            if (!match) return hslString;
            
            const h = parseInt(match[1]) / 360;
            const s = parseInt(match[2]) / 100;
            const l = parseInt(match[3]) / 100;
            
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            
            let r, g, b;
            if (s === 0) {
                r = g = b = l; // achromatic
            } else {
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                r = hue2rgb(p, q, h + 1/3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1/3);
            }
            
            const toHex = (c) => {
                const hex = Math.round(c * 255).toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            };
            
            return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
        }
        
        // Function to get current CSS color values
        function getCurrentColors() {
            const computedStyle = getComputedStyle(document.documentElement);
            let primary = computedStyle.getPropertyValue('--primary-color').trim();
            let secondary = computedStyle.getPropertyValue('--secondary-color').trim();
            
            console.log('Raw CSS colors:', { primary, secondary });
            
            // Convert HSL to hex if needed
            if (primary && primary.startsWith('hsl(')) {
                const converted = hslToHex(primary);
                console.log('HSL to hex conversion:', primary, '->', converted);
                primary = converted;
            }
            if (secondary && secondary.startsWith('hsl(')) {
                secondary = hslToHex(secondary);
            }
            
            // Fallback colors if conversion failed or colors are empty
            const isDarkTheme = document.body.getAttribute('data-theme') === 'dark';
            const finalColors = {
                primary: (primary && primary.startsWith('#')) ? primary : (isDarkTheme ? '#00d4ff' : '#0ea5e9'),
                secondary: (secondary && secondary.startsWith('#')) ? secondary : (isDarkTheme ? '#0066ff' : '#0033aa')
            };
            
            console.log('Final particle colors:', finalColors);
            return finalColors;
        }
        
        // Funzione per ottenere la configurazione delle particelle in base al tema e palette
        function getParticlesConfig() {
            const isDarkTheme = document.body.getAttribute('data-theme') === 'dark';
            const colors = getCurrentColors();
            
            // Determina il numero di particelle in base alla dimensione dello schermo
            const isMobile = window.innerWidth <= 768;
            const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
            
            let particleCount = 120; // Desktop default
            if (isMobile) {
                particleCount = 30; // Mobile ridotto
            } else if (isTablet) {
                particleCount = 60; // Tablet intermedio
            }
            
            return {
                particles: {
                    number: {
                        value: particleCount,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: colors.primary || (isDarkTheme ? '#00d4ff' : '#0ea5e9')
                    },
                    shape: {
                        type: 'circle',
                        stroke: {
                            width: 0,
                            color: '#000000'
                        },
                    },
                    opacity: {
                        value: isDarkTheme ? 0.5 : 0.8,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: isDarkTheme ? 0.1 : 0.25,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 40,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: colors.primary || (isDarkTheme ? '#00d4ff' : '#0ea5e9'),
                        opacity: isDarkTheme ? 0.4 : 0.55,
                        width: isDarkTheme ? 1 : 1.3
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'grab'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        bubble: {
                            distance: 400,
                            size: 40,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4
                        },
                        push: {
                            particles_nb: 4
                        },
                        remove: {
                            particles_nb: 2
                        }
                    }
                },
                retina_detect: true
            };
        }
        
        // Funzione per distruggere le particelle esistenti
        function destroyParticles() {
            try {
                // Metodo 1: Usa l'API particles.js corretta
                if (particlesInstance && particlesInstance.pJS) {
                    if (particlesInstance.pJS.fn && particlesInstance.pJS.fn.vendors && particlesInstance.pJS.fn.vendors.destroypJS) {
                        particlesInstance.pJS.fn.vendors.destroypJS();
                    }
                }
                
                // Metodo 2: Cleanup manuale del DOM
                const particlesContainer = document.getElementById('particles-js');
                if (particlesContainer) {
                    // Rimuovi tutti i canvas esistenti
                    const canvases = particlesContainer.querySelectorAll('canvas');
                    canvases.forEach(canvas => canvas.remove());
                    particlesContainer.innerHTML = '';
                }
                
                // Metodo 3: Cleanup dell'oggetto globale pJSDom
                if (window.pJSDom && Array.isArray(window.pJSDom)) {
                    window.pJSDom.length = 0;
                }
                
                particlesInstance = null;
                console.log('🗑️ Particles destroyed successfully');
                
            } catch (error) {
                console.warn('Errore durante la distruzione delle particelle:', error);
                // Fallback: cleanup manuale forzato
                const particlesContainer = document.getElementById('particles-js');
                if (particlesContainer) {
                    particlesContainer.innerHTML = '';
                }
                particlesInstance = null;
            }
        }
        
        // Funzione per inizializzare le particelle
        function initParticles() {
            const container = document.getElementById('particles-js');
            if (!container) return;
            
            // Pulisci il contenitore prima di inizializzare
            container.innerHTML = '';
            
            // Aspetta un momento per assicurarsi che i CSS siano caricati
            setTimeout(() => {
                // Inizializza particles.js con la configurazione corrente
                particlesJS('particles-js', getParticlesConfig());
                
                // Salva l'istanza per la distruzione futura
                setTimeout(() => {
                    if (window.pJSDom && window.pJSDom.length > 0) {
                        particlesInstance = window.pJSDom[0];
                        console.log('✨ Particles initialized with colors:', getCurrentColors());
                    }
                }, 100);
            }, 50);
        }
        
        // Expose functions globally for palette switcher
        window.destroyParticles = destroyParticles;
        window.initParticles = initParticles;
        window.particlesInstance = particlesInstance;
        
        // Handle window resize to update particle count
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                // Reinitialize particles with new count based on current screen size
                if (window.pJSDom && window.pJSDom[0]) {
                    destroyParticles();
                    setTimeout(initParticles, 100);
                }
            }, 250); // Debounce resize events
        });

        // Initialize particles when DOM is loaded
        initParticles();
        
        // Apply profile image data attributes directly to styles
        const profilePhoto = document.querySelector('.profile-photo');
        if (profilePhoto) {
            const zoom = profilePhoto.getAttribute('data-zoom');
            const posX = profilePhoto.getAttribute('data-position-x');
            const posY = profilePhoto.getAttribute('data-position-y');
            
            if (zoom) {
                profilePhoto.style.width = zoom + '%';
                profilePhoto.style.height = zoom + '%';
            }
            if (posX) {
                profilePhoto.style.left = posX + '%';
            }
            if (posY) {
                profilePhoto.style.top = posY + '%';
            }
            
            console.log('Profile image parameters applied:', { zoom, posX, posY });
        }

        // Aggiorna le particelle quando cambia il tema
        document.addEventListener('themeChanged', function() {
            console.log('🔄 Theme changed, updating particles...');
            
            // Prova prima ad aggiornare i colori dinamicamente
            if (window.pJSDom && window.pJSDom.length > 0) {
                try {
                    const colors = getCurrentColors();
                    const pJS = window.pJSDom[0].pJS;
                    pJS.particles.color.value = colors.primary;
                    pJS.particles.line_linked.color = colors.primary;
                    pJS.fn.particlesRefresh();
                    console.log('✨ Particles colors updated for theme change:', colors);
                    return;
                } catch (error) {
                    console.warn('Failed to update particles dynamically, reinitializing...', error);
                }
            }
            
            // Fallback: distruggi e ricrea
            destroyParticles();
            setTimeout(function() {
                initParticles();
            }, 200);
        });
    }
    
    // Form validation for contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = this.querySelector('[name="name"]').value;
            const email = this.querySelector('[name="email"]').value;
            const message = this.querySelector('[name="message"]').value;
            
            let isValid = true;
            let errorMessage = '';
            
            if (!name.trim()) {
                isValid = false;
                errorMessage = 'Please enter your name.';
            } else if (!email.trim() || !email.includes('@')) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            } else if (!message.trim()) {
                isValid = false;
                errorMessage = 'Please enter a message.';
            }
            
            if (isValid) {
                // Here you would typically send the form data to a server
                alert('Thank you for your message! I will get back to you as soon as possible.');
                this.reset();
            } else {
                alert(errorMessage);
            }
        });
    }
});
