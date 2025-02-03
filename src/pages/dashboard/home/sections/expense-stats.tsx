import { subDays } from "date-fns";
import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useAppContext } from "~/contexts/app";
import { useExpenseStats } from "~/db/hooks";
import { formatCurrency } from "~/utils/currency";

const chartConfig = {
  amount: {
    label: "Expense ",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

type TimeRange = "90d" | "30d" | "7d";

const ExpenseStats = () => {
  const { currency, date } = useAppContext();
  const [timeRange, setTimeRange] = useState<TimeRange>("90d");
  const start = useMemo(() => {
    switch (timeRange) {
      case "30d":
        return subDays(new Date(date), 30);
      case "90d":
        return subDays(new Date(date), 90);
      case "7d":
        return subDays(new Date(date), 7);
    }
  }, [date, timeRange]);

  const { data } = useExpenseStats(start.toISOString(), date);

  const report = data?.expenses?.map((item) => ({
    _id: item._id,
    amount: item.amount / 100,
    date: item.date,
  }));

  return (
    <Card>
      <CardHeader className="flex sm:items-center border-b py-5 sm:flex-row px-4 sm:px-5">
        <div className="grid flex-1 gap-1 text-left">
          <CardTitle>Expense Overview</CardTitle>
          <CardDescription>
            Total expense for the last {timeRange === "90d" && "3 months"}
            {timeRange === "30d" && "30 days"}
            {timeRange === "7d" && "7 days"}{" "}
            {` ${formatCurrency(
              data?.totalAmount ? data.totalAmount / 100 : 0,
              currency
            )}`}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange as any}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-6 px-2 sm:px-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={report}>
            <defs>
              <linearGradient id="fillAmount" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-amount)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-amount)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="amount"
              type="natural"
              fill="url(#fillAmount)"
              stroke="var(--color-amount)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ExpenseStats;
