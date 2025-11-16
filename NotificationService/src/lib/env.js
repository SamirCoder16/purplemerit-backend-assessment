import 'dotenv/config';

export const ENV = {
    PORT: process.env.PORT || 4002,
    RABBIT_MQ_URI: process.env.RABBIT_MQ_URI || 'amqp://localhost:5672',
    BREVO_SMTP_API_KEY: process.env.BREVO_SMTP_API_KEY || '',
    SENDER_MAIL: process.env.SENDER_MAIL || ''
}