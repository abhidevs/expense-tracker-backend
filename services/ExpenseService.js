exports.createExpense = async ({ user, body: { amount, category, desc } }) => {
  try {
    const expense = await user.createExpense({
      amount,
      category,
      desc,
    });
    await expense.save();

    return expense;
  } catch (error) {
    throw error;
  }
};

exports.getAllExpensesOfUser = async ({ user }) => {
  try {
    return await user.getExpenses();
  } catch (error) {
    throw error;
  }
};
