module.exports = {
    init(app){
      const staticRoutes = require("../routes/static");
      const groceryRoutes = require("../routes/grocery");
      const productRoutes = require("../routes/products");

      app.use(staticRoutes);
      app.use(groceryRoutes);
      app.use(productRoutes);
    }
  }