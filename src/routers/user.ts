import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { UserIndex } from "../controllers/user";

export function UserRouter(router: FastifyInstance) {
  router.register(setup, { prefix: "users" });
}

const setup: FastifyPluginAsync = async (router) => {
  router.get("/", UserIndex);
};
