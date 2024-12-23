import { Link } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";
import { cn } from "~/lib/utils";
import { generalLinks, systemLinks } from "./config";

const DashboardSidebar = () => {
  const { state, openMobile, openTab, setOpenMobile, setOpenTab } =
    useSidebar();
  const isOpen = state !== "collapsed";
  const isSidebarOpen = isOpen || openMobile || openTab;

  const closeSheet = () => {
    setOpenTab(false);
    setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className={cn(isSidebarOpen ? "px-8 pt-10" : "", "pb-10")}>
        {isSidebarOpen && (
          <img src="/brand/logo-full.svg" className={cn("w-full")} />
        )}
        {!isOpen && !openMobile && !openTab && (
          <img src="/brand/logo-mini.svg" className="w-8 max-w-full" />
        )}
      </SidebarHeader>
      <SidebarContent className={isOpen ? "px-3" : ""}>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {generalLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    size={isSidebarOpen ? "lg" : "default"}
                    className="text-base px-4"
                    onClick={closeSheet}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    size={isSidebarOpen ? "lg" : "default"}
                    className="text-base px-4"
                    onClick={closeSheet}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
