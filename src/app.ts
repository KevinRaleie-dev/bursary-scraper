import express from "express";
import cors from "cors";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";
import bursary from "./routes/bursary.route";
import health_check from "./routes/bursary.route";

export const app = express();

app.use(
  cors({
    origin: [
      process.env.PROD_CLIENT_URL as string,
      process.env.DEV_CLIENT_URL as string,
    ],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
  })
);

app.use("/health-check", health_check);
app.use("/bursaries", bursary);
