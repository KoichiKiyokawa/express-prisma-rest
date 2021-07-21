import { User } from "@prisma/client";
import { FastifyRequest } from "fastify";
import { validateAuth } from "../core/controller";
import { UserRepository } from "./repository";

export const UserIndex = async (req: FastifyRequest) => {
  validateAuth(req);

  try {
    const users = await UserRepository.all();
    return users;
  } catch (err) {
    console.error(err);
    throw Error("failed to fetch users");
  }
};

type UserCreateBody = Omit<User, "id">;
export const UserCreate = async (
  req: FastifyRequest<{ Body: UserCreateBody }>
) => {
  validateAuth(req);

  try {
    const user = await UserRepository.create(req.body as UserCreateBody);
    return user;
  } catch (err) {
    console.error(err);
    throw Error("failed to fetch user");
  }
};
