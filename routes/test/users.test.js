const request = require("supertest");
const chai = require("chai");
const app = require("../../server");

const expect = chai.expect;

describe("Users API Integration Tests", () => {
  it("GET / should confirm the app is live", async () => {
    const res = await request(app).get("/");

    expect(res.status).to.equal(200);
    expect(res.text).to.equal("App is live");
  });

  it("GET /api/users should return users array", async () => {
    const res = await request(app).get("/api/users");

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body[0]).to.have.all.keys("id", "name");
  });

  it("POST /api/users should create user", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ name: "Alice" });

    expect(res.status).to.equal(201);
    expect(res.body).to.include({ name: "Alice" });
    expect(res.body.id).to.be.a("number");
  });

  it("GET /status should confirm the app is live", async () => {
    const res = await request(app).get("/status");

    expect(res.status).to.equal(200);
    expect(res.text).to.equal("App is live");
  });
});
