// config/sequelize.js

const { Sequelize } = require('sequelize');
const { database } = require('./config');

const sequelize = new Sequelize(database.name, database.username, database.password, {
    host: database.host,
    port: database.port,
    dialect: database.dialect,
    logging: false,
    database: database.name,
});

module.exports = sequelize;
