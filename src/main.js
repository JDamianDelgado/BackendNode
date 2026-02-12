import express from "express";
import userRoutes from "./Routes/userRoutes.js";
import chatRoutes from "./Routes/chatRoutes.js";
import messagesRoutes from "./Routes/messagesRoutes.js";
import { DICCIONARIO_VAR } from "./config/diccionarioVariables.js";
import authRoutes from "./Routes/authRoutes.js";
import conexionBDD from "./config/conexionBDD.js";
import { requestSolicitud } from "./middleware/requestSolicitud.js";

conexionBDD();
const app = express();
app.use(express.json());
app.use(requestSolicitud);
// RUTAS //
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/messages", messagesRoutes);

// LISTEN
app.listen(DICCIONARIO_VAR.PORT, () => {
  console.log(`Servidor conectado a ${DICCIONARIO_VAR.PORT}`);
});
