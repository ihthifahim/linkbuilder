const { DataTypes } = require('sequelize');
const cuid = require('cuid');
const sequelize = require('../../config/sequelize');
const User = require('./User');

const UserSessions = sequelize.define('userSessions', {
    id:{
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => cuid(),
    },
    userId:{
        type: DataTypes.STRING,
        allowNull:false,
        references: {
            model: User,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    tokenType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    expireAt: {
        type: DataTypes.DATE,
        allowNull: false,
    }
});

User.hasMany(UserSessions, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = UserSessions;