import { FastifyRequest, RouteHandler } from "fastify";
import { SESSION_KEY } from "../../constants/session-key";

export type Handler = RouteHandler<{}>;

export class UnauthorizedException extends Error {
  statusCode = 401;
  constructor(message: string = "unauthorized") {
    super(message);
  }
}

export const validateAuth = (req: FastifyRequest): void => {
  if (!req.session.get(SESSION_KEY.IS_LOGGED_IN))
    throw new UnauthorizedException();
};
