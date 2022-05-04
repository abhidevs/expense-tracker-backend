"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = __importDefault(require("./utils/db"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const ExpenseRoutes_1 = __importDefault(require("./routes/ExpenseRoutes"));
const PaymentRoutes_1 = __importDefault(require("./routes/PaymentRoutes"));
const User_1 = __importDefault(require("./models/User"));
const Expense_1 = __importDefault(require("./models/Expense"));
const Order_1 = __importDefault(require("./models/Order"));
const ForgotPasswordRequest_1 = __importDefault(require("./models/ForgotPasswordRequest"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.get("/api", (req, res) => res.send("Welcome to Expense Tracker API"));
app.use("/api/auth", AuthRoutes_1.default);
app.use("/api/user/expense", ExpenseRoutes_1.default);
app.use("/api/user/payment", PaymentRoutes_1.default);
User_1.default.hasMany(Expense_1.default);
Expense_1.default.belongsTo(User_1.default);
User_1.default.hasMany(Order_1.default);
Order_1.default.belongsTo(User_1.default);
User_1.default.hasMany(ForgotPasswordRequest_1.default);
ForgotPasswordRequest_1.default.belongsTo(User_1.default);
db_1.default
    .sync()
    .then((res) => app.listen(3000, () => console.log("server running at port 3000")))
    .catch((err) => console.log(err));
