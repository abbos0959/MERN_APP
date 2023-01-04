const express = require("express");

const router = express.Router();
const multer = require("../middleware/upload");

const AuthController = require("../controller/auth");
router.route("/register").post(AuthController.Register);

module.exports = router;
