import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Category from "Infrastructure/database/Models/Category";

export default class CategorySeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = "name";

    await Category.updateOrCreateMany(uniqueKey, [
      {
        name: "Carroceria",
        slug: "carroceria",
        description: "Partes de carroceria de automóveis",
      },
      {
        name: "Elétrica",
        slug: "eletrica",
        description: "Componentes elétricos do automóvel",
      },
      {
        name: "Motor",
        slug: "motor",
        description: "Peças do motor dos automóveis",
      },
      {
        name: "Óleos e Lubrificantes",
        slug: "oleos-e-lubrificantes",
        description: "Óleos e lubrificantes",
      },
      {
        name: "Câmbio e transmissão",
        slug: "cambio-e-transmissao",
        description: "Câmbio e transmissão",
      },
      {
        name: "Freios",
        slug: "freios",
        description: "Freios",
      },
      {
        name: "Suspensão",
        slug: "suspensao",
        description: "Suspensão",
      },
    ]);
  }
}
