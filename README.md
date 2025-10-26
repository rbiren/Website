# BizBroker AI - Interactive Business Broker Website

An extremely interactive, modern website for a business broker business focused on advanced data analytics, AI, and automation.

## Features

### Interactive Elements
- **Animated Hero Section** - Eye-catching hero with floating orbs and gradient animations
- **Real-time Data Visualizations** - Interactive charts showing revenue trends, industry distribution, and deal volume
- **AI-Powered Demos** - Live demonstrations of predictive analytics, AI chat assistant, and smart business discovery
- **Animated Workflow** - Auto-playing workflow visualization showing the automated deal pipeline
- **Interactive Contact Form** - Real-time validation and smooth submission animations
- **Smooth Scroll Animations** - Parallax effects and scroll-triggered animations throughout

### Technology Stack
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready animation library
- **Recharts** - Composable charting library
- **Lucide React** - Beautiful icon set

### Sections
1. **Navigation** - Smooth scrolling sticky navigation with mobile menu
2. **Hero** - Compelling headline with animated feature cards
3. **Features** - 8 key features with hover animations
4. **Data Analytics** - Interactive dashboard with multiple chart types
5. **AI Showcase** - Three interactive AI demos (Predictive Analytics, Chat Assistant, Smart Discovery)
6. **Automation Workflow** - Animated 5-step workflow visualization
7. **Contact Form** - Professional form with validation
8. **Footer** - Comprehensive footer with links and social media

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Navigation.tsx       # Sticky navigation with mobile menu
│   ├── Hero.tsx            # Hero section with animated cards
│   ├── Features.tsx        # Feature grid with animations
│   ├── DataAnalytics.tsx   # Interactive charts and metrics
│   ├── AIShowcase.tsx      # AI demo interactions
│   ├── AutomationWorkflow.tsx  # Animated workflow
│   ├── ContactForm.tsx     # Form with validation
│   └── Footer.tsx          # Footer with links
├── App.tsx                 # Main app component
├── main.tsx               # App entry point
└── index.css              # Global styles and utilities

## Key Interactions

### Data Analytics Dashboard
- **Performance Metrics** - Hover to see scaling effects
- **Revenue Trends** - Interactive area chart with tooltips
- **Industry Distribution** - Pie chart with labeled segments
- **Deal Volume** - Bar chart showing monthly performance

### AI Showcase
- **Tab Switching** - Click different AI capabilities to see demos
- **Chat Interface** - Send messages to the AI assistant
- **Smart Discovery** - Browse AI-matched business opportunities
- **Predictive Insights** - View real-time AI predictions

### Automation Workflow
- **Auto-play Animation** - Workflow steps animate automatically
- **Click to Focus** - Click any step to focus on it
- **Progress Indicators** - Visual feedback for active steps
- **Responsive Design** - Horizontal on desktop, vertical on mobile

### Contact Form
- **Real-time Validation** - Instant feedback on form fields
- **Error Messages** - Clear error states for invalid inputs
- **Success Animation** - Celebratory animation on submission
- **Auto-reset** - Form clears after successful submission

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
- `primary` - Main brand color (blue)
- `accent` - Secondary color (purple/pink)

### Content
Update component files in `src/components/` to modify:
- Text content
- Feature descriptions
- Contact information
- Chart data

### Animations
Adjust animation settings in component files using Framer Motion props:
- `initial` - Starting state
- `animate` - End state
- `transition` - Animation timing

## Performance

- **Lazy Loading** - Components load as needed
- **Optimized Animations** - GPU-accelerated with Framer Motion
- **Tree Shaking** - Unused code eliminated in production
- **Fast Refresh** - Instant updates during development

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Copyright © 2025 BizBroker AI. All rights reserved.
