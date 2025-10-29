# MGNREGA District Performance Viewer

A full-stack web application to view MGNREGA performance data by district, designed for rural users with limited digital literacy.

## Features

✅ Auto-detect district using GPS location  
✅ Simple Hindi/English bilingual interface  
✅ Large icons and buttons for easy navigation  
✅ Offline-ready with local MongoDB cache  
✅ Daily auto-sync from data.gov.in API  

## Tech Stack

- **Frontend**: React 18
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Data**: data.gov.in MGNREGA API

## Quick Setup (Windows PowerShell)

### 1. Install Prerequisites
- Node.js v16+ from [nodejs.org](https://nodejs.org/)
- MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)

### 2. Backend Setup
```powershell
cd backend
npm install

# Create .env file with:
# MONGO_URI=mongodb://localhost:27017/mgnrega
# DATA_GOV_API_URL=<your-api-url>
# DATA_GOV_API_KEY=<your-key>

npm run seed      # Load sample data
npm run dev       # Start server
```

### 3. Frontend Setup (new terminal)
```powershell
cd frontend
npm install
npm start
```

App opens at `http://localhost:3000`

## Usage

1. Click **"Detect my district"** or search manually
2. View monthly metrics as bar charts
3. Switch years using year selector
4. Toggle Hindi/English using lang buttons

## API Endpoints

- `GET /api/mgnrega/districts` - List all districts
- `GET /api/mgnrega/district/:name` - Get district data
- `GET /api/mgnrega/stats` - Overall statistics
- `POST /api/sync` - Manual data sync

## Project Structure

```
backend/
  ├── models/Report.js        # MongoDB schema
  ├── routes/mgnrega.js       # API routes
  ├── services/fetchData.js   # Data fetcher
  ├── utils/seedData.js       # Sample data
  └── server.js               # Express server

frontend/
  ├── src/
  │   ├── components/
  │   │   ├── Dashboard.js         # Metrics display
  │   │   └── DistrictSelector.js  # District picker
  │   ├── App.js               # Root component
  │   ├── i18n.js              # Translations
  │   └── styles.css           # All styles
  └── public/index.html
```

## Configuration

### Data.gov.in API Setup
1. Register at [data.gov.in](https://data.gov.in/)
2. Find MGNREGA dataset
3. Get API URL and key
4. Add to backend `.env`

### Geolocation
Uses OpenStreetMap Nominatim (free). For production, consider Google Maps API or Mapbox.

## Troubleshooting

**MongoDB won't connect?**
```powershell
net start MongoDB
```

**Port already in use?**
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
```

**Location not working?**  
- Allow browser location permission
- Must use HTTPS (or localhost)

## Future Ideas

- PDF/Excel export
- WhatsApp notifications
- Voice navigation
- Regional language support
- PWA offline mode

---

Built for rural India 🇮🇳
