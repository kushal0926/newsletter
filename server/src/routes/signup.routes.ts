import { Router } from "express";
import { signupHandler } from "../controller/signup.controller";

const signupRoutes: Router = Router();

signupRoutes.post("/", signupHandler);

export default signupRoutes;
