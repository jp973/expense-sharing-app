const Expense = require('../models/Expense');

exports.createExpense = async (req, res) => {
  try {
    const { title, amount, payerId, participants } = req.body;
    const { groupId } = req.params;

    if (!title || !amount || !payerId || !participants || participants.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Auto calculate share
    const share = (amount / participants.length).toFixed(2);
    const sharePerUser = {};
    participants.forEach(userId => {
      sharePerUser[userId] = parseFloat(share);
    });

    const expense = await Expense.create({
      groupId,
      title,
      amount,
      payerId,
      participants,
      sharePerUser
    });

    res.status(201).json({ message: 'Expense recorded', expense });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGroupExpenses = async (req, res) => {
  try {
    const { groupId } = req.params;
    const expenses = await Expense.find({ groupId }).populate('payerId', 'email').populate('participants', 'email');
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getExpensesByGroup = async (req, res) => {
    try {
      const expenses = await Expense.find({ groupId: req.params.groupId }).populate('payerId participants', 'email');
      res.json(expenses);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch expenses' });
    }
  };