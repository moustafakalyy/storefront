import { app } from "../server";
import supertest from "supertest";
const request = supertest(app);
describe("Testing Products route spec", () => {
  it("test the Products api endpoint", async () => {   
    const response = await request.get("/products");
   
    expect(response.status).toBe(200);
  });
});