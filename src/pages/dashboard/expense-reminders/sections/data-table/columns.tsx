import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  MoreHorizontal,
  MoreVertical,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { ResponsiveDropdown } from "~/components/ui/responsive-dropdown";
import { IExpenseReminder } from "~/types/expense";
import { formatCurrency } from "~/utils/currency";

type Props = {
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
  onUpdate: (data: IExpenseReminder) => void;
  currency: string | null;
};

const getColumns = (props: Props): ColumnDef<IExpenseReminder>[] => {
  const { onDelete, onUpdate, currency, onComplete } = props;
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <div className="flex items-center gap-2">
            Date
            <button
              className="hover:text-foreground"
              onClick={() => column.toggleSorting()}
            >
              {column.getIsSorted() === "asc" && (
                <ArrowDown size={14} className="text-brand" />
              )}
              {column.getIsSorted() === "desc" && (
                <ArrowUp size={14} className="text-brand" />
              )}
              {!column.getIsSorted() && <ArrowUpDown size={14} />}
            </button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">
          {format(row.getValue("date"), "dd MMMM yyyy")}
        </div>
      ),
    },

    {
      accessorKey: "amount",
      header: ({ column }) => {
        return (
          <div className="flex items-center gap-2">
            Amount
            <button
              className="hover:text-foreground"
              onClick={() => column.toggleSorting()}
            >
              {column.getIsSorted() === "asc" && (
                <ArrowDown size={14} className="text-brand" />
              )}
              {column.getIsSorted() === "desc" && (
                <ArrowUp size={14} className="text-brand" />
              )}
              {!column.getIsSorted() && <ArrowUpDown size={14} />}
            </button>
          </div>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        return <div>{formatCurrency(amount / 100, currency)}</div>;
      },
    },
    {
      accessorKey: "isRecurring",
      header: "Recurring",
      cell: ({ row }) => (
        <div className="capitalize">
          <Checkbox defaultChecked={row.original.isRecurring} />
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">
          <Badge
            variant={
              row.original.status === "COMPLETED" ? "default" : "outline"
            }
          >
            {row.original.status === "COMPLETED" ? "PAID" : "UNPAID"}
          </Badge>
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const entity = row.original;

        return (
          <ResponsiveDropdown
            contentProps={{ align: "end" }}
            trigger={
              <Button variant="ghost" size="icon" className="size-8">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="max-md:hidden" />
                <MoreVertical className="md:hidden" />
              </Button>
            }
            triggerProps={{ asChild: true }}
            options={[
              { type: "Label", label: "Actions" },
              { type: "Separator", label: "" },
              {
                type: "Item",
                label: "Update Details",
                props: {
                  onClick: () => onUpdate({ ...entity }),
                },
              },
              {
                type: "Item",
                label: "Complete Payment",
                props: {
                  onClick: () => onComplete(entity._id),
                  variant: "default",
                },
              },
              {
                type: "Item",
                label: "Delete",
                props: {
                  onClick: () => onDelete(entity._id),
                  variant: "destructive",
                },
              },
            ]}
          />
        );
      },
    },
  ];
};

export default getColumns;
