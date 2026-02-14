import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');

    // Mock suppliers data
    const suppliers = [
      {
        id: '1',
        name: 'Industrial Parts Co.',
        company: 'IPC Mumbai',
        location: {
          lat: 19.1136,
          lng: 72.8697,
          address: 'Andheri West, Mumbai',
        },
        rating: 4.8,
        totalOrders: 145,
        responseTime: 5,
      },
      {
        id: '2',
        name: 'Quick Supply Solutions',
        company: 'QSS Logistics',
        location: {
          lat: 19.1197,
          lng: 72.9081,
          address: 'Powai, Mumbai',
        },
        rating: 4.6,
        totalOrders: 128,
        responseTime: 8,
      },
      {
        id: '3',
        name: 'Metro Machine Parts',
        company: 'MMP Industries',
        location: {
          lat: 19.0971,
          lng: 72.9133,
          address: 'Vikhroli, Mumbai',
        },
        rating: 4.9,
        totalOrders: 132,
        responseTime: 6,
      },
    ];

    return NextResponse.json({
      success: true,
      suppliers,
      total: suppliers.length,
    });
  } catch (error) {
    console.error('Get suppliers error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
