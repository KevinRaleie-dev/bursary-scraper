import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import morgan from "morgan";
import { default as bursary, default as health_check } from "./routes/bursary.route";
import course from "./routes/course.route";
import courses from "./routes/courses.route"

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
app.use("/course", course)
app.use("/courses", courses)
