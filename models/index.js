'use strict';

const Sequelize = require('sequelize');
const config = require('../config/config.json');
const path = require('path');
const basename = path.basename(__filename);
const sequelize = new Sequelize(config.production);
const fs = require('fs');
let db = [];

fs.readdirSync(__dirname)
    .filter(file => {
      return (file !== basename) && (file.endsWith('.js'));
    })
    .forEach(file => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model
    })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

sequelize.sync().then(() => {
  console.log('Database synced');
}).catch(console.error);