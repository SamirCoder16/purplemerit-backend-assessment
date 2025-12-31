import transporter from "../config/mail.js";
import { ENV } from "../lib/env.js";

const htmlTemplate = `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Password Reset OTP</title>
  </head>
  <body style="margin:0; padding:0; background:#f4f6f8; font-family:Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 0;">
          <table width="420" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; padding:24px; box-shadow:0 8px 24px rgba(0,0,0,0.08);">
            <tr>
              <td style="text-align:center;">
                <h2 style="margin:0 0 12px; color:#333;">Password Reset</h2>
                <p style="color:#555; font-size:14px;">
                  You requested to reset your password. Please use the OTP below:
                </p>

                <div style="margin:24px 0; padding:14px; background:#f1f5ff; border-radius:6px; font-size:22px; font-weight:bold; letter-spacing:3px; color:#2f54eb;">
                  {{OTP}}
                </div>

                <p style="font-size:13px; color:#777;">
                  This OTP is valid for <strong>10 minutes</strong>.
                </p>

                <p style="font-size:12px; color:#999; margin-top:24px;">
                  If you didn’t request this, you can safely ignore this email.
                </p>

                <hr style="border:none; border-top:1px solid #eee; margin:20px 0;" />

                <p style="font-size:11px; color:#aaa;">
                  © 2025 Neveremore. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

export const sendMail = async (to, subject, OTP) => {
  const mailOptions = {
    from: `no reply <${ENV.SENDER_MAIL}>`, // VERIFIED sender
    to,
    subject,
    html: htmlTemplate.replace("{{OTP}}", OTP),
  };

  try {
    console.log("📧 Sending mail to:", to);
    await transporter.sendMail(mailOptions);
    console.log("✅ Mail sent successfully to:", to);
  } catch (error) {
    console.log("❌ Mail failed:", error.message);
  }
};
