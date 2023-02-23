import { ApplicationContract } from "@ioc:Adonis/Core/Application";

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public async register() {
    const imageService = (await import("App/services/ImageService")).default;
    const OrderService = (await import("App/services/OrderService")).default;
    const UserServices = (await import("App/services/UserServices")).default;
    const ShopServices = (await import("App/services/ShopServices")).default;

    const UserRepository = (await import("App/Repositories/UserRepository"))
      .default;
    
    const OrderRepository = (await import("App/Repositories/OrderRepository"))
      .default;
    
    const ShopRepository = (await import("App/Repositories/ShopRepository"))
      .default;

    this.app.container.bind("Api/ShopRepository", () => new ShopRepository());
    this.app.container.bind("Api/UserRepository", () => new UserRepository());
    this.app.container.bind("Api/OrderRepository", () => new OrderRepository());
    this.app.container.bind("Api/ImageServices", () => new imageService());
    this.app.container.bind("Api/OrderServices", () => new OrderService());
    this.app.container.bind("Api/ShopServices", () => new ShopServices());

    this.app.container.bind(
      "Api/UserServices",
      () => new UserServices(new UserRepository())
    );

    this.app.container.call;
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    if (this.app.environment === "web") {
      await import("../start/socket");
    }
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
