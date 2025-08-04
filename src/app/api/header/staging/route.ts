import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get the latest staging header configuration
    const staging = await prisma.headerStaging.findFirst({
      where: {
        status: 'PENDING',
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(staging);
  } catch (error) {
    console.error('Error fetching header staging:', error);
    return NextResponse.json(
      { error: 'Failed to fetch header staging' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { backgroundColor, headerHeight, headerPosition, borderColor, borderHeight, borderShadow, logoWidth, logoHeight, logoOrientation } = body;

    // Create or update staging record
    const staging = await prisma.headerStaging.upsert({
      where: {
        id: 'staging-header', // Use a fixed ID for staging
      },
      update: {
        backgroundColor: backgroundColor || '#ffffff',
        headerHeight: headerHeight || '5rem',
        headerPosition: headerPosition || 'fixed',
        borderColor: borderColor || '#e0e0e0',
        borderHeight: borderHeight || '1px',
        borderShadow: borderShadow || 'none',
        logoWidth: logoWidth || '4.35rem',
        logoHeight: logoHeight || '6.5rem',
        logoOrientation: logoOrientation || 'portrait',
        status: 'PENDING',
        updatedAt: new Date(),
      },
      create: {
        id: 'staging-header',
        backgroundColor: backgroundColor || '#ffffff',
        headerHeight: headerHeight || '5rem',
        headerPosition: headerPosition || 'fixed',
        borderColor: borderColor || '#e0e0e0',
        borderHeight: borderHeight || '1px',
        borderShadow: borderShadow || 'none',
        logoWidth: logoWidth || '4.35rem',
        logoHeight: logoHeight || '6.5rem',
        logoOrientation: logoOrientation || 'portrait',
        status: 'PENDING',
      },
    });

    return NextResponse.json(staging);
  } catch (error) {
    console.error('Error creating header staging:', error);
    return NextResponse.json(
      { error: 'Failed to create header staging' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { stagingId, reviewedBy } = body;

    // Get the staging record
    const staging = await prisma.headerStaging.findUnique({
      where: { id: stagingId },
    });

    if (!staging) {
      return NextResponse.json(
        { error: 'Staging record not found' },
        { status: 404 }
      );
    }

    // Create new production header
    const productionHeader = await prisma.header.create({
      data: {
        backgroundColor: staging.backgroundColor,
        headerHeight: staging.headerHeight,
        headerPosition: staging.headerPosition,
        borderColor: staging.borderColor,
        borderHeight: staging.borderHeight,
        borderShadow: staging.borderShadow,
        logoWidth: staging.logoWidth,
        logoHeight: staging.logoHeight,
        logoOrientation: staging.logoOrientation,
        status: 'PUBLISHED',
      },
    });

    // Update staging status to approved
    await prisma.headerStaging.update({
      where: { id: stagingId },
      data: {
        status: 'APPROVED',
        reviewedBy: reviewedBy || 'admin',
        reviewedAt: new Date(),
      },
    });

    return NextResponse.json(productionHeader);
  } catch (error) {
    console.error('Error approving header staging:', error);
    return NextResponse.json(
      { error: 'Failed to approve header staging' },
      { status: 500 }
    );
  }
} 