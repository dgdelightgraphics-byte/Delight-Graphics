# Delight Graphics - Premium Creative Digital Marketing Agency Website

A premium, modern, animated business website built with React, Vite, Tailwind CSS, and Framer Motion for Delight Graphics - a creative digital marketing and media agency.

## Features

- **Premium Modern Design** - Dark theme with vibrant gradient colors (Purple, Pink, Orange)
- **Smooth Animations** - Powered by Framer Motion with glassmorphism effects
- **Fully Responsive** - Optimized for mobile, tablet, and desktop devices
- **Multiple Pages** - Home, About, Services, Portfolio, and Contact
- **Interactive Components** - Hover effects, animated buttons, and smooth transitions
- **Dark/Light Mode Toggle** - Theme switching capability
- **Floating Features** - WhatsApp chat button, scroll-to-top button
- **Sticky Navigation** - Always accessible navbar with smooth scrolling
- **Contact Form** - Fully functional contact form with validation
- **Portfolio Gallery** - Masonry grid with category filters and hover effects
- **SEO Friendly** - Meta tags and semantic HTML
- **Performance Optimized** - Built with Vite for fast loading

## Project Structure

```
delight-graphics/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── FloatingWhatsApp.jsx
│   │   ├── ScrollToTop.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── SectionTitle.jsx
│   │   ├── ServiceCard.jsx
│   │   ├── PortfolioCard.jsx
│   │   ├── TestimonialCard.jsx
│   │   └── StatsCard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Portfolio.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   The site will open at `http://localhost:3000`

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Pages Overview

### Home
- Hero section with animated headline
- Statistics section showing company metrics
- Services preview
- Featured portfolio showcase
- Client testimonials
- CTA banner

### About
- Company introduction
- Core values section
- Timeline of achievements
- Why choose us section
- Team showcase

### Services
- Complete service listings
- Detailed service information
- Process explanation
- Pricing tiers
- Service features highlight

### Portfolio
- Masonry gallery grid
- Category filtering
- Video showcase section
- Client testimonials
- Project statistics

### Contact
- Contact form with validation
- Contact information
- Business hours
- Social media links
- Google Maps integration
- FAQ section
- WhatsApp integration

## Technologies Used

- **React 18.2** - UI library
- **Vite 5.0** - Build tool and dev server
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **Framer Motion 10.16** - Animation library
- **React Router DOM 6.20** - Client-side routing
- **Lucide React 0.308** - Icon library

## Customization

### Colors
Edit `tailwind.config.js` to customize brand colors:
- Purple: `#a855f7`
- Pink: `#ec4899`
- Orange: `#f97316`

### Content
Update content in individual page files:
- Services in `Services.jsx`
- Portfolio items in `Portfolio.jsx`
- Team members in `About.jsx`
- Testimonials in `Home.jsx`

### Contact Information
Update in `Contact.jsx` and `Footer.jsx`:
- Email
- Phone
- Address
- Business hours
- WhatsApp number

## Performance Optimizations

- Code splitting with React Router
- Image optimization recommendations
- CSS minification with Tailwind
- JavaScript minification with Terser
- Smooth scrolling behavior
- Optimized animations with Framer Motion

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## SEO Features

- Semantic HTML structure
- Meta tags in `index.html`
- Open Graph support
- Mobile-friendly design
- Fast loading with Vite
- Proper heading hierarchy

## Deployment

### Deploy to Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Deploy to Vercel
1. Import project to Vercel
2. Build command: `npm run build`
3. Output directory: `dist`

### Traditional Hosting
1. Run `npm run build`
2. Upload `dist` folder to your hosting provider

## Future Enhancements

- Blog section with latest posts
- Client testimonials carousel
- Service booking system
- Analytics integration
- Email subscription
- Chatbot integration
- Multi-language support

## License

This project is proprietary and created for Delight Graphics.

## Support

For questions or issues, please reach out to:
- Email: info@delightgraphics.com
- Phone: +1 (234) 567-890
- WhatsApp: Available in the website

## Run Code
npm run dev
---
## Push to git
git add .
git commit -m "Fixed Vercel routing"
git push

Made with ❤️ for creative brands. Transform your vision with Delight Graphics.
