const { INTEGER, STRING, TEXT } = require('sequelize');
const { seq } = require('../config/database');

const Address = seq.define('address', {
    addressid: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    industryid: {
        type: INTEGER,
        allowNull: false,
        references: {
            model: 'industry',
            key: 'industryid'
        },
    },
    street: {
        type: STRING,
        allowNull: true
    },
    city: {
        type: STRING,
        allowNull: true
    },
    state: {
        type: STRING,
        allowNull: true
    },
    postal_code: {
        type: STRING(10),
        allowNull: true
    },
    country: {
        type: STRING,
        allowNull: true
    },
}, {
    timestamps: false,
    tableName: 'address'
});

module.exports = { Address };
