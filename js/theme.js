/**
 * Theme toggle functionality
 * Handles switching between dark and light mode with improved UX
 */
// Inizializza le icone Lucide
document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

function toggleTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Funzione per impostare il tema e aggiornare l'interfaccia
    function setTheme(theme) {
        // Aggiorna l'attributo data-theme sul body
        body.setAttribute('data-theme', theme);
        
        // Update button aria-label
        if (theme === 'light') {
            themeToggle.setAttribute('aria-label', 'Switch to dark theme');
            themeToggle.setAttribute('title', 'Switch to dark theme');
        } else {
            themeToggle.setAttribute('aria-label', 'Switch to light theme');
            themeToggle.setAttribute('title', 'Switch to light theme');
        }
        
        // Salva la preferenza nel localStorage
        localStorage.setItem('theme', theme);
        
        // Emetti un evento personalizzato per notificare il cambio tema
        const themeChangedEvent = new Event('themeChanged');
        document.dispatchEvent(themeChangedEvent);
    }
    
    // Determina il tema iniziale (preferenza utente > preferenza sistema > default)
    function getInitialTheme() {
        // Controlla se l'utente ha una preferenza salvata
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        
        // Controlla le preferenze di sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }
        
        // Default: tema scuro
        return 'dark';
    }
    
    // Imposta il tema iniziale
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    
    // Gestisce il click sul pulsante theme toggle
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
    
    // Ascolta i cambiamenti nelle preferenze di sistema
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Cambia il tema solo se l'utente non ha una preferenza salvata
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}
