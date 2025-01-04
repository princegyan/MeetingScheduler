const mysql = require('mysql2');  // Import the mysql2 package

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: 'localhost',  // Database host (can be a remote server or localhost)
    user: 'root',       // Your MySQL username
    password: '',       // Your MySQL password
    database: 'meeting_scheduler',  // Database name
    port: 3307,         // MySQL port (default is 3306, but you have set it to 3307)
});

// Function to connect to the database using a promise
const connectDB = () => {
    return new Promise((resolve, reject) => {
        db.connect((err) => {
            if (err) {
                reject('Error connecting to the database: ' + err);
            } else {
                console.log('Connected to the database');
                resolve();
            }
        });
    });
};

// Promisify the query function for easy async/await usage
const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// Export the connection, connectDB function, and the query method
module.exports = {
    db,
    connectDB,
    query
};
