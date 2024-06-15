import { Schema, model } from "mongoose";

const visitSchema = new Schema({
  ip: String,
  country: String,
  city: String,
  lat: Number,
  long: Number,
  date: String
});


export const VisitMongoose = model("visit", visitSchema);