import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "" });
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: "" });
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 200 });
} 