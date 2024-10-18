import { InversifyExpressServer } from "inversify-express-utils";
import cors from "cors";
import express from "express";
import { errorHandler } from "./utils/errorHandler";
import container from "./config/inversify.config";

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(cors());
  app.use(express.json());
});

server.setErrorConfig((app) => {
  app.use(errorHandler);
});

const app = server.build();

export default app;
