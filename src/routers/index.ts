import {FastifyInstance} from 'fastify'

import { AppRouter } from "./app";
import { AuthRouter } from "./auth";
import { UserRouter } from "./user";

export function setupRoutes(router: FastifyInstance) {
  AppRouter(router);
  UserRouter(router);
  AuthRouter(router);
}
