'use strict';
module.exports = (sequelize, DataTypes) => {
  const logs = sequelize.define('logs', {
      user: DataTypes.STRING,
      userID: DataTypes.BIGINT,
      message: DataTypes.STRING
  }, {
      timestamps: true
  });
  logs.associate = function(models) {
      // associations can be defined here
  };
  return logs;
};