import { paths } from "~/routes/config";
import Header from "../common/header";
import DataTableSection from "./sections/data-table";

type Props = {};

const DashboardBudgetsView = (props: Props) => {
  return (
    <>
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

export default DashboardBudgetsView;
