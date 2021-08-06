const Sequelize = require('sequelize');
const config = require('./config.json');

const sequelize = new Sequelize(config.production);

require('./models/donator')(sequelize, Sequelize.DataTypes);
require('./models/logs')(sequelize, Sequelize.DataTypes);
require('./models/userBlacklist')(sequelize, Sequelize.DataTypes);
require('./models/guildBlacklist')(sequelize, Sequelize.DataTypes);

sequelize.sync().then(() => {
    console.log('Database synced');
    sequelize.close();
}).catch(console.error);