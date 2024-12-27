import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import {
  createBudget,
  deleteBudget,
  getBudgetById,
  getBudgets,
  updateBudget,
} from "../services/budget";
import type { BudgetCreate, BudgetUpdate } from "../types";

// Hook to fetch all budgets
export const useBudgets = () => {
  return useSWR("budgets", () => getBudgets());
};

// Hook to fetch a single budget by ID
export const useBudget = (id: string) => {
  return useSWR(id ? `budgets/${id}` : null, () => getBudgetById(id));
};

// Mutation: Add a new budget
type AddOptions = { arg: BudgetCreate };
export const useAddBudget = () => {
  return useSWRMutation(
    "budgets",
    (_, { arg }: AddOptions) => createBudget(arg),
    {
      onSuccess: () => {
        mutate("budgets");
      },
    }
  );
};

// Mutation: Update a budget
type EditOptions = { arg: { id: string; updates: BudgetUpdate } };
export const useEditBudget = () => {
  return useSWRMutation(
    "budgets",
    (_, { arg }: EditOptions) => updateBudget(arg.id, arg.updates),
    {
      onSuccess: (data) => {
        if (data) {
          mutate("budgets");
          mutate(`budgets/${data._id}`);
        }
      },
    }
  );
};

// Mutation: Delete a budget
type DeleteOptions = { arg: string };
export const useDeleteBudget = () => {
  return useSWRMutation(
    "budgets",
    (_, { arg }: DeleteOptions) => deleteBudget(arg),
    {
      onSuccess: () => {
        mutate("budgets"); // Revalidate the budgets list
      },
    }
  );
};
