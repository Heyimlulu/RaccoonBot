'use strict';
module.exports = (sequelize, DataTypes) => {
  const leaderboard = sequelize.define('leaderboard', {
    userID: DataTypes.BIGINT,
    try: DataTypes.INTEGER,
    difficulty: DataTypes.STRING
  }, {
    timestamps: false
  });
  leaderboard.associate = function(models) {
    // associations can be defined here
  };
  return leaderboard;
};
