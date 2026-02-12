import { Chat } from "../Models/chats_models.js";
import { Messages } from "../Models/messages_models.js";

export async function allMessages(req, res) {
  try {
    const { idChat } = req.params;
    if (!idChat) {
      throw new ServerError("Falta el id del chat", 404);
    }
    const findMessages = await Messages.find({ chat_id: idChat });
    if (!findMessages) {
      throw new ServerError("No se pudo encontrar el chat", 404);
    }

    return res.status(201).json({
      ok: true,
      status: 201,
      message: "Chat encontrado exitosamente",
      data: { findMessages },
    });
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
//ok
export async function newMessage(req, res) {
  console.log("data", req.params, req.body, req.user.id);
  try {
    const { idChat } = req.params;
    const { contenido } = req.body;
    const userId = req.user.id;

    if (!idChat || !contenido || !userId) {
      throw new ServerError("Faltan datos", 400);
    }

    const chat = await Chat.findById(idChat);
    if (!chat) {
      throw new ServerError("Chat no encontrado", 404);
    }

    if (!chat.users.some((id) => id.toString() === userId)) {
      throw new ServerError("No autorizado para este chat", 403);
    }

    const newMessage = await Messages.create({
      chat_id: chat._id,
      sender_id: userId,
      contenido: contenido,
    });

    return res.status(201).json({
      ok: true,
      status: 201,
      message: "Mensaje enviado",
      data: newMessage._id,
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({
        ok: false,
        status: error.status,
        message: error.message,
      });
    } else {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: "Error en el servidor",
      });
    }
  }
}
//ok
export async function deleteMessage(req, res) {
  try {
    const userId = req.user.id;
    const { idMessage } = req.params;
    const findMessage = await Messages.findById(idMessage);
    if (!findMessage) {
      throw new ServerError("No se pudo encontrar el mensaje", 404);
    }
    const chat = await Chat.findById(findMessage.chat_id);
    if (!chat) {
      throw new ServerError("No se pudo encontrar el chat", 404);
    }
    if (!chat.users.some((id) => id.toString() === userId)) {
      throw new ServerError("No autorizado para este chat", 403);
    }
    await Messages.findByIdAndDelete(idMessage);
    return res.status(201).json({
      ok: true,
      status: 201,
      message: "Mensaje eliminado exitosamente",
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({
        ok: false,
        status: error.status,
        message: error.message,
      });
    } else {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: "Error en el servidor",
      });
    }
  }
}

//ok
