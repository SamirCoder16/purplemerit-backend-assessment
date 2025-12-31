import nodemailer from "nodemailer";
import { ENV } from "../lib/env.js";

const transporter = nodemailer.createTransport({
    host: ENV.HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: ENV.SMTP_USER, 
        pass: ENV.SMTP_PASS
    }
});

export default transporter;