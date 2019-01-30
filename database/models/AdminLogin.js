module.exports = (sequelize, DataTypes) => {
  return sequelize.define("AdminLogin", {
    email: {type: DataTypes.TEXT, defaultValue: 'Text'},
    password: {type: DataTypes.TEXT, defaultValue: 'Password'}
  })
}