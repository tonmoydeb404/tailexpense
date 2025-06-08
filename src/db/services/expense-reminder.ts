import { formatISO, startOfDay } from "date-fns";
import { nanoid } from "nanoid";
import { getDB } from "..";
import { ExpenseReminderCreate, ExpenseReminderUpdate } from "../types";
import { createExpense } from "./expense";

export const createExpenseReminder = async (item: ExpenseReminderCreate) => {
  const db = await getDB();
  return db.add("expense_reminders", {
    ...item,
    _id: nanoid(),
    date: formatISO(startOfDay(item.date)),
  });
};

export const getExpenseReminders = async (start?: string, end?: string) => {
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
    budgets = await db.getAllFromIndex("expense_reminders", "dateIndex", range);
  } else {
    budgets = await db.getAll("expense_reminders");
  }

  // Sort by date in descending order (newest first)
  budgets.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return budgets;
};

export const getExpenseReminderById = async (id: string) => {
  const db = await getDB();
  return db.get("expense_reminders", id);
};

export const updateExpenseReminder = async (
  id: string,
  updates: ExpenseReminderUpdate
) => {
  const db = await getDB();

  const entity = await db.get("expense_reminders", id);

  if (!entity) return null;

  const updated = { ...entity, ...updates };
  updated.date = formatISO(startOfDay(updated.date));

  await db.put("expense_reminders", updated);

  return updated;
};

export const deleteExpenseReminder = async (id: string) => {
  const db = await getDB();
  await db.delete("expense_reminders", id);
};

export const completeExpenseReminder = async (id: string) => {
  const db = await getDB();

  const entity = await db.get("expense_reminders", id);

  if (!entity || entity.status === "COMPLETED") return null;

  await createExpense({
    amount: entity.amount,
    category: entity.category,
    date: new Date().toISOString(),
    title: entity.title,
  });

  entity.status = "COMPLETED";

  await db.put("expense_reminders", entity);

  return entity;
};
