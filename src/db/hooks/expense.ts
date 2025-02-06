import useSWR, { mutate } from "swr";
import useSWRMutationWithDefault from "~/hooks/use-swr-mutation-with-default";
import { IExpense } from "~/types/expense";
import {
  createExpense,
  deleteExpense,
  getExpenseById,
  getExpenses,
  updateExpense,
} from "../services/expense";
import type { ExpenseCreate, ExpenseUpdate } from "../types";
import { getPaginatedData } from "../utils";

// Hook to fetch all expenses
export const useExpenses = (start?: string, end?: string) => {
  return useSWR([`expenses`, start, end], () => getExpenses(start, end));
};

// Hook to fetch all expenses
export const usePaginatedExpenses = (offset: number, limit: number) => {
  return useSWR(["expenses", offset, limit], () =>
    getPaginatedData<IExpense>("expenses", offset, limit, "dateIndex")
  );
};

// Hook to fetch a single expense by ID
export const useExpense = (id: string) => {
  return useSWR(id ? ["expenses", id] : null, () => getExpenseById(id));
};

// Mutation: Add a new expense
type AddOptions = { arg: ExpenseCreate };
export const useAddExpense = () => {
  return useSWRMutationWithDefault(
    "expenses/create",
    (_, { arg }: AddOptions) => createExpense(arg),
    {
      onSuccess: () => {
        mutate((key) => Array.isArray(key) && key[0] === "expenses");
      },
    }
  );
};

// Mutation: Update a expense
type EditOptions = { arg: { id: string; updates: ExpenseUpdate } };
export const useEditExpense = () => {
  return useSWRMutationWithDefault(
    "expenses/update",
    (_, { arg }: EditOptions) => {
      const { id, updates } = arg;
      return updateExpense(id, updates);
    },
    {
      onSuccess: (data) => {
        if (data) {
          mutate((key) => Array.isArray(key) && key[0] === "expenses");
        }
      },
    }
  );
};

// Mutation: Delete a expense
type DeleteOptions = { arg: string };
export const useDeleteExpense = () => {
  return useSWRMutationWithDefault(
    "expenses/delete",
    (_, { arg }: DeleteOptions) => deleteExpense(arg),
    {
      onSuccess: () => {
        mutate((key) => Array.isArray(key) && key[0] === "expenses");
      },
    }
  );
};
