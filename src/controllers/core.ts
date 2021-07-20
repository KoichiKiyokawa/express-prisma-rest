import { RouteHandler, FastifyRequest } from "fastify";

export type Handler = RouteHandler<{}>;

export class UnauthorizedException extends Error {
  statusCode = 401;
  constructor(message: string = "unauthorized") {
    super(message);
  }
}

export const validateAuth = (req: FastifyRequest): void => {
  if (!req.session.isLoggedIn) throw new UnauthorizedException();
};
