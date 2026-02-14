'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  Package,
  MapPin,
  Phone,
  User,
  Calendar
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface Order {
  id: string;
  partName: string;
  sku: string;
  quantity: number;
  customer: string;
  customerPhone: string;
  deliveryAddress: string;
  orderTime: string;
  slaTime: string;
  status: 'urgent' | 'pending' | 'preparing' | 'dispatched' | 'delivered' | 'cancelled';
  deliveryMode: string;
  price: number;
  priority: 'critical' | 'high' | 'normal';
}

export default function SupplierOrdersPage() {
  const [selectedTab, setSelectedTab] = useState<'urgent' | 'active' | 'history'>('urgent');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const orders: Order[] = [
    {
      id: 'ORD-001',
      partName: 'Hydraulic Pump Seal HPX-4200',
      sku: 'HPX-4200-SEAL',
      quantity: 2,
      customer: 'Manufacturing Plant A',
      customerPhone: '+91 98765 43210',
      deliveryAddress: 'Industrial Area Phase 2, Pune 411019',
      orderTime: '2024-02-14T10:15:00',
      slaTime: '2024-02-14T10:30:00',
      status: 'urgent',
      deliveryMode: 'Bike',
      price: 4200,
      priority: 'critical'
    },
    {
      id: 'ORD-002',
      partName: 'Motor Bearing 6205-2RS',
      sku: 'BRG-6205-2RS',
      quantity: 4,
      customer: 'Tech Industries Ltd',
      customerPhone: '+91 98765 43211',
      deliveryAddress: 'MG Road, Mumbai 400001',
      orderTime: '2024-02-14T09:30:00',
      slaTime: '2024-02-14T11:30:00',
      status: 'preparing',
      deliveryMode: 'Van',
      price: 1800,
      priority: 'high'
    },
    {
      id: 'ORD-003',
      partName: 'Control Panel Switch',
      sku: 'SW-CP-001',
      quantity: 1,
      customer: 'ElectroWorks Pvt Ltd',
      customerPhone: '+91 98765 43212',
      deliveryAddress: 'Sector 15, Delhi 110001',
      orderTime: '2024-02-14T08:00:00',
      slaTime: '2024-02-14T10:00:00',
      status: 'dispatched',
      deliveryMode: 'Courier',
      price: 1200,
      priority: 'normal'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'preparing':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'dispatched':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'urgent':
        return <AlertCircle className="h-4 w-4" />;
      case 'preparing':
        return <Clock className="h-4 w-4" />;
      case 'dispatched':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600';
      case 'high':
        return 'text-amber-600';
      default:
        return 'text-blue-600';
    }
  };

  const filteredOrders = orders.filter(order => {
    if (selectedTab === 'urgent') return order.status === 'urgent';
    if (selectedTab === 'active') return ['preparing', 'dispatched'].includes(order.status);
    if (selectedTab === 'history') return ['delivered', 'cancelled'].includes(order.status);
    return false;
  });

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Order Management</h1>
        <p className="text-sm md:text-base text-slate-600 mt-1">Manage and track your orders</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 md:gap-2 border-b overflow-x-auto">
        <button
          onClick={() => setSelectedTab('urgent')}
          className={`px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-medium transition whitespace-nowrap ${
            selectedTab === 'urgent'
              ? 'border-b-2 border-red-600 text-red-600'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <AlertCircle className="h-3 w-3 md:h-4 md:w-4 inline mr-1 md:mr-2" />
          Urgent ({orders.filter(o => o.status === 'urgent').length})
        </button>
        <button
          onClick={() => setSelectedTab('active')}
          className={`px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-medium transition whitespace-nowrap ${
            selectedTab === 'active'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Clock className="h-3 w-3 md:h-4 md:w-4 inline mr-1 md:mr-2" />
          Active ({orders.filter(o => ['preparing', 'dispatched'].includes(o.status)).length})
        </button>
        <button
          onClick={() => setSelectedTab('history')}
          className={`px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-medium transition whitespace-nowrap ${
            selectedTab === 'history'
              ? 'border-b-2 border-green-600 text-green-600'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 inline mr-1 md:mr-2" />
          History
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map(order => (
          <Card key={order.id} className="hover:shadow-lg transition">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
                    <h3 className="text-base md:text-lg font-bold text-slate-900">{order.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </span>
                    <span className={`text-sm font-semibold ${getPriorityColor(order.priority)} uppercase`}>
                      {order.priority}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 text-xs md:text-sm">
                    <div>
                      <p className="text-slate-600 mb-1 text-xs md:text-sm">Part</p>
                      <p className="font-semibold text-slate-900 text-sm md:text-base">{order.partName}</p>
                      <p className="text-slate-500 text-xs">{order.sku}</p>
                    </div>
                    <div>
                      <p className="text-slate-600 mb-1 flex items-center text-xs md:text-sm">
                        <User className="h-3 w-3 mr-1" />
                        Customer
                      </p>
                      <p className="font-semibold text-slate-900 text-sm md:text-base">{order.customer}</p>
                      <p className="text-slate-500 text-xs flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {order.customerPhone}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600 mb-1 flex items-center text-xs md:text-sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        Delivery Address
                      </p>
                      <p className="text-slate-700 text-xs">{order.deliveryAddress}</p>
                    </div>
                    <div>
                      <p className="text-slate-600 mb-1 flex items-center text-xs md:text-sm">
                        <Calendar className="h-3 w-3 mr-1" />
                        Order Time
                      </p>
                      <p className="font-semibold text-slate-900">
                        {new Date(order.orderTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-red-600 text-xs font-semibold">
                        SLA: {new Date(order.slaTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-3 md:mt-4 pt-3 md:pt-4 border-t">
                    <div>
                      <span className="text-xs md:text-sm text-slate-600">Quantity:</span>
                      <span className="ml-1 md:ml-2 text-sm md:text-base font-semibold">{order.quantity}</span>
                    </div>
                    <div>
                      <span className="text-xs md:text-sm text-slate-600">Delivery Mode:</span>
                      <span className="ml-1 md:ml-2 text-sm md:text-base font-semibold">{order.deliveryMode}</span>
                    </div>
                    <div>
                      <span className="text-xs md:text-sm text-slate-600">Amount:</span>
                      <span className="ml-1 md:ml-2 text-sm md:text-base font-bold text-blue-600">{formatCurrency(order.price)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2 w-full sm:w-auto sm:ml-4">
                  <Button
                    size="sm"
                    onClick={() => setSelectedOrder(order)}
                    variant="outline"
                    className="flex-1 sm:flex-none text-xs md:text-sm"
                  >
                    View Details
                  </Button>
                  {order.status === 'urgent' && (
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 flex-1 sm:flex-none text-xs md:text-sm">
                      Accept Order
                    </Button>
                  )}
                  {order.status === 'preparing' && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none text-xs md:text-sm">
                      Mark Dispatched
                    </Button>
                  )}
                  {order.status === 'dispatched' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none text-xs md:text-sm">
                      Mark Delivered
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="py-8 md:py-12 text-center">
            <Package className="h-12 w-12 md:h-16 md:w-16 text-slate-300 mx-auto mb-3 md:mb-4" />
            <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">No orders in this category</h3>
            <p className="text-sm md:text-base text-slate-600">Orders will appear here when available</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
