import express from "express";
import { User } from "../generated/client";
import { UserRepository } from "../repositories/user";
import {
  Request,
  respondInternalServerError,
  respondJson,
  validateAuth,
} from "./core";

export const UserIndex = async (req: Request, res: express.Response) => {
  if (!validateAuth(req, res)) return;

  try {
    const users = await UserRepository.all();
    respondJson(res, users);
  } catch (err) {
    console.error(err);
    respondInternalServerError(res, "failed to fetch users");
  }
};

type UserCreateBody = Omit<User, "id">;
export const UserCreate = async (req: Request, res: express.Response) => {
  if (!validateAuth(req, res)) return;

  try {
    const user = await UserRepository.create(req.body as UserCreateBody);
    respondJson(res, user);
  } catch (err) {
    console.error(err);
    respondInternalServerError(res, "failed to fetch user");
  }
};
