const express = require('express');
const loginrouter = express.Router();

// Importing models

const { loginTable } = require('../models/login');
const { adminTable } = require('../models/Table');
const { industryTable } = require('../models/industry');
const { studentTable } = require('../models/student');

//-------------------- REST API FOR LOGIN TABLE --------------------

// Read all logins
loginrouter.get('/get', async (req, res) => {
    try {
        const logindata = await loginTable.findAll();
        res.json(logindata);
    } catch (error) {
        console.error('Error fetching login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Read login by ID
loginrouter.get('/:userid', async (req, res) => {
    try {
        const userid = req.params.userid;
        const login = await loginTable.findByPk(userid);
        if (!login) {
            return res.status(404).json({ error: 'Login not found' });
        }
        res.json(login);
    } catch (error) {
        console.error('Error fetching admin by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete user and related records from all tables
loginrouter.delete('/:userid', async (req, res) => {
    try {
        const userid = req.params.userid;
        
        // Delete related records in other tables
        await adminTable.destroy({ where: { userid } });
        await studentTable.destroy({ where: { userid } });
        await industryTable.destroy({ where: { userid } });

        // Delete user from the login table
        await loginTable.destroy({ where: { userid } });

        res.json({ message: 'User and related records deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new login
loginrouter.post('/create', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const newLogin = await loginTable.create({ username, password, role });
        res.json({ message: 'Login created successfully', data: newLogin });
    } catch (error) {
        console.error('Error creating login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a login by ID
loginrouter.put('/:userid', async (req, res) => {
    try {
        const userid = req.params.userid;
        const { username, password, role } = req.body;
        const login = await loginTable.findByPk(userid);
        if (!login) {
            res.status(404).json({ error: 'Login not found' });
        } else {
            await login.update({ username, password, role });
            res.json({ message: 'Login updated successfully' });
        }
    } catch (error) {
        console.error('Error updating login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// user validate 
loginrouter.post('/validate', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Assuming you have a Sequelize model method like 'findOne' to find a user by username
        const user = await loginTable.findOne({ where: { username } });

        // Check if the user exists and the password matches
        if (user && user.password === password) {
            // Fetch additional user data based on the role
            let userData = {};

            switch (user.role) {
                case 'student':
                    userData = await studentTable.findOne({ where: { userid: user.userid } });
                    break;
                case 'admin':
                    userData = await adminTable.findOne({ where: { userid: user.userid } });
                    break;
                case 'industrialowner':
                    userData = await industryTable.findOne({ where: { userid: user.userid } });
                    break;
            }
            const userRole=user.role;
            // You might want to generate a token or use a session for authentication
            res.json({ message: 'Login successful',  data: { userData, userRole }});
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = loginrouter;