const ExpenseService = require("../services/ExpenseService");
const AWSS3Service = require("../services/AWSS3Service");
const UserService = require("../services/UserService");

const EXPENSES_PER_PAGE = 10;

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
    const page = +req.query.page || 1;
    const user = await UserService.findUserById(req.user.id);
    const { count, rows: expenses } =
      await ExpenseService.getAllExpensesAndCount(
        user,
        page,
        EXPENSES_PER_PAGE
      );

    res.json({
      expenses: expenses,
      currentPage: page,
      hasNextPage: EXPENSES_PER_PAGE * page < count,
      nextPage: page + 1,
      hasPreviousPage: page > 1,
      previousPage: page - 1,
      lastPage: Math.ceil(count / EXPENSES_PER_PAGE),
    });
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
