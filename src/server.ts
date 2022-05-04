import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import sequelize from "./utils/db";
import AuthRoutes from "./routes/AuthRoutes";
import ExpenseRoutes from "./routes/ExpenseRoutes";
import PaymentRoutes from "./routes/PaymentRoutes";
import User from "./models/User";
import Expense from "./models/Expense";
import Order from "./models/Order";
import ForgotPasswordRequest from "./models/ForgotPasswordRequest";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api", (req, res) => res.send("Welcome to Expense Tracker API"));
app.use("/api/auth", AuthRoutes);
app.use("/api/user/expense", ExpenseRoutes);
app.use("/api/user/payment", PaymentRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo(User);

sequelize
  .sync()
  .then((res) =>
    app.listen(3000, () => console.log("server running at port 3000"))
  )
  .catch((err) => console.log(err));
