import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent } from "~/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { budgetReports } from "~/data/report";

const chartConfig: ChartConfig = {
  budget: {
    label: "Budget",
    color: "hsl(var(--chart-2))",
  },
  expense: {
    label: "Expense",
    color: "hsl(var(--chart-1))",
  },
};

const BudgetUsage = () => {
  return (
    <div>
      <h3 className="text-sm uppercase mb-3 font-medium text-muted-foreground">
        Budget Usage
      </h3>
      <Card>
        <CardContent className="py-5 px-2 sm:px-4">
          <ChartContainer config={chartConfig} className="max-h-[400px] w-full">
            <BarChart accessibilityLayer data={budgetReports}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="budget" fill="var(--color-budget)" radius={4} />
              <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetUsage;
