// config/config.js
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    secretKey: '123',
    database: {
        name: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
    },
    development: {
        dialect: 'mysql',
    },
};
