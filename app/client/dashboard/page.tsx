'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Search,
  Star,
  MapPin,
  Phone,
  QrCode,
  Zap,
  AlertCircle,
  TrendingUp,
  ArrowRight,
  RefreshCw,
  MessageCircle,
  FileText,
  Wrench,
  Store
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useAppStore } from '@/store/app-store';

export default function ClientDashboard() {
  const user = useAppStore((state) => state.user);
  // Active Order Tracking
  const activeOrder = {
    id: 'ORD-4521',
    partName: 'Hydraulic Pump Seal - Model HPX-4200',
    sku: 'HPX-4200-SEAL',
    supplier: 'Tech Supplies Ltd',
    supplierRating: 4.8,
    status: 'In Transit',
    eta: '18 min',
    etaConfidence: 'high', // high / moderate / low
    price: 4200,
    deliveryFee: 300,
    emergencyFee: 500,
    deliveryMode: 'Bike',
    driverName: 'Rajesh Kumar',
    driverPhone: '+91 98765 43210',
    currentLocation: 'Approaching delivery point',
  };

  // Order History
  const orderHistory = [
    {
      id: 'ORD-4520',
      partName: 'Motor Bearing',
      supplier: 'Industrial Parts Co',
      deliveredIn: '42 min',
      orderedDate: '2 days ago',
      price: 3500,
      rating: 5,
    },
    {
      id: 'ORD-4519',
      partName: 'Control Panel Switch',
      supplier: 'ElectroParts Ltd',
      deliveredIn: '1h 15min',
      orderedDate: '5 days ago',
      price: 1200,
      rating: 4,
    },
  ];

  // Quick Stats
  const stats = {
    activeOrders: 1,
    completedOrders: 24,
    avgDeliveryTime: 45,
  };

  return (
    <div className="space-y-6">
      {/* Hero Search Bar */}
      <Card className="border-2 border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="pt-6 md:pt-8 pb-6 md:pb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-4 text-center">Order Spare Parts Instantly</h1>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 md:space-x-4">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by part name, SKU, or machine model..."
                className="w-full pl-9 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 text-sm md:text-lg border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <Button size="default" className="bg-purple-600 hover:bg-purple-700 px-4 md:px-6 w-full sm:w-auto">
              <QrCode className="mr-2 h-4 w-4 md:h-6 md:w-6" />
              Scan QR
            </Button>
            <Button size="default" className="bg-blue-600 hover:bg-blue-700 px-6 md:px-8 w-full sm:w-auto">
              Search
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-0 md:space-x-6 mt-3 md:mt-4 text-xs md:text-sm text-slate-600">
            <Link href="/client/store">
              <Button variant="link" className="text-blue-600 h-auto p-1">
                <Store className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                Browse Store
              </Button>
            </Link>
            <span className="text-slate-300 hidden md:inline">|</span>
            <Button variant="link" className="text-blue-600 h-auto p-1">
              <RefreshCw className="mr-1 h-3 w-3 md:h-4 md:w-4" />
              Repeat Last Order
            </Button>
            <span className="text-slate-300 hidden md:inline">|</span>
            <Button variant="link" className="text-blue-600 h-auto p-1">
              <Wrench className="mr-1 h-3 w-3 md:h-4 md:w-4" />
              Technician Mode
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card>
          <CardHeader className="pb-2 md:pb-3">
            <CardTitle className="text-xs md:text-sm font-medium text-slate-600">Active Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold text-blue-600">{stats.activeOrders}</div>
            <p className="text-xs md:text-sm text-slate-500 mt-1">Being delivered now</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 md:pb-3">
            <CardTitle className="text-xs md:text-sm font-medium text-slate-600">Completed Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold text-green-600">{stats.completedOrders}</div>
            <p className="text-xs md:text-sm text-slate-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 md:pb-3">
            <CardTitle className="text-xs md:text-sm font-medium text-slate-600">Avg Delivery Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold text-orange-600">{stats.avgDeliveryTime}m</div>
            <p className="text-xs md:text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              20% faster than before
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Order Tracking - Big Card */}
      {activeOrder && (
        <Card className="border-2 border-blue-300">
          <CardHeader className="bg-blue-50 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <CardTitle className="text-lg md:text-xl">Active Delivery</CardTitle>
                <p className="text-xs md:text-sm text-slate-600 mt-1">{activeOrder.id}</p>
              </div>
              <span className="px-3 md:px-4 py-1.5 md:py-2 bg-blue-600 text-white font-semibold rounded-full text-xs md:text-sm whitespace-nowrap w-fit">
                {activeOrder.status}
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            {/* Part Details */}
            <div className="mb-4 md:mb-6">
              <h3 className="text-base md:text-lg font-bold text-slate-900">{activeOrder.partName}</h3>
              <p className="text-xs md:text-sm text-slate-600">SKU: {activeOrder.sku}</p>
              <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2">
                <span className="text-xs md:text-sm text-slate-600">Supplier: {activeOrder.supplier}</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium ml-1">{activeOrder.supplierRating}</span>
                </div>
              </div>
            </div>

            {/* ETA Display with Confidence Bar */}
            <div className="mb-4 md:mb-6 p-4 md:p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-0 mb-3">
                <div>
                  <p className="text-xs md:text-sm text-slate-600 mb-1">Estimated Arrival</p>
                  <p className="text-3xl md:text-5xl font-bold text-green-600">{activeOrder.eta}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs md:text-sm text-slate-600 mb-1">Delivery Mode</p>
                  <div className="flex items-center sm:justify-end space-x-2">
                    <Package className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                    <span className="text-base md:text-xl font-semibold">{activeOrder.deliveryMode}</span>
                  </div>
                </div>
              </div>
              
              {/* ETA Confidence Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-700">ETA Confidence</span>
                  <span className={`text-xs font-bold ${
                    activeOrder.etaConfidence === 'high' ? 'text-green-600' :
                    activeOrder.etaConfidence === 'moderate' ? 'text-amber-600' :
                    'text-red-600'
                  }`}>
                    {activeOrder.etaConfidence === 'high' && '🟢 High'}
                    {activeOrder.etaConfidence === 'moderate' && '🟡 Moderate'}
                    {activeOrder.etaConfidence === 'low' && '🔴 Low'}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div className={`h-3 rounded-full ${
                    activeOrder.etaConfidence === 'high' ? 'bg-green-600 w-11/12' :
                    activeOrder.etaConfidence === 'moderate' ? 'bg-amber-500 w-7/12' :
                    'bg-red-600 w-4/12'
                  }`}></div>
                </div>
              </div>
            </div>

            {/* Live Tracking */}
            <div className="mb-6 p-4 bg-slate-50 rounded-lg border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-semibold text-slate-900">Live Location</span>
                </div>
                <Button size="sm" variant="outline">View Map</Button>
              </div>
              <p className="text-sm text-slate-700 mb-3">{activeOrder.currentLocation}</p>
              
              {/* Driver Contact */}
              <div className="flex items-center justify-between pt-3 border-t">
                <div>
                  <p className="text-sm font-medium text-slate-900">{activeOrder.driverName}</p>
                  <p className="text-xs text-slate-600">{activeOrder.driverPhone}</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-4 bg-slate-50 rounded-lg">
              <h4 className="font-semibold text-slate-900 mb-3">Price Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Part Cost</span>
                  <span className="text-sm font-medium">{formatCurrency(activeOrder.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Delivery Fee</span>
                  <span className="text-sm font-medium">{formatCurrency(activeOrder.deliveryFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Emergency Fee</span>
                  <span className="text-sm font-medium text-orange-600">+{formatCurrency(activeOrder.emergencyFee)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-bold text-slate-900">Total</span>
                  <span className="font-bold text-blue-600 text-lg">
                    {formatCurrency(activeOrder.price + activeOrder.deliveryFee + activeOrder.emergencyFee)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                <AlertCircle className="mr-2 h-4 w-4" />
                Delivery Delayed?
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Order History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Order History</CardTitle>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {orderHistory.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <p className="font-semibold text-slate-900">{order.partName}</p>
                  </div>
                  <p className="text-sm text-slate-600">{order.supplier}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Delivered in {order.deliveredIn} • {order.orderedDate}
                  </p>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < order.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900">{formatCurrency(order.price)}</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    <RefreshCw className="mr-1 h-3 w-3" />
                    Reorder
                  </Button>
                  <Button size="sm" variant="ghost" className="mt-1 w-full">
                    <FileText className="mr-1 h-3 w-3" />
                    Invoice
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Order Button (Floating) */}
      <div className="fixed bottom-8 right-8">
        <Button size="lg" className="bg-orange-600 hover:bg-orange-700 shadow-2xl h-16 px-8 text-lg rounded-full">
          <Zap className="mr-2 h-6 w-6" />
          Quick Order
        </Button>
      </div>
    </div>
  );
}
