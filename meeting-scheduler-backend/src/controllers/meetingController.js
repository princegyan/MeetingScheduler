const { query } = require('../config/db');  // Import the query function

// Create a new meeting
exports.createMeeting = async (req, res) => {
    const { title, date, time, duration, participants, description } = req.body;
    if (!title || !date || !time || !duration || !participants) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const result = await query(
            `INSERT INTO meetings (title, date, time, duration, participants, description) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [title, date, time, duration, participants, description]
        );
        console.log(`Notification: Meeting ${result.insertId} created`);
        res.status(201).json({ success: true, meetingId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all meetings
exports.getAllMeetings = async (req, res) => {
    try {
        const meetings = await query('SELECT * FROM meetings');
        res.status(200).json({ success: true, meetings });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific meeting by ID
exports.getMeetingById = async (req, res) => {
    const meetingId = req.params.meetingId;
    try {
        const meetings = await query('SELECT * FROM meetings WHERE id = ?', [meetingId]);
        if (meetings.length === 0) {
            return res.status(404).json({ error: 'Meeting not found' });
        }
        res.status(200).json({ success: true, meeting: meetings[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing meeting
exports.updateMeeting = async (req, res) => {
    const meetingId = req.params.meetingId;
    const { date, time, duration, participants, description } = req.body;
    if (!date || !time || !duration || !participants || !description) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const result = await query(
            `UPDATE meetings SET date = ?, time = ?, duration = ?, participants = ?, description = ? WHERE id = ?`,
            [date, time, duration, participants, description, meetingId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Meeting not found' });
        }
        res.json({ success: true, message: 'Meeting updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a meeting
exports.deleteMeeting = async (req, res) => {
    const meetingId = req.params.meetingId;
    try {
        const result = await query('DELETE FROM meetings WHERE id = ?', [meetingId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Meeting not found' });
        }
        res.json({ success: true, message: 'Meeting deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
