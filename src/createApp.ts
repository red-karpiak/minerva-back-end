import express from "express";
import routes from "./routes/index";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(routes);
  app.use(errorHandler);
  return app;
}
