import { setMonth, setYear, startOfMonth } from "date-fns";
import { nanoid } from "nanoid";
import type { IBudget } from "~/types/budget";
import type { ICategory } from "~/types/category";
import type { IExpense } from "~/types/expense";
import { getDB } from "..";
import { budgets, categories, expenses } from "./data";

export const seedData = async () => {
  const db = await getDB();

  const categoriesData: ICategory[] = categories.map((item) => ({
    ...item,
    _id: nanoid(),
  }));

  for (const category of categoriesData) {
    await db.put("categories", category);
  }

  const expenseData: IExpense[] = expenses.map((item) => ({
    ...item,
    _id: nanoid(),
    date: setYear(
      setMonth(item.date, new Date().getMonth()),
      new Date().getFullYear()
    ).toISOString(),
    category:
      categoriesData[Math.floor(Math.random() * categoriesData.length)]._id,
  }));

  for (const expense of expenseData) {
    await db.put("expenses", expense);
  }

  const budgetsData: IBudget[] = budgets.map((item) => ({
    ...item,
    month: startOfMonth(
      setYear(item.month, new Date().getFullYear())
    ).toISOString(),
    _id: nanoid(),
  }));

  for (const budget of budgetsData) {
    await db.put("budgets", budget);
  }
};
