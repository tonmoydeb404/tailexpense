import Breadcrumbs, {
  type BreadcrumbItem,
} from "~/components/common/breadcrumbs";
import { Separator } from "~/components/ui/separator";
import { SidebarTrigger } from "~/components/ui/sidebar";

type Props = {
  title: string;
  links: BreadcrumbItem[];
};

const Header = (props: Props) => {
  const { title, links } = props;
  return (
    <header className="mt-10 mb-16">
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
    </header>
  );
};

export default Header;
