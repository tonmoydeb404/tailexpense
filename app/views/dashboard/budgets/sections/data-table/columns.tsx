import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from "lucide-react";
import moment from "moment";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { IBudget } from "~/types/budget";
import { formatCurrency } from "~/utils/currency";

const columns: ColumnDef<IBudget>[] = [
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
    accessorKey: "month",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          Month
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
        {moment(row.getValue("month")).format("MMMM-YYYY")}
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
      return <div>{formatCurrency(amount / 100, "BDT")}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(category._id)}
            >
              Copy budget ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Update Details</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default columns;
