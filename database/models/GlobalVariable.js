module.exports = (sequelize, DataTypes) => {
  return sequelize.define("GlobalVariable", {
    key: {type: DataTypes.STRING, defaultValue: 'String'},
    value: {type: DataTypes.TEXT, defaultValue: 'Text'}
  })
}