export default interface IUserRepository {
  getAll(): Promise<any>;
  findOne(id: number): Promise<any>;
  create(data: object): Promise<any>;
  update(id: number, data: object): Promise<any>;
  delete(id: number): Promise<any>;
  search(qs: Record<string, any>): Promise<any>;
}
