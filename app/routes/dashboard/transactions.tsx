import type { MetaArgs } from "react-router";
import DashboardExpensesView from "~/views/dashboard/expenses";

export function meta({}: MetaArgs) {
  return [
    { title: "Transactions - Tailexpense" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

type Props = {};

const Transactions = (props: Props) => {
  return <DashboardExpensesView />;
};

export default Transactions;
