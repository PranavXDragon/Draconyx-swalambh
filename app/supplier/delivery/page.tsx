'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Truck,
  Bike,
  CheckCircle2,
  AlertCircle,
  Clock,
  User,
  Phone,
  MapPin
} from 'lucide-react';

interface Vehicle {
  id: string;
  type: 'bike' | 'van' | 'truck';
  registrationNumber: string;
  driver: string;
  driverPhone: string;
  status: 'available' | 'in-transit' | 'maintenance';
  currentLocation?: string;
  assignedOrder?: string;
}

export default function SupplierDeliveryPage() {
  const vehicles: Vehicle[] = [
    {
      id: '1',
      type: 'bike',
      registrationNumber: 'MH 12 AB 1234',
      driver: 'Rajesh Kumar',
      driverPhone: '+91 98765 43210',
      status: 'in-transit',
      currentLocation: 'Mumbai - Pune Highway',
      assignedOrder: 'ORD-001'
    },
    {
      id: '2',
      type: 'van',
      registrationNumber: 'MH 12 CD 5678',
      driver: 'Suresh Patil',
      driverPhone: '+91 98765 43211',
      status: 'available'
    },
    {
      id: '3',
      type: 'truck',
      registrationNumber: 'MH 12 EF 9012',
      driver: 'Amit Sharma',
      driverPhone: '+91 98765 43212',
      status: 'maintenance'
    },
    {
      id: '4',
      type: 'bike',
      registrationNumber: 'MH 12 GH 3456',
      driver: 'Prakash Desai',
      driverPhone: '+91 98765 43213',
      status: 'available'
    }
  ];

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'bike':
        return <Bike className="h-8 w-8" />;
      case 'van':
      case 'truck':
        return <Truck className="h-8 w-8" />;
      default:
        return <Truck className="h-8 w-8" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in-transit':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'maintenance':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'in-transit':
        return <Clock className="h-4 w-4" />;
      case 'maintenance':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const stats = {
    totalVehicles: vehicles.length,
    available: vehicles.filter(v => v.status === 'available').length,
    inTransit: vehicles.filter(v => v.status === 'in-transit').length,
    maintenance: vehicles.filter(v => v.status === 'maintenance').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Delivery & Vehicles</h1>
          <p className="text-slate-600 mt-1">Manage your fleet and deliveries</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Add Vehicle
        </Button>
      </div>

      {/* Fleet Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 mb-1">Total Vehicles</p>
            <p className="text-3xl font-bold text-slate-900">{stats.totalVehicles}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 mb-1">Available</p>
            <p className="text-3xl font-bold text-green-600">{stats.available}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 mb-1">In Transit</p>
            <p className="text-3xl font-bold text-blue-600">{stats.inTransit}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 mb-1">Maintenance</p>
            <p className="text-3xl font-bold text-amber-600">{stats.maintenance}</p>
          </CardContent>
        </Card>
      </div>

      {/* Vehicle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vehicles.map(vehicle => (
          <Card key={vehicle.id} className="hover:shadow-lg transition">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${
                    vehicle.status === 'available' ? 'bg-green-100 text-green-600' :
                    vehicle.status === 'in-transit' ? 'bg-blue-100 text-blue-600' :
                    'bg-amber-100 text-amber-600'
                  }`}>
                    {getVehicleIcon(vehicle.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 uppercase">{vehicle.type}</h3>
                    <p className="text-sm text-slate-600 font-mono">{vehicle.registrationNumber}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(vehicle.status)}`}>
                  {getStatusIcon(vehicle.status)}
                  {vehicle.status.replace('-', ' ')}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <User className="h-4 w-4 text-slate-400 mr-2" />
                  <span className="text-slate-600">Driver:</span>
                  <span className="ml-2 font-semibold text-slate-900">{vehicle.driver}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 text-slate-400 mr-2" />
                  <span className="text-slate-600">Phone:</span>
                  <span className="ml-2 font-medium text-slate-900">{vehicle.driverPhone}</span>
                </div>
                {vehicle.currentLocation && (
                  <div className="flex items-start text-sm">
                    <MapPin className="h-4 w-4 text-slate-400 mr-2 mt-0.5" />
                    <div>
                      <span className="text-slate-600">Location:</span>
                      <span className="ml-2 font-medium text-blue-600">{vehicle.currentLocation}</span>
                    </div>
                  </div>
                )}
                {vehicle.assignedOrder && (
                  <div className="flex items-center text-sm pt-2 border-t">
                    <span className="text-slate-600">Assigned Order:</span>
                    <span className="ml-2 font-bold text-blue-600">{vehicle.assignedOrder}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                {vehicle.status === 'available' && (
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Assign Order
                  </Button>
                )}
                {vehicle.status === 'in-transit' && (
                  <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                    Track Location
                  </Button>
                )}
                <Button size="sm" variant="outline">
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delivery Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Mode Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50">
            <div className="flex items-center gap-3">
              <Truck className="h-6 w-6 text-blue-600" />
              <div>
                <p className="font-semibold text-slate-900">Own Vehicle Delivery</p>
                <p className="text-sm text-slate-600">Use your own fleet for deliveries</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50">
            <div className="flex items-center gap-3">
              <Bike className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-semibold text-slate-900">Emergency Bike Delivery</p>
                <p className="text-sm text-slate-600">For urgent orders within 1 hour</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50">
            <div className="flex items-center gap-3">
              <Truck className="h-6 w-6 text-orange-600" />
              <div>
                <p className="font-semibold text-slate-900">Third-party Courier</p>
                <p className="text-sm text-slate-600">Use courier services for distant locations</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
