'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  Eye
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface Order {
  orderId: string;
  items: any[];
  deliveryAddress: any;
  paymentMethod: string;
  totalAmount: number;
  orderDate: string;
  status: string;
  estimatedDelivery: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-700';
      case 'processing':
        return 'bg-amber-100 text-amber-700';
      case 'shipped':
        return 'bg-purple-100 text-purple-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'processing':
        return <Clock className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <Package className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  if (selectedOrder) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Order Details</h1>
            <p className="text-slate-600 mt-1">Order ID: {selectedOrder.orderId}</p>
          </div>
          <Button variant="outline" onClick={() => setSelectedOrder(null)}>
            Back to Orders
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-20 h-20 object-contain bg-white p-2"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900">{item.title}</h3>
                        <p className="text-sm text-slate-600 mt-1">Quantity: {item.quantity}</p>
                        <p className="text-sm font-bold text-blue-600 mt-1">
                          {formatCurrency(item.price * item.quantity * 83)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-slate-900">{selectedOrder.deliveryAddress.fullName}</p>
                <p className="text-slate-600 mt-1">{selectedOrder.deliveryAddress.phone}</p>
                {selectedOrder.deliveryAddress.email && (
                  <p className="text-slate-600">{selectedOrder.deliveryAddress.email}</p>
                )}
                <p className="text-slate-700 mt-3">
                  {selectedOrder.deliveryAddress.addressLine1}
                  {selectedOrder.deliveryAddress.addressLine2 && `, ${selectedOrder.deliveryAddress.addressLine2}`}
                  <br />
                  {selectedOrder.deliveryAddress.city}, {selectedOrder.deliveryAddress.state} {selectedOrder.deliveryAddress.pincode}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Order Status</p>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-slate-600 mb-1">Order Date</p>
                  <p className="font-medium">{new Date(selectedOrder.orderDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-600 mb-1">Estimated Delivery</p>
                  <p className="font-medium">{new Date(selectedOrder.estimatedDelivery).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-600 mb-1">Payment Method</p>
                  <p className="font-medium capitalize">{selectedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : selectedOrder.paymentMethod.toUpperCase()}</p>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-blue-600">{formatCurrency(selectedOrder.totalAmount)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    localStorage.setItem('trackingOrderId', selectedOrder.orderId);
                    router.push('/client/track');
                  }}
                >
                  <Truck className="mr-2 h-4 w-4" />
                  Track Delivery
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">My Orders</h1>
        <p className="text-slate-600 mt-1">Track and manage your orders</p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No orders yet</h3>
            <p className="text-slate-600 mb-6">Start shopping to see your orders here</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Browse Products
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.orderId} className="hover:shadow-lg transition">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-semibold text-lg text-slate-900">{order.orderId}</h3>
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600 mb-1">Order Date</p>
                        <p className="font-medium flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(order.orderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-600 mb-1">Items</p>
                        <p className="font-medium">{order.items.length} product(s)</p>
                      </div>
                      <div>
                        <p className="text-slate-600 mb-1">Total Amount</p>
                        <p className="font-bold text-blue-600">{formatCurrency(order.totalAmount)}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 mb-1">Payment</p>
                        <p className="font-medium capitalize">{order.paymentMethod === 'cod' ? 'COD' : order.paymentMethod.toUpperCase()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        localStorage.setItem('trackingOrderId', order.orderId);
                        router.push('/client/track');
                      }}
                    >
                      <Truck className="h-4 w-4 mr-2" />
                      Track
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
