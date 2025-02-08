import AppDatePicker from "~/components/common/app-date-picker";
import Breadcrumbs, {
  type BreadcrumbItem,
} from "~/components/common/breadcrumbs";
import { Separator } from "~/components/ui/separator";
import { SidebarTrigger } from "~/components/ui/sidebar";
import ThemeToggler from "./theme-toggler";

type Props = {
  title: string;
  links: BreadcrumbItem[];
};

const Header = (props: Props) => {
  const { title, links } = props;
  return (
    <header className="mb-14 flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold font-heading mb-2">{title}</h1>
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          {links.length > 0 && (
            <>
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumbs items={links} />
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggler />
        <AppDatePicker />
      </div>
    </header>
  );
};

export default Header;
