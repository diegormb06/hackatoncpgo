import "reflect-metadata";
import { join } from "path";
import { configure } from "japa";
import sourceMapSupport from "source-map-support";

process.env.NODE_ENV = "testing";
process.env.ADONIS_ACE_CWD = join(__dirname);
sourceMapSupport.install({ handleUncaughtExceptions: false });

async function startHttpServer() {
  const { Ignitor } = await import("@adonisjs/core/build/src/Ignitor");
  process.env.PORT = "3000";
  await new Ignitor(__dirname).httpServer().start();
}

/**
 * Configure test runner
 */
configure({
  files: ["test/**/*.spec.ts"],
  before: [startHttpServer],
});
