const config = require("./utils/config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const middleware = require("./utils/middleware");
const notesRouter = require("./controllers/notes");
const logger = require("./utils/logger");

mongoose.set("strictQuery", false);

logger.info("connecting to MongoDB");
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB", error.message);
  });

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
