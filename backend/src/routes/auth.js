const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Initialize Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * @route POST /api/auth/google
 * @desc Authenticate with Google
 * @access Public
 */
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Find or create user
    let user = await User.findOne({ where: { googleId } });

    if (!user) {
      // Check if email already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        // Link Google account to existing user
        existingUser.googleId = googleId;
        existingUser.avatar = existingUser.avatar || picture;
        await existingUser.save();
        user = existingUser;
      } else {
        // Create new user
        user = await User.create({
          googleId,
          email,
          name,
          avatar: picture,
        });
      }
    }

    // Update last login
    user.lastLoginAt = new Date();
    await user.save();

    // Generate JWT token
    const jwtToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'your-jwt-secret',
      { expiresIn: '7d' }
    );

    res.json({
      token: jwtToken,
      user: user.toJSON(),
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
});

/**
 * @route GET /api/auth/me
 * @desc Get current user
 * @access Private
 */
router.get('/me', async (req, res) => {
  try {
    // This route will be protected by auth middleware
    // which will add user to req object
    const user = await User.findByPk(req.user.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ user: user.toJSON() });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route POST /api/auth/logout
 * @desc Logout user
 * @access Public
 */
router.post('/logout', (req, res) => {
  // JWT is stateless, so we just return success
  // Client should remove the token
  res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;
