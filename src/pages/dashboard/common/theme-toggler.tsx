import { LucideMoon, LucideSun } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useTheme } from "~/contexts/theme/index";

type Props = {};

const ThemeToggler = (props: Props) => {
  const { toggleTheme, theme } = useTheme();
  return (
    <Button
      size={"icon"}
      variant={"ghost"}
      className="size-10 md:hidden"
      onClick={toggleTheme}
    >
      {theme === "dark" ? <LucideSun /> : <LucideMoon />}
    </Button>
  );
};

export default ThemeToggler;
