const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = require("./utils/db");
const AuthRoutes = require("./routes/AuthRoutes");
const ExpenseRoutes = require("./routes/ExpenseRoutes");
const PaymentRoutes = require("./routes/PaymentRoutes");
const User = require("./models/User");
const Expense = require("./models/Expense");
const Order = require("./models/Order");
const ForgotPasswordRequest = require("./models/ForgotPasswordRequest");

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
