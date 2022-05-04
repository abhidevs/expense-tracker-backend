"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFile = exports.getAllExpenses = exports.addExpense = void 0;
const ExpenseService = __importStar(require("../services/ExpenseService"));
const AWSS3Service = __importStar(require("../services/AWSS3Service"));
const UserService = __importStar(require("../services/UserService"));
const EXPENSES_PER_PAGE = 10;
const addExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.user = yield UserService.findUserById(req.user.id);
        const expense = yield ExpenseService.createExpense(req);
        res.status(201).json(expense);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
exports.addExpense = addExpense;
const getAllExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const page = +(((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.page) || 1);
        const perPage = +(((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.perpage) || EXPENSES_PER_PAGE);
        console.log(req.query.perpage);
        const user = yield UserService.findUserById(req.user.id);
        const { count, rows: expenses } = yield ExpenseService.getAllExpensesAndCount(user, page, perPage);
        res.json({
            expenses: expenses,
            currentPage: page,
            hasNextPage: perPage * page < count,
            nextPage: page + 1,
            hasPreviousPage: page > 1,
            previousPage: page - 1,
            lastPage: Math.ceil(count / perPage),
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
exports.getAllExpenses = getAllExpenses;
const downloadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.user = yield UserService.findUserById(req.user.id);
        const expenses = yield ExpenseService.getAllExpensesOfUser(req);
        const stringifiedExpenses = JSON.stringify(expenses);
        const userId = req.user.id;
        const filename = `Expenses/${userId}/${Date.parse(new Date())}.txt`;
        const fileURL = yield AWSS3Service.uploadToS3(filename, stringifiedExpenses);
        res.status(200).json({ fileURL, success: true });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong", success: false });
    }
});
exports.downloadFile = downloadFile;
