const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Like = sequelize.define('Like', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'likes',
    timestamps: true,
    indexes: [
      // Composite unique index to prevent duplicate likes
      {
        unique: true,
        fields: ['userId', 'postId'],
      },
      // Index for post's likes
      {
        fields: ['postId'],
      },
      // Index for user's likes
      {
        fields: ['userId'],
      },
    ],
  });

  return Like;
};
