import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, password, role } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Mock user creation - in production, save to database
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
      company,
      location: {
        lat: 19.0760,
        lng: 72.8777,
        address: 'Mumbai, Maharashtra',
      },
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      user,
      token: 'mock-jwt-token',
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
