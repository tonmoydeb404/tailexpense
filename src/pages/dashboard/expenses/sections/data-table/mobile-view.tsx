import { flexRender } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "~/components/ui/badge";
import { Card, CardTitle } from "~/components/ui/card";
import { useAppContext } from "~/contexts/app";
import { getForegroundColor } from "~/utils/color";
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
          const { category } = data;
          const cells = row.getVisibleCells();
          const actionsCell = cells[cells.length - 1];

          return (
            <Card key={row.id} className="p-4 flex gap-3 items-center">
              <div className="flex flex-col">
                <CardTitle className="text-base font-medium mb-1">
                  {data.title || "Untitled"}
                </CardTitle>
                <Badge
                  style={
                    category
                      ? {
                          background: category.color,
                          color: getForegroundColor(category.color),
                        }
                      : undefined
                  }
                  className="w-fit"
                >
                  {category?.name || "Uncategorized"}
                </Badge>
              </div>
              <div className="flex flex-col items-end ml-auto">
                <span className="text-lg font-semibold">
                  {formatCurrency(data.amount / 100, currency)}
                </span>
                <span className="text-xs mt-1">
                  {format(data.date, "dd-MM-yyyy")}
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
