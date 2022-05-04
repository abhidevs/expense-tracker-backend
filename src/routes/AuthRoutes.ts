import { Router } from "express";

import * as AuthController from "../controllers/AuthController";

const router = Router();

router.post("/register", AuthController.registerUser);

router.post("/login", AuthController.loginUser);

router.post("/forgotpassword", AuthController.forgetPassword);

router.get("/resetpassword/:id", AuthController.getResetPassword);

router.post("/resetpassword/:id", AuthController.postResetPassword);

export default router;
