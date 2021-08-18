'use strict';
module.exports = (sequelize, DataTypes) => {
  const userBlacklist = sequelize.define('userBlacklist', {
      userID: DataTypes.BIGINT,
      reason: DataTypes.STRING
  }, {
      timestamps: false
  });
  userBlacklist.associate = function(models) {
      // associations can be defined here
  };
  return userBlacklist;
};