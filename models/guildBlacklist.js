'use strict';
module.exports = (sequelize, DataTypes) => {
  const guildBlacklist = sequelize.define('guildBlacklist', {
      guildID: DataTypes.BIGINT,
      reason: DataTypes.STRING
  }, {
      timestamps: false
  });
  guildBlacklist.associate = function(models) {
      // associations can be defined here
  };
  return guildBlacklist;
};