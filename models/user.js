"use strict";
const { Model } = require("sequelize");
const whitelist = {
  'arul@gmail.com': true,
  'alfatioutama@gmail.com':true,
  'rulz.matrixs@gmail.com': true
}
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, { foreignKey: "UserId" });
      User.hasMany(models.Answer, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      status: DataTypes.STRING,
      nickname: {
        type: DataTypes.STRING,
        validate: {
          notEmpty:{
            msg: 'Nickname is required'
          }
        }
      },
      rating: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(user) {
          if (whitelist[user.email] == true) {
            user.status = "superuser";
          } else {
            user.status = "user";
          }
          if(!user.nickname){
            user.nickname = user.email.split('@')[0] 
          }  
        },
      },
    }
  );
  return User;
};
