'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/store/app-store';
import { UserRole } from '@/types';


export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = useAppStore((state) => state.setUser);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(
    (searchParams.get('role') as UserRole) || 'client'
  );

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
      company,
      location: {
        lat: 19.0760,
        lng: 72.8777,
        address: 'Mumbai, Maharashtra',
      },
    };

    setUser(mockUser);
    document.cookie = `user=${JSON.stringify(mockUser)}; path=/`;
    router.push(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 to-slate-800 p-8 lg:p-12 flex-col justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-xl bg-white">
            <span className="text-base md:text-lg font-bold text-slate-900">S</span>
          </div>
          <span className="text-lg md:text-xl font-bold text-white">Spedly</span>
        </div>
        
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Join Spedly Today
          </h1>
          <p className="text-lg text-slate-300">
            Start reducing machine downtime and connect with verified suppliers in your region.
          </p>
        </div>

        <div className="text-sm text-slate-400">
          <p>&copy; 2026 Spedly. All rights reserved.</p>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-6 lg:p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-6 md:mb-8 flex justify-center">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-xl bg-slate-900">
                <span className="text-base md:text-lg font-bold text-white">S</span>
              </div>
              <span className="text-lg md:text-xl font-bold text-slate-900">Spedly</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>
            <p className="mt-2 text-sm text-slate-600">
              Get started with Spedly platform
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <Label>Account Type</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => router.push('/register/supplier')}
                  className="p-3 rounded-lg border-2 text-sm font-medium transition-colors border-orange-600 bg-orange-50 text-orange-900 hover:bg-orange-100"
                >
                  Supplier
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/register/business')}
                  className="p-3 rounded-lg border-2 text-sm font-medium transition-colors border-purple-600 bg-purple-50 text-purple-900 hover:bg-purple-100"
                >
                  Business
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/register/client')}
                  className="p-3 rounded-lg border-2 text-sm font-medium transition-colors border-blue-600 bg-blue-50 text-blue-900 hover:bg-blue-100"
                >
                  Client
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/register/delivery')}
                  className="p-3 rounded-lg border-2 text-sm font-medium transition-colors border-green-600 bg-green-50 text-green-900 hover:bg-green-100"
                >
                  Delivery Partner
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                type="text"
                placeholder="ABC Manufacturing"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" size="lg" variant="primary" className="w-full">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-slate-600">Already have an account? </span>
            <Link href="/login" className="text-blue-600 font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
