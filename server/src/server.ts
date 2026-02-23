import express, { Express, Response, Request } from "express";
import { createHealthRouter } from "./routes/health.routes";
import signupRoutes from "./routes/signup.routes";
import cors from "cors";

const errorHandler = (error: Error, req: Request, res: Response) => {
  console.log(error);

  res.status(500).json({
    status: false,
    message: error.message || "internal server error",
  });
};

// the server singleton
let server: Express | null = null;

export const createServer = (): Express => {
  if (server) return server;

  server = express();

  // middleware setup
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cors());

  server.use("/", createHealthRouter());
  server.use("/newsletter/signup", signupRoutes);

  server.use((req, res, next) => {
    next(new Error("Not found"));
  });

  server.use(errorHandler);

  return server;
};

