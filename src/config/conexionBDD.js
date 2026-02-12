import mongoose from "mongoose";
import { DICCIONARIO_VAR } from "./diccionarioVariables.js";
async function conexionBDD() {
  try {
    await mongoose.connect(DICCIONARIO_VAR.MONGO_DB_CONNECTION_STRING);
    console.log("Conectado a la Base de datos ");
  } catch (error) {
    console.log(`No se pudo conectar a BDD ${error}`);
  }
}

export default conexionBDD;
