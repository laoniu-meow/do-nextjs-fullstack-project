# 🚀 Project Setup Guide

## Prerequisites

- Node.js 18+
- Docker and Docker Compose
- PostgreSQL (via Docker)

## Quick Start

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd do-nextjs-fullstack-project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   cp docker.env.example docker.env
   ```

   Edit `.env.local` and `docker.env` with your configuration values.

4. **Start the development environment**

   ```bash
   ./scripts/dev-start.sh
   ```

## Manual Setup

### Database Setup

```bash
# Start PostgreSQL with environment variables
docker-compose --env-file docker.env up -d postgres

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push
```

### Development Server

```bash
npm run dev
```

## Environment Variables

### Application Variables (.env.local)

- Database connection strings
- NextAuth configuration
- Email settings
- JWT secrets
- CORS settings
- File upload configuration

### Docker Variables (docker.env)

- `POSTGRES_CONTAINER_NAME` - Docker container name
- `POSTGRES_DB` - Database name
- `POSTGRES_USER` - Database user
- `POSTGRES_PASSWORD` - Database password
- `POSTGRES_PORT` - Database port
- `POSTGRES_HOST_AUTH_METHOD` - Authentication method

## Remote Connection & CORS Support

### CORS Configuration

The project includes comprehensive CORS support for remote connections:

- **Global CORS Headers**: Set in `next.config.ts` for all routes
- **API Route CORS**: Middleware handles CORS for all API endpoints
- **Flexible Origin Control**: Configurable allowed origins in `.env.local`

### Remote Database Access

The PostgreSQL database is configured for remote access:

- **Port Exposure**: Database accessible on port 5432 (configurable)
- **Network Configuration**: Docker network for external connections
- **Authentication**: Trust method enabled for development
- **Environment Variables**: All database settings configurable

### Environment Variables for Remote Access

```bash
# Database URLs
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
REMOTE_DATABASE_URL="postgresql://username:password@0.0.0.0:5432/database_name"

# Docker PostgreSQL Configuration
POSTGRES_CONTAINER_NAME="company-webapp"
POSTGRES_DB="company-webapp"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="password"
POSTGRES_PORT="5432"

# CORS Settings
CORS_ORIGIN="*"
CORS_CREDENTIALS="true"
```

### Testing Remote Connections

```bash
# Test API endpoint
curl -X GET http://localhost:3000/api

# Test database connection
psql -h localhost -p 5432 -U postgres -d company-webapp
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push database schema
- `npm run db:studio` - Open Prisma Studio

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── lib/                # Utility libraries
│   ├── auth.ts         # NextAuth configuration
│   ├── prisma.ts       # Prisma client
│   ├── theme.ts        # Material-UI theme
│   ├── cors.ts         # CORS middleware
│   └── remote.ts       # Remote connection utilities
├── middleware.ts       # Global middleware
public/
└── logos/              # Uploaded logos
```

## Features Implemented

- ✅ Next.js 14 with App Router
- ✅ TypeScript configuration
- ✅ Material-UI setup
- ✅ Prisma with PostgreSQL
- ✅ NextAuth.js authentication
- ✅ ESLint with security rules
- ✅ Jest testing setup
- ✅ Docker PostgreSQL setup
- ✅ Development scripts
- ✅ Basic frontend page (Welcome message)
- ✅ Basic backend API route (blank response)
- ✅ **CORS support for remote connections**
- ✅ **Remote database access**
- ✅ **Global middleware for API routes**
- ✅ **Environment variable configuration for Docker**

## Security

- ESLint security plugin enabled
- Input validation with Zod
- Secure authentication with NextAuth.js
- Password hashing with bcryptjs
- **CORS protection for cross-origin requests**
- **Environment variable configuration (no hardcoded secrets)**

## Remote Access Features

### API Endpoints

- All API routes support CORS
- Preflight request handling
- Configurable origin restrictions
- Credential support

### Database

- Exposed on configurable port
- Trust authentication for development
- Network isolation with Docker
- Remote connection support
- Environment variable configuration

### Frontend

- CORS headers for all routes
- Support for external API calls
- Configurable allowed origins

## Next Steps

1. Implement authentication pages
2. Create admin panel components
3. Add file upload functionality
4. Implement CRUD operations
5. Add comprehensive testing
6. Configure production CORS settings
