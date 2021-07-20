import { FastifyInstance } from "fastify";
import { UserIndex } from "../controllers/user";

export function UserRouter(router: FastifyInstance) {
  router.get("/users", UserIndex);
}
