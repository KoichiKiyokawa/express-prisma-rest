import express from "express";

export function AppRouter(router: express.Express) {
  router.get("/", (_req, res) => {
    res.status(200).send("ok");
  });
}
