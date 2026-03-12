import express from "express";
import type { Express, Response, Request, NextFunction } from "express";
import { createHealthRouter } from "./routes/health.routes";
import { createSignupRoutes } from "./routes/signup.routes";
import { createConfirmEmailRoutes } from "./routes/confirm-email.routes";
import cors from "cors";
import { PubSubService } from "./services/pubsub/type";
import { MailerService } from "./services/mailer/type";
import { createSendConfirmRoutes } from "./routes/send-confirm-email";

interface CreateServerParams {
  pubSub: PubSubService;

  mailer: MailerService;
}

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(error);

  const statusCode = error.message === "Not found" ? 404 : 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || "internal server error",
  });

  next()
};

export const createServer = ({
  pubSub,
  mailer,
}: CreateServerParams): Express => {
  const server: Express = express();

  // middleware setup
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cors());

  server.use("/api", createHealthRouter());
  server.use("/api/newsletter", createSignupRoutes(pubSub));
  server.use("/api/newsletter", createSendConfirmRoutes(mailer));
  server.use("/api/newsletter", createConfirmEmailRoutes(mailer));

  server.use((req, res, next) => {
    next(new Error("Not found"));
  });

  server.use(errorHandler);

  return server;
};
