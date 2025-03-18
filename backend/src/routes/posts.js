const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { User, Post, Comment, Like } = require('../models');
const { authenticate } = require('../middleware/auth');
const { sequelize } = require('../models');

/**
 * @route POST /api/posts
 * @desc Create a new post
 * @access Private
 */
router.post('/', authenticate, async (req, res) => {
  try {
    const { content, latitude, longitude, locationName, locationPrivacy } = req.body;

    // Validate input
    if (!content || !latitude || !longitude) {
      return res.status(400).json({ error: 'Content and location are required' });
    }

    // Create post with location as a PostGIS point
    const post = await Post.create({
      userId: req.user.id,
      content,
      location: sequelize.fn('ST_SetSRID', sequelize.fn('ST_MakePoint', longitude, latitude), 4326),
      originalLocation: sequelize.fn('ST_SetSRID', sequelize.fn('ST_MakePoint', longitude, latitude), 4326),
      locationName,
      locationPrivacy: locationPrivacy || req.user.locationPrivacy,
    });

    // Fetch the created post with user data
    const newPost = await Post.findByPk(post.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'avatar'],
        },
      ],
    });

    res.status(201).json({ post: newPost });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route GET /api/posts
 * @desc Get posts near a location
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const { latitude, longitude, radius = 5000 } = req.query; // radius in meters

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Location is required' });
    }

    // Use PostGIS to find posts within radius
    const posts = await Post.findAll({
      where: {
        isActive: true,
        // Find posts within radius using ST_DWithin
        [Op.and]: [
          sequelize.where(
            sequelize.fn(
              'ST_DWithin',
              sequelize.col('location'),
              sequelize.fn('ST_SetSRID', sequelize.fn('ST_MakePoint', longitude, latitude), 4326),
              radius
            ),
            true
          ),
        ],
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'avatar'],
        },
      ],
      order: [['createdAt', 'DESC']],
      limit: 50,
    });

    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route GET /api/posts/:id
 * @desc Get a post by ID
 * @access Public
 */
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id, isActive: true },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'avatar'],
        },
        {
          model: Comment,
          as: 'comments',
          where: { isActive: true },
          required: false,
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name', 'avatar'],
            },
          ],
        },
      ],
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Increment view count
    post.viewCount += 1;
    await post.save();

    // Get like count
    const likeCount = await Like.count({
      where: { postId: post.id },
    });

    res.json({
      post,
      likeCount,
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route DELETE /api/posts/:id
 * @desc Delete a post
 * @access Private
 */
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found or not authorized' });
    }

    // Soft delete
    post.isActive = false;
    await post.save();

    res.json({ success: true, message: 'Post deleted' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route POST /api/posts/:id/like
 * @desc Like a post
 * @access Private
 */
router.post('/:id/like', authenticate, async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id, isActive: true },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if already liked
    const existingLike = await Like.findOne({
      where: { postId: post.id, userId: req.user.id },
    });

    if (existingLike) {
      return res.status(400).json({ error: 'Post already liked' });
    }

    // Create like
    await Like.create({
      postId: post.id,
      userId: req.user.id,
    });

    // Get updated like count
    const likeCount = await Like.count({
      where: { postId: post.id },
    });

    res.json({ success: true, likeCount });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route DELETE /api/posts/:id/like
 * @desc Unlike a post
 * @access Private
 */
router.delete('/:id/like', authenticate, async (req, res) => {
  try {
    const like = await Like.findOne({
      where: { postId: req.params.id, userId: req.user.id },
    });

    if (!like) {
      return res.status(404).json({ error: 'Like not found' });
    }

    // Delete like
    await like.destroy();

    // Get updated like count
    const likeCount = await Like.count({
      where: { postId: req.params.id },
    });

    res.json({ success: true, likeCount });
  } catch (error) {
    console.error('Unlike post error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route POST /api/posts/:id/comment
 * @desc Comment on a post
 * @access Private
 */
router.post('/:id/comment', authenticate, async (req, res) => {
  try {
    const { content, latitude, longitude, locationName } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const post = await Post.findOne({
      where: { id: req.params.id, isActive: true },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Create comment
    const comment = await Comment.create({
      postId: post.id,
      userId: req.user.id,
      content,
      location: latitude && longitude
        ? sequelize.fn('ST_SetSRID', sequelize.fn('ST_MakePoint', longitude, latitude), 4326)
        : null,
      locationName,
    });

    // Get comment with user data
    const newComment = await Comment.findByPk(comment.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'avatar'],
        },
      ],
    });

    res.status(201).json({ comment: newComment });
  } catch (error) {
    console.error('Comment post error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
