import { Request, Response } from "express";
import { isEmailValid } from "../utils/email";
import { upsertSubscriber } from "../services/newsletter";
import HttpStatus from "http-status";
import { PubSubService } from "src/services/pubsub/type";

interface SignupPayload {
  email?: string;
}

export const signupHandler = (pubSub: PubSubService) => async (req: Request, res: Response) => {
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
    
    // publish a notification pub/sub topic
    await pubSub.publish("newsletter-signup", { data: "signup done!"})

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
