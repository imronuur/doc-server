const express = require("express");
const { readdirSync } = require("fs");
const cors = require("cors");
const morgran = require("morgan");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "config", "config.env") });
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "DELETE"],
  })
);
app.use(morgran("dev"));

readdirSync(path.join(__dirname, "routes")).map((route) =>
  app.use("/api", require(path.join(__dirname, "routes/" + route)))
);
module.exports = app;
