const {  DataTypes } = require('sequelize');
const cuid = require('cuid');
const sequelize = require('../../config/sequelize')

const User = sequelize.define('users', {
    id:{
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => cuid(),
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emailVerifiedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },

});

module.exports = User;