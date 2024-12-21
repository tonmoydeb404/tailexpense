import { Outlet } from "react-router";
import DashboardSidebar from "~/components/layouts/dashboard/sidebar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";

type Props = {};

const Layout = (props: Props) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
