import { BudgetCreateModal } from "~/components/modals/budget";
import { Input } from "~/components/ui/input";
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
          placeholder="Filter Names..."
          value={(table.getColumn("month")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("month")?.setFilterValue(event.target.value)
          }
          className="max-w-sm w-full"
        />
      </div>
      <div className="flex items-center">
        <BudgetCreateModal />
      </div>
    </div>
  );
};

export default Headers;
