import fastify from "fastify";
import cookie from "fastify-cookie";
import cors from "fastify-cors";
import session from "fastify-session";
import Redis from "ioredis";
import { setupRoutes } from "./domains/app/router";
import RedisStore from "@mgcrea/fastify-session-redis-store";

async function bootstrap() {
  const isProd = process.env.NODE_ENV === "production";

  const app = fastify({ logger: { prettyPrint: !isProd } });

  // TODO: CHANGE IN PRODUCTION
  app.register(cors, { credentials: true, origin: "http://localhost:3000" });
  app.register(cookie);
  // TODO: CHANGE IN PRODUCTION
  app.register(session, {
    secret: "eoiajonlkntoaierngoangnlkanekrgaeoijm;mkda",
    cookie: { secure: isProd },
    store: new RedisStore({
      client: new Redis(process.env.REDIS_HOST, {
        port: Number(process.env.REDIS_PORT),
      }),
    }) as any,
  });

  setupRoutes(app);

  const port = process.env.PORT ?? 8080;
  app.listen(port, () => console.log(`App listening on port ${port}!`));
}

bootstrap().catch(console.error);
