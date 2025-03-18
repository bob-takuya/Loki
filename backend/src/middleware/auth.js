const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 * Authentication middleware
 * Verifies JWT token and adds user to request
 */
const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-jwt-secret');
    
    // Check if user exists and is active
    const user = await User.findOne({
      where: { id: decoded.id, isActive: true },
      attributes: ['id', 'name', 'email', 'role', 'locationPrivacy'],
    });
    
    if (!user) {
      return res.status(401).json({ error: 'User not found or inactive' });
    }
    
    // Add user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Admin authorization middleware
 * Checks if user has admin role
 */
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied, admin privileges required' });
  }
};

module.exports = {
  authenticate,
  authorizeAdmin,
};
