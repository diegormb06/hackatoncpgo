import User from "App/Models/User";
import { ModelPaginatorContract } from "@ioc:Adonis/Lucid/Orm";

export type UserType = {
  firstName: string;
  lastName: string;
};

export default interface IUserService {
  getUsers(): Promise<ModelPaginatorContract<User>>;
  showUser(id: number): Promise<User | null>;

  createUser(data: object): Promise<User>;
  updateUser(id: number, data: object): Promise<User>;
  deleteUser(id: number): Promise<boolean>;
}
