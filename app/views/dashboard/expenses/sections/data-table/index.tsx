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

import { endOfMonth, startOfMonth } from "date-fns";
import { useEffect, useState } from "react";
import {
  ExpenseDeleteModal,
  ExpenseUpdateModal,
} from "~/components/modals/expense";
import { useAppContext } from "~/contexts/app-context";
import { useExpenses } from "~/db/hooks/expense";
import useModal from "~/hooks/use-modal";
import type { IExpense } from "~/types/expense";
import getColumns from "./columns";
import DesktopView from "./desktop-view";
import Footer from "./footer";
import Headers from "./headers";
import MobileView from "./mobile-view";

const DataTableSection = () => {
  const { currency, date } = useAppContext();
  const start = startOfMonth(date).toISOString();
  const end = endOfMonth(date).toISOString();
  const { data, mutate } = useExpenses(start, end);

  useEffect(() => {
    mutate();
  }, [start, end]);

  const deleteModal = useModal<string>();
  const updateModal = useModal<IExpense>();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const columns = getColumns({
    onDelete: deleteModal.openModal,
    onUpdate: updateModal.openModal,
    currency,
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
