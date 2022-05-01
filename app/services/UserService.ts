import UserRepository from "App/repository/UserRepository";

export default class UserService {
  private userRepository: UserRepository = new UserRepository();

  getUsers() {
    return this.userRepository.getAll();
  }

  async showUser(id: number) {
    return await this.userRepository.findOne(id);
  }

  async createUser(data: object) {
    return await this.userRepository.create(data);
  }

  updateUser(id: number, data: object) {
    return this.userRepository.update(id, data);
  }

  deleteUser(id: number) {
    return this.userRepository.delete(id);
  }

  searchUser(qs: Record<string, any>) {
    return this.userRepository.search(qs);
  }
}
