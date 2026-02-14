'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/store/app-store';
import { ArrowLeft } from 'lucide-react';

export default function ClientRegisterPage() {
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);
  
  // Step 1: Basic Details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  
  // Step 2: Working Type
  const [workingType, setWorkingType] = useState<'individual' | 'company'>('individual');
  const [companyName, setCompanyName] = useState('');
  const [designation, setDesignation] = useState('');
  
  // Step 3: Requirements
  const [industryType, setIndustryType] = useState('');
  const [partTypes, setPartTypes] = useState<string[]>([]);
  const [urgentSupport, setUrgentSupport] = useState<'yes' | 'no'>('no');
  
  // Step 4: Terms
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);

  const handlePartTypeToggle = (type: string) => {
    setPartTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      alert('Please accept the terms and conditions');
      return;
    }

    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: fullName,
      email,
      role: 'client' as const,
      company: workingType === 'company' ? companyName : undefined,
      workingType,
      designation,
      mobile,
      industryType,
      partTypes,
      urgentSupport: urgentSupport === 'yes',
    };

    setUser(mockUser);
    document.cookie = `user=${JSON.stringify(mockUser)}; path=/`;
    window.location.href = '/client/dashboard';
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const partTypeOptions = [
    'Bearings',
    'Motors',
    'Electrical Components',
    'Hydraulic Parts',
    'Pneumatic Parts',
    'Mechanical Parts',
    'Control Systems',
    'Sensors & Instruments'
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 to-blue-800 p-8 lg:p-12 flex-col justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
            <span className="text-lg font-bold text-blue-900">S</span>
          </div>
          <span className="text-xl font-bold text-white">Spedly</span>
        </div>
        
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Zero Downtime Starts Here
          </h1>
          <p className="text-lg text-blue-100">
            Get instant access to verified suppliers and parts with real-time availability tracking.
          </p>
          
          <div className="mt-8 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-blue-100">Search from thousands of spare parts</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-blue-100">Real-time price comparisons</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-blue-100">24/7 emergency support</span>
            </div>
          </div>
        </div>

        <div className="text-sm text-blue-200">
          <p>&copy; 2026 Spedly. All rights reserved.</p>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto p-6 lg:p-8">
          <Link
            href="/register"
            className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to role selection
          </Link>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Client Registration</h2>
            <p className="mt-2 text-sm text-slate-600">
              Step {currentStep} of 4
            </p>
            
            {/* Progress Bar */}
            <div className="mt-4 w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Basic Details */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Basic Details</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Rajesh Kumar"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rajesh.kumar@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="9876543210"
                    pattern="[0-9]{10}"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    minLength={6}
                    required
                  />
                </div>

                <Button type="button" onClick={nextStep} className="w-full bg-blue-600 hover:bg-blue-700">
                  Next Step
                </Button>
              </div>
            )}

            {/* Step 2: Working Type */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Working Type</h3>
                
                <div className="space-y-2">
                  <Label>I am working as *</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setWorkingType('individual')}
                      className={`p-4 border-2 rounded-lg text-center transition-all ${
                        workingType === 'individual'
                          ? 'border-blue-600 bg-blue-50 text-blue-800'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <p className="font-medium">Individual</p>
                      <p className="text-xs text-slate-600 mt-1">Personal account</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWorkingType('company')}
                      className={`p-4 border-2 rounded-lg text-center transition-all ${
                        workingType === 'company'
                          ? 'border-blue-600 bg-blue-50 text-blue-800'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <p className="font-medium">Company</p>
                      <p className="text-xs text-slate-600 mt-1">Business account</p>
                    </button>
                  </div>
                </div>

                {workingType === 'company' && (
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="ABC Industries"
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="designation">Designation *</Label>
                  <Input
                    id="designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="Maintenance Engineer"
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                    Previous
                  </Button>
                  <Button type="button" onClick={nextStep} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Requirements */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Your Requirements</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="industryType">Industry Type *</Label>
                  <select
                    id="industryType"
                    value={industryType}
                    onChange={(e) => setIndustryType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  >
                    <option value="">Select your industry</option>
                    <option value="automotive">Automotive</option>
                    <option value="manufacturing">General Manufacturing</option>
                    <option value="textile">Textile</option>
                    <option value="pharma">Pharmaceutical</option>
                    <option value="electronics">Electronics</option>
                    <option value="food">Food Processing</option>
                    <option value="chemical">Chemical</option>
                    <option value="steel">Steel & Metal</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Types of parts you usually need (select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {partTypeOptions.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handlePartTypeToggle(type)}
                        className={`p-3 border-2 rounded-lg text-sm transition-all ${
                          partTypes.includes(type)
                            ? 'border-blue-600 bg-blue-50 text-blue-800'
                            : 'border-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Do you need 24/7 urgent support? *</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setUrgentSupport('yes')}
                      className={`p-3 border-2 rounded-lg text-center transition-all ${
                        urgentSupport === 'yes'
                          ? 'border-blue-600 bg-blue-50 text-blue-800'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setUrgentSupport('no')}
                      className={`p-3 border-2 rounded-lg text-center transition-all ${
                        urgentSupport === 'no'
                          ? 'border-blue-600 bg-blue-50 text-blue-800'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                    Previous
                  </Button>
                  <Button type="button" onClick={nextStep} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Final */}
            {currentStep === 4 && (
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Review & Submit</h3>
                
                <div className="bg-slate-50 rounded-lg p-6 space-y-3">
                  <div>
                    <p className="text-sm text-slate-600">Full Name</p>
                    <p className="font-medium text-slate-900">{fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Email</p>
                    <p className="font-medium text-slate-900">{email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Working Type</p>
                    <p className="font-medium text-slate-900">
                      {workingType === 'company' ? `Company - ${companyName}` : 'Individual'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Designation</p>
                    <p className="font-medium text-slate-900">{designation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Industry Type</p>
                    <p className="font-medium text-slate-900">{industryType}</p>
                  </div>
                  {partTypes.length > 0 && (
                    <div>
                      <p className="text-sm text-slate-600">Part Types</p>
                      <p className="font-medium text-slate-900">{partTypes.join(', ')}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-1"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-slate-700">
                    I accept the <Link href="/terms" className="text-blue-600 hover:underline">Terms & Conditions</Link> and confirm that all information provided is accurate.
                  </label>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                    Previous
                  </Button>
                  <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Submit Registration
                  </Button>
                </div>
              </div>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
