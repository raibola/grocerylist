module.exports = {
    init(app){
      const staticRoutes = require("../routes/static");
      const groceryRoutes = require("../routes/grocery");
      const productRoutes = require("../routes/products");
      const userRoutes = require("../routes/users");
      
      app.use(staticRoutes);
      app.use(groceryRoutes);
      app.use(productRoutes);
      app.use(userRoutes);
    }
  }