const express = require('express');
const router = express.Router();

// Importing models
const { loginTable } = require('../models/login');
const { adminTable } = require('../models/Table');



//-------------------- REST API FOR ADMIN TABLE --------------------

// Create admin
router.post('/create', async (req, res) => {
    try {
        const { userid, username, name, emailID, Phno } = req.body;
        const admin = await adminTable.create({ userid, username, name, emailID, Phno });

        // Validate if the user exists in the login table before creating the admin record 
        const user = await loginTable.findOne({ where: { userid, username } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(201).json({ message: 'Admin created successfully', admin });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Read all admins
router.get('/get', async (req, res) => {
    try {
        const admins = await adminTable.findAll();
        res.json(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Read admin by ID
router.get('/:adminId', async (req, res) => {
    try {
        const adminId = req.params.adminId;
        const admin = await adminTable.findByPk(adminId);
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.json(admin);
    } catch (error) {
        console.error('Error fetching admin by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update admin
router.put('/:adminId', async (req, res) => {
    try {
        const adminId = req.params.adminId;
        const { userid, username, name, emailID, Phno } = req.body;
        const updatedAdmin = await adminTable.update({ userid, username, name, emailID, Phno }, { where: { adminId } });
        res.json({ message: 'Admin updated successfully', updatedAdmin });
    } catch (error) {
        console.error('Error updating admin:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete admin
router.delete('/:adminId', async (req, res) => {
    try {
        const adminId = req.params.adminId;
        await adminTable.destroy({ where: { adminId } });
        res.json({ message: 'Admin deleted successfully' });
    } catch (error) {
        console.error('Error deleting admin:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




module.exports = router;
