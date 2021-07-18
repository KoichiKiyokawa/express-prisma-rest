import express from "express";
import { Request, respondOK, validateAuth } from "./core";

export const UserIndex = (req: Request, res: express.Response) => {
  if (!validateAuth(req, res)) return;
  respondOK(res, "ok");
};
