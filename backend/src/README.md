# Backend Structure - Production Level

## 📁 Directory Structure

```
backend/
├── src/                        # Source code directory (production-level structure)
│   ├── config/                 # Configuration files
│   │   ├── app.js             # Application configuration
│   │   └── database.js        # Database connection & management
│   │
│   ├── constants/             # Application constants
│   │   └── index.js          # HTTP status codes, messages, etc.
│   │
│   ├── controllers/           # Request handlers (business logic)
│   │   ├── mgnregaController.js    # MGNREGA data controllers
│   │   └── systemController.js     # System/health controllers
│   │
│   ├── middleware/            # Express middleware
│   │   ├── errorHandler.js   # Error handling middleware
│   │   ├── logger.js         # Request logging
│   │   └── index.js          # Middleware exports
│   │
│   ├── models/                # Database models (Mongoose schemas)
│   │   └── Report.js         # MGNREGA report model
│   │
│   ├── routes/                # API route definitions
│   │   ├── mgnrega.js        # MGNREGA endpoints
│   │   ├── system.js         # System endpoints (health, sync)
│   │   └── index.js          # Route exports
│   │
│   ├── services/              # Business logic & external services
│   │   └── fetchData.js      # Data fetching & sync service
│   │
│   ├── utils/                 # Utility functions
│   │   └── seedData.js       # Database seeding utilities
│   │
│   ├── scripts/               # Standalone scripts
│   │   └── fetch-real-data.js # Data fetching script
│   │
│   ├── app.js                 # Express app setup (middleware, routes)
│   ├── server.js             # HTTP server entry point
│   └── index.js              # Main exports
│
├── .env                       # Environment variables (not in git)
├── .env.example              # Environment variables template
├── package.json              # Dependencies & scripts
└── seed.js                   # Database seeding script

```

## 🎯 Key Features of This Structure

### 1. **Separation of Concerns**
- **Controllers**: Handle HTTP requests/responses
- **Services**: Contain business logic
- **Models**: Define data structure
- **Routes**: Define API endpoints
- **Middleware**: Handle cross-cutting concerns

### 2. **Configuration Management**
- Centralized config in `src/config/`
- Environment-based settings
- Database connection management

### 3. **Error Handling**
- Centralized error handling middleware
- Async error wrapper
- Proper HTTP status codes

### 4. **Maintainability**
- Clear folder structure
- Single Responsibility Principle
- Easy to test and scale

## 🚀 Running the Application

```bash
# Install dependencies
npm install

# Development mode (with auto-reload)
npm run dev

# Production mode
npm start

# Seed database
npm run seed
```

## 📝 API Endpoints

### MGNREGA Endpoints
- `GET /api/mgnrega/districts` - List all districts
- `GET /api/mgnrega/district/:district` - Get district data
- `GET /api/mgnrega/stats` - Get summary statistics
- `POST /api/mgnrega/add-district` - Add new district

### System Endpoints
- `GET /api/health` - Health check
- `POST /api/sync` - Trigger manual data sync

## 🔧 Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/mgnrega

# Frontend
FRONTEND_URL=http://localhost:3000

# Data Sync
ENABLE_AUTO_SYNC=true
SYNC_CRON=0 3 * * *

# External API (if applicable)
DATA_GOV_API_URL=
API_KEY=
```

## 📦 Project Benefits

1. **Scalability**: Easy to add new features
2. **Testing**: Isolated components for unit testing
3. **Team Collaboration**: Clear structure for multiple developers
4. **Production Ready**: Industry-standard patterns
5. **Debugging**: Easy to locate and fix issues
6. **Documentation**: Self-documenting structure

## 🔄 Migration from Old Structure

The old structure had everything in the root:
```
backend/
├── server.js          → src/server.js
├── models/            → src/models/
├── routes/            → src/routes/ (refactored)
├── services/          → src/services/
└── utils/             → src/utils/
```

New structure adds:
- ✅ Controllers (separated from routes)
- ✅ Middleware (centralized error handling)
- ✅ Config (centralized configuration)
- ✅ Constants (application-wide constants)
- ✅ Proper separation of app setup and server startup
