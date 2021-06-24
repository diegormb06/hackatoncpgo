import IUserService from "Contracts/interfaces/userService";
import UserRepository from "App/repository/UserRepository";

export default class UserService implements IUserService {
  private userRepository: UserRepository = new UserRepository();

  getUsers() {
    return this.userRepository.getAll();
  }

  async showUser(id: number) {
    return await this.userRepository.findOne(id);
  }

  createUser(data: object) {
    return this.userRepository.create(data);
  }

  updateUser(id: number, data: object) {
    return this.userRepository.update(id, data);
  }

  deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}
