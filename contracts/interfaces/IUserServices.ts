export interface IUserServices {
  getUsers(): Promise<any>;
  showUser(id: number): Promise<any>;
  createUser(data: object): Promise<any>;
  updateUser(id: number, data: object): Promise<any>;
  deleteUser(id: number): Promise<any>;
  searchUser(qs: Record<string, any>): Promise<any>;
}
