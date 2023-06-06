const { Model, DataTypes} = require('sequelize');
const sequelize = require('../database');

class User extends Model {}

User.init({
    project_id: {
        type: DataTypes.INTEGER
    },
    access_token: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'user'
})

module.exports = User;