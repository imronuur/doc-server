const express = require("express");
const { readdirSync } = require("fs");
const cors = require("cors");
const morgran = require("morgan");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "config", "config.env") });
const app = express();
app.use(express.json());

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(morgran("dev"));

readdirSync(path.join(__dirname, "routes")).map((route) =>
  app.use("/api", require(path.join(__dirname, "routes/" + route)))
);
module.exports = app;
