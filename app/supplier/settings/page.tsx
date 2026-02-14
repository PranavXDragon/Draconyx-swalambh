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
  Building,
  Bell,
  Lock,
  CreditCard,
  Download,
  LogOut
} from 'lucide-react';

export default function SupplierSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Business Profile', icon: Building },
    { id: 'contact', label: 'Contact Info', icon: Phone },
    { id: 'bank', label: 'Bank Details', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-1">Manage your account and preferences</p>
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
                    ? 'bg-orange-600 text-white'
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
          {activeTab === 'profile' && <BusinessProfile />}
          {activeTab === 'contact' && <ContactInfo />}
          {activeTab === 'bank' && <BankDetails />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'security' && <SecuritySettings />}
        </div>
      </div>
    </div>
  );
}

function BusinessProfile() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center">
            <Building className="h-12 w-12 text-orange-600" />
          </div>
          <div>
            <Button size="sm" variant="outline">Upload Logo</Button>
            <p className="text-sm text-slate-500 mt-1">JPG, PNG or GIF. Max 2MB.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Business Name</label>
            <Input defaultValue="Tech Supplies Pvt Ltd" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">GST Number</label>
            <Input defaultValue="27AABCU9603R1ZM" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">PAN Number</label>
            <Input defaultValue="AABCU9603R" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Business Type</label>
            <select className="w-full px-3 py-2 border border-slate-300 rounded-md">
              <option>Private Limited</option>
              <option>Partnership</option>
              <option>Proprietorship</option>
              <option>LLP</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Business Address</label>
            <Input defaultValue="Industrial Area Phase 2, Pune, Maharashtra 411019" />
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="bg-orange-600 hover:bg-orange-700">Save Changes</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ContactInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Contact Person</label>
            <Input defaultValue="Amit Sharma" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Designation</label>
            <Input defaultValue="Operations Manager" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <Input type="email" defaultValue="amit@techsupplies.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
            <Input defaultValue="+91 98765 43210" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Alternate Phone</label>
            <Input defaultValue="+91 98765 43211" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp Number</label>
            <Input defaultValue="+91 98765 43210" />
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="bg-orange-600 hover:bg-orange-700">Update Contact</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function BankDetails() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bank Account Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Account Holder Name</label>
            <Input defaultValue="Tech Supplies Pvt Ltd" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Bank Name</label>
            <Input defaultValue="HDFC Bank" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Account Number</label>
            <Input type="password" defaultValue="1234567890" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Account Number</label>
            <Input type="text" defaultValue="1234567890" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">IFSC Code</label>
            <Input defaultValue="HDFC0001234" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Branch</label>
            <Input defaultValue="Mumbai - MG Road" />
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="bg-orange-600 hover:bg-orange-700">Update Bank Details</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function NotificationSettings() {
  const settings = [
    { id: 'new-order', label: 'New Order Alerts', description: 'Get notified for new orders', enabled: true },
    { id: 'urgent', label: 'Urgent Order Notifications', description: 'Critical for SLA compliance', enabled: true },
    { id: 'sla-risk', label: 'SLA Risk Alerts', description: 'When order is at risk of breach', enabled: true },
    { id: 'payment', label: 'Payment Updates', description: 'Payment received notifications', enabled: true },
    { id: 'sms', label: 'SMS Notifications', description: 'Receive SMS for urgent orders', enabled: true }
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
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
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
          <Button className="bg-orange-600 hover:bg-orange-700">Update Password</Button>
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
              <p className="font-medium text-slate-900">Logout</p>
              <p className="text-sm text-slate-600">Sign out from this device</p>
            </div>
            <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
