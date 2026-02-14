'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { 
  LayoutDashboard, 
  Package, 
  History,
  Settings,
  DollarSign,
  User
} from 'lucide-react';

export default function DeliveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const deliveryLinks = [
    {
      href: '/delivery/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/delivery/deliveries',
      label: 'My Deliveries',
      icon: Package,
    },
    {
      href: '/delivery/history',
      label: 'Delivery History',
      icon: History,
    },
    {
      href: '/delivery/earnings',
      label: 'Earnings',
      icon: DollarSign,
    },
    {
      href: '/delivery/profile',
      label: 'Profile',
      icon: User,
    },
    {
      href: '/delivery/settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar links={deliveryLinks} role="delivery" />
      
      <div className="flex-1 lg:ml-64">
        <Header />
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
