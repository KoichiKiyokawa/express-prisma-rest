import supertest from "supertest";
import { app } from "../../src";

describe("router test", () => {
  it("index", async () => {
    const res = await supertest(app).get("/");
    expect(res.statusCode).toBe(200);
  });
});
