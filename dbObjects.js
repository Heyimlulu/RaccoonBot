const Sequelize = require('sequelize');
const config = require('./config.json');
//const fs = require('fs');

const sequelize = new Sequelize(config.production);

const Donator = require('./models/donator')(sequelize, Sequelize.DataTypes);
const Logs = require('./models/logs')(sequelize, Sequelize.DataTypes);
const userBlacklist = require('./models/userBlacklist')(sequelize, Sequelize.DataTypes);
const guildBlacklist = require('./models/guildBlacklist')(sequelize, Sequelize.DataTypes);

module.exports = { Donator, Logs, userBlacklist, guildBlacklist };