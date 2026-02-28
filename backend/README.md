# Job Tracker Backend

A simple Node.js + Express backend for tracking jobs with simulated background processing.

## Tech Stack
- Node.js
- Express
- MongoDB (Mongoose)

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables in `.env`:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/jobqueue
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints
- `GET /api/jobs`: Get all jobs (newest first)
- `POST /api/jobs`: Create a new job
  - Body: `{ "title": "string", "description": "string" }`
  - Behavior: Saves job as `PENDING`, updates to `PROCESSING` after 3 seconds, and `COMPLETED` after 8 seconds.
