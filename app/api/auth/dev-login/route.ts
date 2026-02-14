import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const user = await request.json();

    const response = NextResponse.json({ 
      success: true,
      message: 'Dev login successful' 
    });

    // Set user cookie (NOT httpOnly so client can read it)
    response.cookies.set('user', JSON.stringify(user), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Dev login failed' },
      { status: 500 }
    );
  }
}
