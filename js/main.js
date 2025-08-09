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
        
        // Funzione per ottenere la configurazione delle particelle in base al tema
        function getParticlesConfig() {
            const isDarkTheme = document.body.getAttribute('data-theme') === 'dark';
            return {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: isDarkTheme ? '#00d4ff' : '#0ea5e9'
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
                        color: isDarkTheme ? '#00d4ff' : '#0ea5e9',
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
                            duration: 2
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
        
        // Funzione per inizializzare le particelle
        function initParticles() {
            const particlesContainer = document.getElementById('particles-js');
            if (!particlesContainer) return;
            
            // Pulisci il contenitore prima di inizializzare
            particlesContainer.innerHTML = '';
            
            // Assicurati che pJSDom esista come array
            if (typeof pJSDom === 'undefined' || pJSDom === null) {
                window.pJSDom = [];
            }
            
            // Inizializza le particelle
            particlesJS('particles-js', getParticlesConfig());
            
            // Salva il riferimento all'istanza con un piccolo ritardo per assicurarsi che sia inizializzata
            setTimeout(() => {
                if (typeof pJSDom !== 'undefined' && pJSDom !== null && Array.isArray(pJSDom) && pJSDom.length > 0) {
                    particlesInstance = pJSDom[0];
                }
            }, 50);
        }
        
        // Funzione per distruggere le particelle
        function destroyParticles() {
            try {
                // Metodo 1: Usa l'API moderna se disponibile
                if (particlesInstance && particlesInstance.pJS) {
                    if (particlesInstance.pJS.fn && particlesInstance.pJS.fn.vendors && particlesInstance.pJS.fn.vendors.destroypJS) {
                        particlesInstance.pJS.fn.vendors.destroypJS();
                    } else if (particlesInstance.pJS.fn && particlesInstance.pJS.fn.vendors && particlesInstance.pJS.fn.vendors.destroy) {
                        particlesInstance.pJS.fn.vendors.destroy();
                    }
                }
                
                // Metodo 2: Pulisci manualmente il DOM
                const particlesContainer = document.getElementById('particles-js');
                if (particlesContainer) {
                    // Rimuovi tutti i canvas esistenti
                    const canvases = particlesContainer.querySelectorAll('canvas');
                    canvases.forEach(canvas => canvas.remove());
                    
                    // Pulisci il contenuto
                    particlesContainer.innerHTML = '';
                }
                
                // Metodo 3: Rimuovi solo l'istanza specifica dall'array pJSDom
                if (typeof pJSDom !== 'undefined' && pJSDom !== null && Array.isArray(pJSDom)) {
                    // Trova e rimuovi l'istanza specifica invece di svuotare tutto l'array
                    const index = pJSDom.findIndex(instance => instance === particlesInstance);
                    if (index !== -1) {
                        pJSDom.splice(index, 1);
                    }
                }
                
                particlesInstance = null;
                
            } catch (error) {
                console.warn('Errore durante la distruzione delle particelle:', error);
                // Fallback: pulisci manualmente
                const particlesContainer = document.getElementById('particles-js');
                if (particlesContainer) {
                    particlesContainer.innerHTML = '';
                }
            }
        }
        
        // Inizializza le particelle
        initParticles();
        
        // Aggiorna le particelle quando cambia il tema
        document.addEventListener('themeChanged', function() {
            // Distruggi le particelle esistenti
            destroyParticles();
            
            // Ricrea con la nuova configurazione dopo un breve ritardo
            setTimeout(function() {
                initParticles();
            }, 150);
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
