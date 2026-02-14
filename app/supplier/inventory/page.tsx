'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Package,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Search,
  Filter
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface InventoryItem {
  id: string;
  sku: string;
  partName: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  price: number;
  location: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export default function SupplierInventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const inventory: InventoryItem[] = [
    {
      id: '1',
      sku: 'HPX-4200-SEAL',
      partName: 'Hydraulic Pump Seal HPX-4200',
      category: 'Seals',
      currentStock: 45,
      minStock: 20,
      maxStock: 100,
      price: 4200,
      location: 'Warehouse A - Rack 5',
      status: 'in-stock'
    },
    {
      id: '2',
      sku: 'BRG-6205-2RS',
      partName: 'Motor Bearing 6205-2RS',
      category: 'Bearings',
      currentStock: 8,
      minStock: 15,
      maxStock: 80,
      price: 450,
      location: 'Warehouse B - Rack 12',
      status: 'low-stock'
    },
    {
      id: '3',
      sku: 'MTR-AC-3HP',
      partName: 'AC Induction Motor 3HP',
      category: 'Motors',
      currentStock: 0,
      minStock: 5,
      maxStock: 25,
      price: 12500,
      location: 'Warehouse A - Rack 8',
      status: 'out-of-stock'
    },
    {
      id: '4',
      sku: 'VLV-BF-DN50',
      partName: 'Butterfly Valve DN50',
      category: 'Valves',
      currentStock: 32,
      minStock: 10,
      maxStock: 50,
      price: 2800,
      location: 'Warehouse C - Rack 3',
      status: 'in-stock'
    },
    {
      id: '5',
      sku: 'PMP-CEN-2HP',
      partName: 'Centrifugal Pump 2HP',
      category: 'Pumps',
      currentStock: 12,
      minStock: 8,
      maxStock: 30,
      price: 8900,
      location: 'Warehouse A - Rack 15',
      status: 'in-stock'
    }
  ];

  const categories = ['All', ...Array.from(new Set(inventory.map(item => item.category)))];

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.partName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'low-stock':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'out-of-stock':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-stock':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'low-stock':
      case 'out-of-stock':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const stats = {
    totalItems: inventory.length,
    inStock: inventory.filter(i => i.status === 'in-stock').length,
    lowStock: inventory.filter(i => i.status === 'low-stock').length,
    outOfStock: inventory.filter(i => i.status === 'out-of-stock').length,
    totalValue: inventory.reduce((sum, item) => sum + (item.currentStock * item.price), 0)
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Inventory Management</h1>
          <p className="text-slate-600 mt-1">Manage your stock levels and products</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 mb-1">Total Items</p>
            <p className="text-2xl font-bold text-slate-900">{stats.totalItems}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 mb-1">In Stock</p>
            <p className="text-2xl font-bold text-green-600">{stats.inStock}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 mb-1">Low Stock</p>
            <p className="text-2xl font-bold text-amber-600">{stats.lowStock}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 mb-1">Out of Stock</p>
            <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 mb-1">Total Value</p>
            <p className="text-xl font-bold text-blue-600">{formatCurrency(stats.totalValue)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Search by part name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">SKU</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Part Name</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Category</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Stock</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Status</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Price</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Location</th>
                      <th className="text-right py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-slate-600 whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {filteredInventory.map(item => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="py-2 md:py-3 px-2 md:px-4 font-mono text-xs md:text-sm whitespace-nowrap">{item.sku}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium whitespace-nowrap">{item.partName}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm whitespace-nowrap">{item.category}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap">
                      <div className="text-sm">
                        <span className="font-bold">{item.currentStock}</span>
                        <span className="text-slate-500"> / {item.maxStock}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1">
                        <div
                          className={`h-1.5 rounded-full ${
                            item.status === 'in-stock' ? 'bg-green-600' :
                            item.status === 'low-stock' ? 'bg-amber-500' :
                            'bg-red-600'
                          }`}
                          style={{ width: `${(item.currentStock / item.maxStock) * 100}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(item.status)}`}>
                        {getStatusIcon(item.status)}
                        {item.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-blue-600">{formatCurrency(item.price)}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{item.location}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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

      {filteredInventory.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No items found</h3>
            <p className="text-slate-600">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
