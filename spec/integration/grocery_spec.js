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
       title: "JS Frameworks",
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

      //#3
             request.get(base, (err, res, body) => {
               expect(res.statusCode).toBe(200);
               expect(err).toBeNull();
               expect(body).toContain("Grocery List");
               expect(body).toContain("JS Frameworks");
               done();
             });
           });
         });
});