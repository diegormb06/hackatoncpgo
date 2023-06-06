import { HttpContextContract as http } from "@ioc:Adonis/Core/HttpContext";

import CreateUserValidator from "App/Validators/CreateUserValidator";
import { IUserServices } from "Domain/interfaces/IUserServices";
import AuthController from "./AuthController";
import UserServices from "App/services/UserServices";

export default class UsersController {
  constructor(
    private readonly userService: IUserServices = new UserServices(),
    private readonly authController = new AuthController()
  ) {}

  public async index() {
    return this.userService.getUsers();
  }

  public async store({ auth, request, response }: http) {
    const newUser = request.all();
    await request.validate(CreateUserValidator);
    try {
      await this.userService.createUser(newUser);
      return this.authController.login({ auth, request, response } as http);
    } catch (error) {
      response.badRequest({ error: "Verifique os dados" });
    }
  }

  public async show({ params }: http) {
    return this.userService.showUser(params.userId);
  }

  public async update({ request, params }: http) {
    return this.userService.updateUser(params.id, request.all());
  }

  public async destroy({ params }: http) {
    return this.userService.deleteUser(params.id);
  }
}
