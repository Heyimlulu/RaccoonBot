module.exports = (sequelize, DataTypes) => {
    const donator = sequelize.define('donator', {
        userID: DataTypes.BIGINT,
        donation: DataTypes.TEXT
    }, {
        timestamps: false
    });
    donator.associate = function(models) {
        // associations can be defined here
    };
    return donator;
};