// models/ErrorLog.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');

const ErrorLog = sequelize.define('errorLogs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    errorMessage: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

module.exports = ErrorLog;
