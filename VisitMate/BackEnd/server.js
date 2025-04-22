// Import required packages
const express = require('express'); // Express framework for building web applications
const cors = require('cors'); // CORS middleware for handling Cross-Origin Resource Sharing
const bodyParser = require('body-parser'); // Body-parser middleware for parsing request bodies

// Importing the router object from the route.js file
const loginrouter = require('./routes/loginroute'); 
const router = require('./routes/route'); 
const industryrouter = require('./routes/industryrouter'); 
const studentrouter = require('./routes/studentroute'); 
const addressrouter = require('./routes/addressrouter');



// Create an instance of Express
const server = express();

// Configure middleware

// Parse JSON bodies
server.use(bodyParser.json());

// Parse URL-encoded bodies
server.use(bodyParser.urlencoded({ extended: false }));

// Enable CORS for all routes
server.use(cors());

// Use the router for handling incoming requests
server.use('/login',loginrouter);
server.use('/admin',router);
server.use('/industry',industryrouter);
server.use('/student',studentrouter);
server.use('/address', addressrouter);


// Start the server and listen on port 3001
server.listen(3001, (error) => {
    if (error) {
        console.log(error); // Log any errors that occur during server startup
    } else {
        console.log('server is running'); // Log a message indicating that the server is running successfully
    }
});
