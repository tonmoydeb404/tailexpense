import { Outlet } from "react-router";
import { SidebarProvider } from "~/components/ui/sidebar";
import AppBar from "./app-bar";
import LayoutSidebar from "./sidebar";

type Props = {};

const DashboardLayout = (_props: Props) => {
  return (
    <SidebarProvider>
      <LayoutSidebar />
      <main className="w-full my-10 pb-14 md:pb-0 px-5 2xl:px-10">
        <Outlet />
      </main>
      <AppBar />
    </SidebarProvider>
  );
};

export default DashboardLayout;
