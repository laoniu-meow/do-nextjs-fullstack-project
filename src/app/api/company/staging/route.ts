import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Fetch staging data
export async function GET() {
  try {
    const stagingData = await prisma.companyStaging.findFirst({
      orderBy: { updatedAt: 'desc' }
    });

    return NextResponse.json(stagingData || {});
  } catch (error) {
    console.error('Error fetching staging data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch staging data' },
      { status: 500 }
    );
  }
}

// POST - Create or update staging data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received staging data:', {
      name: body.name,
      logo: body.logo ? body.logo.substring(0, 50) + '...' : 'null',
      banner: body.banner ? body.banner.substring(0, 50) + '...' : 'null',
    });
    
    // Check if staging data exists
    const existingStaging = await prisma.companyStaging.findFirst({
      orderBy: { updatedAt: 'desc' }
    });

    if (existingStaging) {
      // Update existing staging data
      const updatedStaging = await prisma.companyStaging.update({
        where: { id: existingStaging.id },
        data: {
          ...body,
          status: 'PENDING',
          reviewedBy: null,
          reviewedAt: null,
        }
      });
      return NextResponse.json(updatedStaging);
    } else {
      // Create new staging data
      const newStaging = await prisma.companyStaging.create({
        data: {
          ...body,
          status: 'PENDING',
        }
      });
      return NextResponse.json(newStaging);
    }
  } catch (error) {
    console.error('Error saving staging data:', error);
    return NextResponse.json(
      { error: 'Failed to save staging data' },
      { status: 500 }
    );
  }
}

// PUT - Approve staging data and move to production
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { stagingId, reviewedBy } = body;

    // Get staging data
    const stagingData = await prisma.companyStaging.findUnique({
      where: { id: stagingId }
    });

    if (!stagingData) {
      return NextResponse.json(
        { error: 'Staging data not found' },
        { status: 404 }
      );
    }

    // Update staging status to approved
    await prisma.companyStaging.update({
      where: { id: stagingId },
      data: {
        status: 'APPROVED',
        reviewedBy,
        reviewedAt: new Date(),
      }
    });

    // Create or update production company data
    const { id, status, reviewedBy: stagingReviewedBy, reviewedAt: stagingReviewedAt, createdAt, updatedAt, ...companyData } = stagingData;
    
    const existingCompany = await prisma.company.findFirst();
    
    if (existingCompany) {
      // Update existing company
      const updatedCompany = await prisma.company.update({
        where: { id: existingCompany.id },
        data: {
          ...companyData,
          status: 'PUBLISHED',
        }
      });
      return NextResponse.json(updatedCompany);
    } else {
      // Create new company
      const newCompany = await prisma.company.create({
        data: {
          ...companyData,
          status: 'PUBLISHED',
        }
      });
      return NextResponse.json(newCompany);
    }
  } catch (error) {
    console.error('Error approving staging data:', error);
    return NextResponse.json(
      { error: 'Failed to approve staging data' },
      { status: 500 }
    );
  }
} 