import { createTransport } from "nodemailer";

//Real Intergration
const transport = createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT),
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

// Send verification email
export async function sendAccountVerificationEmail(
  email: string,
  code: string,
  name: string,
  expires: Date
) {
  try {
    const mail = await transport.sendMail({
      from: process.env.MAILTRAP_FROM!, // e.g., 'noreply@yourdomain.com'
      to: [email],
      subject: "Verify Your Account",
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #333; margin-bottom: 10px;">Verify Your Account</h1>
          </div>

          <div style="background-color: #f8f9fa; padding: 30px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-bottom: 15px;">Hello ${name}!</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Thank you for signing up! Please use the verification code below to complete your account setup:
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <span style="display: inline-block; background-color: #007bff; color: white; font-size: 32px; font-weight: bold; padding: 15px 30px; border-radius: 6px; letter-spacing: 2px;">
                ${code}
              </span>
            </div>

            <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
              This code will expire in ${expires} for your security.
            </p>

            <p style="color: #666; line-height: 1.6;">
              If you didn't create an account, you can safely ignore this email.
            </p>
          </div>

          <div style="text-align: center; color: #888; font-size: 14px;">
            <p>This is an automated message, please do not reply to this email.</p>
          </div>
        </div>
      `,
      text: `
        Hello ${name}!

        Thank you for signing up! Please use the verification code below to complete your account setup:

        Verification Code: ${code}

        This code will expire in 24 hours for your security.

        If you didn't create an account, you can safely ignore this email.
      `,
    });

    if (mail.rejected && mail.rejected.length > 0) {
      console.error("❌ Email sending failed:", mail.messageId);
      return { success: false, error: "Email did not send." };
    }

    console.log("✅ Verification email sent successfully:", mail.messageId);
    return { success: true, emailId: mail.messageId };
  } catch (error) {
    console.error("❌ Email sending error:", error);
    return { success: false, error: "Failed to send verification email" };
  }
}
