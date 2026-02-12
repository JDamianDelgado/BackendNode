import { DICCIONARIO_VAR } from "../config/diccionarioVariables.js";
import ServerError from "../Helper/serverError.js";
import jwt from "jsonwebtoken";

export function authorizationMiddleware(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw new ServerError("Token no valido ", 401);
    }

    const auth_token = authorizationHeader.split(" ")[1];
    if (!auth_token) {
      throw new ServerError("No hay token", 401);
    }

    const payload = jwt.verify(auth_token, DICCIONARIO_VAR.JWT_SECRET_KEY);

    if (!payload) {
      throw new ServerError("Token no valido ", 401);
    }
    req.user = payload;
    next();
  } catch (error) {
    if (error.status) {
      res.status(error.status).json({
        ok: false,
        status: error.status,
        message: error.message,
      });
    } else {
      res.status(500).json({
        ok: false,
        status: 500,
        message: "Error en el servidor",
      });
    }
  }
}
