import HttpStatus from "http-status";
import { Request, Response } from "express";
import { isPubSubPayload } from "../services/pubsub/gcp";
import { MailerService, SendConfirmEmailPayload } from "../services/mailer/type";
import { isEmailValid } from "../utils/email";

export const sendConfirmEmailHandler =
  (mailer: MailerService) => async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const verificationToken = process.env.PUBSUB_VERIFICATION_TOKEN;

      if (verificationToken) {
        const providedToken = req.header("x-goog-channel-token");
        if (providedToken !== verificationToken) {
          return res.status(HttpStatus.UNAUTHORIZED).json({
            success: false,
            message: "unauthorized",
          });
        }
      }

      if (!isPubSubPayload(body)) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: "invalid pubsub payload!",
        });
      }

      const {
        message: { data: encodedJsonObject },
      } = body;

      const decodedJson = Buffer.from(encodedJsonObject, "base64").toString(
        "utf-8",
      );

      let parsedPayload: SendConfirmEmailPayload;
      try {
        parsedPayload = JSON.parse(decodedJson) as SendConfirmEmailPayload;
      } catch {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: "invalid pubsub payload data",
        });
      }
      const { email, token } = parsedPayload;

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

      console.log("sendConfirmEmailHandler:", { email });

      await mailer.sendConfirmationEmail({ email, token });

      return res.status(HttpStatus.OK).json({ success: true });
    } catch (error) {
      console.error("pub/sub processing failed", error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "failed to process pubsub payload",
      });
    }
  };
