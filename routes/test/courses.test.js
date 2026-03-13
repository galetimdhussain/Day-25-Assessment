const chai = require("chai");
const express = require("express");
const request = require("supertest");

const expect = chai.expect;

function buildCoursesApp() {
  delete require.cache[require.resolve("../courses")];
  const courseRoutes = require("../courses");

  const app = express();
  app.use(express.json());
  app.use("/api/courses", courseRoutes);

  return app;
}

describe("Courses API Unit Tests", () => {
  it("GET /api/courses should return the default courses list", async () => {
    const app = buildCoursesApp();
    const res = await request(app).get("/api/courses");

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body).to.have.length(2);
    expect(res.body[0]).to.include({ id: 1, name: "NodeJS", duration: "4 weeks" });
  });

  it("POST /api/courses should create a new course", async () => {
    const app = buildCoursesApp();
    const res = await request(app)
      .post("/api/courses")
      .send({ name: "MongoDB", duration: "5 weeks" });

    expect(res.status).to.equal(201);
    expect(res.body).to.include({ id: 3, name: "MongoDB", duration: "5 weeks" });
  });

  it("PUT /api/courses/:id should update all fields when provided", async () => {
    const app = buildCoursesApp();
    const res = await request(app)
      .put("/api/courses/1")
      .send({ name: "Node.js Advanced", duration: "8 weeks" });

    expect(res.status).to.equal(200);
    expect(res.body).to.include({ id: 1, name: "Node.js Advanced", duration: "8 weeks" });
  });

  it("PUT /api/courses/:id should keep values when update body is empty", async () => {
    const app = buildCoursesApp();
    const res = await request(app)
      .put("/api/courses/2")
      .send({});

    expect(res.status).to.equal(200);
    expect(res.body).to.include({ id: 2, name: "React", duration: "6 weeks" });
  });

  it("PUT /api/courses/:id should return 404 for unknown course", async () => {
    const app = buildCoursesApp();
    const res = await request(app)
      .put("/api/courses/999")
      .send({ name: "Unknown" });

    expect(res.status).to.equal(404);
    expect(res.body).to.deep.equal({ error: "Course not found" });
  });

  it("DELETE /api/courses/:id should delete a course", async () => {
    const app = buildCoursesApp();
    const res = await request(app).delete("/api/courses/2");

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({ message: "Course deleted" });
  });
});
