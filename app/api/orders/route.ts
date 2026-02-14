import { NextResponse } from 'next/server';

// Mock orders database
let orders: any[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      requestId,
      buyerId,
      supplierId,
      partName,
      machineType,
      urgency,
      quantity,
      price,
    } = body;

    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      requestId,
      buyerId,
      supplierId,
      partName,
      machineType,
      urgency,
      quantity,
      price,
      status: 'matched',
      estimatedDelivery: new Date(Date.now() + 45 * 60000).toISOString(),
      timeline: [
        {
          id: '1',
          status: 'pending',
          timestamp: new Date().toISOString(),
          description: 'Request created',
        },
        {
          id: '2',
          status: 'matched',
          timestamp: new Date().toISOString(),
          description: 'Matched with supplier',
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    orders.push(newOrder);

    return NextResponse.json({
      success: true,
      order: newOrder,
    });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const buyerId = searchParams.get('buyerId');
    const supplierId = searchParams.get('supplierId');

    let filteredOrders = orders;

    if (buyerId) {
      filteredOrders = orders.filter((order) => order.buyerId === buyerId);
    }

    if (supplierId) {
      filteredOrders = orders.filter((order) => order.supplierId === supplierId);
    }

    return NextResponse.json({
      success: true,
      orders: filteredOrders,
      total: filteredOrders.length,
    });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
