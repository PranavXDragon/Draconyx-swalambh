'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  User,
  Phone,
  MapPin,
  Bell,
  Lock,
  CreditCard,
  Download,
  Trash2,
  Edit,
  Plus,
  Building2,
  FileText
} from 'lucide-react';

export default function BusinessSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Company Profile', icon: Building2 },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'billing', label: 'Billing & Invoices', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Business Settings</h1>
        <p className="text-slate-600 mt-1">Manage your business account preferences and settings</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 space-y-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex-1">
          {activeTab === 'profile' && <CompanyProfileSettings />}
          {activeTab === 'addresses' && <AddressSettings />}
          {activeTab === 'billing' && <BillingSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'security' && <SecuritySettings />}
        </div>
      </div>
    </div>
  );
}

function CompanyProfileSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Company Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
            <Building2 className="h-8 w-8 md:h-12 md:w-12 text-purple-600" />
          </div>
          <div className="text-center sm:text-left">
            <Button size="sm" variant="outline" className="text-xs md:text-sm">Change Logo</Button>
            <p className="text-xs md:text-sm text-slate-500 mt-1">JPG, PNG or SVG. Max 2MB.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
            <Input defaultValue="Apex Manufacturing Ltd" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Industry Type</label>
            <Input defaultValue="Heavy Manufacturing" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Business Email</label>
            <Input type="email" defaultValue="admin@apexmfg.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
            <Input defaultValue="+91 22 4567 8900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">GST Number</label>
            <Input defaultValue="27AABCA1234F1ZN" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">CIN Number</label>
            <Input defaultValue="U28920MH2010PLC123456" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Primary Contact Person</label>
            <Input defaultValue="Vikram Mehta" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Designation</label>
            <Input defaultValue="Procurement Manager" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Company Website</label>
            <Input defaultValue="https://www.apexmfg.com" />
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="bg-purple-600 hover:bg-purple-700">Save Changes</Button>
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
      type: 'Head Office',
      name: 'Apex Manufacturing Ltd',
      address: 'Tower B, 12th Floor, BKC Complex',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400051',
      phone: '+91 22 4567 8900',
      isDefault: true
    },
    {
      id: 2,
      type: 'Factory',
      name: 'Apex Manufacturing Plant',
      address: 'Plot D-42, MIDC Industrial Area',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411026',
      phone: '+91 20 2567 1234',
      isDefault: false
    },
    {
      id: 3,
      type: 'Warehouse',
      name: 'Apex Warehouse Unit',
      address: 'Sector 18, Logistics Park',
      city: 'Navi Mumbai',
      state: 'Maharashtra',
      pincode: '400705',
      phone: '+91 22 6789 4321',
      isDefault: false
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Business Addresses</h2>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Address
        </Button>
      </div>

      {addresses.map(addr => (
        <Card key={addr.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-900">{addr.type}</h3>
                  {addr.isDefault && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Primary</span>
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

function BillingSettings() {
  const invoices = [
    { id: 'INV-2026-0045', date: 'Feb 10, 2026', amount: '₹4,52,300', status: 'Paid' },
    { id: 'INV-2026-0038', date: 'Jan 25, 2026', amount: '₹2,18,750', status: 'Paid' },
    { id: 'INV-2026-0029', date: 'Jan 10, 2026', amount: '₹6,85,200', status: 'Paid' },
    { id: 'INV-2025-0412', date: 'Dec 20, 2025', amount: '₹3,42,100', status: 'Paid' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Corporate Account •••• 7890</p>
                <p className="text-sm text-slate-600">Net 30 Payment Terms</p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Invoices</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {invoices.map(inv => (
              <div key={inv.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="font-medium text-slate-900">{inv.id}</p>
                    <p className="text-sm text-slate-600">{inv.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-slate-900">{inv.amount}</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">{inv.status}</span>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function NotificationSettings() {
  const settings = [
    { id: 'requests', label: 'Part Request Updates', description: 'Status changes on your part requests', enabled: true },
    { id: 'quotes', label: 'New Quotes', description: 'When suppliers submit quotes for your requests', enabled: true },
    { id: 'deliveries', label: 'Delivery Updates', description: 'Real-time tracking of incoming deliveries', enabled: true },
    { id: 'reports', label: 'Report Generation', description: 'When scheduled reports are ready', enabled: false },
    { id: 'suppliers', label: 'Supplier Alerts', description: 'Performance alerts and SLA notifications', enabled: true },
    { id: 'sms', label: 'SMS Notifications', description: 'Critical updates via SMS', enabled: false },
    { id: 'weekly', label: 'Weekly Summary', description: 'Weekly overview of procurement activity', enabled: true }
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
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
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
          <Button className="bg-purple-600 hover:bg-purple-700">Update Password</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-600">Add an extra layer of security to your business account</p>
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
          <CardTitle>Team Access</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-slate-900">Active Team Members</p>
              <p className="text-sm text-slate-600">5 users with access to this account</p>
            </div>
            <Button variant="outline" size="sm">Manage</Button>
          </div>
          <div className="flex items-center justify-between py-2 border-t">
            <div>
              <p className="font-medium text-slate-900">API Keys</p>
              <p className="text-sm text-slate-600">2 active API keys for integrations</p>
            </div>
            <Button variant="outline" size="sm">Manage</Button>
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
              <p className="font-medium text-slate-900">Download Business Data</p>
              <p className="text-sm text-slate-600">Export all procurement and order data</p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <div className="flex items-center justify-between pt-3 border-t">
            <div>
              <p className="font-medium text-slate-900">Delete Account</p>
              <p className="text-sm text-slate-600">Permanently delete your business account and data</p>
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
