import type { IBudget } from "~/types/budget";
import type { ICategory } from "~/types/category";
import type { IExpense } from "~/types/expense";

export type ExpenseCreate = Omit<IExpense, "_id">;
export type ExpenseUpdate = Partial<Omit<IExpense, "_id">>;

export type CategoryCreate = Omit<ICategory, "_id">;
export type CategoryUpdate = Partial<Omit<ICategory, "_id">>;

export type BudgetCreate = Omit<IBudget, "_id">;
export type BudgetUpdate = Partial<Omit<IBudget, "_id" | "month">>;
