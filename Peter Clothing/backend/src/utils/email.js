import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = env.smtpHost
  ? nodemailer.createTransport({
      host: env.smtpHost,
      port: env.smtpPort,
      secure: env.smtpPort === 465,
      auth: env.smtpUser ? { user: env.smtpUser, pass: env.smtpPass } : undefined,
    })
  : null;

export async function sendEmail({ to, subject, html }) {
  if (!transporter) {
    return;
  }

  await transporter.sendMail({
    from: env.mailFrom,
    to,
    subject,
    html,
  });
}