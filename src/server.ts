import path from "path";
import fs from "fs";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
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

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// app.use(helmet());
app.use(morgan("combined", { stream: accessLogStream }));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api", (req, res) => res.send("Welcome to Expense Tracker API"));
app.use("/api/auth", AuthRoutes);
app.use("/api/user/expense", ExpenseRoutes);
app.use("/api/user/payment", PaymentRoutes);

app.use((req, res) => {
  let page = req.url === "/" ? "index.html" : req.url.split("?")[0];
  res.sendFile(path.join(__dirname, `public/${page}`));
});

User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo(User);

const port = process.env.PORT || 3000;
sequelize
  .sync()
  .then((res) =>
    app.listen(port, () => console.log(`server running at port ${port}`))
  )
  .catch((err) => console.log(err));
