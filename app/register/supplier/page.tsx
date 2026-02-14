'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/store/app-store';
import { ArrowLeft, Upload, MapPin } from 'lucide-react';

export default function SupplierRegisterPage() {
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);
  
  // Step 1: Supplier Basic
  const [shopName, setShopName] = useState('');
  const [category, setCategory] = useState('');
  const [gstNumber, setGSTNumber] = useState('');
  
  // Step 2: Location
  const [shopAddress, setShopAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [latitude, setLatitude] = useState('19.0760');
  const [longitude, setLongitude] = useState('72.8777');
  
  // Step 3: Contact Person
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Step 4: Operational Capability
  const [deliveryAvailable, setDeliveryAvailable] = useState<'yes' | 'no'>('yes');
  const [workingHours, setWorkingHours] = useState('');
  const [emergencySupport, setEmergencySupport] = useState<'yes' | 'no'>('no');
  
  // Step 5: Verification
  const [gstCertificate, setGSTCertificate] = useState<File | null>(null);
  const [shopLicense, setShopLicense] = useState<File | null>(null);
  
  // Step 6: Terms
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toFixed(6));
          setLongitude(position.coords.longitude.toFixed(6));
        },
        (error) => {
          alert('Unable to get location. Please enter manually.');
        }
      );
    }
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
      role: 'supplier' as const,
      company: shopName,
      category,
      gstNumber,
      location: {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
        address: `${shopAddress}, ${city}, ${state} - ${pincode}`,
      },
      mobile,
      deliveryAvailable,
      workingHours,
      emergencySupport,
    };

    setUser(mockUser);
    document.cookie = `user=${JSON.stringify(mockUser)}; path=/`;
    window.location.href = '/supplier/dashboard';
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-900 to-orange-800 p-8 lg:p-12 flex-col justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
            <span className="text-lg font-bold text-orange-900">S</span>
          </div>
          <span className="text-xl font-bold text-white">Spedly</span>
        </div>
        
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Become a Verified Supplier
          </h1>
          <p className="text-lg text-orange-100">
            Connect with businesses in need of spare parts and grow your reach across the region.
          </p>
          
          <div className="mt-8 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-orange-100">Get urgent orders instantly</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-orange-100">Transparent pricing & payments</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-orange-100">Build verified supplier profile</span>
            </div>
          </div>
        </div>

        <div className="text-sm text-orange-200">
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
            <h2 className="text-3xl font-bold text-slate-900">Supplier Registration</h2>
            <p className="mt-2 text-sm text-slate-600">
              Step {currentStep} of 6
            </p>
            
            {/* Progress Bar */}
            <div className="mt-4 w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 6) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Supplier Basic */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Supplier Basic Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="shopName">Supplier / Shop Name *</Label>
                  <Input
                    id="shopName"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    placeholder="ABC Spare Parts & Co."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Spare Parts Category *</Label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="bearings">Bearings</option>
                    <option value="motors">Motors</option>
                    <option value="electrical">Electrical Components</option>
                    <option value="hydraulic">Hydraulic Parts</option>
                    <option value="pneumatic">Pneumatic Parts</option>
                    <option value="mechanical">Mechanical Parts</option>
                    <option value="all">All Categories</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gstNumber">GST Number *</Label>
                  <Input
                    id="gstNumber"
                    value={gstNumber}
                    onChange={(e) => setGSTNumber(e.target.value.toUpperCase())}
                    placeholder="22AAAAA0000A1Z5"
                    pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}"
                    required
                  />
                  <p className="text-xs text-slate-500">15-digit GST identification number</p>
                </div>

                <Button type="button" onClick={nextStep} className="w-full bg-orange-600 hover:bg-orange-700">
                  Next Step
                </Button>
              </div>
            )}

            {/* Step 2: Location */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Shop Location</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="shopAddress">Shop Address *</Label>
                  <Input
                    id="shopAddress"
                    value={shopAddress}
                    onChange={(e) => setShopAddress(e.target.value)}
                    placeholder="Building No., Street Name, Area"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Mumbai"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Maharashtra"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="400001"
                    pattern="[0-9]{6}"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Location on Map</Label>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGetLocation}
                    className="w-full"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Current Location
                  </Button>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label htmlFor="latitude" className="text-xs">Latitude</Label>
                      <Input
                        id="latitude"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        placeholder="19.0760"
                        type="number"
                        step="any"
                      />
                    </div>
                    <div>
                      <Label htmlFor="longitude" className="text-xs">Longitude</Label>
                      <Input
                        id="longitude"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        placeholder="72.8777"
                        type="number"
                        step="any"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                    Previous
                  </Button>
                  <Button type="button" onClick={nextStep} className="flex-1 bg-orange-600 hover:bg-orange-700">
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Contact Person */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Contact Person Details</h3>
                
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
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rajesh@abcspares.com"
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

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                    Previous
                  </Button>
                  <Button type="button" onClick={nextStep} className="flex-1 bg-orange-600 hover:bg-orange-700">
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Operational Capability */}
            {currentStep === 4 && (
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Operational Capability</h3>
                
                <div className="space-y-2">
                  <Label>Delivery Available? *</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeliveryAvailable('yes')}
                      className={`p-3 rounded-lg border-2 font-medium transition-colors ${
                        deliveryAvailable === 'yes'
                          ? 'border-orange-600 bg-orange-50 text-orange-900'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryAvailable('no')}
                      className={`p-3 rounded-lg border-2 font-medium transition-colors ${
                        deliveryAvailable === 'no'
                          ? 'border-orange-600 bg-orange-50 text-orange-900'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workingHours">Working Hours *</Label>
                  <Input
                    id="workingHours"
                    value={workingHours}
                    onChange={(e) => setWorkingHours(e.target.value)}
                    placeholder="9:00 AM - 6:00 PM"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Emergency Support (24x7)? *</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setEmergencySupport('yes')}
                      className={`p-3 rounded-lg border-2 font-medium transition-colors ${
                        emergencySupport === 'yes'
                          ? 'border-orange-600 bg-orange-50 text-orange-900'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEmergencySupport('no')}
                      className={`p-3 rounded-lg border-2 font-medium transition-colors ${
                        emergencySupport === 'no'
                          ? 'border-orange-600 bg-orange-50 text-orange-900'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
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
                  <Button type="button" onClick={nextStep} className="flex-1 bg-orange-600 hover:bg-orange-700">
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Verification */}
            {currentStep === 5 && (
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Document Verification</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="gstCert">GST Certificate Upload *</Label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
                    <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <Input
                      id="gstCert"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setGSTCertificate(e.target.files?.[0] || null)}
                      className="hidden"
                      required
                    />
                    <label htmlFor="gstCert" className="cursor-pointer">
                      <p className="text-sm text-slate-600">
                        {gstCertificate ? gstCertificate.name : 'Click to upload GST Certificate'}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">PDF, JPG or PNG (Max 5MB)</p>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shopLic">Shop License Upload (Optional)</Label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
                    <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <Input
                      id="shopLic"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setShopLicense(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <label htmlFor="shopLic" className="cursor-pointer">
                      <p className="text-sm text-slate-600">
                        {shopLicense ? shopLicense.name : 'Click to upload Shop License'}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">PDF, JPG or PNG (Max 5MB)</p>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                    Previous
                  </Button>
                  <Button type="button" onClick={nextStep} className="flex-1 bg-orange-600 hover:bg-orange-700">
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {/* Step 6: Final */}
            {currentStep === 6 && (
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Review & Submit</h3>
                
                <div className="bg-slate-50 rounded-lg p-6 space-y-3">
                  <div>
                    <p className="text-sm text-slate-600">Shop Name</p>
                    <p className="font-medium text-slate-900">{shopName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Category</p>
                    <p className="font-medium text-slate-900">{category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Location</p>
                    <p className="font-medium text-slate-900">{city}, {state}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Contact Person</p>
                    <p className="font-medium text-slate-900">{fullName} - {mobile}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-1"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-slate-700">
                    I accept the <Link href="/terms" className="text-orange-600 hover:underline">Terms & Conditions</Link> and confirm that all information provided is accurate.
                  </label>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                    Previous
                  </Button>
                  <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700">
                    Submit Registration
                  </Button>
                </div>
              </div>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/login" className="text-orange-600 hover:text-orange-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
