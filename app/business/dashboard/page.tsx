'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AlertCircle, 
  Clock, 
  TrendingDown, 
  ArrowRight,
  Package,
  CheckCircle2,
  Users,
  PlusCircle,
  BarChart3,
  Gauge,
  DollarSign,
  AlertTriangle,
  Shield,
  TrendingUp,
  Zap
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useAppStore } from '@/store/app-store';

export default function BusinessDashboard() {
  const user = useAppStore((state) => state.user);
  // Readiness Status
  const readinessStatus = {
    status: 'green', // green / yellow / red
    message: 'All systems operational',
  };

  // Stats
  const stats = {
    avgEmergencyETA: 42, // minutes
    suppliersWithin1Hr: 12,
    suppliersWithin2Hr: 28,
    downtimeCostAtRisk: 2400000,
    todayDeliveries: 8,
    pending: 3,
    completed: 5,
    totalCost: 140000,
    savedCost: 85000,
  };

  // Active Deliveries
  const activeDeliveries = [
    {
      id: 'DEL-001',
      type: 'Emergency',
      priority: 'Critical',
      vehicle: 'Bike',
      eta: '18 min',
      status: 'In Transit',
    },
    {
      id: 'DEL-002',
      type: 'Standard',
      priority: 'High',
      vehicle: 'Van',
      eta: '45 min',
      status: 'Picked Up',
    },
    {
      id: 'DEL-003',
      type: 'Express',
      priority: 'Medium',
      vehicle: 'Truck',
      eta: '1h 20min',
      status: 'Preparing',
    },
  ];

  // AI Insights
  const aiInsights = [
    {
      type: 'alert',
      message: 'Order #DEL-001 delay predicted - consider backup supplier',
      impact: 'High',
    },
    {
      type: 'optimization',
      message: 'Switch to Cost Mode →  Save ₹12,000 on next 3 orders',
      impact: 'Medium',
    },
    {
      type: 'recommendation',
      message: 'Pre-position bearings at Plant B - high failure probability',
      impact: 'High',
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Executive Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Executive Overview</h1>
          <p className="text-sm md:text-base text-slate-600 mt-1">"Are we safe right now?"</p>
        </div>
        <Button size="default" className="bg-red-600 hover:bg-red-700 text-sm md:text-lg px-4 md:px-8 w-full sm:w-auto">
          <AlertCircle className="mr-2 h-4 w-4 md:h-6 md:w-6" />
          Report Machine Failure
        </Button>
      </div>

      {/* Readiness Status Banner */}
      <Card className={`border-l-4 ${
        readinessStatus.status === 'green' ? 'border-green-600 bg-green-50' :
        readinessStatus.status === 'yellow' ? 'border-amber-500 bg-amber-50' :
        'border-red-600 bg-red-50'
      }`}>
        <CardContent className="pt-4 md:pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className={`p-3 md:p-4 rounded-full ${
                readinessStatus.status === 'green' ? 'bg-green-600' :
                readinessStatus.status === 'yellow' ? 'bg-amber-500' :
                'bg-red-600'
              }`}>
                <Shield className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                  {readinessStatus.status === 'green' && '🟢 System Ready'}
                  {readinessStatus.status === 'yellow' && '🟡 Moderate Risk'}
                  {readinessStatus.status === 'red' && '🔴 High Risk'}
                </h2>
                <p className="text-sm md:text-base text-slate-700 mt-1">{readinessStatus.message}</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs md:text-sm text-slate-600">Avg Emergency ETA</p>
              <p className="text-3xl md:text-4xl font-bold text-blue-600">{stats.avgEmergencyETA}m</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardHeader className="pb-2 md:pb-3">
            <CardTitle className="text-xs md:text-sm font-medium text-slate-600">
              Emergency Coverage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm">Within 1 hr</span>
                <span className="text-base md:text-xl font-bold text-green-600">{stats.suppliersWithin1Hr}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm">Within 2 hrs</span>
                <span className="text-base md:text-xl font-bold text-blue-600">{stats.suppliersWithin2Hr}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-red-600">
          <CardHeader className="pb-2 md:pb-3">
            <CardTitle className="text-xs md:text-sm font-medium text-slate-600 flex items-center">
              <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 mr-1 text-red-600" />
              Downtime Cost at Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-red-600">{formatCurrency(stats.downtimeCostAtRisk)}</div>
            <p className="text-xs text-slate-600 mt-1">If critical machine fails now</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 md:pb-3">
            <CardTitle className="text-xs md:text-sm font-medium text-slate-600">
              Deliveries Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="text-2xl md:text-3xl font-bold text-slate-900">{stats.todayDeliveries}</div>
              <div className="text-xs md:text-sm">
                <span className="text-amber-600 font-semibold">{stats.pending}</span> pending
                <br />
                <span className="text-green-600 font-semibold">{stats.completed}</span> done
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-2 md:pb-3">
            <CardTitle className="text-xs md:text-sm font-medium text-slate-600">
              Cost Saved (AI)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-green-600">{formatCurrency(stats.savedCost)}</div>
            <p className="text-xs text-green-700 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              vs Manual Selection
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Section */}
      <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-purple-600" />
            Smart AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {aiInsights.map((insight, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 bg-white ${
                insight.impact === 'High' ? 'border-red-500' :
                insight.impact === 'Medium' ? 'border-amber-500' :
                'border-blue-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    insight.type === 'alert' ? 'bg-red-100 text-red-700' :
                    insight.type === 'optimization' ? 'bg-green-100 text-green-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {insight.type.toUpperCase()}
                  </span>
                  <p className="text-sm font-medium text-slate-900 mt-2">{insight.message}</p>
                </div>
                <Button size="sm" variant="outline">Action</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Active Deliveries Panel */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base md:text-lg">Active Deliveries</CardTitle>
            <Button size="sm" variant="outline" className="text-xs md:text-sm">View All</Button>
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
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Type</th>
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Priority</th>
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Vehicle</th>
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">ETA</th>
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Status</th>
                    <th className="text-right py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {activeDeliveries.map((delivery) => (
                    <tr key={delivery.id} className="hover:bg-slate-50">
                      <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium whitespace-nowrap">{delivery.id}</td>
                      <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap">
                        <span className={`px-1.5 md:px-2 py-0.5 md:py-1 text-xs font-medium rounded-full ${
                          delivery.type === 'Emergency' ? 'bg-red-100 text-red-700' :
                          delivery.type === 'Express' ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {delivery.type}
                        </span>
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap">
                        <span className={`px-1.5 md:px-2 py-0.5 md:py-1 text-xs font-medium rounded-full ${
                          delivery.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                          delivery.priority === 'High' ? 'bg-amber-100 text-amber-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {delivery.priority}
                        </span>
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm whitespace-nowrap">{delivery.vehicle}</td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-blue-600 whitespace-nowrap">{delivery.eta}</td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm whitespace-nowrap">{delivery.status}</td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-right whitespace-nowrap">
                        <Button size="sm" variant="ghost" className="text-xs">Track</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-2 md:hidden px-4">← Scroll horizontally to see more</p>
        </CardContent>
      </Card>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card className="border-2 border-orange-200 bg-orange-50 hover:shadow-lg transition">
          <CardContent className="pt-4 md:pt-6">
            <PlusCircle className="h-8 w-8 md:h-12 md:w-12 text-orange-600 mb-2 md:mb-3" />
            <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2">Create New Delivery</h3>
            <p className="text-xs md:text-sm text-slate-600 mb-3 md:mb-4">Emergency or planned spare part delivery</p>
            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-sm md:text-base">
              Create Request
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardContent className="pt-4 md:pt-6">
            <Gauge className="h-8 w-8 md:h-12 md:w-12 text-purple-600 mb-2 md:mb-3" />
            <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2">Readiness Dashboard</h3>
            <p className="text-xs md:text-sm text-slate-600 mb-3 md:mb-4">Machine risk & coverage analysis</p>
            <Button variant="outline" className="w-full text-sm md:text-base">
              View Details
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardContent className="pt-4 md:pt-6">
            <DollarSign className="h-8 w-8 md:h-12 md:w-12 text-green-600 mb-2 md:mb-3" />
            <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2">Cost Savings Report</h3>
            <p className="text-xs md:text-sm text-slate-600 mb-3 md:mb-4">ROI and downtime avoided</p>
            <Button variant="outline" className="w-full text-sm md:text-base">
              View Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* ROI Banner */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">You avoided ₹12.4L downtime this quarter</h3>
              <p className="text-blue-100">Platform ROI: 340% • Avg response improved by 68%</p>
            </div>
            <Button size="lg" variant="secondary">
              Download Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
