const mongoose = require('mongoose');

const balanceSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  user2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true }, // Positive means user1 owes user2
});

balanceSchema.index({ groupId: 1, user1: 1, user2: 1 }, { unique: true });

module.exports = mongoose.model('Balance', balanceSchema);
