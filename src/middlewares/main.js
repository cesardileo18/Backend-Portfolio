
import Errors from "../services/errors/enums.js";

export function errorHandler(error, req, res, next) {

  switch (error.code) {
    case Errors.ROUTING_ERROR:
      const notFound = "Esta página no existe";
      return res.status(404).render("error", { notFound });
    case Errors.ID_ERROR:
      const errorId = "El ID ingresado no existe";
      return res.status(404).render("error", { errorId });
    default:
      res.status(500).send({ status: "error", error: "Unhandled error" });
      break;
  }
}
