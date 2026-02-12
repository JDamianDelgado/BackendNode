import express from "express";
import { authorizationMiddleware } from "../middleware/authorizationMiddelware.js";
import {
  allMessages,
  deleteMessage,
  newMessage,
} from "../Controllers/message.controller.js";

const messagesRoutes = express.Router();

messagesRoutes.get("/:idChat", authorizationMiddleware, allMessages);
messagesRoutes.post("/:idChat", authorizationMiddleware, newMessage);
messagesRoutes.delete("/:idMessage", authorizationMiddleware, deleteMessage);
export default messagesRoutes;
