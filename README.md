# Carlo Calledda - AI & Machine Learning Engineer Portfolio
 
 ![Portfolio Preview](docs/assets/images/port.png)

> A modern, responsive portfolio website showcasing expertise in Artificial Intelligence, Data Science, and Machine Learning Engineering.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Customization](#customization)
- [Theme System](#theme-system)
- [Project Structure](#-project-structure)

## ✨ Features

### **Theme System**
- **Dark/Light Mode Toggle** - Seamless switching between themes
- **Persistent Settings** - Theme preferences saved in localStorage
- **Smooth Transitions** - Elegant animations between theme changes

### **Interactive Elements**
- **Animated Mesh Gradient Background** - Premium floating orb effects
- **Responsive Design** - Optimized for all devices and screen sizes
- **Smooth Scrolling** - Enhanced navigation experience
- **SVG Icons** - Custom icon system with animations

### **Content Sections**
- **Hero Section** - Eye-catching introduction with animated badge
- **About** - Professional background and expertise
- **Skills** - Technical competencies organized by category
- **Projects** - Featured work with descriptions and technologies
- **Publications** - Scientific publications and research
- **Certifications** - Professional achievements and credentials

### **Technical Highlights**
- **Single File Architecture** - All CSS and JavaScript inline in HTML
- **Modern CSS Features** - CSS Grid, Flexbox, Custom Properties, @property
- **Vanilla JavaScript** - No framework dependencies, pure performance
- **SEO Optimized** - Proper meta tags and semantic HTML
- **Accessibility** - ARIA labels and keyboard navigation support

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid, Flexbox, and Custom Properties
- **JavaScript (ES6+)** - Interactive functionality
- **SVG Icons** - Custom icon system with animations

### Design & UX
- **DM Sans & DM Mono** - Modern typography from Google Fonts
- **CSS Custom Properties** - Dynamic theming system
- **Responsive Design** - Mobile-first approach
- **Modern Animations** - Hardware-accelerated with prefers-reduced-motion respect

### Tools & Deployment
- **GitHub Pages** - Static site hosting
- **Git** - Version control

## 🎨 Customization

### Personal Information
Edit the content in `docs/index.html`:
- Update personal details in the hero section
- Modify skills, projects, and experience sections
- Add your own projects and achievements

### Styling
Customize the appearance by editing the CSS directly in `docs/index.html`:
- All styles are inline in the `<style>` section
- CSS Custom Properties are defined in `:root` for easy theming
- Responsive breakpoints are included in the same stylesheet

### Theme System
Modify theme colors by editing CSS Custom Properties in `docs/index.html`:
```css
:root {
    --pri: oklch(0.52 0.18 275);  /* Primary color */
    --sec: oklch(0.45 0.04 250);  /* Secondary color */
    --acc: oklch(0.58 0.12 195);  /* Accent color */
    /* Add more custom colors */
}
```

## Theme System

This portfolio features a modern theming system with:

### Theme Persistence
- Settings saved to localStorage
- Manual theme toggle with smooth transitions
- Light theme as default with proper dark mode support

### Visual Effects
- Animated mesh gradient background with floating orbs
- Theme-adaptive colors and opacity
- Hardware-accelerated animations with performance optimization
- Cross-browser compatibility with graceful degradation

## Project Structure

```
portfolio/
├── docs/                          # Main website files
│   ├── index.html                 # Single HTML file with inline CSS/JS
│   ├── assets/                    # Images and media
│   │   └── images/                # Portfolio screenshots
│   │       └── port.png          # Preview image
│   └── .nojekyll                  # GitHub Pages configuration
├── .gitignore                     # Git ignore rules
└── README.md                      # This file
```


## Updates & Maintenance

### Adding New Projects
1. Edit the projects section in `index.html`
2. Add project images to `assets/images/`
3. Update project cards with your information

### Performance Optimization
- Single file architecture for optimal loading
- Modern CSS with hardware acceleration
- Efficient JavaScript with minimal DOM manipulation
- Optimized animations with `prefers-reduced-motion` support
