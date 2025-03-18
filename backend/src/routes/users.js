const express = require('express');
const router = express.Router();
const { User, Post, Comment, Like } = require('../models');
const { authenticate } = require('../middleware/auth');

/**
 * @route GET /api/users/profile/:id
 * @desc Get user profile
 * @access Public
 */
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'name', 'avatar', 'bio', 'createdAt'],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get post count
    const postCount = await Post.count({
      where: { userId: user.id, isActive: true },
    });

    res.json({
      user: user.toJSON(),
      postCount,
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route PUT /api/users/profile
 * @desc Update user profile
 * @access Private
 */
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { name, bio, locationPrivacy } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update fields
    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (locationPrivacy) user.locationPrivacy = locationPrivacy;

    await user.save();

    res.json({ user: user.toJSON() });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route GET /api/users/posts/:id
 * @desc Get user's posts
 * @access Public
 */
router.get('/posts/:id', async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { userId: req.params.id, isActive: true },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'avatar'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({ posts });
  } catch (error) {
    console.error('Get user posts error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route DELETE /api/users/account
 * @desc Delete user account
 * @access Private
 */
router.delete('/account', authenticate, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Soft delete user
    user.isActive = false;
    await user.save();

    res.json({ success: true, message: 'Account deactivated' });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
