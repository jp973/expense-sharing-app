const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getExpensesByGroup } = require('../controllers/expenseController');
const expenseController = require('../controllers/expenseController');

router.post('/:groupId/expenses', auth, expenseController.createExpense);
router.get('/:groupId/expenses', auth, expenseController.getGroupExpenses);
router.get('/:groupId/expenses', auth, getExpensesByGroup);

module.exports = router;
