const express = require('express');
const { getAvailableSlots } = require('../controllers/users');
const router = express.Router();

router.get('/:userId/available-slots', getAvailableSlots);

module.exports = router;
