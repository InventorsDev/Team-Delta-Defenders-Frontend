# 🌾 AgriLink NG – Frontend

A modern React-based web marketplace connecting farmers directly with buyers across Nigeria, eliminating middlemen and ensuring fair prices for agricultural products.

## 📖 Project Overview

AgriLink NG is a comprehensive agricultural marketplace platform that empowers farmers to sell their products directly to buyers, featuring real-time negotiation, secure communication, and seamless transaction management. The platform aims to revolutionize Nigeria's agricultural sector by creating transparent, efficient market connections.

## ✨ Features

### 🌱 Core Functionality
- **Direct Farmer-to-Buyer Marketplace** - Connect agricultural producers with consumers
- **Real-time Chat & Negotiation** - In-app messaging for price discussions
- **Product Listings Management** - Comprehensive product catalog with search and filters
- **Secure Authentication** - Role-based access for farmers and buyers
- **Responsive Design** - Mobile-first approach for accessibility across devices

### 🎯 Landing Page Components
- **Hero Section** - Compelling introduction to the platform
- **Problem & Solution Sections** - Clear value proposition
- **Features Showcase** - Highlight key platform capabilities
- **Process Flow** - Step-by-step guide for users
- **Testimonials** - Social proof and user feedback
- **FAQ Section** - Address common user questions
- **Call-to-Action** - Drive user registration and engagement

## 🛠 Technology Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with custom design system
- **UI Components:** shadcn/ui + Radix UI primitives
- **Routing:** React Router DOM
- **State Management:** TanStack Query (React Query)
- **Form Handling:** React Hook Form with Zod validation
- **Icons:** Lucide React
- **Development:** ESLint + TypeScript for code quality

### 📦 Key Dependencies
```json
{
  "react": "^18.3.1",
  "typescript": "^5.8.3",
  "vite": "^5.4.19",
  "tailwindcss": "^3.4.17",
  "@radix-ui/react-*": "Latest",
  "react-router-dom": "^6.30.1",
  "@tanstack/react-query": "^5.83.0"
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/InventorsDev/Team-Delta-Defenders-Frontend.git
cd Team-Delta-Defenders-Frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint code analysis

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Landing page hero
│   ├── ProblemSection.tsx
│   ├── SolutionSection.tsx
│   ├── FeaturesSection.tsx
│   ├── CTASection.tsx
│   ├── ProcessSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── FAQSection.tsx
│   └── Footer.tsx       # Site footer
├── pages/               # Page components
│   ├── Index.tsx        # Landing page
│   └── NotFound.tsx     # 404 page
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── App.tsx              # Main app component
└── main.tsx             # Application entry point

design/                  # Design documentation
├── README.md           # Design system docs
├── figma-links.md      # Design file links
└── research-docs.md    # UX research documentation

public/                 # Static assets
├── agrilink-logo.png   # Brand logo
├── hero-bg.png         # Hero background
├── problem-image.png   # Problem section visual
├── solution-image.png  # Solution section visual
└── [additional images] # Feature and UI assets
```

## 🎨 Design System

The project uses a comprehensive design system built on:
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for accessible, customizable components
- **Radix UI** primitives for complex interactive elements
- **Custom color palette** optimized for agricultural branding
- **Responsive breakpoints** for mobile-first design

### Component Architecture
All UI components follow atomic design principles:
- **Atoms**: Basic UI elements (buttons, inputs, labels)
- **Molecules**: Component combinations (form fields, cards)
- **Organisms**: Complex sections (header, hero, features)
- **Templates**: Page layouts and structures

## 🔗 Related Resources

- [🎨 Figma Design Files](./design/figma-links.md)
- [📄 UX Research & Documentation](./design/research-docs.md)
- [📋 Project Sprint Plans](https://docs.google.com/document/d/1FRk9VBDSQzR1FV9vVnJ8SYtd-5lhrPsAqlkLQENUdqQ/edit?usp=sharing)
- [🎯 Product Roadmap](https://docs.google.com/document/d/1U70Hx5ipKKLOtIrzqRWts00l3nHUtRNiSOwR41OgHpc/edit?usp=sharing)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint configuration for code consistency
- Write meaningful commit messages
- Test components thoroughly before submitting
- Maintain responsive design principles
- Follow accessibility standards (WCAG 2.1)

## 📝 License

This project is part of the Team Delta Defenders development initiative for AgriLink NG.

## 👥 Team

**Team Delta Defenders** - Frontend Development Team
- Focused on creating accessible, performant agricultural marketplace solutions
- Committed to empowering Nigerian farmers through technology

---

*Built with ❤️ for Nigerian farmers and agricultural communities*
