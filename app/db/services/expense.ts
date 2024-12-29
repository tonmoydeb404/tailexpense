import { nanoid } from "nanoid";
import { getDB } from "..";
import type { ExpenseCreate, ExpenseUpdate } from "../types";

export const createExpense = async (item: ExpenseCreate) => {
  const db = await getDB();
  return db.add("expenses", { ...item, _id: nanoid() });
};

export const getExpenses = async () => {
  const db = await getDB();
  return db.getAll("expenses");
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
