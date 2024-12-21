import type { MetaArgs } from "react-router";
import DashboardView from "~/views/dashboard";

export function meta({}: MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Dashboard() {
  return <DashboardView />;
}
