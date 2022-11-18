import User from "App/Models/User";
import Hash from "@ioc:Adonis/Core/Hash";
import { HttpContextContract as http } from "@ioc:Adonis/Core/HttpContext";
import UserRepository from "App/repository/UserRepository";

export default class AuthController {
  public async login({ auth, request, response }: http) {
    const email = request.input("email");
    const password = request.input("password");
    const userRepository = new UserRepository();

    try {
      const { token } = await auth.use("api").attempt(email, password);
      const user = auth.user?.serialize();
      const userData = await userRepository.findOne(user?.id);
      return { ...userData, token };
    } catch (error) {
      console.log(error);
      return response.badRequest(error.message);
    }
  }

  public async adminLogin({ auth, request, response }: http) {
    try {
      const email = request.input("email");
      const password = request.input("password");

      const user = await User.query()
        .where("email", email)
        .where("role", "admin")
        .orWhere("role", "store")
        .firstOrFail();

      if (!(await Hash.verify(user.password, password))) {
        return response.badRequest("Invalid credentials");
      }

      const { token } = await auth.use("api").attempt(email, password);
      const userInfo = auth.user?.serialize();

      return { ...userInfo, token };
    } catch (error) {
      return response.status(401).json({ error: "not authorized" });
    }
  }

  public async authenticate({ auth, response }) {
    try {
      await auth.use("api").authenticate();
    } catch (error) {
      response.status(403).json({ error: "Não Autorizado" });
    }
  }
}
