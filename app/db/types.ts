import type { ICategory } from "~/types/category";
import type { ITransaction } from "~/types/transaction";

export type TransactionCreate = Omit<ITransaction, "_id">;
export type TransactionUpdate = Partial<Omit<ITransaction, "_id">>;

export type CategoryCreate = Omit<ICategory, "_id">;
export type CategoryUpdate = Partial<Omit<ICategory, "_id">>;
