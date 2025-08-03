import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Fetch production company data
export async function GET() {
  try {
    const companyData = await prisma.company.findFirst({
      where: { status: 'PUBLISHED' },
      orderBy: { updatedAt: 'desc' }
    });

    return NextResponse.json(companyData || {});
  } catch (error) {
    console.error('Error fetching company data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company data' },
      { status: 500 }
    );
  }
} 