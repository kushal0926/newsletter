import HttpStatus from "http-status";
import type { Request, Response } from "express";
import { confirmSubscriber } from "../services/newsletter";
import { MailerService } from "../services/mailer/type";
import { isEmailValid } from "../utils/email";

interface ConfirmEmailPayload {
  email?: string;
  token?: string;
}

export const confirmEmailHandler =
  (mailer: MailerService) => async (req: Request, res: Response) => {
    try {
      const { email, token } = req.body as ConfirmEmailPayload;

      if (!email || !token) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: "email and token are required",
        });
      }

      if (!isEmailValid(email)) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: "email is not valid",
        });
      }

      const confirmed = await confirmSubscriber(email, token);
      if (!confirmed) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: "invalid or expired confirmation link",
        });
      }

      try {
        await mailer.sendWelcomeEmail({ email });
      } catch (error) {
        console.error("welcome email failed", error);
      }

      return res.status(HttpStatus.OK).json({
        success: true,
        message: "email confirmed",
      });
    } catch (error) {
      console.error("confirm email failed", error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "failed to confirm email",
      });
    }
  };
