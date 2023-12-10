const { Client } = require('pg');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Database connection parameters
const connectionParams = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
};

// Create a new PostgreSQL client
const client = new Client(connectionParams);

// Connect to the database
client.connect()
    .then(() => {
        console.log(__dirname)
        console.log('Connected to the database');
        // Perform additional queries or tasks here if needed
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error.message);
    })
    .finally(() => {
        // Close the database connection
        client.end();
    });
