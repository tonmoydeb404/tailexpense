export interface ICategoryReport {
  category: string;
  amount: number;
}

export interface IBudgetReport {
  month: string;
  expense: number;
  budget: number;
}

export interface IExpenseReport {
  _id: string;
  date: string; // ISO String
  amount: number;
}
