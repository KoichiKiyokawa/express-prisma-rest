import express from "express";
import session from "express-session";
import { SESSION_SECRET } from "./env";
import { setupRoutes } from "./routers";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // secure: trueの場合、httpだとcookieに書き込めない。
    cookie: { secure: process.env.NODE_ENV === "production", httpOnly: true },
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    preflightContinue: true,
  })
);

setupRoutes(app);

app.listen(process.env.PORT ?? 8080, console.log);
