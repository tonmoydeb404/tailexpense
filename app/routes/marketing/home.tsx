import type { MetaArgs } from "react-router";
import HomeView from "~/views/home";

export function meta({}: MetaArgs) {
  return [
    { title: "Tailexpense" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <HomeView />;
}
