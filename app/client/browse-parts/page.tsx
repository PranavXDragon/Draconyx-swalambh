'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Settings,
  Search,
  Filter,
  ShoppingCart,
  Star,
  FileText,
  Download
} from 'lucide-react';

interface Part {
  id: string;
  partNumber: string;
  name: string;
  category: string;
  subcategory: string;
  manufacturer: string;
  specifications: string;
  price: number;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'On Order';
  leadTime: string;
  image: string;
  datasheet?: string;
}

const CATEGORIES = [
  'All Categories',
  'Bearings',
  'Motors',
  'Pumps',
  'Valves',
  'Seals',
  'Belts & Chains',
  'Gears',
  'Fasteners',
  'Electrical Components',
  'Hydraulics',
  'Pneumatics',
  'Sensors'
];

const SAMPLE_PARTS: Part[] = [
  {
    id: 'P001',
    partNumber: 'BRG-6205-2RS',
    name: 'Deep Groove Ball Bearing 6205 2RS',
    category: 'Bearings',
    subcategory: 'Ball Bearings',
    manufacturer: 'SKF',
    specifications: '25x52x15mm, Double Sealed',
    price: 450,
    stockStatus: 'In Stock',
    leadTime: '1-2 days',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=300&fit=crop',
    datasheet: '/datasheets/brg-6205-2rs.pdf'
  },
  {
    id: 'P002',
    partNumber: 'MTR-AC-3HP',
    name: 'AC Induction Motor 3HP 1440 RPM',
    category: 'Motors',
    subcategory: 'AC Motors',
    manufacturer: 'Siemens',
    specifications: '3 Phase, 415V, IE3 Efficiency',
    price: 12500,
    stockStatus: 'In Stock',
    leadTime: '2-3 days',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=300&h=300&fit=crop',
    datasheet: '/datasheets/mtr-ac-3hp.pdf'
  },
  {
    id: 'P003',
    partNumber: 'PMP-CEN-2HP',
    name: 'Centrifugal Pump 2HP Monoblock',
    category: 'Pumps',
    subcategory: 'Centrifugal Pumps',
    manufacturer: 'Kirloskar',
    specifications: 'Head: 30m, Flow: 100 LPM',
    price: 8900,
    stockStatus: 'Low Stock',
    leadTime: '3-5 days',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=300&fit=crop'
  },
  {
    id: 'P004',
    partNumber: 'VLV-BF-DN50',
    name: 'Butterfly Valve DN50 Wafer Type',
    category: 'Valves',
    subcategory: 'Butterfly Valves',
    manufacturer: 'L&T',
    specifications: 'PN16, CI Body, SS Disc',
    price: 2800,
    stockStatus: 'In Stock',
    leadTime: '1-2 days',
    image: 'https://images.unsplash.com/photo-1581092160366-6e14e0c4c7f6?w=300&h=300&fit=crop'
  },
  {
    id: 'P005',
    partNumber: 'SEAL-OIL-35X52X7',
    name: 'Oil Seal 35x52x7mm Nitrile',
    category: 'Seals',
    subcategory: 'Oil Seals',
    manufacturer: 'NOK',
    specifications: 'NBR, -40°C to +100°C',
    price: 85,
    stockStatus: 'In Stock',
    leadTime: '1 day',
    image: 'https://images.unsplash.com/photo-1581092583537-20d51b3c1d0b?w=300&h=300&fit=crop'
  },
  {
    id: 'P006',
    partNumber: 'BLT-TB-A48',
    name: 'Timing Belt A48 Tooth Pitch 9.525mm',
    category: 'Belts & Chains',
    subcategory: 'Timing Belts',
    manufacturer: 'Gates',
    specifications: 'Width: 10mm, Length: 457mm',
    price: 340,
    stockStatus: 'In Stock',
    leadTime: '2 days',
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=300&h=300&fit=crop'
  },
  {
    id: 'P007',
    partNumber: 'GR-SPR-40T',
    name: 'Spur Gear Module 2.5, 40 Teeth',
    category: 'Gears',
    subcategory: 'Spur Gears',
    manufacturer: 'Elecon',
    specifications: 'Material: EN8, Bore: 20mm',
    price: 1250,
    stockStatus: 'On Order',
    leadTime: '7-10 days',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=300&h=300&fit=crop'
  },
  {
    id: 'P008',
    partNumber: 'FST-HEX-M12',
    name: 'Hex Bolt M12x80 Grade 8.8',
    category: 'Fasteners',
    subcategory: 'Bolts',
    manufacturer: 'Sundram',
    specifications: 'Zinc Plated, Full Thread',
    price: 12,
    stockStatus: 'In Stock',
    leadTime: '1 day',
    image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=300&h=300&fit=crop'
  }
];

export default function BrowsePartsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [parts, setParts] = useState<Part[]>(SAMPLE_PARTS);

  const filteredParts = parts.filter(part => {
    const matchesSearch = 
      part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'All Categories' || part.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getStockBadge = (status: string) => {
    const classes = {
      'In Stock': 'bg-green-100 text-green-700',
      'Low Stock': 'bg-amber-100 text-amber-700',
      'Out of Stock': 'bg-red-100 text-red-700',
      'On Order': 'bg-blue-100 text-blue-700'
    };
    return classes[status as keyof typeof classes] || classes['In Stock'];
  };

  const addToCart = (part: Part) => {
    alert(`Added ${part.name} to cart`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Industrial Spare Parts Catalog</h1>
        <p className="text-slate-600 mt-1">Browse and order spare parts for your industrial equipment</p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Search by part name, part number, or manufacturer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-slate-600">
          Showing <span className="font-semibold">{filteredParts.length}</span> parts
        </p>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filters
        </Button>
      </div>

      {/* Parts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredParts.map(part => (
          <Card key={part.id} className="hover:shadow-lg transition">
            <div className="relative aspect-square bg-slate-50 p-4">
              <img
                src={part.image}
                alt={part.name}
                loading="lazy"
                className="w-full h-full object-contain"
              />
              <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getStockBadge(part.stockStatus)}`}>
                {part.stockStatus}
              </div>
            </div>

            <CardContent className="p-4 space-y-3">
              <div>
                <p className="text-xs text-slate-500 font-mono">{part.partNumber}</p>
                <h3 className="font-semibold text-slate-900 mt-1 line-clamp-2">{part.name}</h3>
              </div>

              <div className="space-y-1 text-sm">
                <p className="text-slate-600">
                  <span className="font-medium">Manufacturer:</span> {part.manufacturer}
                </p>
                <p className="text-slate-600">
                  <span className="font-medium">Category:</span> {part.subcategory}
                </p>
                <p className="text-slate-600 text-xs line-clamp-1">
                  {part.specifications}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div>
                  <p className="text-xs text-slate-500">Lead Time</p>
                  <p className="text-sm font-medium text-slate-900">{part.leadTime}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Price</p>
                  <p className="text-lg font-bold text-blue-600">₹{part.price.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => addToCart(part)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={part.stockStatus === 'Out of Stock'}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add to Cart
                </Button>
                {part.datasheet && (
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredParts.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Settings className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No parts found</h3>
            <p className="text-slate-600">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
