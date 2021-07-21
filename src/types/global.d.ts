import "fastify";

declare module "fastify" {
  interface Session {
    isLoggedIn: boolean;
  }
}

declare global {
  declare namespace NodeJS {
    interface ProcessEnv {
      REDIS_URL: string;
    }
  }
}
