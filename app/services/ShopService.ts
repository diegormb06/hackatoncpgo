import ShopRepository from "App/repository/ShopRepository";

export default class ShopService {
  private ShopRepository: ShopRepository = new ShopRepository();

  getUsers() {
    return this.ShopRepository.getAll();
  }

  async showUser(id: number) {
    return await this.ShopRepository.findOne(id);
  }

  createUser(data: object) {
    return this.ShopRepository.create(data);
  }

  updateUser(id: number, data: object) {
    return this.ShopRepository.update(id, data);
  }

  deleteUser(id: number) {
    return this.ShopRepository.delete(id);
  }

  searchUser(qs: Record<string, any>) {
    return this.ShopRepository.search(qs);
  }
}
