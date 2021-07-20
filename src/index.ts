import fastify from "fastify";
import cookie from "fastify-cookie";
import cors from "fastify-cors";
import session from "fastify-session";
import { setupRoutes } from "./routers";

const isProd = process.env.NODE_ENV === "production";

const app = fastify({ logger: { prettyPrint: !isProd } });

// TODO: CHANGE IN PRODUCTION
app.register(cors, { credentials: true, origin: "http://localhost:3000" });
app.register(cookie);
// TODO: CHANGE IN PRODUCTION
app.register(session, {
  secret: "eoiajonlkntoaierngoangnlkanekrgaeoijm;mkda",
  cookie: { secure: isProd },
});

setupRoutes(app);

app.listen(process.env.PORT ?? 8080);

export { app };
