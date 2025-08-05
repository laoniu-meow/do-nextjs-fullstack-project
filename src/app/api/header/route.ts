import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get the latest published header configuration
    const header = await prisma.header.findFirst({
      where: {
        status: 'PUBLISHED',
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    if (!header) {
      // Return default header configuration
      return NextResponse.json({
        backgroundColor: '#ffffff',
        headerHeight: '5rem',
        headerPosition: 'fixed',
        borderColor: '#e0e0e0',
        borderHeight: '1px',
        borderShadow: 'none',
              logoWidth: '4.35rem',
      logoHeight: '6.5rem',
        logoOrientation: 'portrait',
        status: 'PUBLISHED',
      });
    }

    return NextResponse.json(header);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch header configuration' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { backgroundColor, headerHeight, headerPosition, borderColor, borderHeight, borderShadow, logoWidth, logoHeight, logoOrientation } = body;

    const header = await prisma.header.create({
      data: {
        backgroundColor: backgroundColor || '#ffffff',
        headerHeight: headerHeight || '5rem',
        headerPosition: headerPosition || 'fixed',
        borderColor: borderColor || '#e0e0e0',
        borderHeight: borderHeight || '1px',
        borderShadow: borderShadow || 'none',
        logoWidth: logoWidth || '6rem',
        logoHeight: logoHeight || '6rem',
        logoOrientation: logoOrientation || 'portrait',
        status: 'PUBLISHED',
      },
    });

    return NextResponse.json(header);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create header configuration' },
      { status: 500 }
    );
  }
} 