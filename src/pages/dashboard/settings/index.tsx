import SeedData from "~/components/common/seed-data";
import { paths } from "~/router/config";
import Header from "../common/header";
import DataManagementSection from "./sections/data-management";
import PersonalInfoSection from "./sections/personal-info";

type Props = {};

const DashboardSettingsPage = (props: Props) => {
  return (
    <>
      <title>Settings - TailExpenese</title>
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

export default DashboardSettingsPage;
