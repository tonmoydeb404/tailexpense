import {
  endOfMonth,
  endOfYear,
  formatISO,
  parseISO,
  startOfMonth,
  startOfYear,
  subMonths,
} from "date-fns";
import { getDB } from "../index";

export const getStats = async (month: string) => {
  const db = await getDB();

  const currentDate = parseISO(month);
  const prevDate = subMonths(currentDate, 1);

  // Budgets ----------------------------------------------------------------------
  const budget = await db.getFromIndex(
    "budgets",
    "monthIndex",
    formatISO(currentDate)
  );
  const prevBudget = await db.getFromIndex(
    "budgets",
    "monthIndex",
    formatISO(prevDate)
  );

  const budgetIncrease =
    budget && prevBudget && prevBudget.amount !== 0
      ? ((budget.amount - prevBudget.amount) / prevBudget.amount) * 100
      : 0;

  // Expenses ----------------------------------------------------------------------
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
  const prevExpenses = await db.getAllFromIndex(
    "expenses",
    "dateIndex",
    IDBKeyRange.bound(
      formatISO(startOfMonth(prevDate)),
      formatISO(endOfMonth(prevDate)),
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

export const getCategoryUsage = async (month: string) => {
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

export const getYearlyStats = async (year: string) => {
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
  const monthlyData: Record<string, { budget: number; expenses: number }> = {};
  let totalBudget = 0;
  let totalExpenses = 0;

  budgets.forEach((budget) => {
    const month = budget.month.slice(0, 7); // Extract "YYYY-MM" from ISO string
    monthlyData[month] = monthlyData[month] || { budget: 0, expenses: 0 };
    monthlyData[month].budget += budget.amount;
    totalBudget += budget.amount;
  });

  expenses.forEach((expense) => {
    const expenseDate = new Date(expense.date);
    const month = formatISO(startOfMonth(expenseDate)).slice(0, 7); // Extract "YYYY-MM"
    monthlyData[month] = monthlyData[month] || { budget: 0, expenses: 0 };
    monthlyData[month].expenses += expense.amount;
    totalExpenses += expense.amount;
  });

  return {
    totalBudget,
    totalExpenses,
    monthlyBreakdown: Object.keys(monthlyData).map((month) => ({
      month,
      budget: monthlyData[month].budget,
      expenses: monthlyData[month].expenses,
    })),
  };
};

export const getExpensesFromDate = async (startDate: Date) => {
  const db = await getDB();

  const formattedStartDate = formatISO(startDate);

  const expenses = await db.getAllFromIndex(
    "expenses",
    "dateIndex",
    IDBKeyRange.lowerBound(formattedStartDate, true)
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
