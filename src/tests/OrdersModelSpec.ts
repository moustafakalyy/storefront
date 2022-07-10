import { OrderInfo } from "../models/Orders";
import { ProductInfo } from "../models/Product";
import { UserInfo } from "../models/User";
const orderModel = new OrderInfo();
const usersModel = new UserInfo();
const productModel = new ProductInfo();
export let user1Password: string;
export let user2Password:string;
describe("Testing Orders Model", () => {
  beforeAll(async ()=>{
    const user1 = await usersModel.create({
      firstname: "ali",
      lastname: "yasser",
      password: "25512",
    });
    user1Password=user1.password;
    const user2 = await usersModel.create({
      firstname: "khaled",
      lastname: "yasser",
      password: "4545",
    });
    user2Password=user2.password;

    const product1 = await productModel.create({
      name: "jeans",
      price: 30,
    });
    const product2 = await productModel.create({
      name: "cap",
      price: 50,
    });

    const order1= await orderModel.create({product_iD:1,quantity:2,users_iD:1});
    const order2= await orderModel.create({product_iD:2,quantity:1,users_iD:1});
  });
  it("Orders model should have an getUserOrderedProducts method", async () => {
    expect(orderModel.getUserOrderedProducts).toBeDefined();
  });

  it("getUserOrderedProducts should return orders by user", async () => {
    const result = await orderModel.getUserOrderedProducts("1");
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
      }
    ]);
  });
});
