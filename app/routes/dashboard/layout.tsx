import { Outlet } from "react-router";
import DashboardSidebar from "~/components/layouts/dashboard/sidebar";
import { SidebarProvider } from "~/components/ui/sidebar";

type Props = {};

const Layout = (props: Props) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full px-5 2xl:px-10">
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
