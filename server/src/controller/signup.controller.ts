import { Request, Response } from "express";
import { isEmailValid } from "../utils/email";
import { upsertSubscriber } from "../services/newsletter";
import HttpStatus from "http-status";

interface SignupPayload {
  email?: string;
}

export const signupHandler = async (req: Request, res: Response) => {
  try {
    // getting the email from the request
    const { email = "" } = req.body as SignupPayload;

    // validating the email
    if (!email) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "email is required!",
      });
    }

    if (!isEmailValid(email)) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "email is not valid",
      });
    }

    // creating user newsletter_subscriber
    const newsletterSubscriber = await upsertSubscriber(email);

    console.log("signup successful");

    return res.status(HttpStatus.OK).json(newsletterSubscriber);
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "failed to upsert subscriber",
    });
  }
};
