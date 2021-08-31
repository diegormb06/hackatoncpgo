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
}
