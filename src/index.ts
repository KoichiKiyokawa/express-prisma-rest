import fastify from "fastify";
import cors from "fastify-cors";
import session from "fastify-session";
import cookie, { FastifyCookieOptions } from "fastify-cookie";

import { setupRoutes } from "./routers";

const app = fastify({ logger: { prettyPrint: true } });

// TODO: CHANGE IN PRODUCTION
app.register(cors, { credentials: true, origin: "http://localhost:3000" });
app.register(cookie);
// TODO: CHANGE IN PRODUCTION
app.register(session, {
  secret: "eoiajonlkntoaierngoangnlkanekrgaeoijm;mkda",
  cookie: { secure: process.env.NODE_ENV === "production" },
});

setupRoutes(app);

app.listen(process.env.PORT ?? 8080);

export { app };
