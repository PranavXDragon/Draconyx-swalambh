'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/store/app-store';
import { ArrowLeft, Upload, MapPin } from 'lucide-react';

export default function BusinessRegisterPage() {
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);
  
  // Step 1: Company Basic
  const [companyName, setCompanyName] = useState('');
  const [industryType, setIndustryType] = useState('');
  const [gstNumber, setGSTNumber] = useState('');
  
  // Step 2: Address
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  
  // Step 3: Contact Person (Admin)
  const [fullName, setFullName] = useState('');
  const [officialEmail, setOfficialEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  
  // Step 4: Operations
  const [numberOfPlants, setNumberOfPlants] = useState('');
  
  // Step 5: Location
  const [latitude, setLatitude] = useState('19.0760');
  const [longitude, setLongitude] = useState('72.8777');
  
  // Step 6: Verification
  const [gstCertificate, setGSTCertificate] = useState<File | null>(null);
  
  // Step 7: Terms
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
      email: officialEmail,
      role: 'business' as const,
      company: companyName,
      industryType,
      gstNumber,
      location: {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
        address: `${city}, ${state} - ${pincode}`,
      },
      mobile,
      numberOfPlants: parseInt(numberOfPlants),
    };

    setUser(mockUser);
    document.cookie = `user=${JSON.stringify(mockUser)}; path=/`;
    window.location.href = '/business/dashboard';
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 7));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-900 to-purple-800 p-8 lg:p-12 flex-col justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
            <span className="text-lg font-bold text-purple-900">S</span>
          </div>
          <span className="text-xl font-bold text-white">Spedly</span>
        </div>
        
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Optimize Your Operations
          </h1>
          <p className="text-lg text-purple-100">
            Connect with verified suppliers and reduce machine downtime across all your plants.
          </p>
          
          <div className="mt-8 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-purple-100">Real-time spare part sourcing</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-purple-100">Track downtime costs</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-purple-100">Multi-plant management</span>
            </div>
          </div>
        </div>

        <div className="text-sm text-purple-200">
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
            <h2 className="text-3xl font-bold text-slate-900">Business Registration</h2>
            <p className="mt-2 text-sm text-slate-600">
              Step {currentStep} of 7
            </p>
            
            {/* Progress Bar */}
            <div className="mt-4 w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 7) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Company Basic */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Company Basic Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="ABC Manufacturing Pvt Ltd"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industryType">Industry Type *</Label>
                  <select
                    id="industryType"
                    value={industryType}
                    onChange={(e) => setIndustryType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  >
                    <option value="">Select industry type</option>
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

                <Button type="button" onClick={nextStep} className="w-full bg-purple-600 hover:bg-purple-700">
                  Next Step
                </Button>
              </div>
            )}

            {/* Step 2: Address */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Company Address</h3>
                
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

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                    Previous
                  </Button>
                  <Button type="button" onClick={nextStep} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Contact Person (Admin) */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Contact Person (Admin)</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Amit Sharma"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="officialEmail">Official Email *</Label>
                  <Input
                    id="officialEmail"
                    type="email"
                    value={officialEmail}
                    onChange={(e) => setOfficialEmail(e.target.value)}
                    placeholder="amit.sharma@company.com"
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

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                    Previous
                  </Button>
                  <Button type="button" onClick={nextStep} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Operations */}
            {currentStep === 4 && (
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Operations</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="numberOfPlants">Number of Plants *</Label>
                  <Input
                    id="numberOfPlants"
                    type="number"
                    value={numberOfPlants}
                    onChange={(e) => setNumberOfPlants(e.target.value)}
                    placeholder="1"
                    min="1"
                    required
                  />
                  <p className="text-xs text-slate-500">Total number of manufacturing plants/facilities</p>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                    Previous
                  </Button>
                  <Button type="button" onClick={nextStep} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Location */}
            {currentStep === 5 && (
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Plant Location</h3>
                
                <div className="space-y-2">
                  <Label>Primary Plant Location on Map</Label>
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
                  <p className="text-xs text-slate-500 mt-2">
                    This will help us match you with nearest suppliers
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                    Previous
                  </Button>
                  <Button type="button" onClick={nextStep} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {/* Step 6: Verification */}
            {currentStep === 6 && (
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Document Verification</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="gstCert">GST Certificate Upload *</Label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
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
                      <p className="text-xs text-slate-500 mt-1">PDF, JPG or PNG (Max 10MB)</p>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                    Previous
                  </Button>
                  <Button type="button" onClick={nextStep} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {/* Step 7: Final */}
            {currentStep === 7 && (
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Review & Submit</h3>
                
                <div className="bg-slate-50 rounded-lg p-6 space-y-3">
                  <div>
                    <p className="text-sm text-slate-600">Company Name</p>
                    <p className="font-medium text-slate-900">{companyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Industry Type</p>
                    <p className="font-medium text-slate-900">{industryType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Location</p>
                    <p className="font-medium text-slate-900">{city}, {state} - {pincode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Contact Person</p>
                    <p className="font-medium text-slate-900">{fullName} - {officialEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Number of Plants</p>
                    <p className="font-medium text-slate-900">{numberOfPlants}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-1"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-slate-700">
                    I accept the <Link href="/terms" className="text-purple-600 hover:underline">Terms & Conditions</Link> and confirm that all information provided is accurate.
                  </label>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                    Previous
                  </Button>
                  <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
                    Submit Registration
                  </Button>
                </div>
              </div>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
