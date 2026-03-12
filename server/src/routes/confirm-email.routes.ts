import { Router } from "express";
import { confirmEmailHandler } from "../controller/confirm-email.controller";
import { MailerService } from "../services/mailer/type";

export const createConfirmEmailRoutes = (mailer: MailerService) => {
  const confirmRoutes: Router = Router();

  confirmRoutes.post("/confirm-email", confirmEmailHandler(mailer));

  return confirmRoutes;
};
