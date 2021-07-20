import fastify from "fastify";
import cors from "fastify-cors";
import session from "fastify-session";
import cookie from "fastify-cookie";

import { setupRoutes } from "./routers";

const app = fastify({ logger: { prettyPrint: true } });

// TODO: CHANGE IN PRODUCTION
app.register(cors, { credentials: true, origin: "http://localhost:3000" });
app.register(cookie);
// TODO: CHANGE IN PRODUCTION
app.register(session, { secret: "eoiajonlkntoaierngoangnlkanekrgaeoijm;mkda" });

setupRoutes(app);

app.listen(process.env.PORT ?? 8080);

export { app };
