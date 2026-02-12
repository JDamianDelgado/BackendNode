import ServerError from "../Helper/serverError.js";
import { User } from "../Models/users_models.js";

export async function allUsers(req, res) {
  try {
    const users = await User.find();
    if (!users) {
      throw new ServerError("No se pudo conseguir listado de contactos", 400);
    }
    return res.status(201).json({
      ok: true,
      status: 201,
      message: "Lista de contactos",
      data: { users },
    });
  } catch (error) {
    if (res.status) {
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

export async function deleteUser(req, res) {
  try {
    const { id } = req.body;
    const users = await User.findById(id);
    if (!users) {
      throw new ServerError("No se encontro usuario", 401);
    }
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      throw new ServerError("No se pudo eliminar usuario", 404);
    }
    return res.status(201).json({
      ok: true,
      status: 201,
      message: `usuario ${users} eliminado`,
      data: null,
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
        message: "No se pudo eliminar usuario",
      });
    }
  }
}
