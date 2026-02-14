'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/store/app-store';
import { ArrowLeft } from 'lucide-react';

export default function DeliveryRegisterPage() {
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);
  
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [govtIdType, setGovtIdType] = useState<'aadhar' | 'driving-license'>('aadhar');
  const [govtIdNumber, setGovtIdNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: fullName,
      email,
      role: 'delivery' as const,
      mobile,
      govtId: {
        type: govtIdType,
        number: govtIdNumber,
      },
      vehicleNumber,
      age: parseInt(age),
      gender,
      location: {
        lat: 19.0760,
        lng: 72.8777,
        address: 'Mumbai, Maharashtra',
      },
    };

    setUser(mockUser);
    document.cookie = `user=${JSON.stringify(mockUser)}; path=/`;
    window.location.href = '/delivery/dashboard';
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-900 to-green-800 p-8 lg:p-12 flex-col justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-xl bg-white">
            <span className="text-base md:text-lg font-bold text-green-900">S</span>
          </div>
          <span className="text-lg md:text-xl font-bold text-white">Spedly</span>
        </div>
        
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Become a Delivery Partner
          </h1>
          <p className="text-lg text-green-100">
            Join our network of delivery professionals and earn by delivering spare parts to businesses in need.
          </p>
          
          <div className="mt-8 space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="text-white font-medium">Flexible Schedule</h3>
                <p className="text-green-200 text-sm">Work on your own time and terms</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="text-white font-medium">Guaranteed Payments</h3>
                <p className="text-green-200 text-sm">Transparent pricing and timely payouts</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="text-white font-medium">24/7 Support</h3>
                <p className="text-green-200 text-sm">Get help whenever you need it</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-green-200">
          <p>&copy; 2026 Spedly. All rights reserved.</p>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-6 lg:p-8">
        <div className="w-full max-w-md">
          <Link
            href="/register"
            className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to role selection
          </Link>

          <div className="lg:hidden mb-6 md:mb-8 flex justify-center">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-xl bg-green-900">
                <span className="text-base md:text-lg font-bold text-white">S</span>
              </div>
              <span className="text-lg md:text-xl font-bold text-green-900">Spedly</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Delivery Partner Registration</h2>
            <p className="mt-2 text-sm text-slate-600">
              Complete your profile to start delivering
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            {/* Mobile Number */}
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number *</Label>
              <Input
                id="mobile"
                type="tel"
                placeholder="10-digit mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                pattern="[0-9]{10}"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Government ID */}
            <div className="space-y-2">
              <Label>Government ID *</Label>
              <div className="grid grid-cols-2 gap-3 mb-2">
                <button
                  type="button"
                  onClick={() => setGovtIdType('aadhar')}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                    govtIdType === 'aadhar'
                      ? 'border-green-600 bg-green-50 text-green-900'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  Aadhar Card
                </button>
                <button
                  type="button"
                  onClick={() => setGovtIdType('driving-license')}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                    govtIdType === 'driving-license'
                      ? 'border-green-600 bg-green-50 text-green-900'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  Driving License
                </button>
              </div>
              <Input
                id="govtId"
                type="text"
                placeholder={govtIdType === 'aadhar' ? '12-digit Aadhar number' : 'Driving License number'}
                value={govtIdNumber}
                onChange={(e) => setGovtIdNumber(e.target.value)}
                required
              />
            </div>

            {/* Vehicle Number */}
            <div className="space-y-2">
              <Label htmlFor="vehicle">Vehicle Number *</Label>
              <Input
                id="vehicle"
                type="text"
                placeholder="MH01AB1234"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                required
              />
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="18"
                max="65"
                required
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label>Gender *</Label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                    gender === 'male'
                      ? 'border-green-600 bg-green-50 text-green-900'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                    gender === 'female'
                      ? 'border-green-600 bg-green-50 text-green-900'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  Female
                </button>
                <button
                  type="button"
                  onClick={() => setGender('other')}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                    gender === 'other'
                      ? 'border-green-600 bg-green-50 text-green-900'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  Other
                </button>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              Register as Delivery Partner
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/login" className="text-green-600 hover:text-green-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
