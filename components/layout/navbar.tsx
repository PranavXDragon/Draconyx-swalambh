'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/app-store';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useAppStore((state) => state.user);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-xl bg-slate-900">
            <span className="text-base md:text-lg font-bold text-white">S</span>
          </div>
          <span className="text-lg md:text-xl font-bold text-slate-900">Spedly</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
            Home
          </Link>
          <a href="/#how-it-works" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
            How It Works
          </a>
          <a href="/#features" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
            Features
          </a>
          <Link href="/store" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
            Store
          </Link>
          {user ? (
            <Link href={`/${user.role}/dashboard`}>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="hover:bg-slate-100">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="flex flex-col space-y-1 px-4 py-4">
            <Link 
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 hover:text-slate-900 font-medium py-3 px-3 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Home
            </Link>
            <a 
              href="/#how-it-works" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 hover:text-slate-900 font-medium py-3 px-3 rounded-lg hover:bg-slate-100 transition-colors"
            >
              How It Works
            </a>
            <a 
              href="/#features"
              onClick={() => setMobileMenuOpen(false)} 
              className="text-slate-700 hover:text-slate-900 font-medium py-3 px-3 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Features
            </a>
            <Link 
              href="/store"
              onClick={() => setMobileMenuOpen(false)} 
              className="text-slate-700 hover:text-slate-900 font-medium py-3 px-3 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Store
            </Link>
            {user ? (
              <Link href={`/${user.role}/dashboard`} onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start hover:bg-slate-100">Login</Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
