import { LucideMoon, LucideSun } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";
import { useTheme } from "~/contexts/theme";

type Props = {
  isSidebarOpen: boolean;
};

const ThemeToggler = (props: Props) => {
  const { isSidebarOpen } = props;
  const { setTheme, theme } = useTheme();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        size={isSidebarOpen ? "lg" : "default"}
        className="text-base px-4"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <LucideSun /> : <LucideMoon />}
        <span>Theme</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default ThemeToggler;