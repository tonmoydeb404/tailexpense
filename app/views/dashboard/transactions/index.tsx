import { paths } from "~/routes/config";
import Header from "../common/header";
import DataTableSection from "./sections/data-table";

type Props = {};

const DashboardTransactionsView = (props: Props) => {
  return (
    <>
      <Header
        title="Transactions"
        links={[
          { title: "Home", href: paths.dashboard.root },
          { title: "Transactions", href: paths.dashboard.transactions },
        ]}
      />
      <DataTableSection />
    </>
  );
};

export default DashboardTransactionsView;
