const express = require("express");

const router = express.Router();
const multer = require("../middleware/upload");
const { Isauthentication, authoriseRoles } = require("../middleware/IsAuth");

const AuthController = require("../controller/auth");
router.route("/register").post(AuthController.Register);
router.route("/login").post(AuthController.login);
router.route("/users").get(Isauthentication, AuthController.getAllUsers);
router.route("/logout").get(AuthController.Logout);

router
   .route("/user/:id")
   .get(AuthController.getSingleUser)
   .delete(AuthController.deleteUser)
   .patch(AuthController.updateUser);
router.route("/block-user/:id").patch(AuthController.blockUser);
router.route("/unblock-user/:id").patch(AuthController.unblockUser);

module.exports = router;
