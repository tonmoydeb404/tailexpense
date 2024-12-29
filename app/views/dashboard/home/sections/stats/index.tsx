import { useStats } from "~/db/hooks";
import StatCard from "./card";
import StatCardSkeleton from "./card-skeleton";

type Props = {};

const StatsSection = (props: Props) => {
  const { data } = useStats("2024-12-29T07:13:24.886Z");

  return (
    <div className="mb-10 w-full">
      <h3 className="text-sm uppercase mb-3 font-medium text-muted-foreground">
        Stats
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {!!data ? (
          <>
            <StatCard
              title="budget"
              amount={data.budget}
              increment={data.budgetIncrease}
            />
            <StatCard
              title="balance"
              amount={data.balance}
              increment={data.balanceIncrease}
            />
            <StatCard
              title="expenses"
              amount={data.expenses}
              increment={data.expenseIncrease}
            />
          </>
        ) : (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        )}
      </div>
    </div>
  );
};

export default StatsSection;
