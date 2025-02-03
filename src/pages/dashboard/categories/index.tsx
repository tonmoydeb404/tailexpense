import { paths } from "~/router/config";
import Header from "../common/header";
import DataTableSection from "./sections/data-table";

type Props = {};

const DashboardCategoriesPage = (props: Props) => {
  return (
    <>
      <title>Categories - TailExpenese</title>
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

export default DashboardCategoriesPage;
