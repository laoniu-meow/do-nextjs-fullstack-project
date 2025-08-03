import { NextRequest, NextResponse } from 'next/server';

export interface RemoteConfig {
  allowedOrigins: string[];
  allowedMethods: string[];
  allowedHeaders: string[];
  credentials: boolean;
}

export const defaultRemoteConfig: RemoteConfig = {
  allowedOrigins: [
    process.env.CORS_ORIGIN_DEV_1 || 'http://localhost:3000',
    process.env.CORS_ORIGIN_DEV_2 || 'http://localhost:3001',
    process.env.CORS_ORIGIN_DEV_3 || 'http://127.0.0.1:3000',
    process.env.CORS_ORIGIN_DEV_4 || 'http://127.0.0.1:3001',
    // Remote network access
    process.env.CORS_ORIGIN_REMOTE_1 || 'http://0.0.0.0:3000',
    process.env.CORS_ORIGIN_REMOTE_2 || 'http://0.0.0.0:3001',
    process.env.CORS_ORIGIN_REMOTE_3 || 'http://10.255.255.254:3000',
    process.env.CORS_ORIGIN_REMOTE_4 || 'http://10.255.255.254:3001',
    // Add your production domains here
    // process.env.CORS_ORIGIN_PROD || 'https://yourdomain.com',
  ].filter(Boolean), // Remove empty values
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
};

export function setCorsHeaders(response: NextResponse, config: RemoteConfig = defaultRemoteConfig): NextResponse {
  const origin = process.env.CORS_ORIGIN || '*';
  
  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Access-Control-Allow-Methods', config.allowedMethods.join(', '));
  response.headers.set('Access-Control-Allow-Headers', config.allowedHeaders.join(', '));
  response.headers.set('Access-Control-Allow-Credentials', config.credentials.toString());
  
  return response;
}

export function handlePreflight(request: NextRequest, config: RemoteConfig = defaultRemoteConfig): NextResponse {
  const response = new NextResponse(null, { status: 200 });
  return setCorsHeaders(response, config);
}

export function isRemoteRequest(request: NextRequest): boolean {
  const host = request.headers.get('host');
  const origin = request.headers.get('origin');
  
  // Check if request is from a different origin
  if (origin && host) {
    const originHost = new URL(origin).host;
    return originHost !== host;
  }
  
  return false;
} 