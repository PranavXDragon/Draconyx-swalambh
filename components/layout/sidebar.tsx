'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LucideIcon, Menu, X } from 'lucide-react';

interface SidebarProps {
  links: {
    href: string;
    label: string;
    icon: LucideIcon;
  }[];
  role: 'supplier' | 'business' | 'client' | 'delivery';
}

export function Sidebar({ links, role }: SidebarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const roleColors = {
    supplier: 'bg-orange-600',
    business: 'bg-purple-600',
    client: 'bg-blue-600',
    delivery: 'bg-green-600',
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white border border-slate-200 shadow-lg hover:bg-slate-50 transition"
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-slate-50 transition-transform duration-300",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b border-slate-200 px-6">
            <Link href="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900">
                <span className="text-lg font-bold text-white">S</span>
              </div>
              <span className="text-xl font-bold text-slate-900">Spedly</span>
            </Link>
          </div>
          
          <nav className="flex-1 space-y-1 px-3 py-4">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-200"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="border-t  border-slate-200 px-3 py-4">
            <div className={cn("rounded-lg p-4", 
              role === 'supplier' ? 'bg-orange-50' : 
              role === 'business' ? 'bg-purple-50' : 
              'bg-blue-50'
            )}>
              <p className={cn("text-xs font-semibold",
                role === 'supplier' ? 'text-orange-900' :
                role === 'business' ? 'text-purple-900' :
                'text-blue-900'
              )}>
                {role === 'supplier' && 'Supplier Panel'}
                {role === 'business' && 'Business Support'}
                {role === 'client' && 'Client Support'}
              </p>
              <p className={cn("mt-1 text-xs",
                role === 'supplier' ? 'text-orange-700' :
                role === 'business' ? 'text-purple-700' :
                'text-blue-700'
              )}>
                Available 24/7
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
