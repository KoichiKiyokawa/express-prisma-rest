import { Express } from "express";
import { AppRouter } from "./app";
import { AuthRouter } from "./auth";
import { UserRouter } from "./user";

export function setupRoutes(router: Express) {
  AppRouter(router);
  UserRouter(router);
  AuthRouter(router);
}
