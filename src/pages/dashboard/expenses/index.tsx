import { paths } from "~/router/config";
import Header from "../common/header";
import DataTableSection from "./sections/data-table";

type Props = {};

const DashboardExpensesPage = (props: Props) => {
  return (
    <>
      <Header
        title="Expenses"
        links={[
          { title: "Home", href: paths.dashboard.root },
          { title: "Expenses", href: paths.dashboard.expenses },
        ]}
      />
      <DataTableSection />
    </>
  );
};

export default DashboardExpensesPage;
