# Full-Stack Job Queue Monitor

A modern full-stack application for submitting and monitoring background jobs. 
The system illustrates a queue-like behavior where jobs undergo status transitions 
(PENDING → PROCESSING → COMPLETED) on the backend while the frontend provides 
real-time updates.

## Key Features

- **Real-time Dashboard**: Polling-based updates to monitor job progress without refreshing.
- **Job Simulation**: Background status transitions managed by the backend.
- **Full-Stack Architecture**: Clean separation of concerns between Frontend (React) and Backend (Express).
- **Persistent Storage**: Job history saved to MongoDB.

---

## Technology Stack

- **Frontend**: React, Vite, Tailwind CSS, Shadcn/UI, Lucide Icons
- **Backend**: Node.js, Express, Mongoose (MongoDB)
- **Environment**: Dotenv for secure configuration

---

## Architecture Approach

The application follows a simple client-server architecture:

- The **React frontend** is responsible only for displaying data and sending user actions.
- The **Express backend** handles job creation, stores jobs in MongoDB, and 
  triggers background processing using non-blocking setTimeout functions.
- When a job is created, the API responds immediately with the new job 
  (status: PENDING) without waiting for processing to finish.
- The frontend polls the backend every 3 seconds to fetch updated job statuses, 
  giving the user a real-time feel without WebSockets.

This mimics real-world async systems like food order tracking or video processing pipelines.

---

## How Background Processing Works

When a new job is created via `POST /api/jobs`:

1. The job is saved to MongoDB with status `PENDING`
2. The API returns the job immediately to the frontend
3. Two non-blocking `setTimeout` functions run in the background:
   - After **3 seconds** → status updates to `PROCESSING`
   - After **8 seconds** → status updates to `COMPLETED`

This simulates a background worker without requiring a separate queue service 
like Redis or BullMQ. In a production system, this would be replaced with a 
proper job queue for reliability and retry support.

---

## How Consistency and Concurrency Are Managed

- All status updates use Mongoose's `findByIdAndUpdate` which performs 
  **atomic updates** at the database level, preventing partial writes.
- MongoDB ensures that even if multiple requests arrive simultaneously, 
  each document update is handled safely.
- Since `setTimeout` is non-blocking, the server remains responsive to 
  other requests while jobs are being processed in the background.
- **Note**: This implementation is suitable for demonstration purposes. 
  For production scale with multiple server instances, a dedicated queue 
  system (e.g., BullMQ + Redis) would be used to prevent duplicate 
  processing across instances.

---

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- MongoDB (running locally or a Cloud URI like MongoDB Atlas)

### 1. Clone the Project
```bash
git clone <your-repo-link>
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jobqueue
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```

Visit: http://localhost:5173

---

## Project Structure
```
├── backend/
│   ├── models/Job.js        # Mongoose Schema
│   ├── routes/jobs.js       # Job CRUD & simulation logic
│   └── index.js             # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components (JobCard, StatusBadge)
│   │   ├── pages/           # Dashboard, CreateJob
│   │   └── lib/api.ts       # Central API wrapper
└── README.md
```

---

## User Flow
```
User creates a job
      ↓
Job saved to MongoDB (status: PENDING)
      ↓
API responds immediately — no waiting
      ↓
Background timer starts on server
      ↓
3s later → status becomes PROCESSING
      ↓
8s later → status becomes COMPLETED
      ↓
Frontend polls every 3s and shows live updates
```

---

## Deployment (Render)

This project is pre-configured for **Render** using a Blueprint (`render.yaml`).

### Steps to Deploy:

1.  **Push your code to GitHub** (as described in the previous section).
2.  **Connect to Render**:
    *   Sign in to your [Render Dashboard](https://dashboard.render.com/).
    *   Click "New" → "Blueprint".
    *   Connect your GitHub repository.
3.  **Configure Environment Variables**:
    *   Render will automatically detect the `render.yaml` file.
    *   It will ask for a `MONGODB_URI`. Provide your **MongoDB Atlas** connection string (e.g., `mongodb+srv://user:pass@cluster.mongodb.net/dbname`).
4.  **Wait for Build**:
    *   Render will deploy the **Backend** (Web Service) and the **Frontend** (Static Site).
    *   The Frontend's `VITE_API_BASE` will be automatically linked to your Backend's URL.

### 💡 Note on Production
*   **Production Worker**: In this demo, background processing uses `setTimeout`. For high-traffic production apps, it is highly recommended to use **Redis + BullMQ** on Render to ensure jobs are persistent even if the server restarts.
*   **Cold Starts**: If using the Free tier on Render, the backend may take a few seconds to spin up after periods of inactivity.
