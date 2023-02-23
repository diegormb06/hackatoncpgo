import { IUserServices } from "Contracts/interfaces/IUserServices";
// import UserRepository from "@ioc:Api/UserRepository";
import IUserRepository from "Contracts/interfaces/IUserRepository";

export default class UserServices implements IUserServices {
  constructor(private userRepository: IUserRepository) {}

  getUsers() {
    return this.userRepository.getAll();
  }

  async showUser(id: number) {
    return await this.userRepository.findOne(id);
  }

  async createUser(data: object) {
    return await this.userRepository.create(data);
  }

  async updateUser(id: number, data: object) {
    return this.userRepository.update(id, data);
  }

  async deleteUser(id: number) {
    return this.userRepository.delete(id);
  }

  searchUser(qs: Record<string, any>) {
    return this.userRepository.search(qs);
  }
}
