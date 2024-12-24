import { nanoid } from "nanoid";
import { getDB } from "..";
import type { TransactionCreate, TransactionUpdate } from "../types";

export const createTransaction = async (item: TransactionCreate) => {
  const db = await getDB();
  return db.add("transactions", { ...item, _id: nanoid() });
};

export const getTransactions = async () => {
  const db = await getDB();
  return db.getAll("transactions");
};

export const getTransactionById = async (id: string) => {
  const db = await getDB();
  return db.get("transactions", id);
};

export const updateTransaction = async (
  id: string,
  item: TransactionUpdate
) => {
  const db = await getDB();

  const entity = await db.get("transactions", id);

  if (!entity) return null;

  const updated = { ...entity, ...item };

  await db.put("transactions", updated);

  return updated;
};

export const deleteTransaction = async (id: string) => {
  const db = await getDB();
  await db.delete("transactions", id);
};
