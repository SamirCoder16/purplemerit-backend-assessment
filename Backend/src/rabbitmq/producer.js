import amqp from 'amqplib';
import { ENV } from '../lib/env.js';

let channel;

export const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(ENV.RABBITMQ_URL); // connect to RabbitMQ server
        channel = await connection.createChannel(); // create a channel

        const exchange = 'mail_exchange';
        const routingKeyforPasswordMail = 'send_mail_password_reset';
        const routingKeyforWelcomeMail = 'send_mail_welcome';

        await channel.assertExchange(exchange, 'direct', { durable: true });
        await channel.assertQueue("mail_password_reset_queue", { durable: true });
        await channel.assertQueue("mail_welcome_queue", { durable: true });

        // Bind the password reset routing key
        await channel.bindQueue("mail_password_reset_queue", exchange, routingKeyforPasswordMail);
        // Bind the welcome email routing key
        await channel.bindQueue("mail_welcome_queue", exchange, routingKeyforWelcomeMail);


        console.log("RabbitMQ connected and exchange/queue asserted.");

    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
    }
}

export const sendToQueue = async (exchange, routingKey, message) => {
    try {
        if (!channel){
            throw new Error('RabbitMQ channel is not established. Call connection function first.');
        }
        channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)), {
            persistent: true
        });
        console.log(`Message sent to exchange "${exchange}" with routing key "${routingKey}":`, message);
    } catch (error) {
        console.log('Error sending message to RabbitMQ:', error);
    }
}
