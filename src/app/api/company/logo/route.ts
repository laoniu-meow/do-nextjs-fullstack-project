import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Fetch company logo from production table
export async function GET() {
  try {
    const companyData = await prisma.company.findFirst({
      where: { status: 'PUBLISHED' },
      select: {
        logo: true,
        name: true,
      },
      orderBy: { updatedAt: 'desc' }
    });

    return NextResponse.json({
      logo: companyData?.logo || null,
      companyName: companyData?.name || 'Company Name'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch company logo' },
      { status: 500 }
    );
  }
} 