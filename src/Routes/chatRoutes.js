import express from "express";
import { authorizationMiddleware } from "../middleware/authorizationMiddelware.js";
import {
  allChats,
  chatByIdChat,
  chatByIdContact,
  crearChat,
  deleteChat,
} from "../Controllers/chat.controller.js";

const chatRoutes = express.Router();

chatRoutes.post("/", authorizationMiddleware, crearChat);
chatRoutes.get("/", authorizationMiddleware, allChats);
chatRoutes.get("/:idChat", authorizationMiddleware, chatByIdChat);
chatRoutes.delete("/:idChat", authorizationMiddleware, deleteChat);
chatRoutes.get(
  "/contacto/:idContact",
  authorizationMiddleware,
  chatByIdContact,
);
export default chatRoutes;
