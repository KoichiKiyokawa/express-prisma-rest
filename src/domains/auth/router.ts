import { FastifyInstance } from "fastify";
import { AuthCheck, AuthLogin, AuthLogout } from "./controller";

export function AuthRouter(router: FastifyInstance) {
  router.post("/auth/login", AuthLogin);
  router.post("/auth/logout", AuthLogout);
  router.get("/auth/check", AuthCheck);
}
