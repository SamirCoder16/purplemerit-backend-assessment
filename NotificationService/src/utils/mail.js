import nodemailer from "nodemailer";
import { ENV } from "../lib/env.js";

export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "875ed4001@smtp-brevo.com",
    pass: ENV.BREVO_SMTP_API_KEY,
  },
});

export const sendMailforWelcome = async ({ to, subject, html }) => {
  try {
    const mailOptions = await transporter.sendMail({
      from: ENV.SENDER_MAIL,
      to,
      subject,
      html,
    });
    console.log("Email sent:", mailOptions.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sendMailforPasswordReset = async ({ to, subject, html }) => {
  try {
    const mailOptions = await transporter.sendMail({
      from: ENV.SENDER_MAIL,
      to,
      subject,
      html,
    });
    console.log("Password reset email sent:", mailOptions.messageId);
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
};
