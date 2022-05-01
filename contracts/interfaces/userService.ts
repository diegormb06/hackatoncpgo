import User from "App/Models/User";
import { ModelPaginatorContract } from "@ioc:Adonis/Lucid/Orm";

export type UserType = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  photo?: string;
  created_at: string;
  updated_at: string;
};

export default interface IUserService {
  getUsers(): Promise<ModelPaginatorContract<User>>;
  showUser(id: number): Promise<UserType>;
  createUser(data: object): Promise<UserType>;
  updateUser(id: number, data: object): Promise<UserType>;
  deleteUser(id: number): Promise<{ message: string }>;
}
