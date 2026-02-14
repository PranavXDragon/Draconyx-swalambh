'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store/app-store';
import { 
  Bell, 
  CheckCircle, 
  XCircle, 
  Phone, 
  MessageCircle, 
  Navigation,
  Package,
  Clock,
  MapPin,
  IndianRupee,
  User,
  TrendingUp
} from 'lucide-react';

interface DeliveryRequest {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  pickupLocation: string;
  deliveryLocation: string;
  distance: string;
  payment: number;
  urgency: 'urgent' | 'normal';
  status: 'pending' | 'accepted' | 'in-transit' | 'delivered' | 'rejected';
  requestTime: string;
  partName: string;
}

export default function DeliveryDashboard() {
  const router = useRouter();
  const user = useAppStore((state) => state.user);
  const [activeTab, setActiveTab] = useState<'new' | 'active' | 'history'>('new');
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<DeliveryRequest | null>(null);

  // Mock data for delivery requests
  const [requests, setRequests] = useState<DeliveryRequest[]>([
    {
      id: 'DR001',
      orderId: 'ORD-2024-001',
      customerName: 'Rajesh Industries',
      customerPhone: '+91 98765 43210',
      pickupLocation: 'ABC Spare Parts, Andheri East',
      deliveryLocation: 'Rajesh Industries, Powai',
      distance: '8.5 km',
      payment: 250,
      urgency: 'urgent',
      status: 'pending',
      requestTime: '5 mins ago',
      partName: 'Bearing Assembly'
    },
    {
      id: 'DR002',
      orderId: 'ORD-2024-002',
      customerName: 'Tech Manufacturing Ltd',
      customerPhone: '+91 98765 43211',
      pickupLocation: 'XYZ Suppliers, Bandra',
      deliveryLocation: 'Tech Manufacturing, Goregaon',
      distance: '12 km',
      payment: 350,
      urgency: 'normal',
      status: 'pending',
      requestTime: '15 mins ago',
      partName: 'Motor Shaft'
    },
    {
      id: 'DR003',
      orderId: 'ORD-2024-003',
      customerName: 'Precision Tools Inc',
      customerPhone: '+91 98765 43212',
      pickupLocation: 'DEF Parts, Kurla',
      deliveryLocation: 'Precision Tools, Vikhroli',
      distance: '6 km',
      payment: 200,
      urgency: 'urgent',
      status: 'accepted',
      requestTime: '30 mins ago',
      partName: 'Hydraulic Pump'
    }
  ]);

  const handleAccept = (requestId: string) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status: 'accepted' } : req
      )
    );
  };

  const handleReject = (requestId: string) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status: 'rejected' } : req
      )
    );
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const openChat = (request: DeliveryRequest) => {
    setSelectedRequest(request);
    setChatOpen(true);
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const activeRequests = requests.filter(r => r.status === 'accepted' || r.status === 'in-transit');
  const historyRequests = requests.filter(r => r.status === 'delivered' || r.status === 'rejected');

  const todayStats = {
    deliveries: 5,
    earnings: 1250,
    distance: 45,
    rating: 4.8
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600">
                <span className="text-lg font-bold text-white">S</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Delivery Dashboard</h1>
                <p className="text-sm text-slate-600">Welcome back, Partner!</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
              >
                <Bell className="h-5 w-5" />
                {pendingRequests.length > 0 && (
                  <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {pendingRequests.length}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push('/login')}
              >
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Today's Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Today's Deliveries</p>
                  <p className="text-2xl font-bold text-slate-900">{todayStats.deliveries}</p>
                </div>
                <Package className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Today's Earnings</p>
                  <p className="text-2xl font-bold text-green-600">₹{todayStats.earnings}</p>
                </div>
                <IndianRupee className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Distance Covered</p>
                  <p className="text-2xl font-bold text-slate-900">{todayStats.distance} km</p>
                </div>
                <Navigation className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Rating</p>
                  <p className="text-2xl font-bold text-yellow-600">{todayStats.rating} ⭐</p>
                </div>
                <TrendingUp className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 border-b border-slate-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('new')}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'new'
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            New Requests ({pendingRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'active'
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Active Deliveries ({activeRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'history'
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            History
          </button>
        </div>

        {/* New Requests */}
        {activeTab === 'new' && (
          <div className="space-y-4">
            {pendingRequests.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No New Requests</h3>
                  <p className="text-slate-600">New delivery requests will appear here</p>
                </CardContent>
              </Card>
            ) : (
              pendingRequests.map(request => (
                <Card key={request.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">{request.orderId}</h3>
                          {request.urgency === 'urgent' && (
                            <Badge className="bg-red-100 text-red-700 border-red-300">URGENT</Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {request.requestTime}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">₹{request.payment}</p>
                        <p className="text-sm text-slate-600">{request.distance}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-start space-x-2">
                        <Package className="h-5 w-5 text-slate-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">{request.partName}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">Pickup</p>
                          <p className="text-sm text-slate-600">{request.pickupLocation}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">Delivery</p>
                          <p className="text-sm text-slate-600">{request.deliveryLocation}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <User className="h-5 w-5 text-slate-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">{request.customerName}</p>
                          <p className="text-sm text-slate-600">{request.customerPhone}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={() => handleAccept(request.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleReject(request.id)}
                        variant="outline"
                        className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                      <Button
                        onClick={() => handleCall(request.customerPhone)}
                        variant="outline"
                        className="border-blue-300 text-blue-600 hover:bg-blue-50"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button
                        onClick={() => openChat(request)}
                        variant="outline"
                        className="border-green-300 text-green-600 hover:bg-green-50"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Chat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Active Deliveries */}
        {activeTab === 'active' && (
          <div className="space-y-4">
            {activeRequests.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No Active Deliveries</h3>
                  <p className="text-slate-600">Accepted deliveries will appear here</p>
                </CardContent>
              </Card>
            ) : (
              activeRequests.map(request => (
                <Card key={request.id} className="border-2 border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">{request.orderId}</h3>
                          <Badge className="bg-green-600 text-white">IN PROGRESS</Badge>
                        </div>
                        <p className="text-sm text-slate-600">{request.customerName}</p>
                      </div>
                      <p className="text-2xl font-bold text-green-600">₹{request.payment}</p>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-start space-x-2">
                        <Package className="h-5 w-5 text-slate-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">{request.partName}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">Pickup</p>
                          <p className="text-sm text-slate-600">{request.pickupLocation}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">Delivery</p>
                          <p className="text-sm text-slate-600">{request.deliveryLocation}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        Navigate
                      </Button>
                      <Button
                        onClick={() => handleCall(request.customerPhone)}
                        variant="outline"
                        className="border-blue-300 text-blue-600 hover:bg-blue-50"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button
                        onClick={() => openChat(request)}
                        variant="outline"
                        className="border-green-300 text-green-600 hover:bg-green-50"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Chat
                      </Button>
                      <Button
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Mark Delivered
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* History */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {historyRequests.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Clock className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No History</h3>
                  <p className="text-slate-600">Completed and rejected deliveries will appear here</p>
                </CardContent>
              </Card>
            ) : (
              historyRequests.map(request => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">{request.orderId}</h3>
                          <Badge className={request.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                            {request.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600">{request.customerName}</p>
                        <p className="text-sm text-slate-500">{request.requestTime}</p>
                      </div>
                      <p className="text-xl font-bold text-slate-900">₹{request.payment}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>

      {/* Chat Modal */}
      {chatOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <Card className="w-full max-w-lg max-h-[80vh] flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>Chat with {selectedRequest.customerName}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setChatOpen(false)}
                >
                  <XCircle className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-3">
                <div className="bg-slate-100 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm text-slate-800">Hi, I need the {selectedRequest.partName} urgently. Can you deliver quickly?</p>
                  <p className="text-xs text-slate-500 mt-1">10:30 AM</p>
                </div>
                <div className="bg-green-100 rounded-lg p-3 max-w-[80%] ml-auto">
                  <p className="text-sm text-slate-800">Yes, I'm on my way. Will reach in 15 minutes.</p>
                  <p className="text-xs text-slate-500 mt-1">10:32 AM</p>
                </div>
              </div>
            </CardContent>
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button className="bg-green-600 hover:bg-green-700">
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
