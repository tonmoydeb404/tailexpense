import { NavLink } from "react-router";
import { generalLinks, systemLinks } from "./config";

type Props = {};

const AppBar = (props: Props) => {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-fit flex items-center bg-background p-1.5 gap-2 rounded-lg border md:hidden">
      {[...generalLinks, ...systemLinks].map((item) => (
        <NavLink
          to={item.url}
          key={item.url}
          className="size-10 [&_svg]:size-4 flex flex-col items-center justify-center hover:bg-accent hover:text-accent-foreground [&.active]:w-auto [&.active]:px-3 rounded-lg [&.active]:bg-primary [&.active]:text-primary-foreground duration-200"
          end
        >
          <item.icon />
        </NavLink>
      ))}
    </div>
  );
};

export default AppBar;
