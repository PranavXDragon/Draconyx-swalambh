'use client';

import { useState, useRef } from 'react';
import { useAppStore } from '@/store/app-store';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera, Save, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SupplierProfile() {
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  const router = useRouter();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string>((user as any)?.profilePicture || '');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || '',
    mobile: (user as any)?.mobile || '',
    category: (user as any)?.category || '',
    gstNumber: (user as any)?.gstNumber || '',
    location: user?.location?.address || '',
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...formData,
      profilePicture,
      location: user?.location ? {
        ...user.location,
        address: formData.location,
      } : undefined,
    };
    
    setUser(updatedUser as any);
    document.cookie = `user=${JSON.stringify(updatedUser)}; path=/`;
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      company: user?.company || '',
      mobile: (user as any)?.mobile || '',
      category: (user as any)?.category || '',
      gstNumber: (user as any)?.gstNumber || '',
      location: user?.location?.address || '',
    });
    setProfilePicture((user as any)?.profilePicture || '');
    setIsEditing(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Supplier Profile</h1>
          <p className="text-slate-600 mt-1">Manage your profile information</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="bg-orange-600 hover:bg-orange-700">
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button onClick={handleCancel} variant="outline">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="h-32 w-32 rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-white text-4xl font-bold">{user.name.charAt(0).toUpperCase()}</span>
                )}
              </div>
              {isEditing && (
                <>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </>
              )}
            </div>

            {/* Profile Info Summary */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-orange-900">{formData.name}</h2>
              <p className="text-orange-700 font-medium">{formData.company}</p>
              <p className="text-orange-600 text-sm">{formData.email}</p>
              <div className="mt-2 inline-block px-3 py-1 bg-orange-200 text-orange-900 rounded-full text-xs font-semibold">
                Supplier Account
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              {isEditing ? (
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                />
              ) : (
                <p className="text-lg font-semibold text-slate-900">{formData.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              {isEditing ? (
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                />
              ) : (
                <p className="text-lg font-semibold text-slate-900">{formData.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Mobile Number</label>
              {isEditing ? (
                <Input
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="Enter mobile number"
                />
              ) : (
                <p className="text-lg font-semibold text-slate-900">{formData.mobile || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
              {isEditing ? (
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Enter company name"
                />
              ) : (
                <p className="text-lg font-semibold text-slate-900">{formData.company}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              {isEditing ? (
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Enter category"
                />
              ) : (
                <p className="text-lg font-semibold text-slate-900 capitalize">{formData.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">GST Number</label>
              {isEditing ? (
                <Input
                  value={formData.gstNumber}
                  onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                  placeholder="Enter GST number"
                />
              ) : (
                <p className="text-lg font-semibold text-slate-900">{formData.gstNumber || 'Not provided'}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
              {isEditing ? (
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter location"
                />
              ) : (
                <p className="text-lg font-semibold text-slate-900">{formData.location}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
