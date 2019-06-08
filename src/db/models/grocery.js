'use strict';
module.exports = (sequelize, DataTypes) => {
  var Grocery = sequelize.define('Grocery', {
    title: DataTypes.STRING
  }, {});
  Grocery.associate = function(models) {
    // associations can be defined here
  };
  return Grocery;
};