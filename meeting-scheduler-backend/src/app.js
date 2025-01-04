const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const meetingRoutes = require('./routes/meetings');  // Importing the meeting routes
const { connectDB } = require('./config/db');  // Importing the database connection method

const app = express();

// Middleware
app.use(cors());  // Enable Cross-Origin Resource Sharing (CORS)
app.use(bodyParser.json());  // Middleware to parse JSON request bodies

// Connect to the database
connectDB();  // Call the function to connect to the database

// Use routes
app.use('/api/meetings', meetingRoutes);  // Mounting the routes for meetings API

// Server setup
const PORT = process.env.PORT || 5000;  // Use the specified PORT or default to 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);  // Start the server and log to the console
});
