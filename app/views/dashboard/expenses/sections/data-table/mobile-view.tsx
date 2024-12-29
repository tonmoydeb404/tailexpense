import { flexRender } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "~/components/ui/badge";
import { Card, CardTitle } from "~/components/ui/card";
import { formatCurrency } from "~/utils/currency";
import type { TableType } from "./types";

type Props = { table: TableType };

const MobileView = (props: Props) => {
  const { table } = props;

  return (
    <div className="space-y-4 md:hidden">
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => {
          const data = row.original;
          const cells = row.getVisibleCells();
          const actionsCell = cells[cells.length - 1];

          return (
            <Card key={row.id} className="p-4 flex gap-3 items-center">
              <div className="flex flex-col">
                <CardTitle className="text-sm font-medium">
                  {data.title || "Untitled"}
                </CardTitle>
                <Badge variant="secondary" className="mt-1 w-fit">
                  {data.category}
                </Badge>
              </div>
              <div className="flex flex-col items-end ml-auto">
                <span className="text-sm font-semibold">
                  {formatCurrency(data.amount / 100, "BDT")}
                </span>
                <span className="text-xs mt-1">
                  {format(data.date, "yyyy-mm-dd")}
                </span>
              </div>
              {actionsCell &&
                flexRender(
                  actionsCell.column.columnDef.cell,
                  actionsCell.getContext()
                )}
            </Card>
          );
        })
      ) : (
        <div className="text-center text-muted-foreground py-8">
          No results.
        </div>
      )}
    </div>
  );
};

export default MobileView;
