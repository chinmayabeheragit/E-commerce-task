const chai = require("chai");
const chaiHttp = require("chai-http");
const startTestServer = require("../../testServer");

chai.use(chaiHttp);
const { expect } = chai;

let server;

before(async () => {
  server = await startTestServer();
});

after(() => {
  server.close();
});

describe("User Authentication", () => {
  it("should register a new user", (done) => {
    chai
      .request(server)
      .post("/api/users/register")
      .send({
        email: "testuser@example.com",
        password: "StrongPassword123!",
        role: "customer", 
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("success", true);
        expect(res.body).to.have.property("message");
        done();
      });
  });
});
