import express from "express";
import { sendMails } from "../controllers/correo.controller.js";
export const sendEmailRouter = express.Router();

sendEmailRouter.post('/enviar-correo', sendMails);