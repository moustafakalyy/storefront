import { ProductInfo } from "../models/Product";
const productModel = new ProductInfo();
describe("Testing Products Model", () => {
  it("Products model should have an index method", async () => {
    expect(productModel.index).toBeDefined();
  });

  it("Products model should have show method", async () => {
    expect(productModel.show).toBeDefined();
  });

  it("Products model should have create method", async () => {
    expect(productModel.create).toBeDefined();
  });

  it("Index method should return all products", async () => {
    const result = await productModel.index();
    expect(result).toEqual([
      {
        id: 1,
        name: "jeans",
        price: 30,
      },
      {
        id: 2,
        name: "cap",
        price: 50,
      },
    ]);
  });

  it("show method should return specific products by id", async () => {
    const result = await productModel.show("1");
    expect(result).toEqual({
      id: 1,
      name: "jeans",
      price: 30,
    });
  });

  it("create method should create new products", async () => {
    const result = await productModel.create({
      name: "short",
      price: 30,
    });
    expect(result).toEqual({
      id: 3,
      name: "short",
      price: 30,
    });
  });
});
