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
  Download,
  Trash2,
  Edit,
  Truck,
  Shield,
  FileText,
  Car
} from 'lucide-react';

export default function DeliverySettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'vehicle', label: 'Vehicle Details', icon: Truck },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Delivery Settings</h1>
        <p className="text-slate-600 mt-1">Manage your delivery profile and preferences</p>
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
                    ? 'bg-green-600 text-white'
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
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'vehicle' && <VehicleSettings />}
          {activeTab === 'documents' && <DocumentSettings />}
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
        <CardTitle className="text-lg md:text-xl">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <User className="h-8 w-8 md:h-12 md:w-12 text-green-600" />
          </div>
          <div className="text-center sm:text-left">
            <Button size="sm" variant="outline" className="text-xs md:text-sm">Change Photo</Button>
            <p className="text-xs md:text-sm text-slate-500 mt-1">JPG, PNG or GIF. Max 2MB.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <Input defaultValue="Arjun Singh" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <Input defaultValue="+91 87654 32100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <Input type="email" defaultValue="arjun.singh@delivery.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Aadhar Number</label>
            <Input defaultValue="XXXX XXXX 4567" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Current Address</label>
            <Input defaultValue="45, Sector 12, Dwarka" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
            <Input defaultValue="New Delhi" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Emergency Contact Name</label>
            <Input defaultValue="Priya Singh" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Emergency Contact Phone</label>
            <Input defaultValue="+91 98765 11223" />
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="bg-green-600 hover:bg-green-700">Save Changes</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function VehicleSettings() {
  const vehicles = [
    {
      id: 1,
      type: 'Tata Ace',
      regNumber: 'DL 01 AB 1234',
      capacity: '1 Ton',
      fuelType: 'Diesel',
      insurance: 'Valid till Mar 2027',
      isActive: true
    },
    {
      id: 2,
      type: 'Mahindra Bolero Pickup',
      regNumber: 'DL 02 CD 5678',
      capacity: '1.5 Ton',
      fuelType: 'Diesel',
      insurance: 'Valid till Aug 2026',
      isActive: false
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Registered Vehicles</h2>
        <Button className="bg-green-600 hover:bg-green-700">
          <Car className="h-4 w-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      {vehicles.map(vehicle => (
        <Card key={vehicle.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-900">{vehicle.type}</h3>
                  {vehicle.isActive && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Active</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
                  <p className="text-slate-600">Reg. Number: <span className="font-medium text-slate-900">{vehicle.regNumber}</span></p>
                  <p className="text-slate-600">Capacity: <span className="font-medium text-slate-900">{vehicle.capacity}</span></p>
                  <p className="text-slate-600">Fuel Type: <span className="font-medium text-slate-900">{vehicle.fuelType}</span></p>
                  <p className="text-slate-600">Insurance: <span className="font-medium text-slate-900">{vehicle.insurance}</span></p>
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

function DocumentSettings() {
  const documents = [
    { id: 1, name: 'Driving License', status: 'Verified', expiry: 'Jun 2030', uploaded: 'Jan 15, 2026' },
    { id: 2, name: 'Vehicle Registration (DL 01 AB 1234)', status: 'Verified', expiry: 'Dec 2028', uploaded: 'Jan 15, 2026' },
    { id: 3, name: 'Vehicle Insurance', status: 'Verified', expiry: 'Mar 2027', uploaded: 'Jan 15, 2026' },
    { id: 4, name: 'PAN Card', status: 'Verified', expiry: 'N/A', uploaded: 'Jan 15, 2026' },
    { id: 5, name: 'Pollution Certificate', status: 'Expiring Soon', expiry: 'Mar 2026', uploaded: 'Jan 15, 2026' },
    { id: 6, name: 'Vehicle Fitness Certificate', status: 'Pending Upload', expiry: '-', uploaded: '-' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Documents & Verification</h2>
        <Button className="bg-green-600 hover:bg-green-700">
          <FileText className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {documents.map(doc => (
              <div key={doc.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    doc.status === 'Verified' ? 'bg-green-100' : 
                    doc.status === 'Expiring Soon' ? 'bg-yellow-100' : 'bg-slate-100'
                  }`}>
                    <FileText className={`h-5 w-5 ${
                      doc.status === 'Verified' ? 'text-green-600' : 
                      doc.status === 'Expiring Soon' ? 'text-yellow-600' : 'text-slate-400'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{doc.name}</p>
                    <p className="text-xs text-slate-500">
                      {doc.uploaded !== '-' ? `Uploaded: ${doc.uploaded}` : 'Not uploaded'} 
                      {doc.expiry !== '-' && doc.expiry !== 'N/A' && ` · Expires: ${doc.expiry}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    doc.status === 'Verified' ? 'bg-green-100 text-green-700' : 
                    doc.status === 'Expiring Soon' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {doc.status}
                  </span>
                  <Button size="sm" variant="ghost">
                    {doc.status === 'Pending Upload' ? 'Upload' : 'Re-upload'}
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
    { id: 'newDelivery', label: 'New Delivery Assignments', description: 'When a new delivery is assigned to you', enabled: true },
    { id: 'routeUpdate', label: 'Route Updates', description: 'Optimization and route change alerts', enabled: true },
    { id: 'earnings', label: 'Earnings & Payments', description: 'Payment processed and earnings summary', enabled: true },
    { id: 'schedule', label: 'Schedule Reminders', description: 'Upcoming pickup and delivery reminders', enabled: true },
    { id: 'performance', label: 'Performance Reports', description: 'Weekly delivery performance summary', enabled: false },
    { id: 'sms', label: 'SMS Notifications', description: 'Critical delivery alerts via SMS', enabled: true },
    { id: 'sound', label: 'Sound Alerts', description: 'Play sound for new delivery requests', enabled: true }
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
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
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
          <Button className="bg-green-600 hover:bg-green-700">Update Password</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-600">Secure your delivery account with 2FA</p>
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
                <p className="text-sm text-slate-600">Today at 6:15 AM from Android App</p>
              </div>
            </div>
            <div className="flex justify-between py-2 border-t">
              <div>
                <p className="font-medium text-slate-900">Active Sessions</p>
                <p className="text-sm text-slate-600">1 device currently logged in</p>
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
              <p className="text-sm text-slate-600">Export all delivery and earnings data</p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <div className="flex items-center justify-between pt-3 border-t">
            <div>
              <p className="font-medium text-slate-900">Deactivate Account</p>
              <p className="text-sm text-slate-600">Temporarily disable your delivery account</p>
            </div>
            <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
              Deactivate
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
