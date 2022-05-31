import { rules, schema } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
    ]),
    password: schema.string(),
    first_name: schema.string(),
    last_name: schema.string(),
    cpf: schema.string({}, [rules.unique({ table: "users", column: "cpf" })]),
    phone: schema.string(),
  });

  public messages = {
    "email.unique": "O email informado já está sendo usado",
    "cpf.unique": "O cpf informado já está sendo usado",
  };
}
