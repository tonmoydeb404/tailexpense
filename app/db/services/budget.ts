import { nanoid } from "nanoid";
import { getDB } from "..";
import type { BudgetCreate, BudgetUpdate } from "../types";

export const createBudget = async (data: BudgetCreate) => {
  const db = await getDB();
  return db.add("budgets", { ...data, _id: nanoid() });
};

export const getBudgets = async (start?: string, end?: string) => {
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

  let budgets;

  if (range) {
    budgets = await db.getAllFromIndex("budgets", "monthIndex", range);
  } else {
    budgets = await db.getAll("budgets");
  }

  // Sort by date in descending order (newest first)
  budgets.sort(
    (a, b) => new Date(b.month).getTime() - new Date(a.month).getTime()
  );

  return budgets;
};

export const getBudgetById = async (id: string) => {
  const db = await getDB();
  return db.get("budgets", id);
};

export const updateBudget = async (id: string, updates: BudgetUpdate) => {
  const db = await getDB();

  const entity = await db.get("budgets", id);

  if (!entity) return null;

  const updated = { ...entity, ...updates };

  await db.put("budgets", updated);

  return updated;
};

export const deleteBudget = async (id: string) => {
  const db = await getDB();
  await db.delete("budgets", id);
};
