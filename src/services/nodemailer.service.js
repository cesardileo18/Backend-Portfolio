// EMAIL CON MODEMAILER
import nodemailer from "nodemailer";
import env from "../config/enviroment.config.js";

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: env.googleEmail,
    pass: env.googlePass,
  },
  tls: {
    rejectUnauthorized: false
  }
});
export default transport;