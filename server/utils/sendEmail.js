// import fs from "fs";
// import path from "path";
// import sgMail from "@sendgrid/mail";
// import dotenv from "dotenv";

// dotenv.config();

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// export const sendOtpEmail = async (to, otp, name = "User") => {
//   const templatePath = path.resolve("templates", "otp-template.html");
//   const html = fs.readFileSync(templatePath, "utf8")
//     .replace("{{otp}}", otp)
//     .replace("{{name}}", name);

//   const msg = {
//     to,
//     from: {
//       name: "HD App",
//       email: process.env.EMAIL_FROM,
//     },
//     subject: "Your OTP Code - HD App",
//     html,
//   };

//   return sgMail.send(msg);
// };

import fs from "fs";
import path from "path";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendOtpEmail = async (to, otp, name = "User") => {
  try {
    // Validate environment variables
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error("SENDGRID_API_KEY is not set in environment variables");
    }
    if (!process.env.EMAIL_FROM) {
      throw new Error("EMAIL_FROM is not set in environment variables");
    }

    const templatePath = path.resolve("templates", "otp-template.html");
    const html = fs
      .readFileSync(templatePath, "utf8")
      .replace("{{otp}}", otp)
      .replace("{{name}}", name);

    const msg = {
      to,
      from: {
        name: "NotesKeeper App",
        email: process.env.EMAIL_FROM,
      },
      subject: "Your OTP Code - NotesKeeper App",
      html,
    };

    const result = await sgMail.send(msg);
    console.log("Email sent successfully");
    return result;
  } catch (error) {
    console.error("Failed to send email:", error);
    if (error.response) {
      console.error("SendGrid response:", error.response.body);
    }
    throw error;
  }
};
