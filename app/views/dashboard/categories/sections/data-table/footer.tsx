import { Button } from "~/components/ui/button";
import type { TableType } from "./types";

type Props = {
  table: TableType;
};

const Footer = (props: Props) => {
  const { table } = props;
  return (
    <div className="flex items-center justify-end flex-col-reverse sm:flex-row gap-2">
      <div className="flex-1 text-sm text-muted-foreground max-md:hidden">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Footer;
