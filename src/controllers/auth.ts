import { FastifyRequest } from "fastify";
import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/user";
import { UnauthorizedException, validateAuth } from "./core";

type LoginBody = {
  email: string;
  password: string;
};

export const AuthLogin = async (req: FastifyRequest<{ Body: LoginBody }>) => {
  const { email, password } = req.body;
  const user = await UserRepository.findByEmail(email);
  const commonError = new UnauthorizedException("email or password is wrong.");
  if (user == null) throw commonError;

  const ok = bcrypt.compareSync(password, user.password);
  if (!ok) throw commonError;

  // write to session
  req.session.isLoggedIn = true;
  return "ok";
};

export const AuthLogout = async (req: FastifyRequest) => {
  req.session.isLoggedIn = false;
  return "ok";
};

export const AuthCheck = async (req: FastifyRequest) => {
  validateAuth(req);
  return "ok";
};
