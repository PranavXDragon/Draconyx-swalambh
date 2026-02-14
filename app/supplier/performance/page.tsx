'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp,
  TrendingDown,
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  Star,
  AlertTriangle
} from 'lucide-react';

export default function SupplierPerformancePage() {
  const metrics = {
    slaCompliance: 92,
    avgResponseTime: 8,
    avgDeliveryTime: 42,
    onTimeDeliveries: 94,
    customerRating: 4.7,
    totalOrders: 247,
    completedOrders: 229,
    lateDeliveries: 15,
    missedOrders: 3
  };

  const recentPerformance = [
    { month: 'Jan', compliance: 88, deliveries: 65, rating: 4.5 },
    { month: 'Feb', compliance: 92, deliveries: 72, rating: 4.7 },
    { month: 'Mar', compliance: 95, deliveries: 68, rating: 4.8 },
    { month: 'Apr', compliance: 91, deliveries: 70, rating: 4.6 },
    { month: 'May', compliance: 93, deliveries: 75, rating: 4.7 }
  ];

  const slaBreaches = [
    {
      orderId: 'ORD-458',
      customer: 'Manufacturing Plant A',
      slaTarget: '45 min',
      actualTime: '58 min',
      delay: '13 min',
      penalty: 500
    },
    {
      orderId: 'ORD-442',
      customer: 'Tech Industries Ltd',
      slaTarget: '60 min',
      actualTime: '75 min',
      delay: '15 min',
      penalty: 300
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">SLA & Performance</h1>
        <p className="text-slate-600 mt-1">Track your service level agreement compliance and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">SLA Compliance</p>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-4xl font-bold text-blue-600">{metrics.slaCompliance}%</p>
            <p className="text-xs text-green-600 mt-1">+4% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 mb-2">Avg Response Time</p>
            <p className="text-4xl font-bold text-slate-900">{metrics.avgResponseTime}m</p>
            <p className="text-xs text-green-600 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              Improving
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 mb-2">Avg Delivery Time</p>
            <p className="text-4xl font-bold text-slate-900">{metrics.avgDeliveryTime}m</p>
            <p className="text-xs text-amber-600 mt-1">Target: 40m</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">Customer Rating</p>
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            </div>
            <p className="text-4xl font-bold text-amber-600">{metrics.customerRating}</p>
            <div className="flex mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(metrics.customerRating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                <span className="font-medium text-slate-900">Completed Orders</span>
              </div>
              <span className="text-2xl font-bold text-green-600">{metrics.completedOrders}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50">
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-amber-600" />
                <span className="font-medium text-slate-900">Late Deliveries</span>
              </div>
              <span className="text-2xl font-bold text-amber-600">{metrics.lateDeliveries}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-red-50">
              <div className="flex items-center gap-3">
                <XCircle className="h-6 w-6 text-red-600" />
                <span className="font-medium text-slate-900">Missed Orders</span>
              </div>
              <span className="text-2xl font-bold text-red-600">{metrics.missedOrders}</span>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-600">On-time Delivery Rate</span>
                <span className="font-bold text-green-600">{metrics.onTimeDeliveries}%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full">
                <div className="h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: `${metrics.onTimeDeliveries}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPerformance.map(month => (
                <div key={month.month} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{month.month}</p>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600">SLA Compliance</span>
                        <span className="font-medium text-blue-600">{month.compliance}%</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600">Deliveries</span>
                        <span className="font-medium text-slate-900">{month.deliveries}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600">Rating</span>
                        <span className="font-medium text-amber-600">{month.rating} ⭐</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SLA Breaches */}
      <Card className="border-2 border-red-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-red-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Recent SLA Breaches
            </CardTitle>
            <span className="text-sm text-red-600 font-semibold">{slaBreaches.length} breaches</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Order ID</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Customer</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">SLA Target</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Actual Time</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Delay</th>
                      <th className="text-right py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Penalty</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {slaBreaches.map(breach => (
                      <tr key={breach.orderId} className="hover:bg-red-50">
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-semibold whitespace-nowrap">{breach.orderId}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm whitespace-nowrap">{breach.customer}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-green-600 font-medium whitespace-nowrap">{breach.slaTarget}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-red-600 font-medium whitespace-nowrap">{breach.actualTime}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-red-600 font-bold whitespace-nowrap">{breach.delay}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-right text-xs md:text-sm text-red-600 font-bold whitespace-nowrap">-₹{breach.penalty}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Goals */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2 text-purple-600" />
            Performance Goals & Bonuses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-white border-2 border-purple-200">
              <p className="text-sm text-slate-600 mb-1">Achieve 95% SLA</p>
              <p className="text-2xl font-bold text-purple-600 mb-2">+₹5,000</p>
              <div className="w-full h-2 bg-slate-100 rounded-full">
                <div className="h-2 bg-purple-600 rounded-full" style={{ width: `${(metrics.slaCompliance / 95) * 100}%` }} />
              </div>
              <p className="text-xs text-slate-600 mt-1">{metrics.slaCompliance}% / 95%</p>
            </div>

            <div className="p-4 rounded-lg bg-white border-2 border-blue-200">
              <p className="text-sm text-slate-600 mb-1">100 Orders/Month</p>
              <p className="text-2xl font-bold text-blue-600 mb-2">+₹3,000</p>
              <div className="w-full h-2 bg-slate-100 rounded-full">
                <div className="h-2 bg-blue-600 rounded-full" style={{ width: '75%' }} />
              </div>
              <p className="text-xs text-slate-600 mt-1">75 / 100 orders</p>
            </div>

            <div className="p-4 rounded-lg bg-white border-2 border-amber-200">
              <p className="text-sm text-slate-600 mb-1">4.8+ Star Rating</p>
              <p className="text-2xl font-bold text-amber-600 mb-2">+₹2,000</p>
              <div className="w-full h-2 bg-slate-100 rounded-full">
                <div className="h-2 bg-amber-600 rounded-full" style={{ width: `${(metrics.customerRating / 4.8) * 100}%` }} />
              </div>
              <p className="text-xs text-slate-600 mt-1">{metrics.customerRating} / 4.8 ⭐</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
