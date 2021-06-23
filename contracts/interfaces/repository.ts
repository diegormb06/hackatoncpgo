export default interface IRepository {
  getAll(): object;
  findOne(id: number): object;
  update(id: number, data: object): object;
  delete(id: number): Promise<boolean>;
}
