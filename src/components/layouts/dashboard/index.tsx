import { Outlet } from "react-router";
import { SidebarProvider } from "~/components/ui/sidebar";
import DashboardSidebar from "./sidebar";

type Props = {};

const DashboardLayout = (_props: Props) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full my-10 px-5 2xl:px-10">
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
