module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Game", {
        permalink: {type: DataTypes.STRING, defaultValue: 'String'},
        name: {type: DataTypes.STRING, defaultValue: 'String'},
        picture: {type: DataTypes.STRING, defaultValue: 'Picture'},
        description: {type: DataTypes.TEXT, defaultValue: 'Text'},
        content: {type: DataTypes.TEXT, defaultValue: 'Markdown'},
        active: {type: DataTypes.BOOLEAN, defaultValue: 'Boolean'}
    })
}