# Ignitti Shopify Theme

## Overview

Ignitti is a luxury candle e-commerce website built as a custom Shopify theme. The project targets discerning men (25-55+) who value quality craftsmanship, refined aesthetics, and sophisticated scents. The theme emphasizes a high-end, masculine, and luxurious brand experience with modern web design principles.

## System Architecture

### Frontend Architecture
- **Platform**: Shopify Liquid templating system
- **Styling**: Custom CSS with modern design patterns
- **JavaScript**: Vanilla JavaScript for interactions and animations
- **Responsive Design**: Mobile-first approach with breakpoints at 768px, 1024px, and 1200px
- **Font System**: Google Fonts integration (Montserrat for headers/body, Playfair Display for accents)

### Template Structure
- **Layout**: Single main layout (`theme.liquid`) with modular section includes
- **Templates**: Standard Shopify templates (index, product, collection, page)
- **Sections**: Reusable component-based sections for different page elements
- **Liquid Logic**: Dynamic content rendering with fallback static content

### Design System
- **Color Palette**: Dark theme with charcoal backgrounds (#1a1a1a), forest green accents (#1E3A2B), and gold highlights (#D4AF37)
- **Typography**: Montserrat for clean readability, Playfair Display for luxury accents
- **Visual Elements**: Rounded corners, ample negative space, subtle animations
- **Brand Identity**: Uppercase headings with letter-spacing for premium feel

## Key Components

### Core Sections
1. **Header** (`header.liquid`): Navigation with logo, mobile menu toggle, and responsive design
2. **Footer** (`footer.liquid`): Company info, social links, and additional navigation
3. **Home Hero** (`home-hero.liquid`): Full-screen banner with call-to-action
4. **Brand Intro** (`brand-intro.liquid`): Brand story and value propositions
5. **Best Sellers** (`best-sellers.liquid`): Featured product showcase
6. **Newsletter Signup** (`newsletter-signup.liquid`): Email collection with Shopify forms

### Content Sections
- **About Story** (`about-story.liquid`): Company narrative with statistics and imagery
- **Collection Grid** (`collection-grid.liquid`): Product collection showcase
- **Contact Form** (`contact-form.liquid`): Customer inquiry form with contact details
- **Subscription Tiers** (`subscription-tiers.liquid`): Recurring purchase options

### Template Pages
- **Homepage** (`index.json`): Orchestrates multiple sections for landing page
- **Product Pages** (`product.json`): Product details with variants and purchase options
- **Collection Pages** (`collection.json`): Product grid with filtering and sorting
- **Content Pages** (`page.json`): Static content display

## Data Flow

### Content Management
- **Dynamic Content**: Pulls from Shopify admin for products, collections, and settings
- **Fallback Content**: Static placeholder content when Shopify data is unavailable
- **Image Handling**: Pixabay placeholder images with responsive sizing
- **Form Processing**: Native Shopify form handling for contact and newsletter

### User Interactions
- **Navigation**: Responsive menu with mobile hamburger toggle
- **Product Display**: Grid layouts with hover effects and overlay information
- **Form Submission**: Shopify form API integration with success/error messaging
- **Animations**: Scroll-triggered animations using AOS (Animate On Scroll) library

## External Dependencies

### Third-Party Services
- **Google Fonts**: Montserrat and Playfair Display font families
- **Pixabay**: Placeholder imagery for products and sections
- **Shopify CDN**: Asset delivery and optimization

### JavaScript Libraries
- **AOS (Animate On Scroll)**: For scroll-triggered animations
- **Custom JavaScript**: Theme-specific interactions and functionality

### Development Tools
- **Python HTTP Server**: Local development server (port 5000)
- **Node.js**: Development environment support

## Deployment Strategy

### Local Development
- **Server**: Python HTTP server for local theme testing
- **Port**: 5000 (configured in .replit workflow)
- **Environment**: Node.js 20 and Python 3.11 support

### Shopify Integration
- **Theme Upload**: Direct integration with Shopify theme system
- **Asset Management**: Shopify CDN for optimized delivery
- **Liquid Rendering**: Server-side template processing

### Performance Optimization
- **Image Optimization**: Shopify's automatic image resizing and WebP conversion
- **CSS/JS Minification**: Asset pipeline optimization
- **Caching**: Shopify's built-in caching mechanisms

## Changelog
- June 27, 2025: Initial setup
- June 27, 2025: Completed multi-page website structure with proper sectioning and navigation
- June 27, 2025: Enhanced UI with responsive design and luxury aesthetic implementation
- June 27, 2025: Replaced popup search with inline header search bar for better UX
- June 27, 2025: Fixed Shopify theme validation error by updating mobile products per row range from 1-2 to 1-3 steps
- June 27, 2025: Created proper Shopify settings schema configuration file

## User Preferences

Preferred communication style: Simple, everyday language.