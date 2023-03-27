import { ApplicationContract } from "@ioc:Adonis/Core/Application";

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public async register() {}

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    console.log("App Environment", this.app.environment);
    if (this.app.environment === "web") {
      await import("../../../start/socket");
    }
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
