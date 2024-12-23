import type { MetaArgs } from "react-router";
import DashboardCategoriesView from "~/views/dashboard/categories";

export function meta({}: MetaArgs) {
  return [
    { title: "Categories" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

type Props = {};

const Categories = (props: Props) => {
  return <DashboardCategoriesView />;
};

export default Categories;
