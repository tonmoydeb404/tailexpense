import { LucideMoon, LucideSun } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";
import { useTheme } from "~/contexts/theme/index";

type Props = {
  isSidebarOpen: boolean;
};

const ThemeToggler = (props: Props) => {
  const { isSidebarOpen } = props;
  const { toggleTheme, theme } = useTheme();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        size={isSidebarOpen ? "lg" : "default"}
        className="text-base px-4"
        onClick={toggleTheme}
      >
        {theme === "dark" ? <LucideSun /> : <LucideMoon />}
        <span>Theme</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default ThemeToggler;
