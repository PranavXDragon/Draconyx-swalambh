'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Users,
  BarChart3,
  Settings,
  FileText
} from 'lucide-react';

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const businessLinks = [
    {
      href: '/business/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/business/requests',
      label: 'Part Requests',
      icon: PlusCircle,
    },
    {
      href: '/business/suppliers',
      label: 'Suppliers',
      icon: Users,
    },
    {
      href: '/business/reports',
      label: 'Reports',
      icon: FileText,
    },
    {
      href: '/business/analytics',
      label: 'Analytics',
      icon: BarChart3,
    },
    {
      href: '/business/settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar links={businessLinks} role="business" />
      
      <div className="flex-1 lg:ml-64">
        <Header />
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
