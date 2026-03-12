import { APP_URL } from "../../config/env.config";
import {
  MailerService,
  SendConfirmEmailPayload,
  SendWelcomeEmailPayload,
} from "./type";
import { Resend } from "resend";

interface ResendServiceConfig {
  sender: string;
  apiKey: string;
}

export class ResendService implements MailerService {
  private resend: Resend;
  private readonly sender: string;

  constructor({ sender, apiKey }: ResendServiceConfig) {
    this.resend = new Resend(apiKey);
    this.sender = sender;
  }

  async sendConfirmationEmail({ email, token }: SendConfirmEmailPayload) {
    console.log("resendService: sending confirmation email");

    if (!email || !token) {
      throw new Error("email and token are required");
    }

    const link = `${APP_URL}/confirm-email?token=${encodeURIComponent(
      token,
    )}&email=${encodeURIComponent(email)}`;

    await this.resend.emails.send({
      from: this.sender,
      to: email,
      subject: "confirmation email",
      html: `
             <p>Please confirm your email:</p>
             <a href="${link}">${link}</a>
           `,
    });
  }

  async sendWelcomeEmail({ email }: SendWelcomeEmailPayload): Promise<void> {
    console.log("resendService: sending welcome email");

    if (!email) {
      throw new Error("email is required");
    }

    await this.resend.emails.send({
      from: this.sender,
      to: email,
      subject: "welcome email",
      html: `<p>welcome to our newsletter</p>`,
    });
  }
}
