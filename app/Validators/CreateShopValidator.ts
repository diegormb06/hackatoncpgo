import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateShopValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.number(),
    name: schema.string(),
    phone: schema.string(),
    mobile_phone: schema.string.optional(),
    zipcode: schema.number(),
    address: schema.string(),
    number: schema.number(),
    complement: schema.string.optional(),
    neighborhood: schema.string(),
    city: schema.string(),
    state: schema.string(),
    country: schema.string(),
    cnpj: schema.string({ trim: true }, [
      rules.unique({ table: "shops", column: "cnpj" }),
    ]),
  });

  public messages: CustomMessages = {
    "cnpj.unique": "O CNPJ informado já está sendo usado",
    required: "O campo {{ field }} é obrigatório",
  };
}
