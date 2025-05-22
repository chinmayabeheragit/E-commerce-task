const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../../app");
const { expect } = chai;

chai.use(chaiHttp);

describe("Shopping Cart & Order Processing", () => {
  let userToken;

  before((done) => {
    chai.request(app)
      .post("/api/users/login")
      .send({ email: "user@example.com", password: "UserPass123!" })
      .end((err, res) => {
        userToken = res.body.token;
        done();
      });
  });

  it("should add product to cart", (done) => {
    chai.request(app)
      .post("/api/cartOrders")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ productId: 1, quantity: 2 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message").that.includes("added");
        done();
      });
  });

  it("should place an order", (done) => {
    chai.request(app)
      .post("/api/cartOrders/order")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ paymentMethod: "credit_card" })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("orderStatus").that.equals("placed");
        done();
      });
  });
});
