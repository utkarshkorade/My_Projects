
const { INTEGER, STRING, TEXT } = require('sequelize');
const { seq } = require('../config/database');

const industryTable = seq.define('industry', {
    industryid: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userid: {
        type: INTEGER,
        allowNull: false, 
        references: {
            model: 'login',
            key: 'userid'
        },
        unique: true
    },
    username: {
        type: STRING,
        allowNull: false, 
        references: {
            model: 'login',
            key: 'username'
        },
        unique: true
    },
    company: {
        type: STRING,
        allowNull: false 
    },
    status: {
        type:STRING,
        allowNull: true 
    },
    CompanyInfo: {
        type:TEXT,
        allowNull: true 
    }
}, {
    timestamps: false,
    tableName: 'industry'
});

module.exports = {industryTable};
