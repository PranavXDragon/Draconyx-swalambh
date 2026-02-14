'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText,
  Download,
  Calendar,
  TrendingUp,
  DollarSign,
  Clock,
  Package,
  BarChart3
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function BusinessReportsPage() {
  const reportCategories = [
    {
      title: 'Cost Analysis',
      icon: DollarSign,
      reports: [
        { name: 'Monthly Spending Report', period: 'January 2024', size: '2.4 MB' },
        { name: 'Cost Savings Analysis', period: 'Q4 2023', size: '1.8 MB' },
        { name: 'Supplier Cost Comparison', period: 'Last 6 Months', size: '3.2 MB' }
      ]
    },
    {
      title: 'Performance Metrics',
      icon: TrendingUp,
      reports: [
        { name: 'SLA Compliance Report', period: 'January 2024', size: '1.5 MB' },
        { name: 'Delivery Time Analysis', period: 'Q4 2023', size: '2.1 MB' },
        { name: 'Supplier Performance Scorecard', period: 'Annual 2023', size: '4.5 MB' }
      ]
    },
    {
      title: 'Operations',
      icon: Package,
      reports: [
        { name: 'Order Summary Report', period: 'January 2024', size: '1.2 MB' },
        { name: 'Downtime Analysis', period: 'Last Month', size: '2.8 MB' },
        { name: 'Machine Maintenance Log', period: 'Q4 2023', size: '3.6 MB' }
      ]
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      reports: [
        { name: 'Demand Forecast Report', period: 'Next Quarter', size: '2.2 MB' },
        { name: 'Inventory Optimization', period: 'Current', size: '1.9 MB' },
        { name: 'ROI Analysis Report', period: 'Annual 2023', size: '3.4 MB' }
      ]
    }
  ];

  const recentReports = [
    { name: 'January Cost Report', date: '2024-02-01', downloaded: 15 },
    { name: 'Q4 Performance Summary', date: '2024-01-15', downloaded: 32 },
    { name: 'Annual SLA Report', date: '2024-01-05', downloaded: 45 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
          <p className="text-slate-600 mt-1">Download and analyze performance reports</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <FileText className="h-4 w-4 mr-2" />
          Generate Custom Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <FileText className="h-8 w-8 text-blue-600 mb-2" />
            <p className="text-sm text-slate-600 mb-1">Total Reports</p>
            <p className="text-3xl font-bold text-slate-900">24</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Download className="h-8 w-8 text-green-600 mb-2" />
            <p className="text-sm text-slate-600 mb-1">Downloaded</p>
            <p className="text-3xl font-bold text-green-600">156</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Calendar className="h-8 w-8 text-purple-600 mb-2" />
            <p className="text-sm text-slate-600 mb-1">This Month</p>
            <p className="text-3xl font-bold text-purple-600">8</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Clock className="h-8 w-8 text-amber-600 mb-2" />
            <p className="text-sm text-slate-600 mb-1">Scheduled</p>
            <p className="text-3xl font-bold text-amber-600">5</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Categories */}
      {reportCategories.map((category) => {
        const Icon = category.icon;
        return (
          <Card key={category.title}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon className="h-5 w-5 mr-2 text-purple-600" />
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.reports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition">
                    <div className="flex items-center gap-4">
                      <FileText className="h-8 w-8 text-slate-400" />
                      <div>
                        <p className="font-semibold text-slate-900">{report.name}</p>
                        <p className="text-sm text-slate-600">{report.period} • {report.size}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Preview
                      </Button>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Recent Downloads */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Downloaded</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
                <div>
                  <p className="font-semibold text-slate-900">{report.name}</p>
                  <p className="text-sm text-slate-600 flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    {new Date(report.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    <span className="text-slate-400">•</span>
                    <Download className="h-3 w-3" />
                    {report.downloaded} times
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card className="border-2 border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-purple-900">Automated Report Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white">
              <div>
                <p className="font-semibold text-slate-900">Weekly Operations Summary</p>
                <p className="text-sm text-slate-600">Every Monday at 9:00 AM</p>
              </div>
              <Button size="sm" variant="outline">Edit</Button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white">
              <div>
                <p className="font-semibold text-slate-900">Monthly Cost Analysis</p>
                <p className="text-sm text-slate-600">1st of every month</p>
              </div>
              <Button size="sm" variant="outline">Edit</Button>
            </div>
          </div>
          <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule New Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
