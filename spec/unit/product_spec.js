const sequelize = require("../../src/db/models/index").sequelize;
const Grocery = require("../../src/db/models").Grocery;
const Product = require("../../src/db/models").Product;


describe("Product", () => {

  beforeEach((done) => {
    this.grocery;
    this.product;
    sequelize.sync({force: true}).then((res) => {

      Grocery.create({
        title: "Spaghetti",
      })
      .then((grocery) => {
        this.grocery = grocery;

        Product.create({
          title: "Noodles",
          purchased: false,
          groceryId: this.grocery.id
        })
        .then((product) => {
          this.product = product;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

  describe("#create()", () => {

    it("should create a product object with a title and assigned checkbox to mark as purchased", (done) => {
      Product.create({
        title: "Tomato sauce",
        purchased: false,
        groceryId: this.grocery.id
      })
      .then((product) => {

        expect(product.title).toBe("Tomato sauce");
        done();

      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

  describe("#setGrocery()", () => {

    it("should associate a grocery list and a product together", (done) => {

// #1
      Grocery.create({
        title: "Sinigang",
      })
      .then((newGrocery) => {

// #2
        expect(this.product.groceryId).toBe(this.grocery.id);
// #3
        this.product.setGrocery(newGrocery)
        .then((product) => {
// #4
          expect(product.groceryId).toBe(newGrocery.id);
          done();

        });
      })
    });

  });

  describe("#getGrocery()", () => {

    it("should return the associated grocery list", (done) => {

      this.product.getGrocery()
      .then((associatedGrocery) => {
        expect(associatedGrocery.title).toBe("Spaghetti");
        done();
      });

    });

  });
});