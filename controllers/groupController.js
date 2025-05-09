const Group = require('../models/Group');
const GroupMember = require('../models/GroupMember');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const generateInviteToken = require('../utils/generateToken');

// POST /api/groups
exports.createGroup = async (req, res) => {
  try {
    const group = new Group({
      name: req.body.name,
      ownerId: req.user.id
    });
    await group.save();

    await new GroupMember({ groupId: group._id, userId: req.user.id }).save();

    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/groups/:groupId/invite
exports.inviteUser = async (req, res) => {
  const { email } = req.body;
  const { groupId } = req.params;

  try {
    const token = generateInviteToken({ email, groupId });
    const inviteLink = `http://localhost:5000/api/groups/${groupId}/join?token=${token}`;

    // Placeholder for sending email
    console.log(`Send invite to ${email}: ${inviteLink}`);

    res.json({ message: 'Invitation link generated', inviteLink });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/groups/:groupId/join
exports.joinGroup = async (req, res) => {
  const token = req.query.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.email !== req.user.email || decoded.groupId !== req.params.groupId) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const alreadyMember = await GroupMember.findOne({
      groupId: decoded.groupId,
      userId: req.user.id
    });

    if (alreadyMember) return res.status(400).json({ error: 'Already a member' });

    await new GroupMember({ groupId: decoded.groupId, userId: req.user.id }).save();
    res.json({ message: 'Joined group successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid or expired token' });
  }
};

// GET /api/users/:userId/groups
exports.getUserGroups = async (req, res) => {
  try {
    const memberships = await GroupMember.find({ userId: req.params.userId }).populate('groupId');
    const groups = memberships.map(m => m.groupId);
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
