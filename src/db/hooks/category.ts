import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../services/category";
import type { CategoryCreate, CategoryUpdate } from "../types";

// Hook to fetch all categories
export const useCategories = () => {
  return useSWR("categories", () => getCategories());
};

// Hook to fetch a single category by ID
export const useCategory = (id: string) => {
  return useSWR(id ? `categories/${id}` : null, () => getCategoryById(id));
};

// Mutation: Add a new category
type AddOptions = { arg: CategoryCreate };
export const useAddCategory = () => {
  return useSWRMutation(
    "categories",
    (_, { arg }: AddOptions) => createCategory(arg),
    {
      onSuccess: () => {
        mutate("categories");
      },
    }
  );
};

// Mutation: Update a category
type EditOptions = { arg: { id: string; updates: CategoryUpdate } };
export const useEditCategory = () => {
  return useSWRMutation(
    "categories",
    (_, { arg }: EditOptions) => updateCategory(arg.id, arg.updates),
    {
      onSuccess: (data) => {
        if (data) {
          mutate("categories");
          mutate(`categories/${data._id}`);
        }
      },
    }
  );
};

// Mutation: Delete a category
type DeleteOptions = { arg: string };
export const useDeleteCategory = () => {
  return useSWRMutation(
    "categories",
    (_, { arg }: DeleteOptions) => deleteCategory(arg),
    {
      onSuccess: () => {
        mutate("categories"); // Revalidate the categories list
      },
    }
  );
};
