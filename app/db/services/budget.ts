import { nanoid } from "nanoid";
import type { IBudget } from "~/types/budget";
import { getDB } from "..";

export const createBudget = async (item: Omit<IBudget, "_id">) => {
  const db = await getDB();
  return db.add("budgets", { ...item, _id: nanoid() });
};

export const getBudgets = async () => {
  const db = await getDB();
  return db.getAll("budgets");
};

export const getBudgetById = async (id: string) => {
  const db = await getDB();
  return db.get("budgets", id);
};

export const updateBudget = async (
  id: string,
  item: Partial<Omit<IBudget, "_id">>
) => {
  const db = await getDB();

  const entity = await db.get("budgets", id);

  if (!entity) return null;

  const updated = { ...entity, ...item };

  await db.put("budgets", updated);
};

export const deleteBudget = async (id: string) => {
  const db = await getDB();
  await db.delete("budgets", id);
};
