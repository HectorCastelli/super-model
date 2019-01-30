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
db.globalVariable = require('./models/GlobalVariable')(sequelize, Sequelize);
db.blogPost = require('./models/BlogPosts')(sequelize, Sequelize);
db.socialNetwork = require('./models/SocialNetwork')(sequelize, Sequelize);
db.subscriber = require('./models/Subscriber')(sequelize, Sequelize);
db.member = require('./models/Member')(sequelize, Sequelize);
db.game = require('./models/Game')(sequelize, Sequelize);
db.gameCredits = require('./models/GameCredits')(sequelize, Sequelize);

//Relationships
db.blogPost.belongsToMany(db.member, {
  through: 'BlogPost-Members'
});
db.blogPost.belongsTo(db.game);
db.game.hasMany(db.blogPost, {
  as: 'Posts',
  foreignKey: 'GameId'
});

db.gameCredits.belongsTo(db.member);
db.gameCredits.belongsTo(db.game);
db.game.hasMany(db.gameCredits, {
  as: 'Credits',
  foreignKey: 'GameId'
});
db.member.hasMany(db.gameCredits, {
  as: 'Member',
  foreignKey: 'MemberId'
});

db.datatypes = [
  db.globalVariable,
  db.blogPost,
  db.socialNetwork,
  db.subscriber,
  db.member,
  db.game,
  db.gameCredits
];

module.exports = db;