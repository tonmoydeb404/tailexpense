import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import {
  completeExpenseReminder,
  createExpenseReminder,
  deleteExpenseReminder,
  getExpenseReminderById,
  getExpenseReminders,
  syncExpenseReminder,
  updateExpenseReminder,
} from "../services/expense-reminder";
import type { ExpenseReminderCreate, ExpenseReminderUpdate } from "../types";

export const useExpenseReminders = (start?: string, end?: string) => {
  return useSWR("expense-reminders", () => getExpenseReminders(start, end));
};

export const useExpenseReminder = (id: string) => {
  return useSWR(id ? `expense-reminders/${id}` : null, () =>
    getExpenseReminderById(id)
  );
};

type AddOptions = { arg: ExpenseReminderCreate };
export const useAddExpenseReminder = () => {
  return useSWRMutation(
    "expense-reminders",
    (_, { arg }: AddOptions) => createExpenseReminder(arg),
    {
      onSuccess: () => {
        mutate("expense-reminders");
      },
    }
  );
};

type EditOptions = { arg: { id: string; updates: ExpenseReminderUpdate } };
export const useEditExpenseReminder = () => {
  return useSWRMutation(
    "expense-reminders",
    (_, { arg }: EditOptions) => updateExpenseReminder(arg.id, arg.updates),
    {
      onSuccess: (data) => {
        if (data) {
          mutate("expense-reminders");
          mutate(`expense-reminders/${data._id}`);
        }
      },
    }
  );
};

type DeleteOptions = { arg: string };
export const useDeleteExpenseReminder = () => {
  return useSWRMutation(
    "expense-reminders",
    (_, { arg }: DeleteOptions) => deleteExpenseReminder(arg),
    {
      onSuccess: () => {
        mutate("expense-reminders");
      },
    }
  );
};

type CompleteOptions = { arg: string };
export const useCompleteExpenseReminder = () => {
  return useSWRMutation(
    "expense-reminders",
    (_, { arg }: CompleteOptions) => completeExpenseReminder(arg),
    {
      onSuccess: () => {
        mutate("expense-reminders");
      },
    }
  );
};

export const useSyncExpenseReminder = () => {
  return useSWR("expense-reminders", () => syncExpenseReminder(), {
    onSuccess: (data) => {
      if (data.length) {
        mutate("expense-reminders");
      }
    },
  });
};
