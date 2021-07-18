import express from "express";
import { AuthCheck, AuthLogin, AuthLogout } from "../controllers/auth";

export function AuthRouter(router: express.Express) {
  router.post("/auth/login", AuthLogin);
  router.post("/auth/logout", AuthLogout);
  router.get("/auth/check", AuthCheck);
}
