# Development Setup Guide

## First Time Setup

### 1. Check Prerequisites

```powershell
# Verify Node.js installation
node --version    # Should be v16 or higher

# Verify npm
npm --version

# Check if MongoDB is installed
mongod --version
```

### 2. Start MongoDB

**If using local MongoDB:**
```powershell
# Start MongoDB service
net start MongoDB

# Or if service isn't configured, start manually:
mongod --dbpath C:\data\db
```

**If using MongoDB Atlas:**
- Get your connection string from atlas.mongodb.com
- It should look like: `mongodb+srv://username:password@cluster.mongodb.net/mgnrega`

### 3. Backend Setup

```powershell
# Navigate to backend folder
cd c:\Users\HP\OneDrive\Desktop\Goverment_project\backend

# Install dependencies (first time only)
npm install

# Create .env file
notepad .env
```

**Add this to .env:**
```
MONGO_URI=mongodb://localhost:27017/mgnrega
DATA_GOV_API_URL=
DATA_GOV_API_KEY=
SYNC_CRON=0 3 * * *
ENABLE_AUTO_SYNC=false
PORT=5000
```

**Load sample data:**
```powershell
npm run seed
```

**Start backend server:**
```powershell
npm run dev
```

You should see:
```
✓ MongoDB connected successfully
✓ Server running on http://localhost:5000
✓ API endpoints available at /api/mgnrega
```

### 4. Frontend Setup (New Terminal)

```powershell
# Navigate to frontend folder
cd c:\Users\HP\OneDrive\Desktop\Goverment_project\frontend

# Install dependencies (first time only)
npm install

# Start React app
npm start
```

Browser should automatically open to `http://localhost:3000`

## Daily Development Workflow

### Starting the App

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm start
```

### Testing Features

1. **Test District Selection:**
   - Open http://localhost:3000
   - Click "Detect my district" (allow location)
   - Or search for a district manually

2. **Test API Directly:**
   ```powershell
   # List all districts
   curl http://localhost:5000/api/mgnrega/districts

   # Get specific district data
   curl http://localhost:5000/api/mgnrega/district/Patna

   # Check health
   curl http://localhost:5000/api/health
   ```

3. **Trigger Manual Sync:**
   ```powershell
   curl -X POST http://localhost:5000/api/sync
   ```

### Making Changes

**Backend changes:**
- Server auto-restarts (nodemon)
- Check terminal for errors

**Frontend changes:**
- Browser auto-refreshes (React hot reload)
- Check browser console for errors

## Common Commands

```powershell
# Backend
npm run dev          # Start development server
npm run seed         # Load sample data
npm start            # Start production server

# Frontend
npm start            # Start development server
npm run build        # Build for production
npm test             # Run tests
```

## Debugging Tips

### Check Backend Logs
Look at the terminal running `npm run dev` - all API requests and errors appear there

### Check Frontend Console
Press F12 in browser → Console tab to see React errors and network requests

### Verify MongoDB Data
```powershell
# Connect to MongoDB shell
mongosh

# Switch to database
use mgnrega

# List all districts
db.reports.distinct("district")

# Count total records
db.reports.countDocuments()

# Find specific district
db.reports.find({ district: "Patna" })
```

### Reset Everything
```powershell
# Backend
cd backend
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json
npm install

# Frontend
cd frontend
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json
npm install
```

## Getting Real Data

### Step 1: Get API Access
1. Go to https://data.gov.in/
2. Register/Login
3. Search for "MGNREGA" datasets
4. Click on dataset → API tab
5. Copy API URL and get API key

### Step 2: Update Backend Config
Edit `backend/.env`:
```
DATA_GOV_API_URL=<paste-api-url-here>
DATA_GOV_API_KEY=<paste-api-key-here>
ENABLE_AUTO_SYNC=true
```

### Step 3: Trigger Sync
```powershell
curl -X POST http://localhost:5000/api/sync
```

Watch terminal logs to see data being fetched and saved.

### Step 4: Customize Data Mapping
If API returns different field names, edit:
`backend/services/fetchData.js` → `normalizeRecord()` function

## Production Build

### Backend
```powershell
cd backend
$env:NODE_ENV="production"
npm start
```

### Frontend
```powershell
cd frontend
npm run build

# The build/ folder contains production files
# Deploy to Vercel/Netlify or serve with Express
```

## Need Help?

1. Check the main README.md
2. Look at backend terminal logs
3. Check browser console (F12)
4. Verify MongoDB is running
5. Ensure all npm packages are installed

## Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 5000 in use | Change PORT in .env or kill process |
| MongoDB won't connect | Run `net start MongoDB` |
| npm install fails | Delete node_modules and try again |
| React won't start | Delete node_modules, reinstall |
| Location not detected | Allow browser permission, use HTTPS |
| No districts showing | Run `npm run seed` in backend |

---

Happy coding! 🚀
