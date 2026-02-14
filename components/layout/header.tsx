'use client';

import { Bell, LogOut, User } from 'lucide-react';
import { useAppStore } from '@/store/app-store';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Header() {
  const { user, notifications, logout } = useAppStore();
  const router = useRouter();
  
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6 ml-0 lg:ml-64">
      <div className="flex-1 min-w-0">
        <h1 className="text-base md:text-lg font-semibold text-slate-900 truncate">
          Welcome back, {user?.name || 'User'}
        </h1>
        <p className="text-xs md:text-sm text-slate-500 truncate hidden sm:block">{user?.company || 'Company'}</p>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <button className="relative rounded-lg p-2 hover:bg-slate-100">
          <Bell className="h-5 w-5 text-slate-700" />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-white">
              {unreadCount}
            </span>
          )}
        </button>

        {user && (
          <Link href={`/${user.role}/profile`}>
            <button className="flex items-center space-x-2 rounded-lg p-2 hover:bg-slate-100 transition-colors">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="hidden md:block text-sm text-left">
                <p className="font-medium text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500 capitalize">{user.role}</p>
              </div>
            </button>
          </Link>
        )}

        <Button
          onClick={handleLogout}
          variant="ghost"
          size="sm"
          className="text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
