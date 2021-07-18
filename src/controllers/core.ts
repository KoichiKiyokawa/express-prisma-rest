import express from "express";
import { User } from "../generated/client";

export type Request = express.Request & {
  session: { user?: User };
  body: Body;
};

const respondBase = (
  res: express.Response,
  status: number,
  message: string
) => {
  res.status(status).json({ message });
};

export const respondInternalServerError = (
  res: express.Response,
  message: string
) => {
  respondBase(res, 500, message);
};

export const respondOK = (res: express.Response, message: string) => {
  respondBase(res, 200, message);
};

export const respondJson = (
  res: express.Response,
  json: Record<string, unknown> | Record<string, unknown>[]
) => {
  res.setHeader("content-type", "application/json");
  res.status(200).json(json);
};

export const respondUnauthorized = (res: express.Response, message: string) => {
  respondBase(res, 401, message);
};

export const validateAuth = (req: Request, res: express.Response): boolean => {
  if (req.session.user == null) {
    respondUnauthorized(res, "no");
    return false;
  }
  return true;
};
