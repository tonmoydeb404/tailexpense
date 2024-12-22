import { Fragment } from "react";
import { Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export type BreadcrumbItem = {
  title: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

const Breadcrumbs = (props: Props) => {
  const { items } = props;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index, array) => (
          <Fragment key={index}>
            <BreadcrumbItem className="hidden md:block">
              {item.href ? (
                <BreadcrumbLink asChild>
                  <Link to={item.href}>{item.title}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index + 1 !== array.length && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
