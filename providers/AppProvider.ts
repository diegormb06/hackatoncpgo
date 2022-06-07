import { ApplicationContract } from "@ioc:Adonis/Core/Application";

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public async register() {
    // Register your own bindings
    const ImageService = (await import("App/services/ImageService")).default;
    this.app.container.singleton(
      "Services/ImageServices",
      () => new ImageService()
    );

    this.app.container.call
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    if (this.app.environment === "web") {
      console.log("log environment", this.app.environment);
      await import("../start/socket");
    }
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
