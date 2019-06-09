const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/grocery/";
const sequelize = require("../../src/db/models/index").sequelize;
const Grocery = require("../../src/db/models").Grocery;

describe("routes : groceries", () => {

  beforeEach((done) => {
    this.grocery;
    sequelize.sync({force: true}).then((res) => {

     Grocery.create({
       title: "Adidas",
     })
      .then((grocery) => {
        this.grocery = grocery;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });

    });

  });

  describe("GET /grocery", () => {

   
    it("should return a status code 200 and all grocery lists", (done) => {

             request.get(base, (err, res, body) => {
               expect(res.statusCode).toBe(200);
               expect(err).toBeNull();
               expect(body).toContain("Grocery List");
               expect(body).toContain("Adidas");
               done();
             });
           });
         });

  describe("GET /grocery/new", () => {

          it("should render a new grocery form", (done) => {
            request.get(`${base}new`, (err, res, body) => {
              expect(err).toBeNull();
              expect(body).toContain("New Grocery List");
              done();
            });
          });
      
        });

  describe("POST /grocery/create", () => {
          const options = {
            url: `${base}create`,
            form: {
              title: "SM Department Store",
            }
          };
    
          it("should create a new grocery list and redirect", (done) => {
    
            request.post(options,
    

              (err, res, body) => {
                Grocery.findOne({where: {title: "SM Department Store"}})
                .then((grocery) => {
                  expect(res.statusCode).toBe(303);
                  expect(grocery.title).toBe("SM Department Store");
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
    describe("GET /grocery/:id", () => {

          it("should render a view with the selected grocery list", (done) => {
            request.get(`${base}${this.grocery.id}`, (err, res, body) => {
              expect(err).toBeNull();
              expect(body).toContain("Adidas");
              done();
            });
          });
     
        });
    describe("POST /grocery/:id/destroy", () => {

          it("should delete the grocery list with the associated ID", (done) => {
     
            Grocery.all()
            .then((grocery) => {
     
              const groceryCountBeforeDelete = grocery.length;
     
              expect(groceryCountBeforeDelete).toBe(1);
     
              request.post(`${base}${this.grocery.id}/destroy`, (err, res, body) => {
                Grocery.all()
                .then((grocery) => {
                  expect(err).toBeNull();
                  expect(grocery.length).toBe(groceryCountBeforeDelete - 1);
                  done();
                })
     
              });
            });
     
          });
     
        });
    describe("GET /grocery/:id/edit", () => {

          it("should render a view with an edit grocery list form", (done) => {
            request.get(`${base}${this.grocery.id}/edit`, (err, res, body) => {
              expect(err).toBeNull();
              expect(body).toContain("Edit Grocery List Name");
              expect(body).toContain("Adidas");
              done();
            });
          });
     
        });
    describe("POST /grocery/:id/update", () => {

          it("should update the grocery list name with the given value", (done) => {
             const options = {
                url: `${base}${this.grocery.id}/update`,
                form: {
                  title: "Chocolate"                }
              };
     //#1
              request.post(options,
                (err, res, body) => {
     
                expect(err).toBeNull();
     //#2
                Grocery.findOne({
                  where: { id: this.grocery.id }
                })
                .then((grocery) => {
                  expect(grocery.title).toBe("Chocolate");
                  done();
                });
              });
          });
     
        });
});