import { Router } from "express";
import { signupHandler } from "../controller/signup.controller";
import { PubSubService } from "src/services/pubsub/type";

export const createSignupRoutes = (pubSub: PubSubService) => {
  const signupRoutes: Router = Router();

  signupRoutes.post("/signup", signupHandler(pubSub));

  return signupRoutes;
};
