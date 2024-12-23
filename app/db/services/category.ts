import { nanoid } from "nanoid";
import type { ICategory } from "~/types/category";
import { getDB } from "..";

export const createCategory = async (item: Omit<ICategory, "_id">) => {
  const db = await getDB();
  return db.add("categories", { ...item, _id: nanoid() });
};

export const getCategories = async () => {
  const db = await getDB();
  return db.getAll("categories");
};

export const getCategoryById = async (id: string) => {
  const db = await getDB();
  return db.get("categories", id);
};

export const updateCategory = async (
  id: string,
  item: Partial<Omit<ICategory, "_id">>
) => {
  const db = await getDB();

  const entity = await db.get("categories", id);

  if (!entity) return null;

  const updated = { ...entity, ...item };

  await db.put("categories", updated);
};

export const deleteCategory = async (id: string) => {
  const db = await getDB();
  await db.delete("categories", id);
};
