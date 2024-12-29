import { TrendingDown, TrendingUp } from "lucide-react";
import moment from "moment";
import { Card, CardContent } from "~/components/ui/card";
import { recentTransaction } from "~/data/transaction";
import { cn } from "~/lib/utils";
import type { IExpense } from "~/types/expense";
import { formatCurrency } from "~/utils/currency";

type Props = {};

const RecentSection = (props: Props) => {
  return (
    <div>
      <h3 className="text-sm uppercase mb-3 font-medium text-muted-foreground">
        Recent
      </h3>
      <div className="flex flex-col gap-2">
        {recentTransaction.map((item) => (
          <Item data={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default RecentSection;

// ----------------------------------------------------------------------

type ItemProps = {
  data: IExpense;
};
const Item = (props: ItemProps) => {
  const { data } = props;

  return (
    <Card>
      <CardContent className="py-3 px-4 flex flex-row">
        <div
          className={cn(
            "self-center border p-1.5 rounded mr-4",
            data.type === "EXPENSE" ? "text-red-500" : "",
            data.type === "INCOME" ? "text-green-500" : ""
          )}
        >
          {data.type === "EXPENSE" && <TrendingDown />}
          {data.type === "INCOME" && <TrendingUp />}
        </div>

        <div className="flex-1">
          <h2 className="text-base font-medium">{data.title || "Untitled"}</h2>
          <span className="text-sm text-muted-foreground">
            {moment(data.date).format("DD MMM YYYY")}
          </span>
        </div>

        <h3 className="text-lg font-bold">
          {formatCurrency(data.amount / 100, "BDT")}
        </h3>
      </CardContent>
    </Card>
  );
};
