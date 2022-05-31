export default interface IRepository {
  getAll(page: number): object;
  findOne(id: number): object;
  update(id: number, data: object): object;
  delete(id: number): object;
}
