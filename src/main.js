import express from "express";
import userRoutes from "./Routes/userRoutes.js";
import chatRoutes from "./Routes/chatRoutes.js";
import messagesRoutes from "./Routes/messagesRoutes.js";
import { DICCIONARIO_VAR } from "./config/diccionarioVariables.js";
import authRoutes from "./Routes/authRoutes.js";
import conexionBDD from "./config/conexionBDD.js";
import { requestSolicitud } from "./middleware/requestSolicitud.js";
import endpointRoutes from "./Routes/Endpoints.js";

conexionBDD();
const app = express();
app.use(express.json());
app.use(requestSolicitud);
// RUTAS //
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/", endpointRoutes);
// LISTEN
const PORT = DICCIONARIO_VAR.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

export default app;
