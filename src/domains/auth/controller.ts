import bcrypt from "bcryptjs";
import { FastifyRequest } from "fastify";
import { SESSION_KEY } from "../../constants/session-key";
import { UnauthorizedException, validateAuth } from "../core/controller";
import { UserRepository } from "../user/repository";

type LoginBody = {
  email: string;
  password: string;
};

export const AuthLogin = async (req: FastifyRequest<{ Body: LoginBody }>) => {
  const { email, password } = req.body;
  const user = await UserRepository.findByEmail(email).catch(() => {
    throw Error("something is wrong");
  });
  const commonError = new UnauthorizedException("email or password is wrong.");
  if (user == null) throw commonError;

  const ok = bcrypt.compareSync(password, user.password);
  if (!ok) throw commonError;

  // write to session
  req.session.set(SESSION_KEY.IS_LOGGED_IN, true);
  await req.session.save();
  return "ok";
};

export const AuthLogout = async (req: FastifyRequest) => {
  req.session.set(SESSION_KEY.IS_LOGGED_IN, false);
  return "ok";
};

export const AuthCheck = async (req: FastifyRequest) => {
  validateAuth(req);
  return "ok";
};
