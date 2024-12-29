import { TrendingDown, TrendingUp } from "lucide-react";
import moment from "moment";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import type { IExpense } from "~/types/expense";
import { formatCurrency } from "~/utils/currency";

type Props = {
  data: IExpense;
};
const Row = (props: Props) => {
  const { data } = props;

  return (
    <Card>
      <CardContent className="py-2 px-3 flex flex-row">
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

export default Row;
