'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  DollarSign,
  Download,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface Payment {
  id: string;
  orderId: string;
  customer: string;
  amount: number;
  bonus: number;
  penalty: number;
  netAmount: number;
  date: string;
  status: 'paid' | 'pending' | 'processing';
}

export default function SupplierPaymentsPage() {
  const payments: Payment[] = [
    {
      id: 'PAY-001',
      orderId: 'ORD-450',
      customer: 'Manufacturing Plant A',
      amount: 8500,
      bonus: 500,
      penalty: 0,
      netAmount: 9000,
      date: '2024-02-10',
      status: 'paid'
    },
    {
      id: 'PAY-002',
      orderId: 'ORD-448',
      customer: 'Tech Industries Ltd',
      amount: 4200,
      bonus: 0,
      penalty: 200,
      netAmount: 4000,
      date: '2024-02-09',
      status: 'paid'
    },
    {
      id: 'PAY-003',
      orderId: 'ORD-442',
      customer: 'ElectroWorks Pvt Ltd',
      amount: 3500,
      bonus: 300,
      penalty: 0,
      netAmount: 3800,
      date: '2024-02-08',
      status: 'processing'
    },
    {
      id: 'PAY-004',
      orderId: 'ORD-440',
      customer: 'Industrial Solutions',
      amount: 12000,
      bonus: 0,
      penalty: 500,
      netAmount: 11500,
      date: '2024-02-07',
      status: 'pending'
    }
  ];

  const stats = {
    totalEarnings: 245000,
    thisMonth: 45800,
    pending: 32000,
    bonuses: 5000,
    penalties: 1200
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'processing':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'processing':
        return <Clock className="h-4 w-4" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Payments & Earnings</h1>
          <p className="text-slate-600 mt-1">Track your payments and financial performance</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="pt-6">
            <DollarSign className="h-8 w-8 text-green-600 mb-2" />
            <p className="text-sm text-slate-600 mb-1">Total Earnings</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalEarnings)}</p>
            <p className="text-xs text-green-700 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              All time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Calendar className="h-8 w-8 text-blue-600 mb-2" />
            <p className="text-sm text-slate-600 mb-1">This Month</p>
            <p className="text-2xl font-bold text-blue-600">{formatCurrency(stats.thisMonth)}</p>
            <p className="text-xs text-slate-600 mt-1">February 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Clock className="h-8 w-8 text-amber-600 mb-2" />
            <p className="text-sm text-slate-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-amber-600">{formatCurrency(stats.pending)}</p>
            <p className="text-xs text-slate-600 mt-1">Awaiting payment</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200">
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 mb-1">Total Bonuses</p>
            <p className="text-2xl font-bold text-green-600">+{formatCurrency(stats.bonuses)}</p>
            <p className="text-xs text-green-700 mt-1">SLA performance</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-red-200">
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 mb-1">Total Penalties</p>
            <p className="text-2xl font-bold text-red-600">-{formatCurrency(stats.penalties)}</p>
            <p className="text-xs text-red-700 mt-1">SLA breaches</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Payment History</CardTitle>
            <Button variant="outline" size="sm">
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Payment ID</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Order ID</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Customer</th>
                      <th className="text-right py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Base Amount</th>
                      <th className="text-right py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Bonus</th>
                      <th className="text-right py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Penalty</th>
                      <th className="text-right py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Net Amount</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Date</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {payments.map(payment => (
                      <tr key={payment.id} className="hover:bg-slate-50">
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-semibold whitespace-nowrap">{payment.id}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4 font-mono text-xs md:text-sm whitespace-nowrap">{payment.orderId}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm whitespace-nowrap">{payment.customer}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-right text-xs md:text-sm font-semibold whitespace-nowrap">{formatCurrency(payment.amount)}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-right text-xs md:text-sm text-green-600 font-semibold whitespace-nowrap">
                          {payment.bonus > 0 ? `+${formatCurrency(payment.bonus)}` : '-'}
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-right text-xs md:text-sm text-red-600 font-semibold whitespace-nowrap">
                          {payment.penalty > 0 ? `-${formatCurrency(payment.penalty)}` : '-'}
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-right text-xs md:text-sm font-bold text-blue-600 whitespace-nowrap">{formatCurrency(payment.netAmount)}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm whitespace-nowrap">
                          {new Date(payment.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs font-medium border ${getStatusBadge(payment.status)}`}>
                            {getStatusIcon(payment.status)}
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bank Details */}
      <Card>
        <CardHeader>
          <CardTitle>Bank Account Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-600">Account Holder Name</p>
                <p className="font-semibold text-slate-900">Tech Supplies Pvt Ltd</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Bank Name</p>
                <p className="font-semibold text-slate-900">HDFC Bank</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Account Number</p>
                <p className="font-semibold text-slate-900 font-mono">XXXX XXXX 1234</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-600">IFSC Code</p>
                <p className="font-semibold text-slate-900 font-mono">HDFC0001234</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Branch</p>
                <p className="font-semibold text-slate-900">Mumbai - MG Road</p>
              </div>
              <div>
                <Button variant="outline" size="sm">Update Bank Details</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
