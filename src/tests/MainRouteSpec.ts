import { app } from "../server";
import supertest from "supertest";
const request = supertest(app);
describe("Testing main route spec", () => {
  it("test the main api endpoint", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});
