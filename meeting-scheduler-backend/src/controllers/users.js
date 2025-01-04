const db = require('../config/db');

// Get available slots for a user
exports.getAvailableSlots = (req, res) => {
    const { userId } = req.params;

    const query = `SELECT available_slots FROM users WHERE id = ?`;
    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error('Error fetching slots:', err);
            return res.status(500).json({ error: 'Database error.' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.json({ availableSlots: result[0].available_slots });
    });
};
