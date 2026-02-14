import express from "express";

const endpointRoutes = express.Router();

export default endpointRoutes;

endpointRoutes.get("/", (req, res) => {
  res.status(200).json({
    message: "Bienvenido a API REST para chat",
    endpoints: {
      auth: {
        register: "POST /api/auth/register",
        login: "POST /api/auth/login",
      },
      users: {
        allUsers: "GET /api/users/allUsers",
        deleteUser: "POST /api/users/delete/:id",
      },
      chat: {
        create: "POST /api/chat/",
        getAll: "GET /api/chat/",
        getById: "GET /api/chat/:idChat",
        getByContact: "GET /api/chat/contacto/:idContact",
        delete: "DELETE /api/chat/:idChat",
      },
      messages: {
        getByChat: "GET /api/messages/:idChat",
        create: "POST /api/messages/:idChat",
        delete: "DELETE /api/messages/:idMessage",
      },
    },
  });
});
endpointRoutes.get("/test", (req, res) => {
  res.status(200).json({
    message: "Test a rutas funcionando",
  });
});
