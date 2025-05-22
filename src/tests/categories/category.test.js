const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../../app");
const { expect } = chai;
const { User } = require("../../../src/models"); // Adjust as needed
const bcrypt = require("bcryptjs");

chai.use(chaiHttp);

describe("Category Management", () => {
  let adminToken;

  before(async () => {
    const adminEmail = "admin@example.com";
    const adminPassword = "AdminPass123!";
    
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await User.create({
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });
    }

    // Log in to get token
    const res = await chai.request(app)
      .post("/api/users/login")
      .send({ email: adminEmail, password: adminPassword });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("token");
    adminToken = res.body.token;
  });

  it("should create a new category", (done) => {
    const categoryName = `Test Category ${Date.now()}`;
    chai.request(app)
      .post("/api/categories")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: categoryName, description: "For testing" })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("name", categoryName);
        done();
      });
  });

});
