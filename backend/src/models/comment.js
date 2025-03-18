const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Comment = sequelize.define('Comment', {
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 280], // Max 280 characters
      },
    },
    // Optional location data for comments
    location: {
      type: DataTypes.GEOMETRY('POINT', 4326),
      allowNull: true,
    },
    locationName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Status
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    tableName: 'comments',
    timestamps: true,
    indexes: [
      // Index for post's comments
      {
        fields: ['postId'],
      },
      // Index for user's comments
      {
        fields: ['userId'],
      },
    ],
  });

  return Comment;
};
