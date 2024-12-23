import type { MetaArgs } from "react-router";
import DashboardHomeView from "~/views/dashboard/home";

export function meta({}: MetaArgs) {
  return [
    { title: "Dashboard - Tailexpense" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Dashboard() {
  return <DashboardHomeView />;
}
