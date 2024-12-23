import type { ITransaction } from "~/types/transaction";

export type TransactionCreate = Omit<ITransaction, "_id">;
export type TransactionUpdate = Partial<Omit<ITransaction, "_id">>;
