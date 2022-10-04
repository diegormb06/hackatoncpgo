export default interface Repository<T = any> {
  getAll(page: number): object;
  findOne(id: number): object;
  update(id: number, data: T): T;
  delete(id: number): object;
}
