const { STRING, INTEGER, ENUM } = require('sequelize');
const {seq} = require('../config/database');
const adminTable = seq.define("admin",{
            adminId:{
                        type:INTEGER,
                        primaryKey:true,
                        autoIncrement:true,
                        allowNull:false
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
            name: {
                type:STRING,
                allowNull: false,
                unique: true

            },
            emailID: {
                type:STRING,
                allowNull: true
            },
            Phno: {
                type:STRING,
                allowNull: true
            },
            role: {
                type: ENUM('admin'),
                allowNull: true,
                defaultValue: 'admin'
            }
        }, {
            timestamps: false,
            tableName: 'admin'
});
        
module.exports = { adminTable };
   
