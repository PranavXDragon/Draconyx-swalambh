'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/store/app-store';


export default function LoginPage() {
  const router = useRouter();
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push(`/${user.role}/dashboard`);
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (data.success && data.user) {
        setUser(data.user);
        router.push(`/${data.user.role}/dashboard`);
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Welcome Back to Spedly
          </h1>
          <p className="text-base md:text-lg text-slate-300">
            Access your dashboard to manage spare part requests and track deliveries in real-time.
          </p>
        </div>

        <div className="text-sm text-slate-400">
          <p>&copy; 2026 Spedly. All rights reserved.</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
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

          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Sign In</h2>
            <p className="mt-2 text-sm text-slate-600">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="rounded" />
                <span className="text-slate-600">Remember me</span>
              </label>
              <Link href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" size="lg" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-slate-600">Don't have an account? </span>
            <Link href="/register" className="text-blue-600 font-medium hover:underline">
              Sign up
            </Link>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-blue-50 border border-blue-100">
            <p className="text-xs text-blue-900 font-medium">Demo Credentials</p>
            <p className="text-xs text-blue-700 mt-1">
              Buyer: demo@buyer.com | Supplier: demo@supplier.com | Admin: demo@admin.com
            </p>
            <p className="text-xs text-blue-700">Password: Any password works</p>
          </div>
        </div>
      </div>
    </div>
  );
}
