import Expense from "../models/Expense";

export const createExpense = async ({
  user,
  body: { amount, category, desc },
}: {
  user: any;
  body: { amount: number; category: string; desc: string };
}) => {
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

export const getAllExpensesOfUser = async ({ user }: { user: any }) => {
  try {
    return await user.getExpenses();
  } catch (error) {
    throw error;
  }
};

export const getAllExpensesAndCount = async (
  user: any,
  page: any,
  itemsPerPage: any
) => {
  try {
    return await Expense.findAndCountAll({
      where: {
        userId: user.id,
      },
      offset: (page - 1) * itemsPerPage,
      limit: itemsPerPage,
    });
  } catch (error) {
    throw error;
  }
};
