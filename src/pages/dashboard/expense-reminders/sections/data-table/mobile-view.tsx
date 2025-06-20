import { flexRender } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "~/components/ui/badge";
import { Card, CardDescription, CardTitle } from "~/components/ui/card";
import { useAppContext } from "~/contexts/app";
import { formatCurrency } from "~/utils/currency";
import type { TableType } from "./types";

type Props = { table: TableType };

const MobileView = (props: Props) => {
  const { table } = props;
  const { currency } = useAppContext();

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
                <CardTitle className="text-base font-medium mb-0">
                  {data.title}
                </CardTitle>
                <CardDescription className="text-sm mb-2">
                  {format(data.date, "dd MMMM yyyy")}
                </CardDescription>
                <div className="w-fit flex items-center gap-1 ">
                  <Badge
                    variant={
                      data.status === "COMPLETED" ? "default" : "outline"
                    }
                  >
                    {data.status === "COMPLETED" ? "PAID" : "UNPAID"}
                  </Badge>
                  <Badge variant={"secondary"}>
                    {formatCurrency(data.amount / 100, currency)}
                  </Badge>
                </div>
              </div>
              <div className="ml-auto"></div>
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
