import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;

    // Mock order data - in production, fetch from database
    const order = {
      id: orderId,
      partName: 'Hydraulic Pump Seal',
      machineType: 'CNC Lathe',
      quantity: 1,
      urgency: 'critical',
      status: 'in_transit',
      price: 12500,
      supplier: {
        id: '1',
        name: 'Industrial Parts Co.',
        company: 'IPC Mumbai',
        phone: '+91 98765 43210',
        rating: 4.8,
      },
      estimatedDelivery: new Date(Date.now() + 25 * 60000).toISOString(),
      downtimeSaved: 45000,
      timeline: [
        {
          id: '1',
          status: 'pending',
          timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
          description: 'Request created',
        },
        {
          id: '2',
          status: 'matched',
          timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
          description: 'Matched with supplier',
        },
        {
          id: '3',
          status: 'accepted',
          timestamp: new Date(Date.now() - 20 * 60000).toISOString(),
          description: 'Order accepted by supplier',
        },
        {
          id: '4',
          status: 'in_transit',
          timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
          description: 'Out for delivery',
        },
      ],
    };

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Get order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;
    const body = await request.json();
    const { status } = body;

    // Mock update - in production, update database
    const updatedOrder = {
      id: orderId,
      status,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Update order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
