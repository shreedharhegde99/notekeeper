const app = require("express").Router();

app.get("/", (req, res) => {
  res.status(200).send({ ok: true, message: "Welcome to Note-Keeper app" });
});

module.exports = app;
