import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import {
  createExpense,
  deleteExpense,
  getExpenseById,
  getExpenses,
  updateExpense,
} from "../services/expense";
import type { ExpenseCreate, ExpenseUpdate } from "../types";

// Hook to fetch all expenses
export const useExpenses = (start?: string, end?: string) => {
  return useSWR("expenses", () => getExpenses(start, end));
};

// Hook to fetch a single expense by ID
export const useExpense = (id: string) => {
  return useSWR(id ? `expenses/${id}` : null, () => getExpenseById(id));
};

// Mutation: Add a new expense
type AddOptions = { arg: ExpenseCreate };
export const useAddExpense = () => {
  return useSWRMutation(
    "expenses",
    (_, { arg }: AddOptions) => createExpense(arg),
    {
      onSuccess: () => {
        mutate("expenses");
      },
    }
  );
};

// Mutation: Update a expense
type EditOptions = { arg: { id: string; updates: ExpenseUpdate } };
export const useEditExpense = () => {
  return useSWRMutation(
    "expenses",
    (_, { arg }: EditOptions) => {
      const { id, updates } = arg;
      return updateExpense(id, updates);
    },
    {
      onSuccess: (data) => {
        if (data) {
          mutate("expenses");
          mutate(`expenses/${data._id}`);
        }
      },
    }
  );
};

// Mutation: Delete a expense
type DeleteOptions = { arg: string };
export const useDeleteExpense = () => {
  return useSWRMutation(
    "expenses",
    (_, { arg }: DeleteOptions) => deleteExpense(arg),
    {
      onSuccess: () => {
        mutate("expenses"); // Revalidate the expenses list
      },
    }
  );
};
