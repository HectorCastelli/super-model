module.exports = (sequelize, DataTypes) => {
  return sequelize.define("SocialNetwork", {
    name: {type: DataTypes.TEXT, defaultValue: 'Text'},
    link: {type: DataTypes.TEXT, defaultValue: 'Text'},
    icon: {type: DataTypes.TEXT, defaultValue: 'Text'}
  })
}