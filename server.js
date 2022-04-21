const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = require("./utils/db");
const AuthRoutes = require("./routes/AuthRoutes");
const ExpenseRoutes = require("./routes/ExpenseRoutes");
const User = require("./models/User");
const Expense = require("./models/Expense");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api", (req, res) => res.send("Welcome to Expense Tracker API"));
app.use("/api/auth", AuthRoutes);
app.use("/api/user/expense", ExpenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize
  .sync()
  .then((res) =>
    app.listen(3000, () => console.log("server running at port 3000"))
  )
  .catch((err) => console.log(err));
