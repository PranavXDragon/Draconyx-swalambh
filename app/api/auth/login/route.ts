import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Mock authentication - in production, validate credentials
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Determine role based on email domain (mock logic)
    let role: 'supplier' | 'business' | 'client' = 'client';
    if (email.includes('supplier')) {
      role = 'supplier';
    } else if (email.includes('business')) {
      role = 'business';
    }

    const user = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0].split('.').map((n: string) => 
        n.charAt(0).toUpperCase() + n.slice(1)
      ).join(' '),
      email,
      role,
      company: 'Demo Company',
      location: {
        lat: 19.0760,
        lng: 72.8777,
        address: 'Mumbai, Maharashtra',
      },
    };

    const response = NextResponse.json({
      success: true,
      user,
      token: 'mock-jwt-token',
    });

    // Set cookie for middleware authentication
    response.cookies.set('user', JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
