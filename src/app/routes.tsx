import { createBrowserRouter } from "react-router";
import DashboardLayout from "~/components/layouts/dashboard";
import DashboardBudgetsPage from "~/pages/dashboard/budgets";
import DashboardCategoriesPage from "~/pages/dashboard/categories";
import DashboardExpenseRemindersPage from "~/pages/dashboard/expense-reminders";
import DashboardExpensesPage from "~/pages/dashboard/expenses";
import DashboardHomePage from "~/pages/dashboard/home";
import DashboardSettingsPage from "~/pages/dashboard/settings";
import HomePage from "~/pages/home";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHomePage />,
      },
      {
        path: "expenses",
        element: <DashboardExpensesPage />,
      },
      {
        path: "categories",
        element: <DashboardCategoriesPage />,
      },
      {
        path: "budgets",
        element: <DashboardBudgetsPage />,
      },

      {
        path: "reminders",
        element: <DashboardExpenseRemindersPage />,
      },
      {
        path: "settings",
        element: <DashboardSettingsPage />,
      },
    ],
  },
]);

export default routes;
