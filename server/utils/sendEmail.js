import fs from "fs";
import path from "path";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendOtpEmail = async (to, otp, name = "User") => {
  const templatePath = path.resolve("templates", "otp-template.html");
  const html = fs.readFileSync(templatePath, "utf8")
    .replace("{{otp}}", otp)
    .replace("{{name}}", name);

  const msg = {
    to,
    from: {
      name: "HD App",
      email: process.env.EMAIL_FROM,
    },
    subject: "Your OTP Code - HD App",
    html,
  };

  return sgMail.send(msg);
};
