import { nanoid } from "nanoid";
import { getDB } from "..";
import type { BudgetCreate, BudgetUpdate } from "../types";

export const createBudget = async (data: BudgetCreate) => {
  const db = await getDB();
  return db.add("budgets", { ...data, _id: nanoid() });
};

export const getBudgets = async () => {
  const db = await getDB();
  return db.getAll("budgets");
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
