import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST!,
    port: process.env.EMAIL_PORT!,
    auth: {
      user: process.env.EMAIL_USERNAME!,
      pass: process.env.EMAIL_PASSWORD!,
    },
  });

  const resetURL = `https://example.com/reset-password?token=${token}`;

  await transporter.sendMail({
    from: "Example App <noreply@example.com>",
    to: email,
    subject: "Password Reset Request",
    text: `Click the following link to reset your password: ${resetURL}`,
    html: `Click the following link to reset your password: <a href="${resetURL}">${resetURL}</a>`,
  });
};
