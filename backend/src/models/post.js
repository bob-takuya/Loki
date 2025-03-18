const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Post = sequelize.define('Post', {
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 280], // Max 280 characters like Twitter
      },
    },
    // Using PostGIS for location data
    location: {
      type: DataTypes.GEOMETRY('POINT', 4326), // SRID 4326 is for WGS84 (GPS)
      allowNull: false,
    },
    // Store the original location for privacy adjustments
    originalLocation: {
      type: DataTypes.GEOMETRY('POINT', 4326),
      allowNull: false,
    },
    // Store the location name for display
    locationName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Privacy level for this specific post
    locationPrivacy: {
      type: DataTypes.ENUM('precise', 'approximate', 'city'),
      defaultValue: 'approximate',
      allowNull: false,
    },
    // Metadata
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    // Expiration date (30 days from creation)
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
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
    tableName: 'posts',
    timestamps: true,
    hooks: {
      beforeCreate: (post) => {
        // Set expiration date to 30 days from now
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);
        post.expiresAt = expirationDate;
      },
    },
    indexes: [
      // Spatial index for location queries
      {
        fields: ['location'],
        using: 'GIST',
      },
      // Index for user's posts
      {
        fields: ['userId'],
      },
      // Index for expiration date
      {
        fields: ['expiresAt'],
      },
    ],
  });

  return Post;
};
