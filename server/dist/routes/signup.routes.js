"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signup_controller_1 = require("../controller/signup.controller");
const signupRoutes = (0, express_1.Router)();
signupRoutes.post("/", signup_controller_1.signupHandler);
exports.default = signupRoutes;
//# sourceMappingURL=signup.routes.js.map