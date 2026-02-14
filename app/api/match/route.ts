import { NextResponse } from 'next/server';
import { calculateDistance } from '@/lib/utils';

// Mock supplier data
const suppliers = [
  {
    id: '1',
    name: 'Industrial Parts Co.',
    email: 'contact@ipc.com',
    company: 'IPC Mumbai',
    location: {
      lat: 19.1136,
      lng: 72.8697,
      address: 'Andheri West, Mumbai',
    },
    rating: 4.8,
    responseTime: 5,
    inventory: [
      { partName: 'Hydraulic Pump Seal', stock: 12, price: 12500, emergencyAvailable: true },
      { partName: 'Motor Bearing', stock: 25, price: 8900, emergencyAvailable: true },
      { partName: 'Pressure Valve', stock: 8, price: 18000, emergencyAvailable: true },
    ],
  },
  {
    id: '2',
    name: 'Quick Supply Solutions',
    email: 'support@qss.com',
    company: 'QSS Logistics',
    location: {
      lat: 19.1197,
      lng: 72.9081,
      address: 'Powai, Mumbai',
    },
    rating: 4.6,
    responseTime: 8,
    inventory: [
      { partName: 'Hydraulic Pump Seal', stock: 8, price: 11800, emergencyAvailable: true },
      { partName: 'Motor Bearing', stock: 15, price: 8500, emergencyAvailable: true },
      { partName: 'Control Panel Switch', stock: 40, price: 4200, emergencyAvailable: true },
    ],
  },
  {
    id: '3',
    name: 'Metro Machine Parts',
    email: 'info@mmp.com',
    company: 'MMP Industries',
    location: {
      lat: 19.0971,
      lng: 72.9133,
      address: 'Vikhroli, Mumbai',
    },
    rating: 4.9,
    responseTime: 6,
    inventory: [
      { partName: 'Hydraulic Pump Seal', stock: 3, price: 13200, emergencyAvailable: false },
      { partName: 'Control Panel Switch', stock: 45, price: 4500, emergencyAvailable: true },
      { partName: 'Conveyor Belt', stock: 5, price: 26000, emergencyAvailable: true },
    ],
  },
  {
    id: '4',
    name: 'Fast Track Spares',
    email: 'sales@fts.com',
    company: 'FTS Solutions',
    location: {
      lat: 19.0728,
      lng: 72.8826,
      address: 'Kurla, Mumbai',
    },
    rating: 4.7,
    responseTime: 7,
    inventory: [
      { partName: 'Pressure Valve', stock: 10, price: 17500, emergencyAvailable: true },
      { partName: 'Motor Bearing', stock: 20, price: 9200, emergencyAvailable: true },
      { partName: 'Gear Assembly', stock: 15, price: 32000, emergencyAvailable: true },
    ],
  },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { partName, location, urgency } = body;

    if (!partName || !location) {
      return NextResponse.json(
        { error: 'Part name and location are required' },
        { status: 400 }
      );
    }

    // Find suppliers that have the part in stock
    const matchedSuppliers = suppliers
      .map((supplier) => {
        const inventoryItem = supplier.inventory.find(
          (item) => item.partName.toLowerCase().includes(partName.toLowerCase())
        );

        if (!inventoryItem) return null;

        // Calculate distance between buyer and supplier
        const distance = calculateDistance(
          location.lat,
          location.lng,
          supplier.location.lat,
          supplier.location.lng
        );

        // Calculate ETA (assuming 25 km/h average speed in city)
        const eta = Math.round((distance / 25) * 60);

        // Calculate match score based on multiple factors
        const distanceScore = Math.max(0, 100 - distance * 2);
        const stockScore = inventoryItem.stock > 5 ? 100 : inventoryItem.stock * 20;
        const ratingScore = supplier.rating * 20;
        const urgencyBonus = urgency === 'critical' && inventoryItem.emergencyAvailable ? 10 : 0;

        const matchScore = Math.round(
          (distanceScore * 0.4 + stockScore * 0.2 + ratingScore * 0.3 + urgencyBonus) * 0.9
        );

        return {
          supplier: {
            id: supplier.id,
            name: supplier.name,
            company: supplier.company,
            location: supplier.location,
            rating: supplier.rating,
            responseTime: supplier.responseTime,
          },
          distance,
          eta,
          price: inventoryItem.price,
          stockStatus:
            inventoryItem.stock === 0
              ? 'out_of_stock'
              : inventoryItem.stock < 5
              ? 'low_stock'
              : 'in_stock',
          matchScore,
        };
      })
      .filter(Boolean)
      .sort((a, b) => {
        if (!a || !b) return 0;
        return b.matchScore - a.matchScore;
      })
      .slice(0, 3);

    return NextResponse.json({
      success: true,
      matches: matchedSuppliers,
      totalFound: matchedSuppliers.length,
    });
  } catch (error) {
    console.error('Match API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
