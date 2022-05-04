import { Router } from "express";

import * as ExpenseController from "../controllers/ExpenseController";
import authenticateToken from "../middlewares/authenticateToken";

const router = Router();

router.post("/", authenticateToken, ExpenseController.addExpense);

router.get("/all", authenticateToken, ExpenseController.getAllExpenses);

router.get("/downloadfile", authenticateToken, ExpenseController.downloadFile);

export default router;
