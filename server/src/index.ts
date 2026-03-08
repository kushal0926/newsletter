import "dotenv/config";
import { createServer } from "./server";
import { GCP_PROJECT_ID, PORT } from "./config/env.config";
import { GooglePubSubService } from "./services/pubsub/gcp";

const port = PORT || 8080;
const pubSub = new GooglePubSubService(GCP_PROJECT_ID as string);

const server = createServer(pubSub).listen(port, () => {
  console.log(`🚀 Server ready at: http://localhost:${port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.info("SIGTERM received");
  if (server) {
    server.close(() => {
      process.exit(0);
    });
  }
});
