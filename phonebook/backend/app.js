const config = require("./utils/config");
const logger = require("./utils/logger");
const express = require("express");
const cors = require("cors");
const middleware = require("./utils/middleware");
const app = express();
const personRouter = require("./controllers/persons");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

logger.info("connecting to MongoDB");
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("could not establish connection to MongoDB");
    logger.error(error.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use(middleware.requestLogger);

app.use("/api/persons", personRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
