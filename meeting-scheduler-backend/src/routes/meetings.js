const express = require('express');
const router = express.Router();

// Import the controller functions
const {
    createMeeting,
    getAllMeetings,
    getMeetingById,
    updateMeeting,
    deleteMeeting
} = require('../controllers/meetingController');

// Define your routes
router.post('/', createMeeting);               // Create a new meeting
router.get('/', getAllMeetings);               // Get all meetings
router.get('/:meetingId', getMeetingById);     // Get a specific meeting by ID
router.put('/:meetingId', updateMeeting);      // Update a meeting
router.delete('/:meetingId', deleteMeeting);   // Delete a meeting

module.exports = router;
