import express from "express";
import "express-async-errors";
import env from "./config/enviroment.config.js";
import { sendEmailRouter } from "./routes/correo.roter.js";
import CustomError from "./services/errors/custom-error.js";
import { errorHandler } from "./middlewares/main.js";
import cors from "cors"; // Importa el paquete cors
import { connectMongo } from "./utils/main.js";
import { visitRouter } from "./routes/visit.router.js";
// CONFIG BASICAS Y CONEXION A DB
const app = express();
// app.use(compression({ brotli: { enabled: true, zlib: {} } }));
const PORT = env.port;
connectMongo();

// Habilita CORS
app.use(cors());
  // MIDDLEWARES BASICOS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", sendEmailRouter);
app.use("/api", visitRouter)
const port = PORT || 3000;
app.listen(port, () => {
  //`Levantando en puerto http://localhost:${PORT}`
  console.log(`Servidor en funcionamiento http://localhost:${port}`);
});
app.get("*", (req, res, next) => {
    try {
      CustomError.createError({
        name: "Page Not Found",
        cause: "Non existent path",
        message: "The path you are trying to access does not exist",
        code: Errors.ROUTING_ERROR,
      });
    } catch (error) {
      next(error);
    }
  });
app.use(errorHandler);
