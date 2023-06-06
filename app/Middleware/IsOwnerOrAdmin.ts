import { UserRoles } from "Domain/enums/UserRoles";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class IsAdmin {
  public async handle(
    { auth, response, params }: HttpContextContract,
    next: () => Promise<void>
  ) {
    const user = auth.user?.serialize();
    const userId = parseInt(params.userId);

    if (user?.role !== UserRoles.ADMIN && userId !== user?.id) {
      return response.unauthorized();
    }

    return await next();
  }
}
