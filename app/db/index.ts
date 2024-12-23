import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { IBudget } from "~/types/budget";
import type { ICategory } from "~/types/category";
import type { ITransaction } from "~/types/transaction";

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
  transactions: {
    key: string;
    value: ITransaction;
    indexes: {};
  };
}

const DB_NAME = "MyAppDB";
const DB_VERSION = 1;

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

        if (!database.objectStoreNames.contains("transactions")) {
          database.createObjectStore("transactions", {
            keyPath: "_id",
            autoIncrement: false,
          });
        }
      },
    });
  }
  return db;
};
