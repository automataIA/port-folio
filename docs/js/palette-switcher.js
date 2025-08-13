/**
 * Dynamic Palette Switcher System
 * Allows easy switching between multiple color palettes during development
 */
class PaletteSwitcher {
    constructor() {
        this.palettes = [
            { 
                name: 'Default', 
                id: 'default', 
                colors: { primary: '#00d4ff', secondary: '#0066ff' },
                description: 'Original blue/cyan theme'
            },
            { 
                name: 'Ocean', 
                id: 'ocean', 
                colors: { primary: '#00b4d8', secondary: '#90e0ef' },
                description: 'Cool blues and teals'
            },
            { 
                name: 'Sunset', 
                id: 'sunset', 
                colors: { primary: '#ff6b35', secondary: '#f7931e' },
                description: 'Warm oranges and reds'
            },
            { 
                name: 'Forest', 
                id: 'forest', 
                colors: { primary: '#52b788', secondary: '#b7e4c7' },
                description: 'Natural greens'
            },
            { 
                name: 'Cyberpunk', 
                id: 'cyberpunk', 
                colors: { primary: '#e0aaff', secondary: '#c77dff' },
                description: 'Neon purples and magentas'
            },
            { 
                name: 'Minimal', 
                id: 'minimal', 
                colors: { primary: '#495057', secondary: '#6c757d' },
                description: 'Sophisticated grays'
            },
            { 
                name: 'Warm', 
                id: 'warm', 
                colors: { primary: '#f77f00', secondary: '#fcbf49' },
                description: 'Cozy oranges and yellows'
            },
            { 
                name: 'Cool', 
                id: 'cool', 
                colors: { primary: '#219ebc', secondary: '#8ecae6' },
                description: 'Fresh blues and cyans'
            },
            { 
                name: 'Vintage', 
                id: 'vintage', 
                colors: { primary: '#bc6c25', secondary: '#dda15e' },
                description: 'Earthy browns and golds'
            },
            { 
                name: 'Neon', 
                id: 'neon', 
                colors: { primary: '#39ff14', secondary: '#ff073a' },
                description: 'Electric greens and pinks'
            },
            { 
                name: 'Monochrome', 
                id: 'monochrome', 
                colors: { primary: '#333333', secondary: '#666666' },
                description: 'Pure black and white contrast'
            }
        ];
        
        this.currentPalette = 0;
        this.isDevelopmentMode = this.checkDevelopmentMode();
        
        if (this.isDevelopmentMode) {
            this.createDevControls();
            this.bindEvents();
            this.loadSavedPalette();
        }
    }
    
    checkDevelopmentMode() {
        // Check if we're in development mode
        return location.hostname === 'localhost' || 
               location.hostname === '127.0.0.1' || 
               location.protocol === 'file:' ||
               new URLSearchParams(location.search).has('dev-palettes') ||
               localStorage.getItem('dev-palettes-enabled') === 'true';
    }
    
    createDevControls() {
        const controls = document.createElement('div');
        controls.className = 'dev-palette-controls';
        controls.innerHTML = `
            <div class="palette-header">
                <span class="palette-title">🎨 Dev Palettes</span>
                <button id="toggle-controls" class="toggle-btn">−</button>
            </div>
            <div class="palette-content">
                <div class="palette-selector">
                    <select id="palette-select">
                        ${this.palettes.map((palette, index) => 
                            `<option value="${index}">${palette.name}</option>`
                        ).join('')}
                    </select>
                    <div class="palette-buttons">
                        <button id="prev-palette" title="Previous palette (Ctrl+Alt+←)">←</button>
                        <button id="next-palette" title="Next palette (Ctrl+Alt+→)">→</button>
                        <button id="random-palette" title="Random palette (Ctrl+Alt+Space)">🎲</button>
                    </div>
                </div>
                <div class="palette-preview">
                    <div class="color-preview">
                        <div class="color-swatch primary-swatch"></div>
                        <div class="color-swatch secondary-swatch"></div>
                    </div>
                    <div class="palette-description"></div>
                </div>
                <div class="palette-actions">
                    <button id="export-palette">Export CSS</button>
                    <button id="reset-palette">Reset</button>
                </div>
            </div>
        `;
        
        this.injectStyles();
        document.body.appendChild(controls);
        this.updatePreview();
    }
    
