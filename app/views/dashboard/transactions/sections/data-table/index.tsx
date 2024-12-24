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
  TransactionDeleteModal,
  TransactionUpdateModal,
} from "~/components/modals/transaction";
import { useTransactions } from "~/db/hooks/transaction";
import useModal from "~/hooks/use-modal";
import type { ITransaction } from "~/types/transaction";
import getColumns from "./columns";
import DesktopView from "./desktop-view";
import Footer from "./footer";
import Headers from "./headers";

const DataTableSection = () => {
  const { data } = useTransactions();
  const deleteModal = useModal<string>();
  const updateModal = useModal<ITransaction>();

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
      <TransactionDeleteModal
        data={deleteModal.data}
        onClose={deleteModal.closeModal}
      />
      <TransactionUpdateModal
        data={updateModal.data}
        onClose={updateModal.closeModal}
      />
    </div>
  );
};

export default DataTableSection;
