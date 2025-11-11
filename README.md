# 🚀 Carlo Calledda - AI & Machine Learning Engineer Portfolio
 
 ![Portfolio Preview](docs/assets/images/port.png)
 
 [![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://your-portfolio-url.github.io)
 [![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/your-username/portfolio)

> A modern, responsive portfolio website showcasing expertise in Artificial Intelligence, Data Science, and Machine Learning Engineering.

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Technologies Used](#️-technologies-used)
- [🚀 Live Demo](#-live-demo)
- [📱 Screenshots](#-screenshots)
- [⚙️ Installation](#️-installation)
- [🎨 Customization](#-customization)
- [🌈 Theme System](#-theme-system)
- [🔧 Project Structure](#-project-structure)
- [📄 License](#-license)
- [📞 Contact](#-contact)

## ✨ Features

### 🎨 **Advanced Theme System**
- **Dark/Light Mode Toggle** - Seamless switching between themes
- **Dynamic Color Palettes** - Multiple color schemes (Forest, Black & White, and more)
- **Persistent Settings** - Theme preferences saved across sessions
- **Smooth Transitions** - Elegant animations between theme changes

### 🌟 **Interactive Elements**
- **Particle.js Integration** - Dynamic background particles that adapt to themes
- **Responsive Design** - Optimized for all devices and screen sizes
- **Smooth Scrolling** - Enhanced navigation experience
- **Lucide Icons** - Modern, scalable icon system

### 📊 **Content Sections**
- **Hero Section** - Eye-catching introduction with animated particles
- **About** - Professional background and expertise
- **Skills** - Technical competencies organized by category
- **Projects** - Featured work with descriptions and technologies
- **Publications** - Scientific publications and research
- **Certifications** - Professional achievements and credentials

### 🔧 **Technical Highlights**
- **Modular CSS Architecture** - Organized, maintainable stylesheets
- **Vanilla JavaScript** - No framework dependencies, pure performance
- **SEO Optimized** - Proper meta tags and semantic HTML
- **Accessibility** - ARIA labels and keyboard navigation support

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Interactive functionality
- **Particles.js** - Dynamic background effects

### Design & UX
- **Inter Font Family** - Modern typography
- **Lucide Icons** - Consistent iconography
- **CSS Custom Properties** - Dynamic theming system
- **Responsive Design** - Mobile-first approach

### Tools & Deployment
- **GitHub Pages** - Static site hosting
- **Git** - Version control
- **CSS Modules** - Organized stylesheet architecture

## 📱 Theme Variations and Views

### Theme Variations
- **Forest** - Natural palette with greens, symbolizing growth and harmony
- **Cyberpunk** - Electric and futuristic tones for a digital aesthetic
- **Minimal** - Clean, sophisticated design with neutral tones
- **Black & White** - Classic high-contrast design for strong visual impact

### Responsive Design
- **Desktop View** - Full-featured layout optimized for larger screens
- **Tablet View** - Adapted layout for medium-sized devices
- **Mobile View** - Streamlined interface for smartphones with optimized navigation

## ⚙️ Installation

### Prerequisites
- A modern web browser
- Basic understanding of HTML/CSS/JavaScript (for customization)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

2. **Navigate to the docs folder**
   ```bash
   cd docs
   ```

3. **Open in browser**
   - Open `index.html` in your preferred browser
   - Or use a local server:
   ```bash
   # Using Python with uv
   uv run python -m http.server 8000 --directory docs

   # Using Python
   python -m http.server 8000 --directory docs

   # Using Node.js
   npx serve .

   # Using PHP
   php -S localhost:8000
   ```

4. **View the portfolio**
   - Open http://localhost:8000 in your browser

## 🎨 Customization

### Personal Information
Edit the content in `docs/index.html`:
- Update personal details in the hero section
- Modify skills, projects, and experience sections
- Add your own projects and achievements

### Styling
Customize the appearance by editing CSS files in `docs/css/`:
- `variables.css` - Global design tokens
- `palette-system.css` - Color schemes
- `sections/` - Individual section styles

### Theme System
Add new color palettes in `css/palette-system.css`:
```css
.palette-custom {
    --primary: hsl(your-hue, saturation%, lightness%);
    --secondary: hsl(your-hue, saturation%, lightness%);
    /* Add more custom colors */
}
```

## 🌈 Theme System

This portfolio features an advanced theming system with:

### Color Palettes
- **Forest** - Nature-inspired greens and earth tones
- **Black & White** - Minimalist monochrome design
- **Custom Palettes** - Easily extendable color schemes

### Theme Persistence
- Settings saved to localStorage
- Automatic theme detection based on system preferences
- Smooth transitions between theme changes

### Particle Integration
- Dynamic particle colors that adapt to selected themes
- Optimized performance with proper cleanup
- Fallback mechanisms for compatibility

## 🔧 Project Structure

```
portfolio/
├── docs/                          # Main website files
│   ├── index.html                 # Main HTML file
│   ├── css/                       # Stylesheets
│   │   ├── variables.css          # CSS custom properties
│   │   ├── palette-system.css     # Theme color definitions
│   │   ├── style.css              # Main styles
│   │   ├── theme-controls.css     # Theme switcher styles
│   │   ├── common.css             # Shared components
│   │   ├── reset.css              # CSS reset
│   │   └── sections/              # Section-specific styles
│   │       ├── hero.css
│   │       ├── about.css
│   │       ├── skills.css
│   │       ├── projects.css
│   │       ├── publications.css
│   │       ├── certifications.css
│   │       ├── footer.css
│   │       ├── navbar.css
│   │       └── scroll-down.css
│   ├── js/                        # JavaScript files
│   │   ├── main.js                # Main functionality & particles
│   │   ├── theme-controls.js      # Theme switching logic
│   │   ├── palette-switcher.js    # Palette management
│   │   ├── theme.js               # Theme utilities
│   │   └── animations.js          # Animation helpers
│   ├── assets/                    # Images and media
│   └── .nojekyll                  # GitHub Pages configuration
├── others/                        # Additional resources
├── .gitignore                     # Git ignore rules
└── README.md                      # This file
```

## 🚀 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main` or `gh-pages`)
4. Set folder to `/docs` if using the docs folder
5. Your site will be available at `https://username.github.io/repository-name`

### Other Platforms
- **Netlify**: Drag and drop the `docs` folder
- **Vercel**: Connect your GitHub repository
- **Firebase Hosting**: Use Firebase CLI

## 🔄 Updates & Maintenance

### Adding New Projects
1. Edit the projects section in `index.html`
2. Add project images to `assets/`
3. Update project cards with your information

### Performance Optimization
- Images are optimized for web
- CSS is modular for better caching
- JavaScript uses efficient DOM manipulation
- Particles.js is properly managed to prevent memory leaks

---

### 🙏 Acknowledgments

- [Particles.js](https://vincentgarreau.com/particles.js/) for the beautiful particle effects
- [Lucide](https://lucide.dev/) for the modern icon system
- [Inter Font](https://rsms.me/inter/) for the clean typography
- [GitHub Pages](https://pages.github.com/) for free hosting
