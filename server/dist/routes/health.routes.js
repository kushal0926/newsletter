"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHealthRouter = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const http_status_1 = tslib_1.__importDefault(require("http-status"));
const createHealthRouter = () => {
    const healthRouter = express_1.default.Router();
    healthRouter.get("/health", (_, res) => res.status(http_status_1.default.OK).send("ok"));
    return healthRouter;
};
exports.createHealthRouter = createHealthRouter;
//# sourceMappingURL=health.routes.js.map