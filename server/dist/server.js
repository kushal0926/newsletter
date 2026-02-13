"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const health_1 = require("./routes/health");
const errorHandler = (error, req, res) => {
  console.log(error);
  res.status(500).json({
    status: false,
    message: error.message || "internal server error",
  });
};
// the server singleton
let server = null;
const createServer = () => {
  if (server) return server;
  server = (0, express_1.default)();
  // middleware setup
  server.use(express_1.default.json());
  server.use(express_1.default.urlencoded({ extended: true }));
  server.use("/", (0, health_1.createHealthRouter)());
  server.use((req, res, next) => {
    next(new Error("Not found"));
  });
  server.use(errorHandler);
  return server;
};
exports.createServer = createServer;
//# sourceMappingURL=server.js.map
