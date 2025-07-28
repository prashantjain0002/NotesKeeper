import fs from "fs";
import path from "path";
import { transporter } from "./nodemailer.js";

export const sendOtpEmail = async (to, otp, name = "User") => {
  const templatePath = path.resolve("templates", "otp-template.html");
  const html = fs.readFileSync(templatePath, "utf8")
    .replace("{{otp}}", otp)
    .replace("{{name}}", name);

  const mailOptions = {
    from: `"HD App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your OTP Code - HD App",
    html,
  };

  return transporter.sendMail(mailOptions);
};
