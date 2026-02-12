export default class ServerError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.status = statusCode;
    this.name = "ServerError";
  }
}
