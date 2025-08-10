// Integrated Theme Controls - Palette Selector
class IntegratedPaletteSelector {
    constructor() {
        this.palettes = [
            { id: 'default', name: 'Sky', colors: ['#0ea5e9', '#3b82f6'] },
            { id: 'sunset', name: 'Sunset', colors: ['#ea580c', '#dc2626'] },
            // Less saturated forest preview swatches
            { id: 'forest', name: 'Forest', colors: ['#3ba76b', '#2f7d53'] },
            { id: 'cyberpunk', name: 'Cyberpunk', colors: ['#a855f7', '#ec4899'] },
            { id: 'minimal', name: 'Minimal', colors: ['#6b7280', '#374151'] },
            { id: 'blackwhite', name: 'Black & White', colors: ['#000000', '#ffffff'] }
        ];
        
        this.currentPalette = 0;
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadSavedPalette();
        this.updateActiveState();
    }
    
    bindEvents() {
        // Palette option clicks
        const paletteOptions = document.querySelectorAll('.palette-option');
        paletteOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const paletteId = option.dataset.palette;
                this.setPaletteById(paletteId);
            });
        });
        
        // Keyboard shortcuts (same as dev version)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.altKey) {
                switch(e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.previousPalette();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.nextPalette();
                        break;
                    case ' ':
                        e.preventDefault();
                        this.randomPalette();
                        break;
                }
            }
        });
    }
    
    setPaletteById(paletteId) {
        const index = this.palettes.findIndex(p => p.id === paletteId);
        if (index !== -1) {
            this.setPalette(index);
        }
    }
    
    setPalette(index) {
        if (index >= 0 && index < this.palettes.length) {
            this.currentPalette = index;
            const palette = this.palettes[index];
            
            // Apply palette
            if (palette.id === 'default') {
                document.documentElement.removeAttribute('data-palette');
            } else {
                document.documentElement.setAttribute('data-palette', palette.id);
            }
            
            this.updateActiveState();
            this.savePalette(palette.id);
            this.updateParticles();
            
            console.log(`🎨 Palette switched to: ${palette.name}`);
        }
    }
    
    nextPalette() {
        const nextIndex = (this.currentPalette + 1) % this.palettes.length;
        this.setPalette(nextIndex);
    }
    
    previousPalette() {
        const prevIndex = this.currentPalette === 0 ? this.palettes.length - 1 : this.currentPalette - 1;
        this.setPalette(prevIndex);
    }
    
    randomPalette() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * this.palettes.length);
        } while (randomIndex === this.currentPalette && this.palettes.length > 1);
        this.setPalette(randomIndex);
    }
    
    updateActiveState() {
        const currentPalette = this.palettes[this.currentPalette];
        const paletteOptions = document.querySelectorAll('.palette-option');
        
        paletteOptions.forEach(option => {
            if (option.dataset.palette === currentPalette.id) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
    
    updateParticles() {
        // Use the same particle update logic as the dev version
        if (window.pJSDom && window.pJSDom.length > 0) {
            try {
                const computedStyle = getComputedStyle(document.documentElement);
                let primaryColor = computedStyle.getPropertyValue('--primary-color').trim();
                
                // Convert HSL to hex if needed
                if (primaryColor && primaryColor.startsWith('hsl(')) {
                    primaryColor = this.hslToHex(primaryColor);
                }
                
                // Fallback color
                const isDarkTheme = document.body.getAttribute('data-theme') === 'dark';
                const particleColor = (primaryColor && primaryColor.startsWith('#')) ? 
                    primaryColor : (isDarkTheme ? '#00d4ff' : '#0ea5e9');
                
                // Update particle colors using the official API
                const pJS = window.pJSDom[0].pJS;
                pJS.particles.color.value = particleColor;
                pJS.particles.line_linked.color = particleColor;
                
                // Refresh particles to apply new colors
                pJS.fn.particlesRefresh();
                
                console.log('✨ Particles colors updated:', particleColor);
                
            } catch (error) {
                console.warn('Error updating particle colors:', error);
                // Fallback: trigger theme change event
                const themeEvent = new CustomEvent('themeChanged');
                document.dispatchEvent(themeEvent);
            }
        }
    }
    
    hslToHex(hslString) {
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
            r = g = b = l;
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
    
    savePalette(paletteId) {
        try {
            // Save by ID for stability across palette additions/removals
            localStorage.setItem('selected-palette', paletteId);
        } catch (e) {
            // Fallback: save index
            localStorage.setItem('selected-palette', this.currentPalette.toString());
        }
    }
    
    loadSavedPalette() {
        const saved = localStorage.getItem('selected-palette');
        if (!saved) {
            // Default to Forest when nothing has been saved yet
            this.setPaletteById('forest');
            return;
        }
        // If saved is an ID, prefer it; if it's a number, keep backward compatibility
        const asNumber = Number(saved);
        if (!Number.isNaN(asNumber) && saved.trim() === asNumber.toString()) {
            // Old behavior: index
            const idx = asNumber;
            if (idx >= 0 && idx < this.palettes.length) this.setPalette(idx);
            return;
        }
        // New behavior: ID
        this.setPaletteById(saved);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new IntegratedPaletteSelector();
});
