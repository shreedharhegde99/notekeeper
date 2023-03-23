const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const connectDB = require("./config/db");
const indexRoute = require("./routes/index");
const notesRoute = require("./routes/notes.routes");
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.options("*", cors());
app.use(cors({ origin: "*" }));

// routes
app.use("/", indexRoute);
app.use("/notes", notesRoute);

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is up and running at port ${port}`);
});
