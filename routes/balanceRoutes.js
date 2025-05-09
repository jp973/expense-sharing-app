
const express = require('express');
const router = express.Router();
const { getGroupBalances } = require('../controllers/balanceController');
const auth = require('../middleware/auth');

router.get('/:groupId/balances', auth, getGroupBalances);

module.exports = router;
