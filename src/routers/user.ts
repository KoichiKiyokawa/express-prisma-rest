import { Express } from "express";
import { UserIndex } from "../controllers/user";

export function UserRouter(router: Express) {
  router.get("/users", UserIndex);
}
