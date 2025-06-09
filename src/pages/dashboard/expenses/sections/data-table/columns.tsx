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
import type { IExpense } from "~/types/expense";
import { getForegroundColor } from "~/utils/color";
import { formatCurrency } from "~/utils/currency";
import type { DataType } from "./types";

type Props = {
  onDelete: (id: string) => void;
  onUpdate: (transaction: IExpense) => void;
  currency: string | null;
};

const getColumns = (props: Props): ColumnDef<DataType>[] => {
  const { onDelete, onUpdate, currency } = props;

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
      header: ({ column }) => {
        return (
          <div className="flex items-center gap-2">
            Title
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
        <div className="capitalize">{row.getValue("title") || "Untitled"}</div>
      ),
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
        <div>{format(row.getValue("date"), "dd, MMM, yyyy")}</div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const { category } = row.original;

        return (
          <Badge
            style={
              category
                ? {
                    background: category.color,
                    color: getForegroundColor(category.color),
                  }
                : undefined
            }
          >
            {category?.name || "Uncategorized"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        return (
          <div className="text-right font-medium">
            {formatCurrency(amount / 100, currency)}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row, column }) => {
        const transaction = row.original;

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
              {
                type: "Item",
                label: "Copy transaction ID",
                props: {
                  onClick: () => navigator.clipboard.writeText(transaction._id),
                },
              },
              { type: "Separator", label: "" },
              {
                type: "Item",
                label: "Update Details",
                props: {
                  onClick: () =>
                    onUpdate({
                      ...transaction,
                      category: transaction.category?._id ?? null,
                    }),
                },
              },
              {
                type: "Item",
                label: "Delete",
                props: { onClick: () => onDelete(transaction._id) },
              },
            ]}
          />
        );
      },
    },
  ];
};

export default getColumns;
