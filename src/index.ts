import fastify from "fastify";
import cookie from "fastify-cookie";
import cors from "fastify-cors";
import session from "fastify-session";
import { setupRoutes } from "./routers";
import redis from "redis";
import connectRedis from "connect-redis";

const isProd = process.env.NODE_ENV === "production";

const RedisStore = connectRedis(session as any);
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST ?? "localhost",
  port: Number(process.env.REDIS_PORT) ?? 6379,
});

const app = fastify({ logger: { prettyPrint: !isProd } });

// TODO: CHANGE IN PRODUCTION
app.register(cors, { credentials: true, origin: "http://localhost:3000" });
app.register(cookie);
// TODO: CHANGE IN PRODUCTION
app.register(session, {
  secret: "eoiajonlkntoaierngoangnlkanekrgaeoijm;mkda",
  cookie: { secure: isProd },
  store: new RedisStore({ client: redisClient }),
});

setupRoutes(app);

app.listen(process.env.PORT ?? 8080);

export { app };
