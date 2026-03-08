import express from "express";
import type { Express, Response, Request } from "express";
import { createHealthRouter } from "./routes/health.routes";
import { createSignupRoutes } from "./routes/signup.routes";
import cors from "cors";
import { PubSubService } from "./services/pubsub/type";

const errorHandler = (error: Error, req: Request, res: Response) => {
  console.log(error);

  res.status(500).json({
    status: false,
    message: error.message || "internal server error",
  });
};

export const createServer = (pubSub: PubSubService): Express => {
  const server: Express = express();

  // middleware setup
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cors());

  server.use("/api", createHealthRouter());
  server.use("/api/newsletter", createSignupRoutes(pubSub));

  server.use((req, res, next) => {
    next(new Error("Not found"));
  });

  server.use(errorHandler);

  return server;
};
