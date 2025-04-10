const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Profile = sequelize.define('Profile', {
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 50],
    },
  },
  bio: {
    type: DataTypes.TEXT,
  },
  profile_picture: {
    type: DataTypes.STRING,
    defaultValue: "https://www.gravatar.com/avatar/placeholder.png",
  },
  location: {
    type: DataTypes.STRING,
  },
  website: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true,
    },
  },
}, {
  tableName: 'user_profiles',
  timestamps: true,
});

module.exports = Profile;
