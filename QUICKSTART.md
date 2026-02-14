# Spedly - Quick Start Guide

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Application**
   Navigate to `http://localhost:3000`

## Demo Credentials

Use any email/password combination. The role is determined by the email:

- **Buyer**: `buyer@company.com` / any password
- **Supplier**: `demo@supplier.com` / any password  
- **Admin**: `admin@spedly.com` / any password

## Application Flow

### As a Buyer (Factory):
1. Login/Register as buyer
2. Click "Raise Emergency Request" from dashboard
3. Fill in part details (name, machine type, urgency)
4. View matched suppliers sorted by distance/availability
5. Select a supplier or use "Auto Allocate"
6. Track order in real-time from Orders page
7. View analytics and cost savings

### As a Supplier:
1. Login/Register as supplier
2. View incoming requests on dashboard
3. Accept/Reject requests based on availability
4. Manage inventory (add parts, toggle emergency availability)
5. Track active deliveries
6. Mark orders as dispatched/delivered

### As an Admin:
1. Login with admin credentials
2. View platform-wide statistics
3. Monitor all orders across system
4. Manage users (approve/suspend)
5. Generate and export reports

## Key Features to Test

### Buyer Module
- ✅ Emergency request with urgency levels
- ✅ Smart supplier matching algorithm
- ✅ Real-time order tracking
- ✅ Downtime cost calculator
- ✅ Analytics dashboard with charts

### Supplier Module
- ✅ Request management with filters
- ✅ Inventory management with toggle controls
- ✅ Route planning for deliveries
- ✅ Performance metrics
- ✅ Earnings tracking

### Admin Module
- ✅ System-wide analytics
- ✅ User management (buyers & suppliers)
- ✅ Order monitoring
- ✅ Platform reports with visualizations

## Project Structure Highlights

```
Key Directories:
├── app/(buyer)/           → Buyer dashboard & features
├── app/(supplier)/        → Supplier panel
├── app/(admin)/           → Admin controls
├── app/api/               → Backend API routes
├── components/ui/         → Reusable UI components
├── store/                 → Zustand state management
└── types/                 → TypeScript definitions
```

## Design Patterns Used

1. **Route Groups**: Clean separation of buyer/supplier/admin routes
2. **Server Actions**: Where appropriate for form handling
3. **API Routes**: RESTful endpoints in `/app/api`
4. **Middleware**: Role-based access control
5. **TypeScript**: Strict typing throughout
6. **Component Reusability**: Shared UI components
7. **State Management**: Zustand for global state

## Technologies

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- ShadCN UI
- Zustand
- Lucide Icons

## Build for Production

```bash
npm run build
npm run start
```

## Folder Architecture Benefits

✅ **Clean Role Separation**: Route groups keep buyer/supplier/admin isolated
✅ **Type Safety**: Full TypeScript coverage prevents runtime errors
✅ **Component Reuse**: Shared UI components reduce duplication
✅ **Scalable Structure**: Easy to add new features per role
✅ **API Organization**: Clear REST endpoint structure

## Next Steps for Production

1. **Database**: Replace mock data with PostgreSQL/MongoDB
2. **Authentication**: Implement JWT with refresh tokens
3. **Real-time**: Add WebSocket for live tracking
4. **Maps**: Integrate Google Maps/Mapbox API
5. **Payments**: Add Stripe/Razorpay integration
6. **Testing**: Add Jest unit tests + Playwright E2E
7. **Monitoring**: Set up Sentry error tracking
8. **Analytics**: Add Mixpanel/Amplitude
9. **Deployment**: Deploy to Vercel/AWS
10. **CI/CD**: Set up GitHub Actions pipeline

## Support

For issues or questions:
- Check the README.md for detailed documentation
- Review component comments for usage examples
- Refer to Next.js 14 documentation for App Router features

## Performance Tips

- Images are optimized with Next.js Image component (add when needed)
- API routes use proper HTTP methods
- Components are client-side only when needed ('use client')
- Middleware protects routes efficiently
- Lazy loading for heavy components (implement as needed)

---

**Built with ❤️ for enterprise industrial operations**
