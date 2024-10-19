import nodemailer from "nodemailer";

export const sendEmail = async (options: {
  to: string;
  subject: string;
  html: string;
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDING_EMAIL,
      pass: process.env.SENDING_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SENDING_EMAIL,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};
