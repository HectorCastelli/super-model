module.exports = (sequelize, DataTypes) => {
  return sequelize.define("GameCredits", {
    role: {type: DataTypes.TEXT, defaultValue: 'Text'}
  })
}