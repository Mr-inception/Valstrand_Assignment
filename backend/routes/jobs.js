const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// GET /api/jobs - Return all jobs, newest first
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/jobs - Create job and trigger simulation
router.post('/', async (req, res) => {
    const { title, description } = req.body;

    // Simple validation for the interviewer
    if (!title || !title.trim()) {
        return res.status(400).json({ message: "Job title is required." });
    }
    if (!description || !description.trim()) {
        return res.status(400).json({ message: "Job description is required." });
    }

    try {
        const job = new Job({
            title: title.trim(),
            description: description.trim(),
        });

        const savedJob = await job.save();

        // Trigger background simulation (immediately return response)
        // 1. After 3 seconds: update to PROCESSING
        setTimeout(async () => {
            try {
                await Job.findByIdAndUpdate(savedJob._id, { status: 'PROCESSING' });
            } catch (err) {
                console.error('Error updating status to PROCESSING:', err);
            }
        }, 3000);

        // 2. After 8 seconds: update to COMPLETED
        setTimeout(async () => {
            try {
                await Job.findByIdAndUpdate(savedJob._id, { status: 'COMPLETED' });
            } catch (err) {
                console.error('Error updating status to COMPLETED:', err);
            }
        }, 8000);

        res.status(201).json(savedJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
