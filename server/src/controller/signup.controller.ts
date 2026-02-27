import { Request, Response } from "express";
import { isEmailValid } from "../utils/email";
import { upsertSubscriber } from "../services/newsletter";

interface SignupPayload {
  email?: string;
}

export const signupHandler = async (req: Request, res: Response) => {
  try {
    // getting the email from the request
    const { email = "" } = req.body as SignupPayload;

    // validating the email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "email is required!",
      });
    }

    if (!isEmailValid(email)) {
      return res.status(400).json({
        success: false,
        message: "email is not valid",
      });
    }

    // creating user newsletter_subscriber
    const newsletterSubscriber = await upsertSubscriber(email);

    console.log("signup successful");

    return res.status(200).json(newsletterSubscriber);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "failed to upsert subscriber",
    });
  }
};
