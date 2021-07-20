import "fastify";

declare module "fastify" {
  interface Session {
    isLoggedIn: boolean;
  }
}
