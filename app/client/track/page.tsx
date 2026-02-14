'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  User,
  Calendar
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface DeliveryAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface Order {
  orderId: string;
  items: CartItem[];
  deliveryAddress: DeliveryAddress;
  paymentMethod: string;
  totalAmount: number;
  orderDate: string;
  status: 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';
  estimatedDelivery: string;
  currentLocation?: string;
  trackingUpdates?: {
    status: string;
    location: string;
    timestamp: string;
    description: string;
  }[];
}

const USD_TO_INR = 83;
const toINR = (usdPrice: number) => usdPrice * USD_TO_INR;

export default function TrackOrderPage() {
  const router = useRouter();
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check for pre-filled order ID from navigation
  useEffect(() => {
    const savedOrderId = localStorage.getItem('trackingOrderId');
    if (savedOrderId) {
      setOrderId(savedOrderId);
      localStorage.removeItem('trackingOrderId');
      // Auto-track the order
      setTimeout(() => {
        trackOrderById(savedOrderId);
      }, 100);
    }
  }, []);

  const trackOrderById = (orderIdToTrack: string) => {
    if (!orderIdToTrack.trim()) {
      setError('Please enter an order ID');
      return;
    }

    setLoading(true);
    setError('');

    // Load orders from localStorage
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      const orders: Order[] = JSON.parse(savedOrders);
      const foundOrder = orders.find(o => o.orderId === orderIdToTrack.trim());
      
      if (foundOrder) {
        // Add mock tracking updates
        const orderWithTracking = {
          ...foundOrder,
          currentLocation: 'Mumbai Distribution Center',
          trackingUpdates: [
            {
              status: 'Order Placed',
              location: 'Mumbai',
              timestamp: foundOrder.orderDate,
              description: 'Your order has been placed successfully'
            },
            {
              status: 'Order Confirmed',
              location: 'Mumbai',
              timestamp: new Date(new Date(foundOrder.orderDate).getTime() + 2 * 60 * 60 * 1000).toISOString(),
              description: 'Seller has confirmed your order'
            },
            {
              status: 'In Transit',
              location: 'Mumbai Distribution Center',
              timestamp: new Date(new Date(foundOrder.orderDate).getTime() + 24 * 60 * 60 * 1000).toISOString(),
              description: 'Package is on the way to your city'
            }
          ]
        };
        setOrder(orderWithTracking);
      } else {
        setError('Order not found. Please check your order ID.');
      }
    } else {
      setError('No orders found.');
    }

    setLoading(false);
  };

  const trackOrder = () => {
    trackOrderById(orderId);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'Order Confirmed':
        return <CheckCircle2 className="h-6 w-6 text-blue-600" />;
      case 'processing':
        return <Clock className="h-6 w-6 text-amber-600" />;
      case 'shipped':
      case 'In Transit':
        return <Truck className="h-6 w-6 text-purple-600" />;
      case 'out_for_delivery':
        return <Truck className="h-6 w-6 text-orange-600" />;
      case 'delivered':
        return <Package className="h-6 w-6 text-green-600" />;
      default:
        return <Clock className="h-6 w-6 text-slate-400" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-2 md:gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => router.back()}
          className="flex-shrink-0"
        >
          <ArrowLeft className="h-4 w-4 mr-1 md:mr-2" />
          <span className="hidden sm:inline">Back</span>
        </Button>
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-slate-900">Track Your Order</h1>
          <p className="text-xs md:text-base text-slate-600 mt-1">Enter your order ID to track shipment status</p>
        </div>
      </div>

      {/* Order ID Input */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter Order ID (e.g., ORD-1234567890-XXXX)"
              className="flex-1 px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Button 
              onClick={trackOrder}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto px-6 md:px-8 min-h-[44px]"
            >
              {loading ? 'Tracking...' : 'Track Order'}
            </Button>
          </div>
          {error && (
            <p className="text-red-600 text-sm mt-2">{error}</p>
          )}
        </CardContent>
      </Card>

      {/* Order Details */}
      {order && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Tracking Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Delivery Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 md:space-y-6">
                  {order.trackingUpdates?.map((update, index) => (
                    <div key={index} className="flex gap-3 md:gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                          {getStatusIcon(update.status)}
                        </div>
                        {index < (order.trackingUpdates?.length || 0) - 1 && (
                          <div className="w-0.5 h-16 bg-slate-200 mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-semibold text-slate-900">{update.status}</h4>
                          <span className="text-sm text-slate-500">{formatDate(update.timestamp)}</span>
                        </div>
                        <p className="text-slate-600">{update.description}</p>
                        <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {update.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold text-slate-900 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {order.deliveryAddress.fullName}
                  </p>
                  <p className="text-slate-600 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {order.deliveryAddress.phone}
                  </p>
                  <p className="text-slate-600">
                    {order.deliveryAddress.addressLine1}
                    {order.deliveryAddress.addressLine2 && `, ${order.deliveryAddress.addressLine2}`}
                  </p>
                  <p className="text-slate-600">
                    {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-20 h-20 object-contain bg-slate-50 rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900 line-clamp-2">{item.title}</h4>
                        <p className="text-sm text-slate-600 mt-1">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">
                          {formatCurrency(toINR(item.price * item.quantity))}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600">Order ID</p>
                  <p className="font-mono text-sm font-semibold text-slate-900">{order.orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Order Date
                  </p>
                  <p className="font-medium text-slate-900">{formatDate(order.orderDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Expected Delivery</p>
                  <p className="font-medium text-slate-900">{formatDate(order.estimatedDelivery)}</p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-slate-600">Payment Method</p>
                  <p className="font-medium text-slate-900 capitalize">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}</p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-slate-600">Total Amount</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(order.totalAmount)}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <p className="text-sm text-blue-900 font-medium mb-2">Need Help?</p>
                <p className="text-sm text-blue-800 mb-3">Contact our support team for any queries</p>
                <Button size="sm" variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-100">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
