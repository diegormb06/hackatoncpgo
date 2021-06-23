import { HttpContextContract as http } from "@ioc:Adonis/Core/HttpContext";
import UserService from "App/services/UserService";

export default class UsersController {
  private readonly userService: UserService = new UserService();

  public async index() {
    return this.userService.getUsers();
  }

  public async store({ request }: http) {
    const newUser = request.all();
    return this.userService.createUser(newUser);
  }

  public async show({ params }: http) {
    return this.userService.showUser(params.id);
  }

  public async update({ request, params }: http) {
    return this.userService.updateUser(params.id, request.all());
  }

  public async destroy() {}
}