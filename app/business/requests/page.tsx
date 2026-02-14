'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  PlusCircle,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  Package,
  Zap,
  DollarSign
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface PartRequest {
  id: string;
  partName: string;
  sku: string;
  quantity: number;
  machine: string;
  location: string;
  urgency: 'emergency' | 'urgent' | 'normal';
  requestedBy: string;
  requestDate: string;
  status: 'pending' | 'quoted' | 'ordered' | 'delivered';
  estimatedCost?: number;
}

export default function BusinessRequestsPage() {
  const [selectedTab, setSelectedTab] = useState<'pending' | 'active' | 'history'>('pending');
  const [showNewRequest, setShowNewRequest] = useState(false);

  const requests: PartRequest[] = [
    {
      id: 'REQ-001',
      partName: 'Hydraulic Pump Seal',
      sku: 'HPX-4200-SEAL',
      quantity: 2,
      machine: 'CNC Machine #5',
      location: 'Factory Floor 2',
      urgency: 'emergency',
      requestedBy: 'Maintenance Team',
      requestDate: '2024-02-14T10:15:00',
      status: 'pending',
      estimatedCost: 8400
    },
    {
      id: 'REQ-002',
      partName: 'Motor Bearing',
      sku: 'BRG-6205-2RS',
      quantity: 4,
      machine: 'Conveyor System A',
      location: 'Warehouse',
      urgency: 'urgent',
      requestedBy: 'Operations Team',
      requestDate: '2024-02-14T09:30:00',
      status: 'quoted',
      estimatedCost: 1800
    },
    {
      id: 'REQ-003',
      partName: 'Control Panel Switch',
      sku: 'SW-CP-001',
      quantity: 1,
      machine: 'Assembly Line B',
      location: 'Factory Floor 1',
      urgency: 'normal',
      requestedBy: 'Engineering Team',
      requestDate: '2024-02-13T14:00:00',
      status: 'ordered',
      estimatedCost: 1200
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'urgent':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'quoted':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'ordered':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const filteredRequests = requests.filter(req => {
    if (selectedTab === 'pending') return req.status === 'pending' || req.status === 'quoted';
    if (selectedTab === 'active') return req.status === 'ordered';
    if (selectedTab === 'history') return req.status === 'delivered';
    return false;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Part Requests</h1>
          <p className="text-slate-600 mt-1">Create and manage spare part requests</p>
        </div>
        <Button
          onClick={() => setShowNewRequest(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <Clock className="h-8 w-8 text-amber-600 mb-2" />
            <p className="text-sm text-slate-600 mb-1">Pending</p>
            <p className="text-3xl font-bold text-amber-600">
              {requests.filter(r => r.status === 'pending').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <DollarSign className="h-8 w-8 text-blue-600 mb-2" />
            <p className="text-sm text-slate-600 mb-1">Quoted</p>
            <p className="text-3xl font-bold text-blue-600">
              {requests.filter(r => r.status === 'quoted').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Package className="h-8 w-8 text-purple-600 mb-2" />
            <p className="text-sm text-slate-600 mb-1">Ordered</p>
            <p className="text-3xl font-bold text-purple-600">
              {requests.filter(r => r.status === 'ordered').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <CheckCircle2 className="h-8 w-8 text-green-600 mb-2" />
            <p className="text-sm text-slate-600 mb-1">Delivered</p>
            <p className="text-3xl font-bold text-green-600">
              {requests.filter(r => r.status === 'delivered').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setSelectedTab('pending')}
          className={`px-6 py-3 font-medium transition ${
            selectedTab === 'pending'
              ? 'border-b-2 border-purple-600 text-purple-600'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Pending & Quoted
        </button>
        <button
          onClick={() => setSelectedTab('active')}
          className={`px-6 py-3 font-medium transition ${
            selectedTab === 'active'
              ? 'border-b-2 border-purple-600 text-purple-600'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Active Orders
        </button>
        <button
          onClick={() => setSelectedTab('history')}
          className={`px-6 py-3 font-medium transition ${
            selectedTab === 'history'
              ? 'border-b-2 border-purple-600 text-purple-600'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          History
        </button>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map(request => (
          <Card key={request.id} className="hover:shadow-lg transition">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-bold text-slate-900">{request.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(request.urgency)}`}>
                      {request.urgency === 'emergency' && <Zap className="h-3 w-3 inline mr-1" />}
                      {request.urgency.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                      {request.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600 mb-1">Part</p>
                      <p className="font-semibold text-slate-900">{request.partName}</p>
                      <p className="text-slate-500 text-xs">{request.sku}</p>
                    </div>
                    <div>
                      <p className="text-slate-600 mb-1">Machine</p>
                      <p className="font-semibold text-slate-900">{request.machine}</p>
                      <p className="text-slate-500 text-xs">{request.location}</p>
                    </div>
                    <div>
                      <p className="text-slate-600 mb-1">Requested By</p>
                      <p className="font-semibold text-slate-900">{request.requestedBy}</p>
                      <p className="text-slate-500 text-xs">
                        {new Date(request.requestDate).toLocaleString('en-IN', { 
                          day: 'numeric', 
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600 mb-1">Estimated Cost</p>
                      <p className="font-bold text-blue-600 text-lg">
                        {request.estimatedCost ? formatCurrency(request.estimatedCost) : 'Pending'}
                      </p>
                      <p className="text-slate-500 text-xs">Qty: {request.quantity}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  {request.status === 'pending' && (
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Get Quotes
                    </Button>
                  )}
                  {request.status === 'quoted' && (
                    <>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Approve Order
                      </Button>
                      <Button size="sm" variant="outline">
                        View Quotes
                      </Button>
                    </>
                  )}
                  {request.status === 'ordered' && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Track Delivery
                    </Button>
                  )}
<Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No requests in this category</h3>
            <p className="text-slate-600">Requests will appear here when available</p>
          </CardContent>
        </Card>
      )}

      {/* New Request Modal (Simplified) */}
      {showNewRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Create New Part Request</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Part Name</label>
                  <Input placeholder="e.g., Hydraulic Pump Seal" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">SKU</label>
                  <Input placeholder="e.g., HPX-4200-SEAL" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                  <Input type="number" defaultValue="1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Urgency</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-md">
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Machine</label>
                  <Input placeholder="e.g., CNC Machine #5" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                  <Input placeholder="e.g., Factory Floor 2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Additional Notes</label>
                <textarea
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  rows={3}
                  placeholder="Any special requirements or notes..."
                />
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                  Submit Request
                </Button>
                <Button variant="outline" onClick={() => setShowNewRequest(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
