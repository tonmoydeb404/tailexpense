import {
  ArrowRightLeft,
  Landmark,
  LayoutDashboard,
  Moon,
  Settings,
  Tag,
} from "lucide-react";
import { paths } from "~/routes/config";

export const generalLinks = [
  {
    title: "Dashboard",
    url: paths.dashboard.root,
    icon: LayoutDashboard,
  },
  {
    title: "Transactions",
    url: paths.dashboard.transactions,
    icon: ArrowRightLeft,
  },
  {
    title: "Categories",
    url: paths.dashboard.categories,
    icon: Tag,
  },
  {
    title: "Budgets",
    url: paths.dashboard.budgets,
    icon: Landmark,
  },
];

export const systemLinks = [
  {
    title: "Settings",
    url: paths.dashboard.settings,
    icon: Settings,
  },
  {
    title: "Theme",
    url: "#",
    icon: Moon,
  },
];
