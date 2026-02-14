'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/app-store';
import { 
  Package, 
  TrendingUp, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  Truck,
  Bike,
  TrendingDown,
  Award,
  Bell,
  DollarSign
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function SupplierDashboard() {
  const user = useAppStore((state) => state.user);
  // Active Orders Stats
  const activeOrders = {
    urgent: 3,
    normal: 5,
  };

  // SLA Status
  const slaStatus = {
    onTrack: 6,
    atRisk: 1,
    breached: 1,
  };

  // Supplier Score
  const supplierScore = {
    reliability: 94.5,
    avgResponseTime: 8, // minutes
    rating: 4.7,
  };

  // Delivery Modes
  const deliveryModes = {
    ownVehicle: true,
    courier: true,
    emergencyDriver: false,
  };

  // Performance Metrics
  const performance = {
    ordersCompleted: 247,
    onTimePercentage: 92,
    lateDeliveries: 18,
    missedOrders: 3,
    avgDispatchTime: 12, // minutes
  };

  // Earnings
  const earnings = {
    today: 15800,
    month: 245000,
    pending: 32000,
    bonuses: 5000,
    penalties: 1200,
  };

  // Urgent Alerts
  const alerts = [
    {
      id: 1,
      message: 'Urgent order incoming – respond in 3 min',
      type: 'urgent',
      time: '2 min ago',
    },
    {
      id: 2,
      message: 'SLA at risk for Order #ORD-458',
      type: 'warning',
      time: '15 min ago',
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header with Alerts */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Supplier Overview</h1>
          <p className="text-sm md:text-base text-slate-600 mt-1">Manage orders, inventory & performance</p>
        </div>
        <div className="relative">
          <Button variant="outline" size="default" className="relative w-full sm:w-auto">
            <Bell className="h-4 w-4 md:h-5 md:w-5 mr-2" />
            Alerts
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
              {alerts.length}
            </span>
          </Button>
        </div>
      </div>

      {/* Urgent Alerts Banner */}
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-3 md:p-4 rounded-lg border-l-4 ${
            alert.type === 'urgent'
              ? 'bg-red-50 border-red-600'
              : 'bg-amber-50 border-amber-600'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2 md:space-x-3">
              <AlertCircle
                className={`h-4 w-4 md:h-5 md:w-5 flex-shrink-0 ${
                  alert.type === 'urgent' ? 'text-red-600' : 'text-amber-600'
                }`}
              />
              <div>
                <p className="text-sm md:text-base font-semibold text-slate-900">{alert.message}</p>
                <p className="text-xs md:text-sm text-slate-600">{alert.time}</p>
              </div>
            </div>
            <Button size="sm" variant={alert.type === 'urgent' ? 'destructive' : 'default'} className="whitespace-nowrap">
              Respond Now
            </Button>
          </div>
        </div>
      ))}

      {/* Active Orders Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Card className="border-l-4 border-red-600">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-red-600 text-base md:text-lg">
              <AlertCircle className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Urgent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl md:text-4xl font-bold text-red-600">{activeOrders.urgent}</div>
            <p className="text-xs md:text-sm text-slate-600 mt-1">Requires immediate action</p>
            <Button className="w-full mt-3 md:mt-4 bg-red-600 hover:bg-red-700 text-sm md:text-base">
              View All Urgent
            </Button>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-amber-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-amber-600 text-base md:text-lg">
              <Clock className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Normal Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl md:text-4xl font-bold text-amber-600">{activeOrders.normal}</div>
            <p className="text-xs md:text-sm text-slate-600 mt-1">Standard delivery timeline</p>
            <Button variant="outline" className="w-full mt-3 md:mt-4 text-sm md:text-base">
              View All Orders
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* SLA Status & Supplier Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SLA Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current SLA Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">On-track</span>
              <span className="font-semibold text-green-600">{slaStatus.onTrack}</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full">
              <div className="h-2 bg-green-600 rounded-full" style={{ width: '75%' }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">At-risk</span>
              <span className="font-semibold text-amber-600">{slaStatus.atRisk}</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full">
              <div className="h-2 bg-amber-500 rounded-full" style={{ width: '12.5%' }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Breached</span>
              <span className="font-semibold text-red-600">{slaStatus.breached}</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full">
              <div className="h-2 bg-red-600 rounded-full" style={{ width: '12.5%' }} />
            </div>
          </CardContent>
        </Card>

        {/* Supplier Score */}
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-base md:text-lg flex items-center">
              <Award className="h-4 w-4 md:h-5 md:w-5 mr-2 text-purple-600" />
              Supplier Score
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs md:text-sm text-slate-600">Reliability</span>
                <span className="font-bold text-xl md:text-2xl text-purple-600">{supplierScore.reliability}%</span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 md:h-5 md:w-5 ${
                      i < Math.floor(supplierScore.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-xs md:text-sm font-medium">{supplierScore.rating}</span>
              </div>
            </div>
            
            <div>
              <span className="text-xs md:text-sm text-slate-600">Avg Response Time</span>
              <div className="text-xl md:text-2xl font-bold text-blue-600">{supplierScore.avgResponseTime} min</div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Modes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg flex items-center">
              <Truck className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Delivery Modes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 md:space-y-3">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <div className="flex items-center space-x-2">
                <Truck className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                <span className="text-xs md:text-sm font-medium">Own Vehicle</span>
              </div>
              <CheckCircle2 className={`h-4 w-4 md:h-5 md:w-5 ${deliveryModes.ownVehicle ? 'text-green-600' : 'text-slate-300'}`} />
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium">Courier</span>
              </div>
              <CheckCircle2 className={`h-5 w-5 ${deliveryModes.courier ? 'text-green-600' : 'text-slate-300'}`} />
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <div className="flex items-center space-x-2">
                <Bike className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                <span className="text-xs md:text-sm font-medium">Emergency Driver</span>
              </div>
              <CheckCircle2 className={`h-4 w-4 md:h-5 md:w-5 ${deliveryModes.emergencyDriver ? 'text-green-600' : 'text-slate-300'}`} />
            </div>

            <Button size="sm" variant="outline" className="w-full mt-2 text-xs md:text-sm">
              Update Availability
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance & Earnings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">SLA & Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div>
                <p className="text-xs md:text-sm text-slate-600">Orders Completed</p>
                <p className="text-xl md:text-2xl font-bold text-slate-900">{performance.ordersCompleted}</p>
              </div>
              <div>
                <p className="text-xs md:text-sm text-slate-600">On-time %</p>
                <p className="text-xl md:text-2xl font-bold text-green-600">{performance.onTimePercentage}%</p>
              </div>
              <div>
                <p className="text-xs md:text-sm text-slate-600">Late Deliveries</p>
                <p className="text-xl md:text-2xl font-bold text-amber-600">{performance.lateDeliveries}</p>
              </div>
              <div>
                <p className="text-xs md:text-sm text-slate-600">Missed Orders</p>
                <p className="text-xl md:text-2xl font-bold text-red-600">{performance.missedOrders}</p>
              </div>
            </div>

            <div className="pt-3 md:pt-4 border-t">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs md:text-sm text-slate-600">Avg Dispatch Time</span>
                <span className="text-sm md:text-base font-bold text-blue-600">{performance.avgDispatchTime} min</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full">
                <div className="h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" style={{ width: '85%' }} />
              </div>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                Improving trend
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Payments & Earnings */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="flex items-center text-base md:text-lg">
              <DollarSign className="h-4 w-4 md:h-5 md:w-5 mr-2 text-green-600" />
              Payments & Earnings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div>
                <p className="text-xs md:text-sm text-slate-600">Today</p>
                <p className="text-base md:text-xl font-bold text-green-600">{formatCurrency(earnings.today)}</p>
              </div>
              <div>
                <p className="text-xs md:text-sm text-slate-600">This Month</p>
                <p className="text-base md:text-xl font-bold text-green-600">{formatCurrency(earnings.month)}</p>
              </div>
            </div>

            <div className="pt-3 md:pt-4 border-t space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm text-slate-600">Pending Payments</span>
                <span className="text-sm md:text-base font-semibold text-amber-600">{formatCurrency(earnings.pending)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm text-green-600">SLA Bonuses</span>
                <span className="text-sm md:text-base font-semibold text-green-600">+{formatCurrency(earnings.bonuses)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm text-red-600">SLA Penalties</span>
                <span className="text-sm md:text-base font-semibold text-red-600">-{formatCurrency(earnings.penalties)}</span>
              </div>
            </div>

            <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
              Download Invoice
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
          <Package className="mr-2 h-5 w-5" />
          Manage Inventory
        </Button>
        <Button size="lg" variant="outline">
          <Truck className="mr-2 h-5 w-5" />
          Vehicle Status
        </Button>
        <Button size="lg" variant="outline">
          <TrendingUp className="mr-2 h-5 w-5" />
          View Analytics
        </Button>
        <Button size="lg" variant="outline">
          <Bell className="mr-2 h-5 w-5" />
          All Notifications
        </Button>
      </div>

      {/* Emergency Bonus Indicator */}
      <Card className="border-2 border-orange-500 bg-gradient-to-r from-orange-50 to-amber-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-orange-500">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Emergency Bonus Available!</h3>
                <p className="text-sm text-slate-600">Deliver within 45 min → +₹500 bonus</p>
              </div>
            </div>
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              Accept Emergency Orders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
