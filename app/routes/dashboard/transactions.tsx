import type { MetaArgs } from "react-router";
import DashboardTransactionsView from "~/views/dashboard/transactions";

export function meta({}: MetaArgs) {
  return [
    { title: "Transactions - Tailexpense" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

type Props = {};

const Transactions = (props: Props) => {
  return <DashboardTransactionsView />;
};

export default Transactions;
