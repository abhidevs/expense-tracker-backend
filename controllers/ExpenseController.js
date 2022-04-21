const ExpenseService = require("../services/ExpenseService");
const { findUserById } = require("../services/UserService");

exports.addExpense = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    const expense = await ExpenseService.createExpense(user, req.body);
    res.status(201).json(expense);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
