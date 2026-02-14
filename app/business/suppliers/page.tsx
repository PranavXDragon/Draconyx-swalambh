'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search,
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  TrendingUp,
  Award,
  Filter
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface Supplier {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  responseTime: number;
  deliveryTime: number;
  slaCompliance: number;
  totalOrders: number;
  location: string;
  distance: number;
  phone: string;
  email: string;
  specialties: string[];
  verified: boolean;
}

export default function BusinessSuppliersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const suppliers: Supplier[] = [
    {
      id: 'SUP-001',
      name: 'Tech Supplies Pvt Ltd',
      rating: 4.8,
      reviews: 245,
      responseTime: 8,
      deliveryTime: 42,
      slaCompliance: 94,
      totalOrders: 127,
      location: 'Mumbai, Maharashtra',
      distance: 12,
      phone: '+91 98765 43210',
      email: 'info@techsupplies.com',
      specialties: ['Hydraulics', 'Bearings', 'Seals'],
      verified: true
    },
    {
      id: 'SUP-002',
      name: 'Industrial Parts Co',
      rating: 4.6,
      reviews: 189,
      responseTime: 12,
      deliveryTime: 55,
      slaCompliance: 89,
      totalOrders: 98,
      location: 'Pune, Maharashtra',
      distance: 25,
      phone: '+91 98765 43211',
      email: 'sales@industrialparts.com',
      specialties: ['Motors', 'Pumps', 'Valves'],
      verified: true
    },
    {
      id: 'SUP-003',
      name: 'ElectroParts Ltd',
      rating: 4.7,
      reviews: 156,
      responseTime: 10,
      deliveryTime: 48,
      slaCompliance: 92,
      totalOrders: 73,
      location: 'Mumbai, Maharashtra',
      distance: 18,
      phone: '+91 98765 43212',
      email: 'contact@electroparts.com',
      specialties: ['Electrical', 'Controls', 'Sensors'],
      verified: false
    }
  ];

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Supplier Network</h1>
          <p className="text-slate-600 mt-1">Manage and discover suppliers</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          Add Supplier
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Search by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSuppliers.map(supplier => (
          <Card key={supplier.id} className="hover:shadow-lg transition cursor-pointer" onClick={() => setSelectedSupplier(supplier)}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{supplier.name}</h3>
                    {supplier.verified && (
                      <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <span className="ml-1 font-semibold">{supplier.rating}</span>
                      <span className="ml-1 text-sm text-slate-600">({supplier.reviews} reviews)</span>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                      {supplier.slaCompliance}% SLA
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {supplier.specialties.map(specialty => (
                      <span key={specialty} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-600 mb-1">Avg Response</p>
                  <p className="font-semibold text-slate-900 flex items-center">
                    <Clock className="h-3 w-3 mr-1 text-blue-600" />
                    {supplier.responseTime}m
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Avg Delivery</p>
                  <p className="font-semibold text-slate-900">
                    {supplier.deliveryTime}m
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Total Orders</p>
                  <p className="font-semibold text-slate-900">{supplier.totalOrders}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Distance</p>
                  <p className="font-semibold text-slate-900 flex items-center">
                    <MapPin className="h-3 w-3 mr-1 text-red-600" />
                    {supplier.distance} km
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t space-y-2 text-sm">
                <p className="text-slate-600 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {supplier.location}
                </p>
                <p className="text-slate-600 flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  {supplier.phone}
                </p>
                <p className="text-slate-600 flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  {supplier.email}
                </p>
              </div>

              <div className="flex gap-2 mt-4">
                <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                  Create Request
                </Button>
                <Button size="sm" variant="outline">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSuppliers.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No suppliers found</h3>
            <p className="text-slate-600">Try adjusting your search</p>
          </CardContent>
        </Card>
      )}

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2 text-amber-600" />
            Top Performing Suppliers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {suppliers.sort((a, b) => b.rating - a.rating).slice(0, 3).map((supplier, index) => (
              <div key={supplier.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                    index === 0 ? 'bg-amber-500' :
                    index === 1 ? 'bg-slate-400' :
                    'bg-orange-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{supplier.name}</p>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="flex items-center">
                        <Star className="h-3 w-3 text-amber-500 fill-amber-500 mr-1" />
                        {supplier.rating}
                      </span>
                      <span className="text-slate-600">{supplier.totalOrders} orders</span>
                      <span className="text-green-600 font-semibold">{supplier.slaCompliance}% SLA</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
