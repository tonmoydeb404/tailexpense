import { paths } from "~/routes/config";
import Header from "../common/header";
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
    </>
  );
};

export default DashboardSettingsView;
