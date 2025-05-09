
const express = require('express');
const router = express.Router();
const { getUserSettlements } = require('../controllers/settlementController');
const auth = require('../middleware/auth');

router.get('/users/:userId/settlements', auth, getUserSettlements);

module.exports = router;
