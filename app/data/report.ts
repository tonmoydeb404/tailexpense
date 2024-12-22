import type { IBudgetReport, ICategoryReport } from "~/types/report";

export const categoryReports: ICategoryReport[] = [
  { category: "1", amount: 250.75 },
  { category: "2", amount: 1200.0 },
  { category: "3", amount: 150.5 },
  { category: "4", amount: 100.25 },
  { category: "5", amount: 60.0 },
  { category: "6", amount: 500.0 },
  { category: "7", amount: 200.0 },
  { category: "8", amount: 80.0 },
  { category: "9", amount: 300.0 },
  { category: "10", amount: 50.0 },
];

export const budgetReports: IBudgetReport[] = [
  { month: "January", budget: 186, expense: 80 },
  { month: "February", budget: 305, expense: 200 },
  { month: "March", budget: 237, expense: 120 },
  { month: "April", budget: 73, expense: 190 },
  { month: "May", budget: 209, expense: 130 },
  { month: "June", budget: 214, expense: 140 },
  { month: "July", budget: 186, expense: 80 },
  { month: "August", budget: 305, expense: 200 },
  { month: "September", budget: 237, expense: 120 },
  { month: "October", budget: 73, expense: 190 },
  { month: "November", budget: 209, expense: 130 },
  { month: "December", budget: 214, expense: 140 },
];
