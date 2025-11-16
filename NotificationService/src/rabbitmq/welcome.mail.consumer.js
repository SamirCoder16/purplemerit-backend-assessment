import amqp from 'amqplib';
import { ENV } from '../lib/env.js';
import { sendMailforWelcome } from '../utils/mail.js';

export const welcomeMailConsumer = async () => {
    try {
        const connection = await amqp.connect(ENV.RABBIT_MQ_URI);
        const channel = await connection.createChannel();

        await channel.assertQueue('mail_welcome_queue', { durable: true });
        console.log("Waiting for messages in mail_welcome_queue ...");
        channel.consume('mail_welcome_queue', async (msg) => {
            if(msg !== null){
                const messageContent = JSON.parse(msg.content.toString());
                console.log("Received welcome mail message:", messageContent);
                // Here you would integrate with an email service to send the welcome email
                await sendMailforWelcome({
                    to: messageContent.email,
                    subject: "Welcome to Our Service!",
                    html: `<p>Hello ${messageContent.name},</p><p>Welcome to our service! We're glad to have you on board.</p><p>Best regards,<br>The Team</p>`
                });
                
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('Error starting welcome mail consumer:', error);
    }
}