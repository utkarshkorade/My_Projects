// // Importing necessary Sequelize data types and the database connection instance
// const { INTEGER, STRING, ENUM, TEXT } = require('sequelize');
// const { seq } = require('../config/database');

// // Defining the Student model
// const studentTable = seq.define('student', {
//      // Defining columns of the student table
//     studentid: {
//         type:INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false
//     },
//     userid: {
//         type: INTEGER,
//         allowNull: false, 
//         // Setting up a foreign key constraint referencing the 'userid' column of the 'login' table
//         references: {
//             model: 'login', // Referenced table name
//             key: 'userid'   // Referenced column name
//         },
//         unique: true
//     },
//     username: {
//         type: STRING,
//         allowNull: false, 
//         references: {
//             model: 'login',
//             key: 'username'
//         },
//         unique: true
//     },
//     name: {
//         type: STRING,
//         allowNull: false,
       
//     },
//     gender: {
//         type: ENUM('male', 'female','other'),
//         allowNull: true
//     },
//     email: {
//         type: STRING,
//         allowNull: true
//     },
//     Phno: {
//         type:STRING,
//         allowNull: true
//     },
//     address: {
//         type: STRING,
//         allowNull: true
//     },
//     department: {
//         type: STRING,
//         allowNull: true
//     },
//     industryid: {
//         type: INTEGER,
//         allowNull: true,

//         references: {
//             model: 'industry',
//             key: 'industryid'
//         }
//     },
//     status: {
//         type: STRING,
//         allowNull: true
//     },
//     industryinfo: {
//         type:TEXT,
//         allowNull: true
//     }
// }, {
//     timestamps: false,
//     tableName: 'student'
// });

// module.exports = {studentTable};
// models/student.js
const { INTEGER, STRING, ENUM, TEXT } = require('sequelize');
const { seq } = require('../config/database');
const { loginTable } = require('./login'); // Ensure loginTable is imported

const studentTable = seq.define('student', {
    studentid: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userid: {
        type: INTEGER,
        allowNull: false,
        references: {
            model: loginTable,  // Correct reference to Sequelize model
            key: 'userid'
        },
        unique: true
    },
    username: {
        type: STRING,
        allowNull: false,
        references: {
            model: loginTable,  // Correct reference to Sequelize model
            key: 'username'
        },
        unique: true
    },
    name: {
        type: STRING,
        allowNull: false
    },
    gender: {
        type: ENUM('male', 'female', 'other'),
        allowNull: true
    },
    email: {
        type: STRING,
        allowNull: true
    },
    Phno: {
        type: STRING,
        allowNull: true
    },
    address: {
        type: STRING,
        allowNull: true
    },
    department: {
        type: STRING,
        allowNull: true
    },
    industryid: {
        type: INTEGER,
        allowNull: true,
        references: {
            model: 'industry',  // Make sure industryTable exists
            key: 'industryid'
        }
    },
    status: {
        type: STRING,
        allowNull: true
    },
    industryinfo: {
        type: TEXT,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'student'
});

module.exports = { studentTable };
