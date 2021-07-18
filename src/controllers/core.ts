import express from "express";
import { User } from "../generated/client";

type LoginBody = {
  email: string;
  password: string;
};

export type Request = express.Request<unknown, unknown, LoginBody> & {
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
