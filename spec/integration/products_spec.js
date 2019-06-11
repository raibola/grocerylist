const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/grocery";

const sequelize = require("../../src/db/models/index").sequelize;
const Grocery = require("../../src/db/models").Grocery;
const Product = require("../../src/db/models").Product;

describe("routes : products", () => {

  beforeEach((done) => {
    this.grocery;
    this.product;

    sequelize.sync({force: true}).then((res) => {

      Grocery.create({
        title: "Tacos"
      })
      .then((grocery) => {
        this.grocery = grocery;

        Product.create({
          title: "Salsa",
          purchased: false,
          groceryId: this.grocery.id
        })
        .then((product) => {
          this.product = product;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });

  });

  describe("GET /grocery/:groceryId/products/new", () => {

    it("should render a new product form", (done) => {
      request.get(`${base}/${this.grocery.id}/products/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Product");
        done();
      });
    });

  });

  describe("POST /grocery/:groceryId/products/create", () => {

    it("should create a new product and redirect", (done) => {
       const options = {
         url: `${base}/${this.grocery.id}/products/create`,
         form: {
           title: "Tortillas"
         }
       };
       request.post(options,
         (err, res, body) => {
 
           Product.findOne({where: {title: "Tortillas"}})
           .then((product) => {
             expect(product).not.toBeNull();
             expect(product.title).toBe("Tortillas");
             expect(product.groceryId).not.toBeNull();
             done();
           })
           .catch((err) => {
             console.log(err);
             done();
           });
         }
       );
     });

     it("should not create a new product that fails validations", (done) => {
      const options = {
        url: `${base}/${this.grocery.id}/products/create`,
        form: {

          title: "a"
        }
      };

      request.post(options,
        (err, res, body) => {

          Product.findOne({where: {title: "a"}})
          .then((product) => {
              expect(product).toBeNull();
              done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });
 
  });

  describe("GET /grocery/:groceryId/products/:id", () => {

    it("should render a view with the selected product", (done) => {
      request.get(`${base}/${this.grocery.id}/products/${this.product.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Salsa");
        done();
      });
    });

  });

  describe("POST /grocery/:groceryId/products/:id/destroy", () => {

    it("should delete the product with the associated ID", (done) => {

      expect(this.product.id).toBe(1);

      request.post(`${base}/${this.grocery.id}/products/${this.product.id}/destroy`, (err, res, body) => {

        Product.findById(1)
        .then((product) => {
          expect(err).toBeNull();
          expect(product).toBeNull();
          done();
        })
      });

    });

  });

  describe("GET /grocery/:groceryId/products/:id/edit", () => {

    it("should render a view with an edit post form", (done) => {
      request.get(`${base}/${this.grocery.id}/products/${this.product.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Product");
        expect(body).toContain("Salsa");
        done();
      });
    });

  });

  describe("POST /grocery/:groceryId/products/:id/update", () => {

    it("should return a status code 302", (done) => {
      request.post({
        url: `${base}/${this.grocery.id}/products/${this.product.id}/update`,
        form: {
          title: "Cheese"
        }
      }, (err, res, body) => {
        expect(res.statusCode).toBe(302);
        done();
      });
    });

    it("should update the post with the given values", (done) => {
        const options = {
          url: `${base}/${this.grocery.id}/products/${this.product.id}/update`,
          form: {
            title: "Cheese"
          }
        };
        request.post(options,
          (err, res, body) => {

          expect(err).toBeNull();

          Product.findOne({
            where: {id: this.product.id}
          })
          .then((product) => {
            expect(product.title).toBe("Cheese");
            done();
          });
        });
    });

  });

});