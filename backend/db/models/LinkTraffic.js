const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');
const cuid = require('cuid');
const Links = require( "./Links" );


const LinkTraffic = sequelize.define('linkTraffic', {
    id:{
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => cuid(),
    },
    linkKey:{
        type: DataTypes.STRING,
        allowNull:true,
    },
    location_country: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    location_city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    device_device: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    device_browser: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    device_os: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    referrer: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {

    indexes: [
        {
            fields: ['linkKey'],
        },
    ],
});

module.exports = LinkTraffic;
