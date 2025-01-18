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

import { endOfYear, startOfYear } from "date-fns";
import { useEffect, useState } from "react";
import {
  BudgetDeleteModal,
  BudgetUpdateModal,
} from "~/components/modals/budget";
import { useAppContext } from "~/contexts/app";
import { useBudgets } from "~/db/hooks";
import useModal from "~/hooks/use-modal";
import type { IBudget } from "~/types/budget";
import getColumns from "./columns";
import DesktopView from "./desktop-view";
import Footer from "./footer";
import Headers from "./headers";
import MobileView from "./mobile-view";

const DataTableSection = () => {
  const { currency, date } = useAppContext();
  const start = startOfYear(date).toISOString();
  const end = endOfYear(date).toISOString();

  const { data, mutate } = useBudgets(start, end);

  useEffect(() => {
    mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, end]);

  const deleteModal = useModal<string>();
  const updateModal = useModal<IBudget>();

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
        <DesktopView table={table} />
        <MobileView table={table} />
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
