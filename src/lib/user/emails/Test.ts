import { createTransport } from "nodemailer";

//Test Intergration
const transport = createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "951890acb589ec", // Replace with your actual username from Mailtrap
    pass: "fe7d47414b0e55", // Replace with your actual password from Mailtrap
  },
});

const sender = {
  address: "lerumo.it@gmail.com",
  name: "Mailtrap Test",
};
//const recipients = ["lerumo.it@gmail.com"];

export async function sendTestVerificationEmail(
  email: string,
  name: string,
  code: string,
  expires: Date
) {
  try {
    console.log("📧 Attempting to send email to:", email);

    const mail = await transport.sendMail({
      from: sender,
      to: email, // Use the email parameter, not the recipients array
      subject: `Verification Code for ${name}`,
      text: `Hi ${name},\n\nYour verification code is: ${code}\n\nThis code will expire at ${expires.toLocaleString()}\n\nBest regards,\nMailtrap Test`,
      html: `
        <h2>Hi ${name},</h2>
        <p>Your verification code is: <strong>${code}</strong></p>
        <p>This code will expire at ${expires.toLocaleString()}</p>
        <p>Best regards,<br>Mailtrap Test</p>
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
