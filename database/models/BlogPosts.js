module.exports = (sequelize, DataTypes) => {
  return sequelize.define("BlogPost", {
    permalink: {type: DataTypes.STRING, defaultValue: 'String'},
    title: {type: DataTypes.TEXT, defaultValue: 'Text'},
    picture: {type: DataTypes.STRING, defaultValue: 'Picture'},
    description: {type: DataTypes.TEXT, defaultValue: 'Text'},
    content: {type: DataTypes.TEXT, defaultValue: 'Markdown'},
    published: {type: DataTypes.BOOLEAN, defaultValue: 'Boolean'}
  })
}