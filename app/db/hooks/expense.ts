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

// Fetcher functions
const get = async () => getExpenses();
const getById = async (id: string) => getExpenseById(id);
const create = async (_: any, { arg }: { arg: ExpenseCreate }) =>
  createExpense(arg);
const update = async (
  _: any,
  { arg }: { arg: { id: string; updates: ExpenseUpdate } }
) => {
  const { id, updates } = arg;
  return updateExpense(id, updates);
};
const remove = async (_: any, { arg }: { arg: string }) => deleteExpense(arg);

// Hook to fetch all expenses
export const useExpenses = () => {
  return useSWR("expenses", get);
};

// Hook to fetch a single expense by ID
export const useExpense = (id: string) => {
  return useSWR(id ? `expenses/${id}` : null, () => getById(id));
};

// Mutation: Add a new expense
export const useAddExpense = () => {
  return useSWRMutation("expenses", create, {
    onSuccess: () => {
      mutate("expenses");
    },
  });
};

// Mutation: Update a expense
export const useEditExpense = () => {
  return useSWRMutation("expenses", update, {
    onSuccess: (data) => {
      if (data) {
        mutate("expenses");
        mutate(`expenses/${data._id}`);
      }
    },
  });
};

// Mutation: Delete a expense
export const useDeleteExpense = () => {
  return useSWRMutation("expenses", remove, {
    onSuccess: () => {
      mutate("expenses"); // Revalidate the expenses list
    },
  });
};
