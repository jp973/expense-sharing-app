const jwt = require('jsonwebtoken');

const generateInviteToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

module.exports = generateInviteToken;
