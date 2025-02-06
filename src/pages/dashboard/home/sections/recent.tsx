import { endOfMonth, format, startOfMonth } from "date-fns";
import { LucideBox } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { useAppContext } from "~/contexts/app";
import { useExpenses } from "~/db/hooks";
import type { IExpense } from "~/types/expense";
import { formatCurrency } from "~/utils/currency";

type Props = {};

const RecentSection = (props: Props) => {
  const { date } = useAppContext();
  const start = startOfMonth(date).toISOString();
  const end = endOfMonth(date).toISOString();
  const { data, mutate, isLoading } = useExpenses(start, end);

  useEffect(() => {
    mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, end]);

  const filtered = useMemo(() => {
    if (!Array.isArray(data)) return [];

    return [...data].slice(0, 7);
  }, [data]);

  return (
    <div>
      <h3 className="text-sm uppercase mb-3 font-medium text-muted-foreground">
        Recent
      </h3>
      <div className="flex flex-col gap-2">
        {!isLoading ? (
          <>
            {filtered.map((item) => (
              <Item data={item} key={item._id} />
            ))}

            {filtered.length === 0 && (
              <div className="border border-dashed px-4 py-8 text-center rounded-lg flex flex-col items-center justify-center">
                <LucideBox className="mb-3 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Nothing yet
                </span>
              </div>
            )}
          </>
        ) : (
          <>
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
          </>
        )}
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
  const { currency } = useAppContext();

  return (
    <Card>
      <CardContent className="py-3 px-4 flex flex-row">
        <div className="flex-1">
          <h2 className="text-base font-medium">{data.title || "Untitled"}</h2>
          <span className="text-sm text-muted-foreground">
            {format(data.date, "dd MMM yyyy")}
          </span>
        </div>

        <h3 className="text-lg font-bold">
          {formatCurrency(data.amount / 100, currency)}
        </h3>
      </CardContent>
    </Card>
  );
};