    injectStyles() {
        const styles = `
            .dev-palette-controls {
                position: fixed;
                top: 70px;
                right: 20px;
                z-index: 10000;
                background: rgba(0, 0, 0, 0.95);
                backdrop-filter: blur(10px);
                padding: 0;
                border-radius: 12px;
                border: 1px solid var(--border-color);
                font-family: 'Segoe UI', system-ui, sans-serif;
                font-size: 0.85rem;
                width: 280px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                transition: all 0.3s ease;
            }
            
            .palette-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem;
                border-bottom: 1px solid #333;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 12px 12px 0 0;
            }
            
            .palette-title {
                color: white;
                font-weight: 600;
                font-size: 0.9rem;
            }
            
            .toggle-btn {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0.2rem 0.5rem;
                border-radius: 4px;
                transition: background 0.2s ease;
            }
            
            .toggle-btn:hover {
                background: rgba(255, 255, 255, 0.1);
            }
            
            .palette-content {
                padding: 1rem;
                transition: all 0.3s ease;
            }
            
            .palette-content.collapsed {
                display: none;
            }
            
            .palette-selector {
                margin-bottom: 1rem;
            }
            
            .palette-selector select {
                width: 100%;
                padding: 0.5rem;
                border-radius: 6px;
                border: 1px solid #444;
                background: #222;
                color: white;
                font-size: 0.85rem;
                margin-bottom: 0.5rem;
            }
            
            .palette-buttons {
                display: flex;
                gap: 0.5rem;
                justify-content: center;
            }
            
            .palette-buttons button {
                padding: 0.4rem 0.8rem;
                border-radius: 6px;
                border: 1px solid #444;
                background: #333;
                color: white;
                cursor: pointer;
                font-size: 0.85rem;
                transition: all 0.2s ease;
            }
            
            .palette-buttons button:hover {
                background: #555;
                transform: translateY(-1px);
            }
            
            .palette-preview {
                margin-bottom: 1rem;
                padding: 0.75rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
            }
            
            .color-preview {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 0.5rem;
            }
            
            .color-swatch {
                width: 40px;
                height: 40px;
                border-radius: 8px;
                border: 2px solid rgba(255, 255, 255, 0.2);
                transition: all 0.3s ease;
            }
            
            .palette-description {
                color: #ccc;
                font-size: 0.8rem;
                font-style: italic;
            }
            
            .palette-actions {
                display: flex;
                gap: 0.5rem;
            }
            
            .palette-actions button {
                flex: 1;
                padding: 0.5rem;
                border-radius: 6px;
                border: 1px solid #444;
                background: #333;
                color: white;
                cursor: pointer;
                font-size: 0.8rem;
                transition: all 0.2s ease;
            }
            
            .palette-actions button:hover {
                background: #555;
            }
            
            /* Responsive adjustments */
            @media (max-width: 768px) {
                .dev-palette-controls {
                    right: 10px;
                    width: 260px;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    bindEvents() {
        // Palette selector
        document.getElementById('palette-select').addEventListener('change', (e) => {
            this.setPalette(parseInt(e.target.value));
        });
        
        // Navigation buttons
        document.getElementById('prev-palette').addEventListener('click', () => {
            this.previousPalette();
        });
        
        document.getElementById('next-palette').addEventListener('click', () => {
            this.nextPalette();
        });
        
        document.getElementById('random-palette').addEventListener('click', () => {
            this.randomPalette();
        });
        
        // Control toggle
        document.getElementById('toggle-controls').addEventListener('click', (e) => {
            const content = document.querySelector('.palette-content');
            const button = e.target;
            
            if (content.classList.contains('collapsed')) {
                content.classList.remove('collapsed');
                button.textContent = '−';
            } else {
                content.classList.add('collapsed');
                button.textContent = '+';
            }
        });
        
        // Action buttons
        document.getElementById('export-palette').addEventListener('click', () => {
            this.exportCurrentPalette();
        });
        
        document.getElementById('reset-palette').addEventListener('click', () => {
            this.setPalette(0);
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.altKey) {
                switch(e.code) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.previousPalette();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.nextPalette();
                        break;
                    case 'Space':
                        e.preventDefault();
                        this.randomPalette();
                        break;
                }
            }
        });
    }
    
    setPalette(index) {
        if (index >= 0 && index < this.palettes.length) {
            this.currentPalette = index;
            const palette = this.palettes[index];
            
            if (palette.id === 'default') {
                document.documentElement.removeAttribute('data-palette');
            } else {
                document.documentElement.setAttribute('data-palette', palette.id);
            }
            
            document.getElementById('palette-select').value = index;
            this.updatePreview();
            this.savePalette();
            
            // Force particle reinitialization with new colors
            this.reinitializeParticles();
            
            console.log(`🎨 Palette switched to: ${palette.name} - ${palette.description}`);
        }
    }
    
    updatePreview() {
        const palette = this.palettes[this.currentPalette];
        const primarySwatch = document.querySelector('.primary-swatch');
        const secondarySwatch = document.querySelector('.secondary-swatch');
        const description = document.querySelector('.palette-description');
        
        if (primarySwatch && secondarySwatch && description) {
            primarySwatch.style.backgroundColor = palette.colors.primary;
            secondarySwatch.style.backgroundColor = palette.colors.secondary;
            description.textContent = palette.description;
        }
    }
    
    nextPalette() {
        this.setPalette((this.currentPalette + 1) % this.palettes.length);
    }
    
    previousPalette() {
        this.setPalette(this.currentPalette === 0 ? this.palettes.length - 1 : this.currentPalette - 1);
    }
    
    randomPalette() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * this.palettes.length);
        } while (randomIndex === this.currentPalette && this.palettes.length > 1);
        
        this.setPalette(randomIndex);
    }
    
    exportCurrentPalette() {
        const palette = this.palettes[this.currentPalette];
        const cssCode = `/* ${palette.name} Palette */
[data-palette="${palette.id}"] {
    --primary-color: ${palette.colors.primary};
    --secondary-color: ${palette.colors.secondary};
}`;
        
        navigator.clipboard.writeText(cssCode).then(() => {
            console.log('✅ Palette CSS copied to clipboard');
            // Show temporary notification
            this.showNotification('Palette CSS copied to clipboard!');
        });
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 10001;
            font-size: 0.9rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        const keyframes = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = keyframes;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    savePalette() {
        localStorage.setItem('dev-current-palette', this.currentPalette.toString());
    }
    
    loadSavedPalette() {
        const saved = localStorage.getItem('dev-current-palette');
        if (saved !== null) {
            const paletteIndex = parseInt(saved);
            if (paletteIndex >= 0 && paletteIndex < this.palettes.length) {
                this.setPalette(paletteIndex);
            }
        }
    }
    
    reinitializeParticles() {
        const particlesContainer = document.getElementById('particles-js');
        if (!particlesContainer) return;
        
        console.log('🔄 Updating particles colors for new palette...');
        
        // Use the correct particles.js API to update colors dynamically
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
                
                console.log('Setting particle color to:', particleColor);
                
                // Update particle colors using the official API
                const pJS = window.pJSDom[0].pJS;
                pJS.particles.color.value = particleColor;
                pJS.particles.line_linked.color = particleColor;
                
                // Refresh particles to apply new colors
                pJS.fn.particlesRefresh();
                
                console.log('✨ Particles colors updated successfully');
                
            } catch (error) {
                console.warn('Error updating particle colors:', error);
                // Fallback: trigger theme change event
                const themeEvent = new CustomEvent('themeChanged');
                document.dispatchEvent(themeEvent);
            }
        } else {
            console.warn('pJSDom not available, using fallback method');
            // Fallback: trigger theme change event
            const themeEvent = new CustomEvent('themeChanged');
            document.dispatchEvent(themeEvent);
        }
    }
    
    initParticlesDirect() {
        // Direct particles.js initialization as fallback
        const computedStyle = getComputedStyle(document.documentElement);
        let primaryColor = computedStyle.getPropertyValue('--primary-color').trim();
        
        // Convert HSL to hex if needed
        if (primaryColor.startsWith('hsl(')) {
            primaryColor = this.hslToHex(primaryColor);
        }
        
        const isDarkTheme = document.body.getAttribute('data-theme') === 'dark';
        const particleColor = primaryColor || (isDarkTheme ? '#00d4ff' : '#0ea5e9');
        
        const config = {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: particleColor },
                shape: { type: 'circle' },
                opacity: { 
                    value: isDarkTheme ? 0.5 : 0.8, 
                    random: true,
                    anim: { enable: true, speed: 1, opacity_min: isDarkTheme ? 0.1 : 0.25, sync: false }
                },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: particleColor,
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
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        };
        
        if (window.particlesJS) {
            particlesJS('particles-js', config);
            console.log('✨ Particles initialized directly with color:', particleColor);
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
}

// Initialize the palette switcher
function initPaletteSwitcher() {
    if (typeof window !== 'undefined') {
        window.paletteSwitcher = new PaletteSwitcher();
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPaletteSwitcher);
} else {
    initPaletteSwitcher();
}
