module.exports = (sequelize, DataTypes) => {
    const logs = sequelize.define('logs', {
        user: DataTypes.TEXT,
        userID: DataTypes.BIGINT,
        message: DataTypes.TEXT
    }, {
        timestamps: true
    });
    logs.associate = function(models) {
        // associations can be defined here
    };
    return logs;
};