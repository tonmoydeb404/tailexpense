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
  ExpenseDeleteModal,
  ExpenseUpdateModal,
} from "~/components/modals/expense";
import { useExpenses } from "~/db/hooks/expense";
import useModal from "~/hooks/use-modal";
import type { IExpense } from "~/types/expense";
import getColumns from "./columns";
import DesktopView from "./desktop-view";
import Footer from "./footer";
import Headers from "./headers";
import MobileView from "./mobile-view";

const DataTableSection = () => {
  const { data } = useExpenses();
  const deleteModal = useModal<string>();
  const updateModal = useModal<IExpense>();

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
      <div className="rounded-md md:border mb-5">
        <MobileView table={table} />
        <DesktopView table={table} />
      </div>
      <Footer table={table} />
      <ExpenseDeleteModal
        data={deleteModal.data}
        onClose={deleteModal.closeModal}
      />
      <ExpenseUpdateModal
        data={updateModal.data}
        onClose={updateModal.closeModal}
      />
    </div>
  );
};

export default DataTableSection;
