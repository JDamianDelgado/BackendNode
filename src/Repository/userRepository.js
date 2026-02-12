import ServerError from "../Helper/serverError.js";
import { User } from "../Models/users_models.js";

async function createUser(email, password) {
  const user = await User.create({ email, password });
  return user;
}
async function findByEmail(email) {
  const user = await User.findOne({ email });
  if (user) {
    throw new ServerError("Usuario ya existente", 400);
  }

  return user;
}

export { findByEmail, createUser };
