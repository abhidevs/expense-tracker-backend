import * as ExpenseService from "../services/ExpenseService";
import * as AWSS3Service from "../services/AWSS3Service";
import * as UserService from "../services/UserService";
import { Request, Response } from "express";

const EXPENSES_PER_PAGE = 10;

export const addExpense = async (req: Request, res: Response) => {
  try {
    req.user = await UserService.findUserById(req.user.id);
    const expense = await ExpenseService.createExpense(req);
    res.status(201).json(expense);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const page = +(req?.query?.page || 1);
    const perPage = +(req?.query?.perpage || EXPENSES_PER_PAGE);
    console.log(req.query.perpage);
    const user = await UserService.findUserById(req.user.id);
    const { count, rows: expenses } =
      await ExpenseService.getAllExpensesAndCount(user, page, perPage);

    res.json({
      expenses: expenses,
      currentPage: page,
      hasNextPage: perPage * page < count,
      nextPage: page + 1,
      hasPreviousPage: page > 1,
      previousPage: page - 1,
      lastPage: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const downloadFile = async (req: Request, res: Response) => {
  try {
    req.user = await UserService.findUserById(req.user.id);
    const expenses = await ExpenseService.getAllExpensesOfUser(req);

    const stringifiedExpenses = JSON.stringify(expenses);
    const userId = req.user.id;
    const filename = `Expenses/${userId}/${Date.parse(new Date() as any)}.txt`;
    const fileURL = await AWSS3Service.uploadToS3(
      filename,
      stringifiedExpenses
    );

    res.status(200).json({ fileURL, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong", success: false });
  }
};
