import { FastifyInstance, FastifyPluginAsync } from "fastify";

import { AppRouter } from "./app";
import { AuthRouter } from "./auth";
import { UserRouter } from "./user";

export function setupRoutes(router: FastifyInstance) {
  router.register(setup, { prefix: "api/v1" });
}

const setup: FastifyPluginAsync = async (router) => {
  AppRouter(router);
  UserRouter(router);
  AuthRouter(router);
};
