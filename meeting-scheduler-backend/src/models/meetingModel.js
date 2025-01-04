// This can be used for handling database operations
const db = require('../config/db');

const createMeeting = (meetingData) => {
    return db.execute(
        `INSERT INTO meetings (title, date, time, duration, participants, description) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            meetingData.title,
            meetingData.date,
            meetingData.time,
            meetingData.duration,
            meetingData.participants,
            meetingData.description
        ]
    );
};

const getAvailableSlots = (userId) => {
    // Mocked available slots
    return [
        { date: '2025-01-04', time: '10:00' },
        { date: '2025-01-04', time: '14:00' },
        { date: '2025-01-05', time: '09:00' },
    ];
};

module.exports = {
    createMeeting,
    getAvailableSlots
};
