import { ApplicationContract } from "@ioc:Adonis/Core/Application";

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public async register() {
    // Register your own bindings
    const imageService = (await import("App/services/ImageService")).default;

    this.app.container.singleton(
      "Services/ImageServices",
      () => new imageService()
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
