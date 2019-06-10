'use strict';
module.exports = (sequelize, DataTypes) => {
  var Grocery = sequelize.define('Grocery', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  Grocery.associate = function(models) {
    Grocery.hasMany(models.Product, {
      foreignKey: "groceryId",
      as: "products"
    });
  };
  return Grocery;
};