import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { IBudget } from "~/types/budget";
import type { ICategory } from "~/types/category";
import type { IExpense, IExpenseReminder } from "~/types/expense";

// Define the database schema
export interface AppDB extends DBSchema {
  categories: {
    key: string;
    value: ICategory;
    indexes: {};
  };
  budgets: {
    key: string;
    value: IBudget;
    indexes: { monthIndex: string };
  };
  expenses: {
    key: string;
    value: IExpense;
    indexes: { dateIndex: string };
  };
  expense_reminders: {
    key: string;
    value: IExpenseReminder;
    indexes: { dateIndex: string };
  };
}

const DB_NAME = import.meta.env.VITE_APP_DB_NAME;
const DB_VERSION = Number(import.meta.env.VITE_APP_DB_VERSION);

let db: IDBPDatabase<AppDB> | null = null;

export const getDB = async (): Promise<IDBPDatabase<AppDB>> => {
  if (!db) {
    db = await openDB<AppDB>(DB_NAME, DB_VERSION, {
      upgrade(database) {
        if (!database.objectStoreNames.contains("budgets")) {
          const store = database.createObjectStore("budgets", {
            keyPath: "_id",
            autoIncrement: false,
          });
          store.createIndex("monthIndex", "month", { unique: true });
        }

        if (!database.objectStoreNames.contains("categories")) {
          database.createObjectStore("categories", {
            keyPath: "_id",
            autoIncrement: false,
          });
        }

        if (!database.objectStoreNames.contains("expenses")) {
          const store = database.createObjectStore("expenses", {
            keyPath: "_id",
            autoIncrement: false,
          });
          store.createIndex("dateIndex", "date", { unique: false });
        }

        if (!database.objectStoreNames.contains("expense_reminders")) {
          console.log("hello");

          const store = database.createObjectStore("expense_reminders", {
            keyPath: "_id",
            autoIncrement: false,
          });
          store.createIndex("dateIndex", "date", { unique: false });
        }
      },
    });
  }
  return db;
};
