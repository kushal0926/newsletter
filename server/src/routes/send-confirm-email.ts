import { Router } from "express";
import { sendConfirmEmailHandler } from "../controller/send.confirm.controller";
import { MailerService } from "../services/mailer/type";

export const createSendConfirmRoutes = (mailer: MailerService) => {
  const sendConfirmRoutes: Router = Router();

  sendConfirmRoutes.post(
    "/send-confirm-email",
    sendConfirmEmailHandler(mailer),
  );

  return sendConfirmRoutes;
};
