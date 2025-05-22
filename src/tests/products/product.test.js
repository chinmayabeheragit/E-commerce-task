const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../../app");
const { expect } = chai;

chai.use(chaiHttp);

describe("Product Management", () => {
  let adminToken;

  before((done) => {
    chai.request(app)
      .post("/api/users/login")
      .send({ email: "admin@example.com", password: "AdminPass123!" })
      .end((err, res) => {
        adminToken = res.body.token;
        done();
      });
  });

  it("should add a new product", (done) => {
    chai.request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${adminToken}`)
      .field("name", "Test Product")
      .field("price", 99.99)
      .field("stock", 10)
      .field("categoryId", 1)
      .attach("image", "path/to/test-image.jpg") 
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("name", "Test Product");
        done();
      });
  });

});
