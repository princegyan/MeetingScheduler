const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const meetingRoutes = require('./routes/meetings');  // Importing the meeting routes
const connectDB = require('./config/db');  // Importing the database connection method

const app = express();

// Middleware
app.use(cors());  // Enable Cross-Origin Resource Sharing (CORS)
app.use(bodyParser.json());  // Middleware to parse JSON request bodies

// Connect to the database and start the server
connectDB().then(db => {
    // Use routes
    app.use('/api/meetings', (req, res, next) => {
        req.db = db;  // Attach the database instance to the request object
        next();
    }, meetingRoutes);  // Mounting the routes for meetings API

    // Server setup
    const PORT = process.env.PORT || 5000;  // Use the specified PORT or default to 5000
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);  // Start the server and log to the console
    });
}).catch(err => {
    console.error('Failed to connect to the database', err);
    process.exit(1);  // Exit the process with failure
});