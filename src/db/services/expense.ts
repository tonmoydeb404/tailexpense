import { nanoid } from "nanoid";
import { getDB } from "..";
import type { ExpenseCreate, ExpenseUpdate } from "../types";

export const createExpense = async (item: ExpenseCreate) => {
  const db = await getDB();
  return db.add("expenses", { ...item, _id: nanoid() });
};

export const getExpenses = async (start?: string, end?: string) => {
  const db = await getDB();

  // Create the date range if start and end are provided
  const range =
    start && end
      ? IDBKeyRange.bound(start, end, false, false)
      : start
      ? IDBKeyRange.lowerBound(start, false)
      : end
      ? IDBKeyRange.upperBound(end, false)
      : null;

  let expenses;

  if (range) {
    expenses = await db.getAllFromIndex("expenses", "dateIndex", range);
  } else {
    expenses = await db.getAll("expenses");
  }

  // Sort by date in descending order (newest first)
  expenses.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return expenses;
};

export const getExpenseById = async (id: string) => {
  const db = await getDB();
  return db.get("expenses", id);
};

export const updateExpense = async (id: string, item: ExpenseUpdate) => {
  const db = await getDB();

  const entity = await db.get("expenses", id);

  if (!entity) return null;

  const updated = { ...entity, ...item };

  await db.put("expenses", updated);

  return updated;
};

export const deleteExpense = async (id: string) => {
  const db = await getDB();
  await db.delete("expenses", id);
};
