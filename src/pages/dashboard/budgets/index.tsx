import { paths } from "~/router/config";
import Header from "../common/header";
import DataTableSection from "./sections/data-table";

type Props = {};

const DashboardBudgetsPage = (props: Props) => {
  return (
    <>
      <title>Budgets - TailExpenese</title>
      <Header
        title="Budgets"
        links={[
          { title: "Home", href: paths.dashboard.root },
          { title: "Budgets", href: paths.dashboard.budgets },
        ]}
      />
      <DataTableSection />
    </>
  );
};

export default DashboardBudgetsPage;
