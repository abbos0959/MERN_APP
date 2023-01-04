const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const multer = require("multer");
const authRouter = require("../router/auth");

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("common"));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use("/api/v1", authRouter);

module.exports = app;
