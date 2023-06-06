import { UserRoles } from "Domain/enums/UserRoles";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class IsAdmin {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    const user = auth.user?.serialize();

    if (user?.role !== UserRoles.ADMIN) {
      return response.unauthorized();
    }

    return await next();
  }
}
