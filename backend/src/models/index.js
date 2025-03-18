const { Sequelize } = require('sequelize');

// Initialize Sequelize with PostgreSQL
const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://postgres:postgres@db:5432/loki',
  {
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    dialectOptions: {
      ssl: process.env.NODE_ENV === 'production' ? {
        require: true,
        rejectUnauthorized: false
      } : false
    }
  }
);

// Import models
const User = require('./user')(sequelize);
const Post = require('./post')(sequelize);
const Comment = require('./comment')(sequelize);
const Like = require('./like')(sequelize);

// Define associations
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

User.hasMany(Like, { foreignKey: 'userId', as: 'likes' });
Like.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Post.hasMany(Like, { foreignKey: 'postId', as: 'likes' });
Like.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

// Export models and Sequelize instance
module.exports = {
  sequelize,
  User,
  Post,
  Comment,
  Like
};
