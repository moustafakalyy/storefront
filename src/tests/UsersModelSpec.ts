import { UserInfo } from "../models/User";
import { user1Password, user2Password } from "./OrdersModelSpec";
const usersModel = new UserInfo();
describe("Testing Users Model", () => {
  it("Users model should have an index method", async () => {
    expect(usersModel.index).toBeDefined();
  });

  it("Users model should have show method", async () => {
    expect(usersModel.show).toBeDefined();
  });

  it("Users model should have create method", async () => {
    expect(usersModel.create).toBeDefined();
  });

  it("Index method should return all users", async () => {
    const result = await usersModel.index();
    console.log(result);
    expect(result).toEqual([
      { id: 1, firstname: "ali", lastname: "yasser", password: user1Password},
      { id: 2, firstname: "khaled", lastname: "yasser", password: user2Password},
    ]);
  });

  it("show method should return specific users by id", async () => {
    const result = await usersModel.show("1");
    expect(result).toEqual({
      id: 1,
      firstname: "ali",
      lastname: "yasser",
      password:user1Password ,
    });
  });

  it("create method should create new user", async () => {
    const createResult = await usersModel.create({
      firstname: "hema",
      lastname: "yasser",
      password: "45459",
    });
    const showResult = await usersModel.show("3");
    expect(createResult).toEqual(showResult);
  });
});
