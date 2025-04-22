const express = require('express');
const studentrouter = express.Router();

const { loginTable } = require('../models/login');
const { studentTable } = require('../models/student');

//-------------------- REST API FOR STUDENT TABLE --------------------

// Read all students
studentrouter.get('/get', async (req, res) => {
    try {
        const students = await studentTable.findAll();
        res.json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Read a student by ID
studentrouter.get('/:studentid', async (req, res) => {
    try {
        const studentid = req.params.studentid;
        const student = await studentTable.findByPk(studentid);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        console.error('Error fetching student by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a student
studentrouter.delete('/:studentid', async (req, res) => {
    try {
        const studentid = req.params.studentid;
        const deletedCount = await studentTable.destroy({ where: { studentid } });
        
        if (deletedCount === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create student
studentrouter.post('/create', async (req, res) => {
    try {
        const { userid, username, name, gender, email, Phno, address, department, status } = req.body;

        // Validate if the user exists in the login table before creating the student record
        const user = await loginTable.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create student record
        const student = await studentTable.create({
            userid, username, name, gender, email, Phno, address, department, status
        });

        res.status(201).json({ message: 'Student created successfully', student });
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update student
studentrouter.put('/:studentid', async (req, res) => {
    try {
        const studentid = req.params.studentid;
        const { userid, username, name, gender, email, Phno, address, department, industryid, status, industryinfo } = req.body;

        const [affectedRows] = await studentTable.update(
            { userid, username, name, gender, email, Phno, address, department, industryid, status, industryinfo },
            { where: { studentid } }
        );

        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Fetch and return updated student
        const updatedStudent = await studentTable.findByPk(studentid);
        res.json({ message: 'Student updated successfully', updatedStudent });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = studentrouter;
