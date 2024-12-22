import type { ITransaction } from "~/types/transaction";

export const recentTransaction: ITransaction[] = [
  {
    _id: "1",
    title: "Salary",
    type: "INCOME",
    amount: 500000, // Stored as lowest grade (e.g., cents/paisa)
    category: "INCOME",
    date: "2024-12-01T08:30:00Z", // ISO date format
  },
  {
    _id: "2",
    title: "Groceries",
    type: "EXPENSE",
    amount: 7500, // Stored as lowest grade
    category: "Food",
    date: "2024-12-02T10:00:00Z",
  },
  {
    _id: "3",
    title: "Freelance Payment",
    type: "INCOME",
    amount: 200000, // Stored as lowest grade
    category: "Freelance",
    date: "2024-12-03T15:45:00Z",
  },
  {
    _id: "4",
    title: "Electricity Bill",
    type: "EXPENSE",
    amount: 12000, // Stored as lowest grade
    category: "Utilities",
    date: "2024-12-05T18:00:00Z",
  },
  {
    _id: "5",
    title: "Movie Tickets",
    type: "EXPENSE",
    amount: 1500, // Stored as lowest grade
    category: "Entertainment",
    date: "2024-12-06T20:00:00Z",
  },
  {
    _id: "6",
    title: "Gift",
    type: "INCOME",
    amount: 10000, // Stored as lowest grade
    category: "Gift",
    date: "2024-12-07T12:00:00Z",
  },
];
