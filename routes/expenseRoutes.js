const express = require('express');
const { db } = require('../firebase');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection('expenses').where('userId', '==', req.user.userId).get();
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { amount, category, description, date } = req.body;
        const newExpense = { userId: req.user.userId, amount, category, description, date, createdAt: new Date().toISOString() };
        const docRef = await db.collection('expenses').add(newExpense);
        res.status(201).json({ id: docRef.id, ...newExpense });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { amount, category, description, date } = req.body;
        await db.collection('expenses').doc(req.params.id).update({ amount, category, description, date });
        res.json({ message: 'Updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await db.collection('expenses').doc(req.params.id).delete();
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
