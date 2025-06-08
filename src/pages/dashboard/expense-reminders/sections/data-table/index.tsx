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
import { useState } from "react";
import {
  ReminderCompleteModal,
  ReminderDeleteModal,
  ReminderUpdateModal,
} from "~/components/modals/expense-reminder";
import { useAppContext } from "~/contexts/app";
import { useExpenseReminders } from "~/db/hooks";
import useModal from "~/hooks/use-modal";
import { IExpenseReminder } from "~/types/expense";
import getColumns from "./columns";
import DesktopView from "./desktop-view";
import Footer from "./footer";
import Headers from "./headers";
import MobileView from "./mobile-view";

const DataTableSection = () => {
  const { currency, date } = useAppContext();
  const start = startOfMonth(date).toISOString();
  const end = endOfMonth(date).toISOString();

  const { data, mutate } = useExpenseReminders(start, end);

  const deleteModal = useModal<string>();
  const completeModal = useModal<string>();
  const updateModal = useModal<IExpenseReminder>();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const columns = getColumns({
    onDelete: deleteModal.openModal,
    onUpdate: updateModal.openModal,
    onComplete: completeModal.openModal,
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
        <DesktopView table={table} />
        <MobileView table={table} />
      </div>
      <Footer table={table} />

      <ReminderUpdateModal
        data={updateModal.data}
        onClose={updateModal.closeModal}
      />
      <ReminderDeleteModal
        data={deleteModal.data}
        onClose={deleteModal.closeModal}
      />
      <ReminderCompleteModal
        data={completeModal.data}
        onClose={completeModal.closeModal}
      />
    </div>
  );
};

export default DataTableSection;
