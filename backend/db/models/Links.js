const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');
const cuid = require('cuid');
const User = require( "./User" );


const Links = sequelize.define('links', {
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
    link_key: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    destinationURL: {
        type: DataTypes.TEXT,
        allowNull:false,
    },
    utm_source: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    utm_medium: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    utm_campaign: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    utm_id: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    utm_term: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    utm_content: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    page_title: {
        type: DataTypes.STRING,
        allowNull:true,
    },
    page_description: {
        type: DataTypes.TEXT,
        allowNull:true,
    },
    page_image: {
        type:DataTypes.TEXT,
        allowNull:true,
    },
    total_clicks : {
        type:DataTypes.INTEGER,
        defaultValue: 0,
    },
    last_click_date: {
        type:DataTypes.DATE,
        allowNull:true,
    }

}, {

    indexes: [
        {
            unique: true,
            fields: ['link_key'],
        },
    ],
}, {
    tableName: 'links'
});

User.hasMany(Links, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = Links;
