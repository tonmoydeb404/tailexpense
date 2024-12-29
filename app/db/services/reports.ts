import {
  endOfMonth,
  endOfYear,
  format,
  formatISO,
  parseISO,
  startOfMonth,
  startOfYear,
  subMonths,
} from "date-fns";
import { getDB } from "../index";

export const getStats = async (month: string) => {
  const db = await getDB();

  const currentMonth = startOfMonth(month);
  const prevMonth = subMonths(currentMonth, 1);

  // Budgets ----------------------------------------------------------------------
  const budgets = await db.getAllFromIndex(
    "budgets",
    "monthIndex",
    IDBKeyRange.bound(
      formatISO(prevMonth),
      formatISO(endOfMonth(currentMonth)),
      false,
      false
    )
  );

  const budget = budgets.find((item) => currentMonth === new Date(item.month));
  const prevBudget = budgets.find((item) => prevMonth === new Date(item.month));

  const budgetIncrease =
    budget && prevBudget && prevBudget.amount !== 0
      ? ((budget.amount - prevBudget.amount) / prevBudget.amount) * 100
      : 0;

  // Expenses ----------------------------------------------------------------------
  const expenses = await db.getAllFromIndex(
    "expenses",
    "dateIndex",
    IDBKeyRange.bound(
      formatISO(currentMonth),
      formatISO(endOfMonth(currentMonth)),
      false,
      false
    )
  );
  const prevExpenses = await db.getAllFromIndex(
    "expenses",
    "dateIndex",
    IDBKeyRange.bound(
      formatISO(startOfMonth(prevMonth)),
      formatISO(endOfMonth(prevMonth)),
      false,
      false
    )
  );

  const totalExpense = (expenses || []).reduce(
    (sum, curr) => sum + curr.amount,
    0
  );
  const totalPrevExpense = (prevExpenses || []).reduce(
    (sum, curr) => sum + curr.amount,
    0
  );

  const expenseIncrease =
    totalPrevExpense !== 0
      ? ((totalExpense - totalPrevExpense) / totalPrevExpense) * 100
      : 0;

  // Balance ----------------------------------------------------------------------
  const balance = budget?.amount ? budget.amount - totalExpense : 0;

  const prevBalance = prevBudget ? prevBudget.amount - totalPrevExpense : 0;
  const balanceIncrease =
    prevBalance !== 0 ? ((balance - prevBalance) / prevBalance) * 100 : 0;

  return {
    budget: budget?.amount ?? 0,
    budgetIncrease,
    expenses: totalExpense,
    expenseIncrease,
    balance,
    balanceIncrease,
  };
};

export const getCategoryStats = async (month: string) => {
  const db = await getDB();
  const currentDate = parseISO(month);

  const expenses = await db.getAllFromIndex(
    "expenses",
    "dateIndex",
    IDBKeyRange.bound(
      formatISO(startOfMonth(currentDate)),
      formatISO(endOfMonth(currentDate)),
      false,
      false
    )
  );

  const categories = await db.getAll("categories");

  const categoryExpenses: Record<string, number> = {};

  expenses.forEach((expense) => {
    const { category, amount } = expense;
    if (category) {
      categoryExpenses[category] = (categoryExpenses[category] || 0) + amount;
    }
  });

  const usage = categories.map((item) => ({
    ...item,
    total: categoryExpenses[item._id] ?? 0,
  }));

  return usage;
};

export const getYearlyStats = async (year: number) => {
  const db = await getDB();

  const yearStart = startOfYear(new Date(`${year}-01-01`));
  const yearEnd = endOfYear(new Date(`${year}-12-31`));

  const budgets = await db.getAllFromIndex(
    "budgets",
    "monthIndex",
    IDBKeyRange.bound(formatISO(yearStart), formatISO(yearEnd), false, false)
  );

  const expenses = await db.getAllFromIndex(
    "expenses",
    "dateIndex",
    IDBKeyRange.bound(formatISO(yearStart), formatISO(yearEnd), false, false)
  );

  // Initialize yearly totals and breakdowns
  const monthlyData: Record<string, { budgets: number; expenses: number }> = {};
  let totalBudget = 0;
  let totalExpenses = 0;

  budgets.forEach((budget) => {
    const date = startOfMonth(budget.month).toISOString();
    monthlyData[date] = monthlyData[date] || { budgets: 0, expenses: 0 };
    monthlyData[date].budgets += budget.amount;
    totalBudget += budget.amount;
  });

  expenses.forEach((expense) => {
    const date = startOfMonth(expense.date).toISOString();

    monthlyData[date] = monthlyData[date] || { budgets: 0, expenses: 0 };
    monthlyData[date].expenses += expense.amount;
    totalExpenses += expense.amount;
  });

  return {
    totalBudget,
    totalExpenses,
    monthlyBreakdown: Object.keys(monthlyData).map((date) => ({
      month: format(date, "MMMM"),
      date,
      budgets: monthlyData[date].budgets,
      expenses: monthlyData[date].expenses,
    })),
  };
};

export const getExpenseStats = async (start: string) => {
  const db = await getDB();

  const startDate = parseISO(start);

  const expenses = await db.getAllFromIndex(
    "expenses",
    "dateIndex",
    IDBKeyRange.lowerBound(startDate.toISOString(), true)
  );

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return {
    totalAmount,
    expenses,
  };
};
