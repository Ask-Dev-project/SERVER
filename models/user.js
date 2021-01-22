'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {foreignKey: 'UserId'})
      User.hasMany(models.Answer, {foreignKey: 'UserId'})
    }
  };
  User.init({
    email: DataTypes.STRING,
    status: DataTypes.STRING,
    nickname: DataTypes.STRING,
    rating: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};