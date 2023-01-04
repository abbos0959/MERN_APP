const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const multer = require("multer");
const errorController = require("../controller/errorController");
const AppError = require("../utils/appError");
const authRouter = require("../router/auth");

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("common"));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use("/api/v1", authRouter);


app.all("*", function (req, res, next) {
  next(new AppError(`bunday url mavjud emas: ${req.originalUrl}`, 404));
});


app.use(errorController);

module.exports = app;
