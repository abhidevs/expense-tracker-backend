exports.createExpense = async (user, { amount, category, desc }) => {
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
