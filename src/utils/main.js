import  mongoose  from "mongoose";
import env from "../config/enviroment.config.js";
export async function connectMongo() {
  try {
    await mongoose.connect(env.mongoUrl,
			{
				dbName: "Geolocation",
			});
      console.log("Conexión con la base de datos exitosa!")
  } catch (e) {
    throw "Falló la conexion";
  }
}