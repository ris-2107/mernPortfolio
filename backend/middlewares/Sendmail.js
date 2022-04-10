import { createTransport } from "nodemailer";

export const sendmail = async (text) => {
  const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    subject: " CONTACT REQUEST from Portfolio Website ",
    to: process.env.MYMAIL,
    from: process.env.MYMAIL,
    text,
  });
};
