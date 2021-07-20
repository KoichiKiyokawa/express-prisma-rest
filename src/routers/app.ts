import { FastifyInstance } from "fastify";

export function AppRouter(router: FastifyInstance) {
  router.get("/", async () => {
    return "ok";
  });
}
