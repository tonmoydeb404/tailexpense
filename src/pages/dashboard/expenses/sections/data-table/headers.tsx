import { ExpenseCreateModal } from "~/components/modals/expense";
import { Input } from "~/components/ui/input";
import ColumnFilter from "./column-filter";
import type { TableType } from "./types";

type Props = {
  table: TableType;
};

const Headers = (props: Props) => {
  const { table } = props;
  return (
    <div className="flex sm:items-center mb-4 gap-2 justify-between flex-col sm:flex-row">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Filter titles..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm w-full"
        />

        <ColumnFilter table={table} />
      </div>
      <div className="flex items-center">
        <ExpenseCreateModal />
      </div>
    </div>
  );
};

export default Headers;
