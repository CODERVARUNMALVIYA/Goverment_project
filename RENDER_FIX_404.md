# 🚨 URGENT FIX - 404 Error Solution

## Problem: 
Backend API endpoint `/api/mgnrega/add-district` returning **404 Not Found**

## Root Cause:
Render dashboard mein environment variables properly set nahi hain.

---

## ✅ IMMEDIATE STEPS TO FIX:

### 1️⃣ Render Backend Service Settings:

Go to: **Render Dashboard → Your Backend Service → Environment**

Add these **EXACT** variables:

```
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://varunmalviya333_db_user:IVs7velN0Brn8MNn@cluster0.aojih3s.mongodb.net/?appName=Cluster0
FRONTEND_URL=https://frontnd.onrender.com
ENABLE_AUTO_SYNC=false
SYNC_CRON=0 3 * * *
```

**Important:**
- ✅ Database name add karein MONGO_URI mein: `...mongodb.net/mgnrega?appName=Cluster0`
- ✅ Save Changes par click karein
- ✅ Service automatically redeploy hogi

---

### 2️⃣ Render Frontend Service Settings:

Go to: **Render Dashboard → Your Frontend Service → Environment**

Add this variable:

```
REACT_APP_API_BASE_URL=https://goverment-project-backend.onrender.com/api
```

**Important:**
- ✅ Save Changes par click karein
- ✅ Manual Deploy → Clear build cache & deploy

---

### 3️⃣ Verify Backend Deployment:

Backend deploy hone ke baad (5-10 minutes), browser mein test karein:

```
https://goverment-project-backend.onrender.com/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-31T..."
}
```

Agar **404** aaye to:
- Check: Start Command = `node src/server.js`
- Check: Root Directory = `backend` (agar monorepo hai)

---

### 4️⃣ Test District Endpoint:

```
https://goverment-project-backend.onrender.com/api/mgnrega/districts
```

**Expected Response:**
```json
{
  "ok": true,
  "districts": ["Korba", "Raipur", ...],
  "total": 30
}
```

---

## 🔍 Debugging Checklist:

### If Still Getting 404:

1. **Check Render Logs:**
   - Render Dashboard → Logs
   - Dekho kya error aa raha hai
   - `✓ Server running on http://localhost:5000` dikna chahiye

2. **Check Start Command:**
   - Settings → Build & Deploy
   - Start Command: `node src/server.js` (NOT `npm start`)

3. **Check Root Directory:**
   - Agar repo mein `backend/` folder hai
   - Root Directory: `backend` set karein

4. **Check Build Command:**
   - Build Command: `npm install` (default)
   - Node Version: 18 or higher

5. **Database Connection:**
   - Logs mein `✓ MongoDB connected` dekho
   - Agar connection error ho to MONGO_URI check karein

---

## 📱 Alternative: Quick Test Locally

Local test karke dekho ki code sahi hai:

```powershell
cd backend
$env:MONGO_URI="mongodb+srv://varunmalviya333_db_user:IVs7velN0Brn8MNn@cluster0.aojih3s.mongodb.net/mgnrega?appName=Cluster0"
$env:PORT="5000"
$env:NODE_ENV="production"
$env:FRONTEND_URL="https://frontnd.onrender.com"
npm start
```

Then browser mein test:
```
http://localhost:5000/api/health
http://localhost:5000/api/mgnrega/districts
```

Agar local pe kaam kar raha hai to Render settings ka issue hai.

---

## 🎯 Most Common Issues:

### Issue 1: Start Command Wrong
**Fix:** Settings → Start Command = `node src/server.js`

### Issue 2: Database Name Missing
**Fix:** MONGO_URI = `...mongodb.net/mgnrega?appName=...`

### Issue 3: .env File Not Loading
**Fix:** Environment variables manually Render dashboard mein add karein

### Issue 4: Build Failed
**Fix:** Logs check karein, missing dependencies install karein

### Issue 5: Free Tier Sleeping
**Fix:** Backend service ko wake up karne ke liye koi bhi endpoint hit karein

---

## ⚡ Expected Timeline:

1. Environment variables add karo: **2 minutes**
2. Backend redeploy: **5-10 minutes**
3. Frontend rebuild: **5 minutes**
4. Test & verify: **2 minutes**

**Total: ~15-20 minutes**

---

## 📞 Still Not Working?

Take screenshots of:
1. ✅ Render Backend Environment Variables
2. ✅ Render Backend Logs (recent 50 lines)
3. ✅ Browser Network Tab (404 request)
4. ✅ Backend Settings (Start Command, Root Directory)

---

**Good Luck! 🚀**
