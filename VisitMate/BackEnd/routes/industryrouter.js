const express = require('express');
const industryrouter = express.Router();

// Importing models

const { loginTable } = require('../models/login');
const { industryTable } = require('../models/industry');




//-------------------- REST API FOR INDUSTRY TABLE --------------------

// Read all industries
industryrouter.get('/get', async (req, res) => {
    try {
        const industries = await industryTable.findAll();
        res.json(industries);
    } catch (error) {
        console.error('Error fetching industries:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Read industry by ID
industryrouter.get('/:industryid', async (req, res) => {
    try {
        const industryid = req.params.industryid;
        const industry = await industryTable.findByPk(industryid);
        if (!industry) {
            return res.status(404).json({ error: 'Industry not found' });
        }
        res.json(industry);
    } catch (error) {
        console.error('Error fetching industry by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete industry
industryrouter.delete('/:industryid', async (req, res) => {
    try {
        const industryid = req.params.industryid;
        await industryTable.destroy({ where: { industryid } });
        res.json({ message: 'Industry deleted successfully' });
    } catch (error) {
        console.error('Error deleting industry:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create industry
industryrouter.post('/create', async (req, res) => {
    try {
        const { userid, username, company, status, CompanyInfo } = req.body;

        // Validate if the user exists in the login table before creating the industry record 
            const user = await loginTable.findOne({ where: { userid, username } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

        const industry = await industryTable.create({ userid, username, company, status, CompanyInfo });
        res.status(201).json({ message: 'Industry created successfully', industry });
    } catch (error) {  
        console.error('Error creating industry:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update industry
industryrouter.put('/:industryid', async (req, res) => {
    try {
        const industryid = req.params.industryid;
        const { userid, username, company, status, CompanyInfo } = req.body;

        // Validate if the user exists in the login table before updating the industry record
        const user = await loginTable.findOne({ where: { userid, username } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const updatedIndustry = await industryTable.update({ userid, username, company, status, CompanyInfo }, { where: { industryid } });
        res.json({ message: 'Industry updated successfully', updatedIndustry });
    } catch (error) {
        console.error('Error updating industry:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = industryrouter;
