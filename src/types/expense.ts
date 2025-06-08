export interface IExpense {
  _id: string;
  title?: string;
  amount: number; // (store in lowest grade)
  category: string | null; // (ref to category collection)
  date: string; // (ISO)
}

export interface IExpenseReminder {
  _id: string;
  title: string;
  amount: number;
  category: string | null; // ref to category collection
  isRecurring: string;
  date: string;
  status: "ACTIVE" | "COMPLETED";
}
