import express from 'express';
import 'dotenv/config';
import { ENV } from './lib/env.js';
import { forgotPasswordConsumer } from './rabbitmq/forgot.password.consumer.js';
import { welcomeMailConsumer } from './rabbitmq/welcome.mail.consumer.js';

const PORT = ENV.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req,res) => {
    res.send('Notification Service is running');
});

app.listen(PORT, "0.0.0.0", async () => {
    await forgotPasswordConsumer();
    await welcomeMailConsumer();
    console.log(`Notification Service is running on port ${PORT}`);
})