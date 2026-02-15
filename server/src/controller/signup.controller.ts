import { Request, Response } from "express";
import { isEmailValid } from "../utils/email";

interface SignupPayload {
  email?: string;
}

export const signupHandler = async (req: Request, res: Response) => {
  try {
    // getting the email from the request
    const { email = "" } = req.body as SignupPayload;

    // validating the email
    if (!email) {
      throw new Error("email is required!");
    }

    if (!isEmailValid(email)) {
      throw new Error("email is not valid");
    }

    return res.status(200).json({ message: "ok" });
  } catch (error) {
    console.log(error);
    throw new Error()
  }
};
