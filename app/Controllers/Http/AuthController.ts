import User from "App/Models/User";
import Hash from "@ioc:Adonis/Core/Hash";

export default class AuthController {
  public async login({ auth, request, response }) {
    const email = request.input("email");
    const password = request.input("password");

    try {
      return await auth.use("api").attempt(email, password);
    } catch (error) {
      console.log(error);
      return response.badRequest(error.message);
    }
  }

  public async adminLogin({ auth, request, response }) {
    const email = request.input("email");
    const password = request.input("password");

    // Lookup user manually
    const user = await User.query()
      .where("email", email)
      .whereNot("role", "admin")
      .firstOrFail();

    // Verify password
    if (!(await Hash.verify(user.password, password))) {
      return response.badRequest("Invalid credentials");
    }

    // Generate token
    return await auth.use("api").generate(user);
  }
}
