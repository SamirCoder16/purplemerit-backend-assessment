import amqp from "amqplib";
import { ENV } from "../lib/env.js";
import { sendMailforPasswordReset } from "../utils/mail.js";

export const forgotPasswordConsumer = async () => {
  try {
    const connection = await amqp.connect(ENV.RABBIT_MQ_URI);
    const channel = await connection.createChannel();

    await channel.assertQueue("mail_password_reset_queue", { durable: true });
    console.log("Waiting for messages in mail_password_reset_queue...");
    channel.consume("mail_password_reset_queue", async (msg) => {
      if (msg !== null) {
        const messageContent = JSON.parse(msg.content.toString());
        console.log("Received message:", messageContent);
        // Here you would integrate with an email service to send the email
        await sendMailforPasswordReset({
          to: messageContent.email,
          subject: "Password Reset Request",
          html: `
            <p>Hi ${messageContent.name || "User"},</p>
            <p>Your OTP for password reset is: <strong>${
              messageContent.otp
            }</strong></p>
            <p>This OTP is valid for 15 minutes. Do not share it with anyone.</p>
          `,
        });
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error("Error starting RabbitMQ consumer:", error);
  }
};
