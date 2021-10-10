'use strict';
module.exports = (sequelize, DataTypes) => {
  const infraction = sequelize.define('infraction', {
    user: DataTypes.STRING,
    userID: DataTypes.BIGINT,
    message: DataTypes.STRING,
    command: DataTypes.STRING
  }, {
    timestamps: true
  });
  infraction.associate = function(models) {
    // associations can be defined here
  };
  return infraction;
};
