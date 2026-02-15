'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Bell,
  Lock,
  CreditCard,
  Package,
  Download,
  Trash2,
  Edit,
  Plus
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-slate-600 mt-1">Manage your account preferences and settings</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 space-y-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'addresses' && <AddressSettings />}
          {activeTab === 'payments' && <PaymentSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'security' && <SecuritySettings />}
        </div>
      </div>
    </div>
  );
}

function ProfileSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <User className="h-8 w-8 md:h-12 md:w-12 text-blue-600" />
          </div>
          <div className="text-center sm:text-left">
            <Button size="sm" variant="outline" className="text-xs md:text-sm">Change Photo</Button>
            <p className="text-xs md:text-sm text-slate-500 mt-1">JPG, PNG or GIF. Max 2MB.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <Input defaultValue="Rajesh Kumar" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
            <Input defaultValue="Kumar Industries Pvt Ltd" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <Input type="email" defaultValue="rajesh.kumar@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
            <Input defaultValue="+91 98765 43210" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">GST Number</label>
            <Input defaultValue="27AABCU9603R1ZM" />
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function AddressSettings() {
  const addresses = [
    {
      id: 1,
      type: 'Shipping',
      name: 'Kumar Industries Pvt Ltd',
      address: 'Plot 45, Industrial Area Phase 2',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411019',
      phone: '+91 98765 43210',
      isDefault: true
    },
    {
      id: 2,
      type: 'Billing',
      name: 'Kumar Industries Pvt Ltd',
      address: '123 Business Park, MG Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '+91 98765 43211',
      isDefault: false
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Saved Addresses</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Address
        </Button>
      </div>

      {addresses.map(addr => (
        <Card key={addr.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-900">{addr.type} Address</h3>
                  {addr.isDefault && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Default</span>
                  )}
                </div>
                <p className="font-medium text-slate-700">{addr.name}</p>
                <p className="text-slate-600">{addr.address}</p>
                <p className="text-slate-600">{addr.city}, {addr.state} - {addr.pincode}</p>
                <p className="text-slate-600 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {addr.phone}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function PaymentSettings() {
  const cards = [
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
    { id: 2, type: 'Mastercard', last4: '5555', expiry: '08/24', isDefault: false }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Saved Payment Methods</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Card
        </Button>
      </div>

      {cards.map(card => (
        <Card key={card.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-900">{card.type} •••• {card.last4}</p>
                    {card.isDefault && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Default</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">Expires {card.expiry}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function NotificationSettings() {
  const settings = [
    { id: 'order', label: 'Order Updates', description: 'Notifications about your order status', enabled: true },
    { id: 'shipping', label: 'Shipping Updates', description: 'Track your shipment in real-time', enabled: true },
    { id: 'promo', label: 'Promotions & Offers', description: 'Special deals and discounts', enabled: false },
    { id: 'newsletter', label: 'Newsletter', description: 'Weekly product updates', enabled: true },
    { id: 'sms', label: 'SMS Notifications', description: 'Receive order updates via SMS', enabled: true }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {settings.map(setting => (
          <div key={setting.id} className="flex items-center justify-between py-3 border-b last:border-0">
            <div>
              <p className="font-medium text-slate-900">{setting.label}</p>
              <p className="text-sm text-slate-600">{setting.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked={setting.enabled} className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
            <Input type="password" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
            <Input type="password" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
            <Input type="password" />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Update Password</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-600">Add an extra layer of security to your account</p>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-slate-900">SMS Authentication</p>
              <p className="text-sm text-slate-600">Receive verification codes via SMS</p>
            </div>
            <Button variant="outline">Enable</Button>
          </div>
          <div className="flex items-center justify-between py-3 border-t">
            <div>
              <p className="font-medium text-slate-900">Authenticator App</p>
              <p className="text-sm text-slate-600">Use Google Authenticator or similar</p>
            </div>
            <Button variant="outline">Setup</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <div>
                <p className="font-medium text-slate-900">Last Login</p>
                <p className="text-sm text-slate-600">Today at 10:30 AM from Chrome on Windows</p>
              </div>
            </div>
            <div className="flex justify-between py-2 border-t">
              <div>
                <p className="font-medium text-slate-900">Active Sessions</p>
                <p className="text-sm text-slate-600">2 devices currently logged in</p>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">Download Your Data</p>
              <p className="text-sm text-slate-600">Export all your account data</p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <div className="flex items-center justify-between pt-3 border-t">
            <div>
              <p className="font-medium text-slate-900">Delete Account</p>
              <p className="text-sm text-slate-600">Permanently delete your account and data</p>
            </div>
            <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
