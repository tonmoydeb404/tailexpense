export type TransactionType = "INCOME" | "EXPENSE";

export interface ITransaction {
  _id: string;
  title: string;
  type: TransactionType;
  amount: number; // (store in lowest grade)
  category: string; // (ref to category collection)
  date: string; // (ISO)
}
