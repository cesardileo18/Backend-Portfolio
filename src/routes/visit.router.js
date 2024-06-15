import express from "express";
import { visitController } from "../controllers/visit.controller.js";
export const visitRouter = express.Router();

visitRouter.get('/visit', visitController.trackVisit);