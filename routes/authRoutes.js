const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../firebase');
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        let { email, password, displayName } = req.body;
        email = email.trim().toLowerCase();

        const userRef = db.collection('users').doc(email);
        const doc = await userRef.get();

        if (doc.exists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await userRef.set({
            email,
            password: hashedPassword,
            displayName,
            createdAt: new Date().toISOString()
        });

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.trim().toLowerCase();

        const userRef = db.collection('users').doc(email);
        const doc = await userRef.get();

        if (!doc.exists) {
            return res.status(400).json({ error: 'User not found' });
        }

        const user = doc.data();
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ userId: email }, process.env.JWT_SECRET || 'your_fallback_secret', { expiresIn: '24h' });
        res.json({ token, user: { email: user.email, displayName: user.displayName } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
