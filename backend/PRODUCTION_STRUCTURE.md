# Backend Production Structure

This document explains the production-level restructuring of the backend.

## ✅ What Changed

The backend has been restructured from a flat structure to a production-level hierarchical organization:

### Old Structure
```
backend/
├── server.js
├── seed.js
├── models/
├── routes/
├── services/
├── utils/
└── scripts/
```

### New Structure (Production-Level)
```
backend/
├── src/                        # All source code
│   ├── config/                 # Configuration management
│   ├── constants/              # Application constants
│   ├── controllers/            # Request handlers (business logic)
│   ├── middleware/             # Express middleware
│   ├── models/                 # Database models
│   ├── routes/                 # API route definitions
│   ├── services/               # Business logic & services
│   ├── utils/                  # Utility functions
│   ├── scripts/                # Standalone scripts
│   ├── app.js                  # Express app setup
│   ├── server.js              # Entry point
│   └── index.js               # Main exports
├── seed.js                     # Database seeding
├── package.json               # Updated to use src/server.js
└── .env                       # Environment variables
```

## 🎯 Key Improvements

### 1. **Proper Separation of Concerns**
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic and data operations
- **Routes**: Define only API endpoints (thin layer)
- **Middleware**: Handle cross-cutting concerns (errors, logging)

### 2. **Configuration Management**
- Centralized in `src/config/`
- Environment-based settings
- Database connection with retry logic

### 3. **Error Handling**
- Centralized error handling middleware
- Async error wrapper for route handlers
- Proper HTTP status codes from constants

### 4. **Better Maintainability**
- Clear, self-documenting structure
- Easy to locate files and functionality
- Scalable for team collaboration

## 🚀 How to Use

### Running the Application

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start

# Seed database
npm run seed
```

### File Structure Explained

#### `src/config/`
- `app.js` - Application configuration (port, CORS, sync settings)
- `database.js` - MongoDB connection with retry logic

#### `src/controllers/`
- `mgnregaController.js` - Handles MGNREGA data requests
- `systemController.js` - Handles system requests (health, sync)

#### `src/middleware/`
- `errorHandler.js` - Global error handling
- `logger.js` - Request logging
- `index.js` - Middleware exports

#### `src/routes/`
- `mgnrega.js` - MGNREGA API endpoints
- `system.js` - System API endpoints
- `index.js` - Route exports

#### `src/constants/`
- HTTP status codes
- Response messages
- Database states

## 📝 API Endpoints

All endpoints remain the same:

### MGNREGA
- `GET /api/mgnrega/districts`
- `GET /api/mgnrega/district/:district`
- `GET /api/mgnrega/stats`
- `POST /api/mgnrega/add-district`

### System
- `GET /api/health`
- `POST /api/sync`
- `GET /` - API documentation

## 🔧 Environment Variables

The `.env` file structure remains the same:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/mgnrega
FRONTEND_URL=http://localhost:3000
ENABLE_AUTO_SYNC=true
SYNC_CRON=0 3 * * *
```

## 📚 Benefits of This Structure

1. **Industry Standard**: Follows Node.js/Express best practices
2. **Scalable**: Easy to add new features and modules
3. **Testable**: Isolated components for unit testing
4. **Team-Friendly**: Clear structure for multiple developers
5. **Production-Ready**: Proper error handling and logging
6. **Maintainable**: Easy to locate and fix issues

## 🔄 Migration Notes

- Old files are still in the `backend/` root (can be deleted after testing)
- All imports updated to use new paths
- `package.json` updated to point to `src/server.js`
- No changes to API endpoints or functionality
- Database schema remains the same

## 🧪 Testing

After restructuring, test these scenarios:

1. Start the server: `npm run dev`
2. Check health endpoint: `GET http://localhost:5000/api/health`
3. Get districts: `GET http://localhost:5000/api/mgnrega/districts`
4. Get district data: `GET http://localhost:5000/api/mgnrega/district/Korba`
5. Trigger sync: `POST http://localhost:5000/api/sync`

## 📦 Next Steps

1. ✅ Restructure completed
2. 🔄 Test all endpoints
3. 🗑️ Remove old files from root (after testing)
4. 📝 Add unit tests in `src/__tests__/`
5. 🚀 Deploy to production

---

**Note**: This is a production-level structure following industry best practices for Node.js/Express applications.
