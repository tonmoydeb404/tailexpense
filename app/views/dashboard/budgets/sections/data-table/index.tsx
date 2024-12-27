import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import {
  BudgetDeleteModal,
  BudgetUpdateModal,
} from "~/components/modals/budget";
import { useBudgets } from "~/db/hooks";
import useModal from "~/hooks/use-modal";
import type { IBudget } from "~/types/budget";
import getColumns from "./columns";
import DesktopView from "./desktop-view";
import Footer from "./footer";
import Headers from "./headers";

const DataTableSection = () => {
  const { data } = useBudgets();
  const deleteModal = useModal<string>();
  const updateModal = useModal<IBudget>();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns = getColumns({
    onDelete: deleteModal.openModal,
    onUpdate: updateModal.openModal,
  });

  const table = useReactTable({
    data: data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <Headers table={table} />
      <div className="rounded-md border mb-5">
        <DesktopView table={table} />
      </div>
      <Footer table={table} />

      <BudgetUpdateModal
        data={updateModal.data}
        onClose={updateModal.closeModal}
      />
      <BudgetDeleteModal
        data={deleteModal.data}
        onClose={deleteModal.closeModal}
      />
    </div>
  );
};

export default DataTableSection;
