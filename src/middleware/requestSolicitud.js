export function requestSolicitud(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const time = Date.now() - start;
    const date = new Date().toISOString();

    console.log(
      `[${date}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${time}ms)`,
    );
  });

  next();
}
