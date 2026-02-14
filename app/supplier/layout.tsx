'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { 
  LayoutDashboard, 
  Package, 
  ClipboardList,
  BarChart3,
  Settings
} from 'lucide-react';

export default function SupplierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supplierLinks = [
    {
      href: '/supplier/dashboard',
      label: 'Overview',
      icon: LayoutDashboard,
    },
    {
      href: '/supplier/orders',
      label: 'Order Management',
      icon: ClipboardList,
    },
    {
      href: '/supplier/inventory',
      label: 'Inventory',
      icon: Package,
    },
    {
      href: '/supplier/delivery',
      label: 'Delivery & Vehicles',
      icon: Package,
    },
    {
      href: '/supplier/performance',
      label: 'SLA & Performance',
      icon: BarChart3,
    },
    {
      href: '/supplier/payments',
      label: 'Payments',
      icon: BarChart3,
    },
    {
      href: '/supplier/settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar links={supplierLinks} role="supplier" />
      
      <div className="flex-1 lg:ml-64">
        <Header />
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
