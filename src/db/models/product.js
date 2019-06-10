'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },    
    purchased: {
      type: DataTypes.BOOLEAN
    },
    groceryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Product.associate = function(models) {
    Product.belongsTo(models.Grocery, {
      foreignKey: "groceryId",
      onDelete: "CASCADE"
    });
  };
  return Product;
};