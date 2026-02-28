# Development Setup Guide

Follow these steps to set up and run the project on your local machine.

---

## Prerequisites
- **Node.js**: v18.0.0 or higher — [Download here](https://nodejs.org)
- **MongoDB**: Local instance on `localhost:27017` OR a free [MongoDB Atlas](https://www.mongodb.com/atlas) cloud URI

---

## 1. Clone the Repository
```bash
git clone <your-repo-link>
cd Valstrand
```

---

## 2. Backend Setup
```bash
cd backend
npm install
```

Create your `.env` file:
```bash
# Mac/Linux
cp .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env
```

Your `.env` should look like this:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jobqueue
```

> If using MongoDB Atlas, replace the URI with your Atlas connection string.

Start the backend:
```bash
npm run dev
```

✅ Backend running at: `http://localhost:5000`

---

## 3. Frontend Setup

Open a **new terminal window**, then:
```bash
cd frontend
npm install
npm run dev
```

✅ Frontend running at: `http://localhost:5173`

---

## 4. Verify Everything Works

| Service  | URL                          | Expected             |
|----------|------------------------------|----------------------|
| Backend  | http://localhost:5000/api/jobs | Returns `[]` (empty array) |
| Frontend | http://localhost:5173         | Shows Job Tracker UI |

---

## 🛠 Troubleshooting

**MongoDB Connection Error**
- Make sure MongoDB is running locally: `mongod` in your terminal
- If using Atlas, whitelist your IP in the Atlas dashboard under Network Access

**Port 5000 Already in Use**
- Change `PORT` in `backend/.env` to another value like `5001`
- Then create `frontend/.env.local` and add:
```env
  VITE_API_BASE=http://localhost:5001/api
```

**CORS Error in Browser**
- Make sure the backend is running before starting the frontend
- Check that `cors()` middleware is present in `backend/index.js`

**Jobs Stuck on PENDING**
- This means the backend setTimeout simulation isn't firing
- Check the backend terminal for any error logs
- Restart the backend with `npm run dev`
