# 📘 Trabajo Final Integrador – Desarrollo en Node.js

## Desarrollo de API para Clon de Chat

Este proyecto corresponde al **Trabajo Final Integrador de la Unidad Desarrollo en Node** de la Diplomatura Full Stack.

Se desarrolló una **API para clon de chat** utilizando una arquitectura basada en **modelos, rutas , controladores y repositorios**,

Esta API permite gestionar un sistema de mensajería entre usuarios.
Incluye:

- Registro e inicio de sesión (JWT)
- Gestión de usuarios
- Creación y eliminación de chats
- Envío y eliminación de mensajes

## Tecnologías Utilizadas

- Node.js
- Express
- MongoDB Atlas
- JWT (JsonWebToken)

Finalmente, el proyecto fue **desplegado en la plataforma Vercel**, permitiendo su acceso y acceso en línea.

---

## Como ver el proyecto

1. Clonar repositorio

```
 git clone https://github.com/JDamianDelgado/BackendNode.git
```

2. Instalar dependencias

```
npm install
```

3. Configurar las variables de entorno.
   Crear un archivo '.env';

```
PORT= *****
MONGO_DB_CONNECTION_STRING= *******
JWT_SECRET = *******
```

4. Ejecutar el Proyecto

```
npm run dev
```

El proyecto debe correr localmente en 'http://localhost:8080' por defecto

Desplegado en : [Vercel](https://backend-node-murex.vercel.app/)

## Rutas

# 🔐 AUTENTICACIÓN

Base: `/api/auth`

| Método | Endpoint             | Descripción       | Body            |
| ------ | -------------------- | ----------------- | --------------- |
| POST   | `/api/auth/register` | Registrar usuario | email, password |
| POST   | `/api/auth/login`    | Iniciar sesión    | email, password |

### 📌 Ejemplo Login

#### Request

```json
POST /api/auth/login
{
  "email": "usuario@gmail.com",
  "password": "123456"
}
```

#### Response

```json
{
 "ok": true,
 "status": 200,
 "message" : "Login exitoso",
 "token": {"token"}
 }
```

---

# 👤 USERS

Base: `/api/users`

| Método | Endpoint                | Descripción                |
| ------ | ----------------------- | -------------------------- |
| GET    | `/api/users/allUsers`   | Obtener todos los usuarios |
| POST   | `/api/users/delete/:id` | Eliminar usuario por ID    |

---

# 💬 CHAT (🔒 Requiere Token)

Base: `/api/chat`

Header obligatorio:

```
Authorization: Bearer TU_TOKEN
```

| Método | Endpoint                        | Descripción               | Body |
| ------ | ------------------------------- | ------------------------- | ---- |
| POST   | `/api/chat/`                    | Crear chat                | id2  |
| GET    | `/api/chat/`                    | Obtener chats del usuario | —    |
| GET    | `/api/chat/:idChat`             | Obtener chat específico   | —    |
| GET    | `/api/chat/contacto/:idContact` | Obtener chat por contacto | —    |
| DELETE | `/api/chat/:idChat`             | Eliminar chat             | —    |

---

## 📌 Crear Chat

### Request

```json
POST /api/chat/
Authorization: Bearer TOKEN

{
  "id2": "ID_DEL_OTRO_USUARIO"
}
```

### Response

```json
{
  "_id": "chatId123",
  "users": ["user1", "user2"]
}
```

---

# 📩 MESSAGES (🔒 Requiere Token)

Base: `/api/messages`

| Método | Endpoint                   | Descripción      | Body      |
| ------ | -------------------------- | ---------------- | --------- |
| GET    | `/api/messages/:idChat`    | Obtener mensajes | —         |
| POST   | `/api/messages/:idChat`    | Enviar mensaje   | contenido |
| DELETE | `/api/messages/:idMessage` | Eliminar mensaje | —         |

---

## 📌 Enviar Mensaje

### Request

```json
POST /api/messages/:idChat
Authorization: Bearer TOKEN

{
  "contenido": "Hola 👋"
}
```

### Response

```json
{
  "_id": "messageId123",
  "chatId": "chatId123",
  "sender": "user1",
  "contenido": "Hola 👋"
}
```

---

# 🔄 Flujo de Uso

1. Registrar usuario
2. Iniciar sesión
3. Guardar token
4. Enviar token en rutas protegidas
5. Crear chat
6. Enviar mensajes

---

# 🔗 Conexión con Frontend

## 1️⃣ Login y guardar token

```javascript
const response = await fetch("http://localhost:3000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "usuario@gmail.com",
    password: "123456",
  }),
});

const data = await response.json();
localStorage.setItem("token", data.token);
```

## 2️⃣ Consumir rutas protegidas

```javascript
const token = localStorage.getItem("token");

const response = await fetch("http://localhost:3000/api/chat/", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

---

# 🛡 Seguridad

- Autenticación con JWT
- Middleware de autorización
- Protección de rutas privadas
- Validación de usuarios en cada chat

---

# 📁 Estructura del Proyecto

```
src/
 ├── Routes/
 ├── controllers/
 ├── Repository
 ├── Helper
 ├── models/
 ├── middleware/
 ├── config/
 └── main.js
```

---

## Autor

Nombre: Joaquín Damián Delgado

Curso: Diplomatura Full Stack

Unidad: Desarrollo con NodeJS

Fecha: Febrero 2026
