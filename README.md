# Spedly - Real-Time Industrial Spare Allocation Platform

A production-ready SaaS web application built with Next.js 14, TypeScript, and Tailwind CSS for managing industrial spare part requests and deliveries.

## Overview

Spedly is a B2B logistics platform that connects factories with spare part suppliers to minimize machine downtime. The platform features intelligent supplier matching, route optimization, real-time tracking, and comprehensive analytics.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **State Management**: Zustand
- **Icons**: Lucide React

## Features

### Buyer (Factory) Module
- Emergency spare part request submission
- Intelligent supplier matching based on distance, availability, and urgency
- Real-time order tracking with GPS visualization
- Downtime cost analytics
- Order history and management

### Supplier Module
- Incoming request management
- Inventory management with emergency availability toggle
- Delivery tracking and route optimization
- Performance metrics and earnings dashboard

### Admin Module
- Platform-wide analytics and reporting
- User management (buyers and suppliers)
- Order monitoring and oversight
- System performance metrics

## Project Structure

```
PALLOTI/
├── app/
│   ├── (buyer)/              # Buyer role routes
│   │   ├── dashboard/
│   │   ├── new-request/
│   │   ├── matching/
│   │   ├── orders/
│   │   └── analytics/
│   ├── (supplier)/           # Supplier role routes
│   │   ├── dashboard/
│   │   ├── requests/
│   │   ├── inventory/
│   │   └── deliveries/
│   ├── (admin)/              # Admin role routes
│   │   ├── dashboard/
│   │   ├── orders/
│   │   ├── users/
│   │   └── reports/
│   ├── api/                  # API routes
│   │   ├── auth/
│   │   ├── match/
│   │   ├── orders/
│   │   └── suppliers/
│   ├── login/
│   ├── register/
│   ├── layout.tsx
│   ├── page.tsx              # Landing page
│   └── globals.css
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── layout/               # Layout components
│   ├── loading/
│   └── empty-state.tsx
├── lib/
│   └── utils.ts              # Utility functions
├── store/
│   └── app-store.ts          # Zustand store
├── types/
│   └── index.ts              # TypeScript types
├── middleware.ts             # Auth middleware
└── tailwind.config.ts

```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Authentication

The application uses mock authentication for demo purposes. You can login with any email and password:

- **Buyer**: Use any email (e.g., `buyer@company.com`)
- **Supplier**: Use email with "supplier" (e.g., `demo@supplier.com`)
- **Admin**: Use email with "admin" (e.g., `admin@spedly.com`)

## Key Pages

### Landing Page (`/`)
- Hero section with CTAs
- How it works (3-step process)
- Key features grid
- Enterprise CTA footer

### Buyer Dashboard (`/buyer/dashboard`)
- Active orders overview
- Key metrics (delivery time, downtime saved)
- Nearby suppliers map
- Recent activity

### Supplier Dashboard (`/supplier/dashboard`)
- Pending requests
- Active deliveries
- Earnings and performance metrics
- Quick actions

### Admin Dashboard (`/admin/dashboard`)
- Platform-wide statistics
- Recent activity feed
- Top performing suppliers
- Demand heatmap

## API Routes

### `/api/match` (POST)
Matches spare part requests with suitable suppliers based on:
- Distance and location
- Part availability
- Urgency level
- Supplier rating

### `/api/orders` (GET/POST)
- `POST`: Create new order
- `GET`: Fetch orders (filterable by buyer/supplier)

### `/api/orders/[id]` (GET/PATCH)
- `GET`: Fetch single order details
- `PATCH`: Update order status

### `/api/auth/login` (POST)
Mock authentication endpoint

### `/api/auth/register` (POST)
Mock user registration endpoint

## Design System

### Colors
- **Primary**: Dark Blue (slate-900)
- **Secondary**: Slate Gray
- **Accent**: Muted Orange
- **Status Colors**: Green, Blue, Yellow, Red

### Typography
- **Headings**: Bold, clear hierarchy
- **Body**: Clean, readable
- **Sizes**: Consistent scale

### Components
- **Cards**: Rounded-2xl with soft shadows
- **Buttons**: Multiple variants (primary, accent, outline)
- **Badges**: Status indicators with color coding
- **Forms**: Clean inputs with validation states

## State Management

The application uses Zustand for global state management:

- User session
- Current order
- Notifications
- UI state

## Middleware

Role-based access control middleware protects routes:
- Redirects unauthenticated users to `/login`
- Prevents cross-role access
- Handles role-specific routing

## Production Considerations

For production deployment:

1. Replace mock data with real database (PostgreSQL, MongoDB)
2. Implement proper JWT authentication
3. Add API rate limiting
4. Set up real-time updates (WebSockets/Server-Sent Events)
5. Integrate actual mapping service (Google Maps, Mapbox)
6. Add payment gateway integration
7. Implement proper error tracking (Sentry)
8. Set up monitoring and analytics
9. Add comprehensive testing (Jest, Playwright)
10. Configure CI/CD pipeline

## License

This project is built for demonstration purposes.

## Contact

For questions or support, contact the development team.
