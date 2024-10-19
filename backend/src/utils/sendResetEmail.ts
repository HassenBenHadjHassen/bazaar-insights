import { sendEmail } from "../services/EmailService";

export const sendResetEmail = async (
  email: string,
  token: string
): Promise<void> => {
  const resetLink = `https://bazaar.hassenbenhadjhassen.com/reset-password?token=${token}`;

  const emailContent = `
    <p>Hello,</p>
    <p>You requested to reset your password. Click the link below to set a new password:</p>
    <a href="${resetLink}">${resetLink}</a>
    <p>If you did not request this, please ignore this email.</p>
  `;

  await sendEmail({
    to: email,
    subject: "Password Reset Request",
    html: emailContent,
  });
};
