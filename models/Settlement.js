const mongoose = require('mongoose');
const express = require('express');
const router = express.Router({ mergeParams: true });
const { authMiddleware } = require('../middleware/authMiddleware');
const { recordSettlement } = require('../utils/balanceUtils');
const Settlement = require('../models/Settlement');

const settlementSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  payerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  payeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});




router.post('/', authMiddleware, async (req, res) => {
  const { payerId, payeeId, amount } = req.body;

  try {
    await recordSettlement(req.params.groupId, payerId, payeeId, amount);
    res.status(201).json({ message: 'Settlement recorded' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record settlement' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const settlements = await Settlement.find({ groupId: req.params.groupId }).populate('payerId payeeId', 'email');
    res.json(settlements);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch settlements' });
  }
});

module.exports = router;

module.exports = mongoose.model('Settlement', settlementSchema);
