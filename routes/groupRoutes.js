const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const authMiddleware = require('../middleware/auth');

// Protect all routes
router.use(authMiddleware);

// Group routes
router.post('/', groupController.createGroup);
router.post('/:groupId/invite', groupController.inviteUser);
router.post('/:groupId/join', groupController.joinGroup);
router.get('/user/:userId', groupController.getUserGroups);

module.exports = router;
