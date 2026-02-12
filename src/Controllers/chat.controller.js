import { Chat } from "../Models/chats_models.js";
import { Messages } from "../Models/messages_models.js";
import { User } from "../Models/users_models.js";

export async function crearChat(req, res) {
  try {
    const { id } = req.user;
    const findUser = await User.findById(id);
    if (!findUser) {
      throw new ServerError("No se pudo encontrar el usuario", 404);
    }
    const { id2 } = req.body;
    if (!id2) {
      throw new ServerError("Falta el id del usuario", 404);
    }
    const findUser2 = await User.findById(id2);
    if (!findUser2) {
      throw new ServerError("No se pudo encontrar el usuario", 404);
    }
    const chat = await Chat.create({
      users: [id, id2],
      creado: new Date(),
    });
    if (!chat) {
      throw new ServerError("No se pudo crear el chat", 404);
    }
    return res.status(201).json({
      ok: true,
      status: 201,
      message: "Chat creado exitosamente",
      data: {
        chat_id: chat._id,
        users: chat.users,
      },
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
export async function allChats(req, res) {
  console.log("llegamos a allchats");
  try {
    const { id } = req.user;
    if (!id) {
      throw new ServerError("Falta el id del usuario", 404);
    }
    const findchat = await Chat.find({ users: id });
    if (findchat.length === 0) {
      throw new ServerError("No se pudieron encontrar chats", 404);
    }

    return res.status(201).json({
      ok: true,
      status: 201,
      message: "busqueda de chats exitosa",
      data: findchat,
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

export async function chatByIdContact(req, res) {
  try {
    const { id } = req.user;
    const { idContact } = req.params;
    const findChat = await Chat.findOne({
      users: { $all: [id, idContact] },
    });
    if (!findChat) {
      throw new ServerError("No se pudo encontrar el chat", 404);
    }

    const messages = await Messages.find({ chat_id: findChat._id });

    return res.status(201).json({
      ok: true,
      status: 201,
      message: "Chat encontrado exitosamente",
      data: {
        chat_id: findChat._id,
        users: findChat.users,
        messages: messages,
      },
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

export async function chatByIdChat(req, res) {
  console.log("controller");
  try {
    const { idChat } = req.params;
    const userId = req.user.id;

    const findChat = await Chat.findById(idChat);
    if (!findChat) {
      throw new ServerError("No se pudo encontrar el chat", 404);
    }
    if (!findChat.users.some((id) => id.toString() === userId)) {
      throw new ServerError("No autorizado para este chat", 403);
    }
    const messages = await Messages.find({ chat_id: findChat._id }).sort({
      created_at: 1,
    });

    return res.status(201).json({
      ok: true,
      status: 201,
      message: "Chat encontrado exitosamente",
      data: {
        chat_id: findChat._id,
        users: findChat.users,
        messages: messages,
      },
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

export async function deleteChat(req, res) {
  try {
    const userId = req.user.id;
    const { idChat } = req.params;
    if (!userId || !idChat) {
      throw new ServerError("Faltan datos", 400);
    }
    const chat = await Chat.findById(idChat);
    if (!chat) {
      throw new ServerError("Chat no encontrado", 404);
    }
    if (!chat.users.some((id) => id.toString() === userId)) {
      throw new ServerError("No autorizado para este chat", 403);
    }
    await Messages.deleteMany({ chat_id: idChat });

    await Chat.findByIdAndDelete(idChat);
    return res.status(201).json({
      ok: true,
      status: 201,
      message: "Chat eliminado exitosamente",
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
