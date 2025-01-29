const { MongoClient } = require('mongodb');  // Import the MongoDB package

// MongoDB connection URI (replace with your actual credentials)
const password = encodeURIComponent('LtWSQQIoLb3XEV7y');  // Use encodeURIComponent if there are special characters in password
const uri = `mongodb+srv://heneseth:${password}@mymongodb.opm2n.mongodb.net/meeting_scheduler?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

const connectDB = async () => {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    
    // Return the database instance
    return client.db('meeting_scheduler');  // Replace with your desired database
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;  // Rethrow the error to handle it in the calling code
  }
};

module.exports = connectDB;  // Export the connectDB function
