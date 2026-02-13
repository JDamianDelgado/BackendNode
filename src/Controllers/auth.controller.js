import express from "express";
import ServerError from "../Helper/serverError.js";
import { createUser, findByEmail } from "../Repository/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { DICCIONARIO_VAR } from "../config/diccionarioVariables.js";
import { User } from "../Models/users_models.js";

export async function register(req, res) {
  try {
    const { email, password } = req.body;
    const userExist = await findByEmail(email);
    if (userExist) {
      throw new ServerError("Usuario ya existente", 400);
    }
    const passwordCrypted = await bcrypt.hash(password, 10);
    const crearUsuario = await createUser(email, passwordCrypted);
    if (!crearUsuario) {
      throw new ServerError("No se pudo crear el usuario", 400);
    }
    return res.status(201).json({
      ok: true,
      status: 201,
      message: "Usuario creado exitosamente",
      data: crearUsuario._id,
    });
  } catch (error) {
    if (error.status) {
      res.status(error.status).json({
        ok: false,
        status: error.status,
        message: error.message,
      });
    } else {
      console.log("Error interno en el servidor", error);
      res.status(500).json({
        ok: false,
        status: 500,
        message: "Error en el servidor",
      });
    }
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email | !password) {
      throw new ServerError("faltan datos ", 404);
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new ServerError("Usuario no registrado", 404);
    }
    const samePassword = await bcrypt.compare(password, user.password);
    if (!samePassword) {
      throw new ServerError("Datos incorrectos", 401);
    }
    const auth_token = jwt.sign(
      {
        email,
        id: user._id,
        created_at: user.created_at,
      },
      DICCIONARIO_VAR.JWT_SECRET_KEY,
      { expiresIn: "1h" },
    );
    res.status(200).json({
      ok: true,
      status: 200,
      message: "Login exitoso",
      token: auth_token,
    });
  } catch (error) {
    if (error.status) {
      res.status(error.status).json({
        ok: false,
        status: error.status,
        message: error.message,
      });
    } else {
      console.log("Error interno en el servidor", error);
      res.status(500).json({
        ok: false,
        status: 500,
        message: "Error en el servidor",
      });
    }
  }
}
