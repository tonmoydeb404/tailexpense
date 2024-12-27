import type { IBudget } from "~/types/budget";
import type { ICategory } from "~/types/category";
import type { ITransaction } from "~/types/transaction";

export type TransactionCreate = Omit<ITransaction, "_id">;
export type TransactionUpdate = Partial<Omit<ITransaction, "_id">>;

export type CategoryCreate = Omit<ICategory, "_id">;
export type CategoryUpdate = Partial<Omit<ICategory, "_id">>;

export type BudgetCreate = Omit<IBudget, "_id">;
export type BudgetUpdate = Partial<Omit<IBudget, "_id" | "month">>;
