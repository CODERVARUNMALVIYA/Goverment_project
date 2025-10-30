# 🚀 Quick Start Guide - Production Backend Structure

## 📁 What You Have Now

Your backend is now structured like a production-level application following industry standards!

```
backend/
└── src/              # All source code organized professionally
    ├── config/       # Configuration (database, app settings)
    ├── constants/    # Constants (status codes, messages)
    ├── controllers/  # Request handlers (business logic)
    ├── middleware/   # Middleware (error handling, logging)
    ├── models/       # Database models
    ├── routes/       # API routes
    ├── services/     # Business services
    ├── utils/        # Helper functions
    ├── scripts/      # Standalone scripts
    ├── app.js        # Express app setup
    └── server.js     # Entry point
```

## ⚡ Quick Start

### 1. Start the Server

```bash
cd backend
npm run dev
```

You should see:
```
✓ MongoDB connected successfully
✓ Server running on http://localhost:5000
✓ Environment: development
✓ API endpoints available at /api/mgnrega
```

### 2. Test the API

Open your browser or Postman and test:

- **Health Check**: http://localhost:5000/api/health
- **Districts List**: http://localhost:5000/api/mgnrega/districts
- **API Info**: http://localhost:5000/

## 📝 How to Add New Features

### Adding a New Endpoint

**Example: Add a "Get All States" endpoint**

#### Step 1: Create Controller Function
```javascript
// src/controllers/mgnregaController.js

const getStates = async (req, res, next) => {
  try {
    const states = await Report.distinct('state');
    res.json({ ok: true, states });
  } catch (err) {
    next(err);
  }
};

// Export it
module.exports = {
  // ... existing exports
  getStates
};
```

#### Step 2: Add Route
```javascript
// src/routes/mgnrega.js

router.get('/states', asyncHandler(mgnregaController.getStates));
```

That's it! Your new endpoint is ready at `GET /api/mgnrega/states`

### Adding a New Service

**Example: Add email notification service**

#### Step 1: Create Service
```javascript
// src/services/emailService.js

const sendEmail = async (to, subject, body) => {
  // Email logic here
  console.log(`Sending email to ${to}`);
};

module.exports = { sendEmail };
```

#### Step 2: Use in Controller
```javascript
// src/controllers/mgnregaController.js

const emailService = require('../services/emailService');

const addDistrict = async (req, res, next) => {
  // ... existing code
  await emailService.sendEmail('admin@example.com', 'New District', 'District added');
  // ... rest of code
};
```

### Adding Configuration

```javascript
// src/config/app.js

module.exports = {
  // ... existing config
  
  // Add new config
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
  }
};
```

## 🎯 Important Files Explained

### `src/server.js` - Entry Point
- Starts the HTTP server
- Connects to database
- Sets up cron jobs
- Handles graceful shutdown

**When to edit**: Almost never! This is stable.

### `src/app.js` - Express Configuration
- Sets up middleware (CORS, body parser)
- Registers routes
- Sets up error handlers

**When to edit**: When adding new global middleware or routes.

### `src/controllers/` - Business Logic
- Handle HTTP requests
- Call services
- Send responses

**When to edit**: When adding new endpoints or modifying logic.

### `src/routes/` - API Endpoints
- Define API routes
- Map URLs to controllers

**When to edit**: When adding new endpoints.

### `src/services/` - Business Services
- Complex business logic
- External API calls
- Data processing

**When to edit**: When adding new business operations.

### `src/models/` - Database Models
- Define data structure
- MongoDB schemas

**When to edit**: When changing data structure.

### `src/config/` - Configuration
- Environment-based settings
- Database connection

**When to edit**: When adding new configuration options.

## 🔧 Common Tasks

### Task 1: Add a New API Endpoint

1. **Add controller function** in `src/controllers/`
2. **Add route** in `src/routes/`
3. **Test** the endpoint

### Task 2: Add New Middleware

1. **Create middleware file** in `src/middleware/`
2. **Export** in `src/middleware/index.js`
3. **Use** in `src/app.js`

Example:
```javascript
// src/middleware/auth.js
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  next();
};

// src/app.js
const { authenticate } = require('./middleware');
app.use('/api/mgnrega', authenticate, mgnregaRoutes);
```

### Task 3: Add Environment Variable

1. **Add to `.env`**:
```env
NEW_VARIABLE=value
```

2. **Add to `src/config/app.js`**:
```javascript
module.exports = {
  newVariable: process.env.NEW_VARIABLE
};
```

3. **Use in code**:
```javascript
const config = require('../config/app');
console.log(config.newVariable);
```

## 🐛 Debugging Tips

### Server Won't Start
1. Check MongoDB is running
2. Check `.env` file exists
3. Check `MONGO_URI` in `.env`

### Route Not Found
1. Check route is registered in `src/routes/`
2. Check route is exported in `src/routes/index.js`
3. Check route is used in `src/app.js`

### Database Error
1. Check MongoDB connection string
2. Check database exists
3. Check model imports

## 📊 Project Structure Benefits

### Before (Old Structure)
```
❌ Everything in root directory
❌ Routes contain business logic
❌ No separation of concerns
❌ Hard to maintain
❌ Hard to test
```

### After (New Structure)
```
✅ Organized in src/ directory
✅ Separated controllers and routes
✅ Clear separation of concerns
✅ Easy to maintain and scale
✅ Easy to test
✅ Production-ready
```

## 🎓 Best Practices to Follow

1. **Keep controllers thin** - Delegate to services
2. **Keep routes thinner** - Just map URLs to controllers
3. **Use async/await** - For all async operations
4. **Handle errors properly** - Use try/catch and next(err)
5. **Use constants** - For status codes and messages
6. **Log everything** - Use console.log or logger
7. **Validate input** - Check request data
8. **Document code** - Add comments for complex logic

## 📚 Learning Resources

- **Express.js**: https://expressjs.com/
- **Mongoose**: https://mongoosejs.com/
- **Node.js Best Practices**: https://github.com/goldbergyoni/nodebestpractices
- **Clean Code**: Robert C. Martin

## 🎉 You're All Set!

Your backend now follows production-level standards used by companies like:
- Netflix
- Uber
- Airbnb
- Microsoft

Happy coding! 🚀

---

**Need help?** Check:
1. `STRUCTURE_SUMMARY.md` - Complete structure overview
2. `PRODUCTION_STRUCTURE.md` - Migration details
3. `src/README.md` - Source code documentation
