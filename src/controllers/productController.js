const productQueries = require("../db/queries.products.js");

module.exports = {
    new(req, res, next){
        res.render("products/new", {groceryId: req.params.groceryId});
      },
    create(req, res, next){
        let newProduct= {
          title: req.body.title,
          purchased: req.body.purchased,
          groceryId: req.params.groceryId
        };
        productQueries.addProduct(newProduct, (err, product) => {
          if(err){
            res.redirect(500, "/products/new");
            console.log(err);
          } else {
            res.redirect(303, `/grocery/${newProduct.groceryId}/products/${product.id}`);
          }
        });
      },
    show(req, res, next){
        productQueries.getProduct(req.params.id, (err, product) => {
          if(err || product == null){
            res.redirect(404, "/");
          } else {
            res.render("products/show", {product});
          }
        });
      },
    destroy(req, res, next){
        productQueries.deleteProduct(req.params.id, (err, deletedRecordsCount) => {
          if(err){
            res.redirect(500, `/grocery/${req.params.groceryId}/products/${req.params.id}`)
          } else {
            res.redirect(303, `/grocery/${req.params.groceryId}`)
          }
        });
      },
    edit(req, res, next){
        productQueries.getProduct(req.params.id, (err, product) => {
          if(err || product == null){
            res.redirect(404, "/");
          } else {
            res.render("products/edit", {product});
          }
        });
      },
    update(req, res, next){
      console.log(req.body)
        productQueries.updateProduct(req.params.id, req.body, (err, product) => {
          if(err || product == null){
            res.redirect(404, `/grocery/${req.params.groceryId}/products/${req.params.id}/edit`);
          } else {
            res.redirect(`/grocery/${req.params.groceryId}/products/${req.params.id}`);
          }
        });
      }
}
