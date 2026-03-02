import { Router } from "express";
import { signupHandler } from "../controller/signup.controller";

const signupRoutes: Router = Router();

signupRoutes.post("/signup", signupHandler);

export default signupRoutes;
