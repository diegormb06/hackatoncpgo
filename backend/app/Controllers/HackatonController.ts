import { HttpContextContract as http } from "@ioc:Adonis/Core/HttpContext";
import Hackaton from "Infrastructure/database/Models/Hackaton";

export default class HackatonController {
  public async getData({ response }: http) {
    const hackatons = await Hackaton.query().paginate(1, 10);
    return response.ok(hackatons.serialize());
  }

  public async saveData({ request, response }: http) {
    const data = request.only([
      "serie",
      "turma",
      "indicios_bullyng",
      "indicios_violencia",
      "risco",
    ]);

    try {
      const riskData = await Hackaton.create(data);
      return response.created(riskData.serialize());
    } catch (error) {
      return response.badRequest(error.message);
    }
  }
}
