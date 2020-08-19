import * as nodemailer from "nodemailer";
import { Transporter } from "nodemailer";

export interface IMailer {
  /**
   * Send email message.
   */
  send({
    from,
    to,
    subject,
    html,
  }: {
    from: string;
    to: string;
    subject: string;
    html: string;
  }): Promise<void>;
}

/**
 * Mailer class to be used when developing the app.
 * Will use a basic gmail account to do the sending.
 */
export class DevMailer implements IMailer {
  private _transport: Transporter;

  /**
   * Class constructor.
   */
  constructor(user: string, pass: string) {
    this._transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user,
        pass,
      },
    });
  }

  async send({
    from,
    to,
    subject,
    html,
  }: {
    from: string;
    to: string;
    subject: string;
    html: string;
  }): Promise<void> {
    await this._transport.sendMail({
      from,
      to,
      subject,
      html,
    });
  }
}

/**
 * Concrete mailer class to be used in production
 * environment (using a mailing service like AWS SES).
 */
export class ProdMailer implements IMailer {
  /**
   * Class constructor.
   */
  constructor() {}

  /**
   * IMailer interface implementation.
   */
  async send({
    from,
    to,
    subject,
    html,
  }: {
    from: string;
    to: string;
    subject: string;
    html: string;
  }): Promise<void> {}
}
