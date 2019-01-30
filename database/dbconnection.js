'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const db = {};

const sequelize = new Sequelize('null', 'null', 'null', {
  dialect: 'sqlite',

  // the storage engine for sqlite
  storage: './database/database.db'
});

fs
  .readdirSync('database/models/')
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = sequelize['import'](path.join('models/', file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    sequelize.sync();
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.sequelize.sync({force:true});

// Import Models such that I can use them in the api just by importing 'db'
db.blogPost = require('./models/BlogPosts')(sequelize, Sequelize);
db.member = require('./models/Member')(sequelize, Sequelize);
db.game = require('./models/Game')(sequelize, Sequelize);
db.adminLogin = require('./models/AdminLogin')(sequelize, Sequelize);

//Relationships
db.blogPost.belongsToMany(db.member, {
  through: 'BlogPost-Members'
});
db.blogPost.belongsTo(db.game);
db.game.hasMany(db.blogPost, {
  as: 'Posts',
  foreignKey: 'GameId'
});

db.datatypes = [db.adminLogin,
  db.blogPost,
  db.member,
  db.game
];

module.exports = db;