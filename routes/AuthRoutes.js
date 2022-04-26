const express = require("express");

const AuthController = require("../controllers/AuthController");

const router = express.Router();

router.post("/register", AuthController.registerUser);

router.post("/login", AuthController.loginUser);

router.post("/forgotpassword", AuthController.forgetPassword);

router.get("/resetpassword/:id", AuthController.getResetPassword);

router.post("/resetpassword/:id", AuthController.postResetPassword);

module.exports = router;
