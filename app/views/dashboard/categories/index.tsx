import { paths } from "~/routes/config";
import Header from "../common/header";
import DataTableSection from "./sections/data-table";

type Props = {};

const DashboardCategoriesView = (props: Props) => {
  return (
    <>
      <Header
        title="Categories"
        links={[
          { title: "Home", href: paths.dashboard.root },
          { title: "Categories", href: paths.dashboard.categories },
        ]}
      />
      <DataTableSection />
    </>
  );
};

export default DashboardCategoriesView;
