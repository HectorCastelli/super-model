module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Subscriber", {
    email: {type: DataTypes.TEXT, defaultValue: 'Text'}
  })
}