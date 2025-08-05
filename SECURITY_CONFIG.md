# 🔒 Security Configuration Guide

## 📋 **Environment Variables Setup**

### **1. Create .env.local File**

Create a `.env.local` file in your project root with the following template:

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
REMOTE_DATABASE_URL="postgresql://username:password@0.0.0.0:5432/database_name"

# Authentication & Security
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# CORS Configuration
CORS_ORIGIN="https://yourdomain.com"
CORS_ORIGIN_DEV_1="http://localhost:3000"
CORS_ORIGIN_DEV_2="http://localhost:3001"
CORS_ORIGIN_DEV_3="http://127.0.0.1:3000"
CORS_ORIGIN_DEV_4="http://127.0.0.1:3001"
CORS_ORIGIN_REMOTE_1="http://0.0.0.0:3000"
CORS_ORIGIN_REMOTE_2="http://0.0.0.0:3001"
CORS_ORIGIN_REMOTE_3="http://10.255.255.254:3000"
CORS_ORIGIN_REMOTE_4="http://10.255.255.254:3001"
CORS_ORIGIN_PROD="https://yourdomain.com"

# File Upload Configuration
UPLOAD_LOGOS_DIR="/path/to/public/logos"
UPLOAD_MEDIA_DIR="/path/to/public/media"

# Docker Configuration (if using Docker)
POSTGRES_USER="your_postgres_user"
POSTGRES_PASSWORD="your_postgres_password"
POSTGRES_DB="your_database_name"
POSTGRES_HOST="localhost"
POSTGRES_PORT="5432"

# Application Configuration
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Security Configuration
RATE_LIMIT_WINDOW_MS="900000"
RATE_LIMIT_MAX_REQUESTS="100"
SECURITY_HEADERS_ENABLED="true"

# Logging Configuration
LOG_LEVEL="info"
SECURITY_LOGGING_ENABLED="true"
```

### **2. Security Best Practices**

#### **A. Never Commit Secrets**
```bash
# ✅ Good - .gitignore includes
.env
.env.*
!.env.example

# ❌ Bad - Never do this
git add .env.local
git commit -m "Add environment variables"
```

#### **B. Use Strong Secrets**
```bash
# ✅ Good - Generate strong secrets
JWT_SECRET="$(openssl rand -base64 32)"
DATABASE_PASSWORD="$(openssl rand -base64 16)"

# ❌ Bad - Weak secrets
JWT_SECRET="my-secret-key"
DATABASE_PASSWORD="password123"
```

#### **C. Environment-Specific Configuration**
```bash
# Development
NODE_ENV="development"
CORS_ORIGIN="*"

# Production
NODE_ENV="production"
CORS_ORIGIN="https://yourdomain.com"
```

## 🛡️ **Security Headers Implementation**

### **1. Next.js Configuration**

Add to `next.config.ts`:

```typescript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
  }
];

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

### **2. CORS Security Enhancement**

Update `src/lib/cors.ts`:

```typescript
const allowedOrigins = [
  process.env.CORS_ORIGIN_PROD || 'https://yourdomain.com',
  process.env.CORS_ORIGIN_DEV_1 || 'http://localhost:3000',
  process.env.CORS_ORIGIN_DEV_2 || 'http://localhost:3001',
];

const corsOptions = {
  origin: (origin: string | undefined, callback: Function) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
```

## 🔐 **Authentication Security**

### **1. JWT Configuration**

Update `src/lib/auth.ts`:

```typescript
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const authOptions: NextAuthOptions = {
  jwt: {
    secret: JWT_SECRET,
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  // ... rest of configuration
};
```

### **2. Password Security**

```typescript
// Use bcrypt for password hashing
import bcrypt from 'bcryptjs';

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
```

## 📊 **Input Validation Enhancement**

### **1. API Route Security**

Add to all API routes:

```typescript
import { validateString, sanitizeHTML, validateColor } from '@/utils/security';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate all inputs
    const validatedData = {
      name: validateString(body.name),
      email: validateString(body.email),
      color: validateColor(body.color),
    };
    
    // Sanitize HTML content
    const sanitizedData = {
      ...validatedData,
      description: sanitizeHTML(body.description),
    };
    
    // Process sanitized data
    // ...
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid input data' },
      { status: 400 }
    );
  }
}
```

### **2. File Upload Security**

```typescript
// Validate file uploads
const validateFileUpload = (file: File): boolean => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    return false;
  }
  
  if (file.size > maxSize) {
    return false;
  }
  
  return true;
};
```

## 🚨 **Security Monitoring**

### **1. Security Logging**

```typescript
// src/utils/securityLogger.ts
export const securityLogger = {
  logSecurityEvent: (event: string, details: any) => {
    if (process.env.SECURITY_LOGGING_ENABLED === 'true') {
      console.log(`[SECURITY] ${new Date().toISOString()}: ${event}`, details);
      // Send to security monitoring service
    }
  },
  
  logFailedLogin: (email: string, ip: string) => {
    securityLogger.logSecurityEvent('FAILED_LOGIN', { email, ip });
  },
  
  logSuspiciousActivity: (activity: string, details: any) => {
    securityLogger.logSecurityEvent('SUSPICIOUS_ACTIVITY', { activity, details });
  },
};
```

### **2. Rate Limiting**

```typescript
// src/middleware/rateLimit.ts
import { NextRequest, NextResponse } from 'next/server';

const rateLimitMap = new Map();

export function rateLimit(request: NextRequest): NextResponse | null {
  const ip = request.ip || 'unknown';
  const now = Date.now();
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000');
  const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100');
  
  const userRequests = rateLimitMap.get(ip) || [];
  const validRequests = userRequests.filter(time => now - time < windowMs);
  
  if (validRequests.length >= maxRequests) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }
  
  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
  
  return null;
}
```

## 📋 **Security Checklist**

### **✅ Immediate Actions**
- [ ] Create `.env.local` with proper secrets
- [ ] Update CORS configuration
- [ ] Add security headers
- [ ] Implement input validation
- [ ] Add rate limiting

### **✅ Short-term Actions**
- [ ] Set up security logging
- [ ] Implement file upload validation
- [ ] Add authentication enhancement
- [ ] Configure database security

### **✅ Long-term Actions**
- [ ] Penetration testing
- [ ] Security monitoring setup
- [ ] Regular security audits
- [ ] Team security training

## 🔄 **Regular Security Maintenance**

### **Weekly**
- Review security logs
- Update dependencies
- Check for new vulnerabilities

### **Monthly**
- Rotate secrets
- Review access controls
- Update security policies

### **Quarterly**
- Security penetration testing
- Compliance review
- Security training updates

---

**Last Updated:** $(date)  
**Next Review:** $(date -d '+30 days')  
**Security Level:** ENHANCED ✅ 