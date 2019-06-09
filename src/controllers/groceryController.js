const groceryQueries = require("../db/queries.grocery.js");


module.exports = {
    index(req, res, next){
        groceryQueries.getAllGroceries((err, groceries) => {
                    if(err){
                      res.redirect(500, "static/index");
                    } else {
                      res.render("grocery/index", {groceries});
                    }
        })
    },
    new(req, res, next){
        res.render("grocery/new");
      },
    create(req, res, next){
        let newGrocery = {
          title: req.body.title,
        };
        groceryQueries.addGroceryList(newGrocery, (err, grocery) => {
          if(err){
            res.redirect(500, "/grocery/new");
          } else {
            res.redirect(303, `/grocery/${grocery.id}`);
          }
        });
      },
      show(req, res, next){

             groceryQueries.getGroceryList(req.params.id, (err, grocery) => {
        
               if(err || grocery == null){
                 res.redirect(404, "/");
               } else {
                 res.render("grocery/show", {grocery});
               }
             });
           },
      destroy(req, res, next){
            groceryQueries.deleteGroceryList(req.params.id, (err, grocery) => {
              if(err){
                res.redirect(500, `/grocery/${grocery.id}`)
              } else {
                res.redirect(303, "/grocery")
              }
            });
          },
      edit(req, res, next){
            groceryQueries.getGroceryList(req.params.id, (err, grocery) => {
              if(err || grocery == null){
                res.redirect(404, "/");
              } else {
                res.render("grocery/edit", {grocery});
              }
            });
          },
    
      update(req, res, next){

         groceryQueries.updateGroceryList(req.params.id, req.body, (err, grocery) => {
    
           if(err || grocery == null){
             res.redirect(404, `/grocery/${req.params.id}/edit`);
           } else {
             res.redirect(`/grocery/${grocery.id}`);
           }
         });
       }
  }