const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Channel = sequelize.define('Channel', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  channelId: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Channel;
