const ExpenseService = require("../services/ExpenseService");
const AWSS3Service = require("../services/AWSS3Service");
const UserService = require("../services/UserService");

exports.addExpense = async (req, res) => {
  try {
    req.user = await UserService.findUserById(req.user.id);
    const expense = await ExpenseService.createExpense(req);
    res.status(201).json(expense);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    req.user = await UserService.findUserById(req.user.id);
    const expenses = await ExpenseService.getAllExpensesOfUser(req);
    res.status(201).json(expenses);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.downloadFile = async (req, res) => {
  try {
    req.user = await UserService.findUserById(req.user.id);
    const expenses = await ExpenseService.getAllExpensesOfUser(req);

    const stringifiedExpenses = JSON.stringify(expenses);
    const userId = req.user.id;
    const filename = `Expenses/${userId}/${Date.parse(new Date())}.txt`;
    const fileURL = await AWSS3Service.uploadToS3(
      filename,
      stringifiedExpenses
    );

    res.status(200).json({ fileURL, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
