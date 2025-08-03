import { NextRequest, NextResponse } from 'next/server';
import Cors from 'cors';

// Initialize the cors middleware
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow localhost and your domain
    const allowedOrigins = [
      process.env.CORS_ORIGIN_DEV_1 || 'http://localhost:3000',
      process.env.CORS_ORIGIN_DEV_2 || 'http://localhost:3001',
      process.env.CORS_ORIGIN_DEV_3 || 'http://127.0.0.1:3000',
      process.env.CORS_ORIGIN_DEV_4 || 'http://127.0.0.1:3001',
      // Remote network access
      process.env.CORS_ORIGIN_REMOTE_1 || 'http://0.0.0.0:3000',
      process.env.CORS_ORIGIN_REMOTE_2 || 'http://0.0.0.0:3001',
      process.env.CORS_ORIGIN_REMOTE_3 || 'http://10.255.255.254:3000',
      process.env.CORS_ORIGIN_REMOTE_4 || 'http://10.255.255.254:3001',
      // Add your production domain here
      // process.env.CORS_ORIGIN_PROD || 'https://yourdomain.com',
    ].filter(Boolean); // Remove empty values
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    return callback(new Error('Not allowed by CORS'));
  },
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextRequest,
  res: NextResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export { cors, runMiddleware }; 