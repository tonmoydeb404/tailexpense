import type { ColumnDef } from "@tanstack/react-table";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { ICategory } from "~/types/category";
import { getForegroundColor } from "~/utils/color";

type Props = {
  onDelete: (id: string) => void;
  onUpdate: (data: ICategory) => void;
};
const getColumns = (props: Props): ColumnDef<ICategory>[] => {
  const { onDelete, onUpdate } = props;

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
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <div className="flex items-center gap-2">
            Name
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
        <div className="capitalize">{row.getValue("name") || "Untitled"}</div>
      ),
    },
    {
      accessorKey: "color",
      header: "Color",
      cell: ({ row }) => {
        const { color } = row.original;
        return (
          <Badge
            style={{ background: color, color: getForegroundColor(color) }}
          >
            {color}
          </Badge>
        );
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
              <Button variant="ghost" size={"icon"} className="size-8">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="max-md:hidden" />
                <MoreVertical className="md:hidden" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(category._id)}
              >
                Copy categories ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onUpdate(category)}>
                Update Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(category._id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};

export default getColumns;
