import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { AuthRouter } from "../auth/router";
import { PostRouter } from "../post/router";
import { UserRouter } from "../user/router";

export function setupRoutes(router: FastifyInstance) {
  router.get("/", async () => {
    throw Error("ok");
  });
  router.get("/status", async () => "ok"); // for Google App Engine
  router.get("/_ah/health", async () => "ok"); // for Google App Engine
  router.get("/_render/health", async () => "ok");
  router.register(setup, { prefix: "api/v1" });
}

const setup: FastifyPluginAsync = async (router) => {
  UserRouter(router);
  AuthRouter(router);
  PostRouter(router);
};
