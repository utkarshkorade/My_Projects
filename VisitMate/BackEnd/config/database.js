const {Sequelize} = require('sequelize');
// Create a new instance of Sequelize and configure it to connect to the MySQL database
const seq = new Sequelize("visitmate","root","0912",{
    host: '127.0.0.1',    // Hostname of the database server
    port: 3306,           // Port number of the database server
    dialect: "mysql",     // Dialect of the database (MySQL in this case)
})
// Export the Sequelize instance to be used in other files
module.exports = {seq};