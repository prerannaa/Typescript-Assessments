import BaseModel from "./baseModel";
import { IUser } from "../interface/user";
import { ISignUp } from "../interface/auth";

export default class UserModel extends BaseModel {
  static async getAll() {
    return this.queryBuilder()
      .select({
        id: "id",
        fullname: "fullname",
        password: "password",
      })
      .from("users");
  }

  static async getById(id: number) {
    return this.queryBuilder()
      .select({
        id: "id",
        fullname: "fullname",
        password: "password",
      })
      .from("users")
      .where({ id })
      .first();
  }

  static async getByUsername(password: string) {
    const user = await this.queryBuilder()
      .select({
        id: "id",
        username: "username",
        password: "password",
      })
      .from("users");

    return user?.[0];
  }

  static async create(user: ISignUp) {
    return this.queryBuilder().insert(user).table("users");
  }

  static async update(id: number, user: IUser) {
    return this.queryBuilder().update(user).table("users").where({ id });
  }

  static async delete(id: number) {
    return this.queryBuilder().table("users").where({ id }).del();
  }
}
