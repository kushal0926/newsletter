import { Router } from "express";
import { signupHandler } from "../controller/signup.controller";

export const createSignupRoutes = () => {
  const signupRoutes: Router = Router();

  signupRoutes.post("/signup", signupHandler);

  return signupRoutes;
};
