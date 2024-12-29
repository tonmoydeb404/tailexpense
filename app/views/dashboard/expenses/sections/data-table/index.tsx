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
import { useEffect, useMemo, useState } from "react";
import {
  ExpenseDeleteModal,
  ExpenseUpdateModal,
} from "~/components/modals/expense";
import { useAppContext } from "~/contexts/app-context";
import { useCategories } from "~/db/hooks";
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
  const categories = useCategories();

  useEffect(() => {
    mutate();
  }, [start, end]);

  const expenses = useMemo(() => {
    if (!data) return [];
    if (!Array.isArray(categories?.data)) {
      return data.map((item) => ({ ...item, category: null }));
    }

    return data.map((item) => ({
      ...item,
      category:
        categories.data?.find((cat) => cat._id === item.category) ?? null,
    }));
  }, [data, categories?.data]);

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
    data: expenses,
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
