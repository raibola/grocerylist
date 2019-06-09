const Grocery = require("./models").Grocery;

module.exports = {

//#1
  getAllGroceries(callback){
    return Grocery.all()

//#2
    .then((groceries) => {
      callback(null, groceries);
    })
    .catch((err) => {
      callback(err);
    })
  },
  addGroceryList(newGrocery, callback){
    return Grocery.create({
      title: newGrocery.title,
    })
    .then((grocery) => {
      callback(null, grocery);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getGroceryList(id, callback){
    return Grocery.findById(id)
    .then((grocery) => {
      callback(null, grocery);
    })
    .catch((err) => {
      callback(err);
    })
  },
  deleteGroceryList(id, callback){
    return Grocery.destroy({
      where: {id}
    })
    .then((grocery) => {
      callback(null, grocery);
    })
    .catch((err) => {
      callback(err);
    })
  },
  updateGroceryList(id, updatedGrocery, callback){
    return Grocery.findById(id)
    .then((grocery) => {
      if(!grocery){
        return callback("Grocery list not found");
      }

//#1
      grocery.update(updatedGrocery, {
        fields: Object.keys(updatedGrocery)
      })
      .then(() => {
        callback(null, grocery);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }
}