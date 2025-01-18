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
  CategoryDeleteModal,
  CategoryUpdateModal,
} from "~/components/modals/category";
import { useCategories } from "~/db/hooks";
import useModal from "~/hooks/use-modal";
import type { ICategory } from "~/types/category";
import getColumns from "./columns";
import DesktopView from "./desktop-view";
import Footer from "./footer";
import Headers from "./headers";
import MobileView from "./mobile-view";

const DataTableSection = () => {
  const { data } = useCategories();
  const updateModal = useModal<ICategory>();
  const deleteModal = useModal<string>();

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
        <DesktopView table={table} />
        <MobileView table={table} />
      </div>
      <Footer table={table} />

      <CategoryUpdateModal
        data={updateModal.data}
        onClose={updateModal.closeModal}
      />
      <CategoryDeleteModal
        data={deleteModal.data}
        onClose={deleteModal.closeModal}
      />
    </div>
  );
};

export default DataTableSection;
