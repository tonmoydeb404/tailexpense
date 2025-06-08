import {
  ArrowRightLeft,
  Bell,
  Landmark,
  LayoutDashboard,
  Settings,
  Tag,
} from "lucide-react";
import { paths } from "~/router/config";

export const generalLinks = [
  {
    title: "Dashboard",
    url: paths.dashboard.root,
    icon: LayoutDashboard,
  },
  {
    title: "Expenses",
    url: paths.dashboard.expenses,
    icon: ArrowRightLeft,
  },
  {
    title: "Categories",
    url: paths.dashboard.categories,
    icon: Tag,
  },
  {
    title: "Reminders",
    url: paths.dashboard.reminders,
    icon: Bell,
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
];
