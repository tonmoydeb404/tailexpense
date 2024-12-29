import type { Table } from "@tanstack/react-table";
import type { ICategory } from "~/types/category";
import type { IExpense } from "~/types/expense";

export type DataType = Omit<IExpense, "category"> & {
  category: ICategory | null;
};

export type TableType = Table<DataType>;
