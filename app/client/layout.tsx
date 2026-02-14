'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package,
  History,
  Heart,
  Settings,
  Store
} from 'lucide-react';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clientLinks = [
    {
      href: '/client/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/client/store',
      label: 'Store',
      icon: Store,
    },
    {
      href: '/client/browse-parts',
      label: 'Browse Parts',
      icon: ShoppingCart,
    },
    {
      href: '/client/orders',
      label: 'Order History',
      icon: Package,
    },
    {
      href: '/client/favorites',
      label: 'Favorites',
      icon: Heart,
    },
    {
      href: '/client/settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar links={clientLinks} role="client" />
      
      <div className="flex-1 lg:ml-64">
        <Header />
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
