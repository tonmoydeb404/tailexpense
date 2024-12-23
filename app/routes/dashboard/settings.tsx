import type { MetaArgs } from "react-router";
import DashboardSettingsView from "~/views/dashboard/settings";

export function meta({}: MetaArgs) {
  return [
    { title: "Settings" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

type Props = {};

const Settings = (props: Props) => {
  return <DashboardSettingsView />;
};

export default Settings;
