import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import {
  createTransaction,
  deleteTransaction,
  getTransactionById,
  getTransactions,
  updateTransaction,
} from "../services/transaction";
import type { TransactionCreate, TransactionUpdate } from "../types";

// Fetcher functions
const get = async () => getTransactions();
const getById = async (id: string) => getTransactionById(id);
const create = async (_: any, { arg }: { arg: TransactionCreate }) =>
  createTransaction(arg);
const update = async (
  _: any,
  { arg }: { arg: { id: string; updates: TransactionUpdate } }
) => {
  const { id, updates } = arg;
  return updateTransaction(id, updates);
};
const remove = async (_: any, { arg }: { arg: string }) =>
  deleteTransaction(arg);

// Hook to fetch all transactions
export const useTransactions = () => {
  return useSWR("transactions", get);
};

// Hook to fetch a single transaction by ID
export const useTransaction = (id: string) => {
  return useSWR(id ? `transactions/${id}` : null, () => getById(id));
};

// Mutation: Add a new transaction
export const useAddTransaction = () => {
  return useSWRMutation("transactions", create, {
    onSuccess: () => {
      mutate("transactions");
    },
  });
};

// Mutation: Update a transaction
export const useEditTransaction = () => {
  return useSWRMutation("transactions", update, {
    onSuccess: (data) => {
      if (data) {
        mutate("transactions");
        mutate(`transactions/${data._id}`);
      }
    },
  });
};

// Mutation: Delete a transaction
export const useDeleteTransaction = () => {
  return useSWRMutation("transactions", remove, {
    onSuccess: () => {
      mutate("transactions"); // Revalidate the transactions list
    },
  });
};
