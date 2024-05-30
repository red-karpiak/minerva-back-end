import express from "express";
import routes from "./routes/index";
import errorHandler from "./middleware/errorHandler";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(routes);
  app.use(errorHandler);
  return app;
}
