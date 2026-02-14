'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { 
  CreditCard,
  Wallet,
  Building2,
  CheckCircle2,
  ArrowLeft,
  Package,
  MapPin,
  Phone,
  User,
  Mail
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const USD_TO_INR = 83;
const toINR = (usdPrice: number) => usdPrice * USD_TO_INR;

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod' | ''>('');

  // Delivery address state
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });

  // Payment details state
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
  });

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      if (parsedCart.length === 0) {
        router.push('/client/store');
      } else {
        setCart(parsedCart);
      }
    } else {
      router.push('/client/store');
    }
  }, [router]);

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const deliveryFee = 50; // ₹50 flat delivery fee
  const gst = (getTotalPrice() * 83 * 0.18); // 18% GST
  const grandTotal = (getTotalPrice() * 83) + deliveryFee + gst;

  const handlePlaceOrder = async () => {
    // Validate form
    if (!deliveryAddress.fullName || !deliveryAddress.phone || !deliveryAddress.addressLine1 || !deliveryAddress.city || !deliveryAddress.pincode) {
      alert('Please fill in all delivery address fields');
      return;
    }

    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    if (paymentMethod === 'card' && (!paymentDetails.cardNumber || !paymentDetails.cardHolder || !paymentDetails.expiryDate || !paymentDetails.cvv)) {
      alert('Please fill in all card details');
      return;
    }

    if (paymentMethod === 'upi' && !paymentDetails.upiId) {
      alert('Please enter your UPI ID');
      return;
    }

    setLoading(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate order ID
    const newOrderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    setOrderId(newOrderId);

    // Save order to localStorage
    const order = {
      orderId: newOrderId,
      items: cart,
      deliveryAddress,
      paymentMethod,
      totalAmount: grandTotal,
      orderDate: new Date().toISOString(),
      status: 'confirmed',
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    // Clear cart
    localStorage.removeItem('cart');
    setCart([]);

    setLoading(false);
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-2 border-green-500">
          <CardContent className="pt-8 md:pt-12 pb-8 md:pb-12 text-center px-4 md:px-6">
            <div className="bg-green-500 rounded-full w-16 h-16 md:w-24 md:h-24 flex items-center justify-center mx-auto mb-4 md:mb-6">
              <CheckCircle2 className="h-8 w-8 md:h-12 md:w-12 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-4">Order Placed Successfully!</h1>
            <p className="text-base md:text-lg text-slate-600 mb-4 md:mb-6">
              Your order ID: <span className="font-bold text-blue-600">{orderId}</span>
            </p>
            <p className="text-sm md:text-base text-slate-600 mb-6 md:mb-8">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button
                size="default"
                onClick={() => {
                  localStorage.setItem('trackingOrderId', orderId);
                  router.push('/client/track');
                }}
                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
              >
                <Package className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Track Order
              </Button>
              <Button
                size="default"
                variant="outline"
                onClick={() => router.push('/client/store')}
                className="w-full sm:w-auto"
              >
                Continue Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 md:gap-4">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="hover:bg-slate-100 flex-shrink-0"
          size="sm"
        >
          <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-slate-900">Checkout</h1>
          <p className="text-xs md:text-base text-slate-600 mt-1">{getTotalItems()} items in cart</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={deliveryAddress.fullName}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, fullName: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="tel"
                      value={deliveryAddress.phone}
                      onChange={(e) =>setDeliveryAddress({...deliveryAddress, phone: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    value={deliveryAddress.email}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={deliveryAddress.addressLine1}
                  onChange={(e) => setDeliveryAddress({...deliveryAddress, addressLine1: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="House no., Building name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">
                  Address Line 2
                </label>
                <input
                  type="text"
                  value={deliveryAddress.addressLine2}
                  onChange={(e) => setDeliveryAddress({...deliveryAddress, addressLine2: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Road name, Area, Colony"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.city}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, city: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Mumbai"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    State
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.state}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, state: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Maharashtra"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.pincode}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, pincode: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="400001"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Payment Method Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border-2 rounded-lg transition ${
                    paymentMethod === 'card'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <CreditCard className={`h-8 w-8 mx-auto mb-2 ${paymentMethod === 'card' ? 'text-blue-600' : 'text-slate-400'}`} />
                  <p className="text-sm font-medium text-center">Credit/Debit Card</p>
                </button>

                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 border-2 rounded-lg transition ${
                    paymentMethod === 'upi'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Wallet className={`h-8 w-8 mx-auto mb-2 ${paymentMethod === 'upi' ? 'text-blue-600' : 'text-slate-400'}`} />
                  <p className="text-sm font-medium text-center">UPI</p>
                </button>

                <button
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 border-2 rounded-lg transition ${
                    paymentMethod === 'cod'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Building2 className={`h-8 w-8 mx-auto mb-2 ${paymentMethod === 'cod' ? 'text-blue-600' : 'text-slate-400'}`} />
                  <p className="text-sm font-medium text-center">Cash on Delivery</p>
                </button>
              </div>

              {/* Card Payment Details */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 pt-4 border-t">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={paymentDetails.cardNumber}
                      onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      value={paymentDetails.cardHolder}
                      onChange={(e) => setPaymentDetails({...paymentDetails, cardHolder: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="JOHN DOE"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={paymentDetails.expiryDate}
                        onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">
                        CVV
                      </label>
                      <input
                        type="password"
                        value={paymentDetails.cvv}
                        onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="123"
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Payment Details */}
              {paymentMethod === 'upi' && (
                <div className="pt-4 border-t">
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    value={paymentDetails.upiId}
                    onChange={(e) => setPaymentDetails({...paymentDetails, upiId: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="yourname@upi"
                  />
                </div>
              )}

              {/* COD Message */}
              {paymentMethod === 'cod' && (
                <div className="pt-4 border-t">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm text-amber-800">
                      💵 Pay with cash when your order is delivered. Please keep exact change ready.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-16 h-16 object-contain bg-white p-1"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900 line-clamp-2">{item.title}</p>
                      <p className="text-sm text-slate-600">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-blue-600">{formatCurrency(toINR(item.price * item.quantity))}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal ({getTotalItems()} items)</span>
                  <span className="font-medium">{formatCurrency(toINR(getTotalPrice()))}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Delivery Fee</span>
                  <span className="font-medium">{formatCurrency(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">GST (18%)</span>
                  <span className="font-medium">{formatCurrency(gst)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Grand Total</span>
                  <span className="text-blue-600">{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
              >
                {loading ? (
                  <span className="flex items-center">
                    <Package className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Place Order
                  </span>
                )}
              </Button>

              <p className="text-xs text-slate-500 text-center">
                By placing this order, you agree to our Terms & Conditions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
