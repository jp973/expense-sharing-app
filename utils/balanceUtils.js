const Balance = require('../models/Balance');

const Settlement = require('../models/Settlement');

async function recordSettlement(groupId, payerId, payeeId, amount) {
  // Save the settlement
  await Settlement.create({ groupId, payerId, payeeId, amount });

  const [user1, user2] = payerId < payeeId ? [payerId, payeeId] : [payeeId, payerId];
  const delta = payerId < payeeId ? -amount : amount;

  const balance = await Balance.findOne({ groupId, user1, user2 });

  if (balance) {
    balance.amount += delta;
    await balance.save();
  } else {
    await Balance.create({ groupId, user1, user2, amount: delta });
  }
}



async function updateBalances(groupId, payerId, participantIds, share) {
  for (let participantId of participantIds) {
    if (participantId === payerId) continue;

    const [user1, user2] = payerId < participantId
      ? [payerId, participantId]
      : [participantId, payerId];

    const amount = payerId < participantId ? share : -share;

    const existing = await Balance.findOne({ groupId, user1, user2 });
    if (existing) {
      existing.amount += amount;
      await existing.save();
    } else {
      await Balance.create({ groupId, user1, user2, amount });
    }
  }
}

async function getGroupBalances(groupId) {
  return Balance.find({ groupId }).populate('user1 user2', 'email');
}

module.exports = { updateBalances, getGroupBalances ,recordSettlement};
