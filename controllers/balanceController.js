
const Balance = require('../models/Balance');

exports.getGroupBalances = async (req, res) => {
  try {
    const balances = await Balance.find({ groupId: req.params.groupId });
    res.json(balances);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch balances' });
  }
};
