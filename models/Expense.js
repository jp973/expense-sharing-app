const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  payerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  sharePerUser: {
    type: Map,
    of: Number, // each participant's share
    required: true,
  },
});

module.exports = mongoose.model('Expense', expenseSchema);
