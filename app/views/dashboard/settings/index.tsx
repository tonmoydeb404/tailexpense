import SeedData from "~/components/common/seed-data";
import { paths } from "~/routes/config";
import Header from "../common/header";
import DataManagementSection from "./sections/data-management";
import PersonalInfoSection from "./sections/personal-info";

type Props = {};

const DashboardSettingsView = (props: Props) => {
  return (
    <>
      <Header
        title="Settings"
        links={[
          { title: "Home", href: paths.dashboard.root },
          { title: "Settings", href: paths.dashboard.settings },
        ]}
      />
      <PersonalInfoSection />
      <DataManagementSection />
      <SeedData />
    </>
  );
};

export default DashboardSettingsView;
