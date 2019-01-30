module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Member", {
    name: {type: DataTypes.STRING, defaultValue: 'String'},
    bio: {type: DataTypes.TEXT, defaultValue: 'Text'},
    role: {type: DataTypes.STRING, defaultValue: 'String'},
    picture: {type: DataTypes.STRING, defaultValue: 'Picture'},
    email: {type: DataTypes.STRING, defaultValue: 'String'},
    website: {type: DataTypes.STRING, defaultValue: 'String'},
    main: {type: DataTypes.BOOLEAN, defaultValue: 'Boolean'},
    active: {type: DataTypes.BOOLEAN, defaultValue: 'Boolean'}
  })
}
