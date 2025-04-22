const express = require('express');
const addressrouter = express.Router();
const { Address } = require('../models/address');

// Create address
addressrouter.post('/create', async (req, res) => {
    try {
        const { street, city, state, postal_code, country, industryid } = req.body;

        const address = await Address.create({ industryid, street, city, state, postal_code, country });
        res.status(201).json({ message: 'Address created successfully', address });
    } catch (error) {
        console.error('Error creating address:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});  

// Read all addresses for an industry
addressrouter.get('/get', async (req, res) => {
    try {
        const industryid = req.params.industryid;
        const addresses = await Address.findAll({ where: { industryid } });
        res.json(addresses);
    } catch (error) {
        console.error('Error fetching addresses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Read a specific address
addressrouter.get('/:addressid', async (req, res) => {
    try {
        const industryid = req.params.industryid;
        const addressid = req.params.addressid;

        const address = await Address.findOne({ where: { industryid, addressid } });
        if (!address) {
            return res.status(404).json({ error: 'Address not found' });
        }

        res.json(address);
    } catch (error) {
        console.error('Error fetching address:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update address
addressrouter.put('/update', async (req, res) => {
    try {
        const industryid = req.params.industryid;
        const addressid = req.params.addressid;
        const { street, city, state, postal_code, country } = req.body;

        const address = await Address.findOne({ where: { industryid, addressid } });
        if (!address) {
            return res.status(404).json({ error: 'Address not found' });
        }

        await address.update({ street, city, state, postal_code, country });
        res.json({ message: 'Address updated successfully', updatedAddress: address });
    } catch (error) {
        console.error('Error updating address:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete address
addressrouter.delete('/delete', async (req, res) => {
    try {
        const industryid = req.params.industryid;
        const addressid = req.params.addressid;

        const address = await Address.findOne({ where: { industryid, addressid } });
        if (!address) {
            return res.status(404).json({ error: 'Address not found' });
        }

        await address.destroy();
        res.json({ message: 'Address deleted successfully' });
    } catch (error) {
        console.error('Error deleting address:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = addressrouter;
