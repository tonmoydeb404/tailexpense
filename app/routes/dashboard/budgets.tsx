import type { MetaArgs } from "react-router";
import DashboardBudgetsView from "~/views/dashboard/budgets";

export function meta({}: MetaArgs) {
  return [
    { title: "Budgets" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

type Props = {};

const Budgets = (props: Props) => {
  return <DashboardBudgetsView />;
};

export default Budgets;
