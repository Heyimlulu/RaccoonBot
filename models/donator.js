'use strict';
module.exports = (sequelize, DataTypes) => {
  const donator = sequelize.define('donator', {
      userID: DataTypes.BIGINT,
      donation: DataTypes.STRING
  }, {
      timestamps: false
  });
  donator.associate = function(models) {
      // associations can be defined here
  };
  return donator;
};