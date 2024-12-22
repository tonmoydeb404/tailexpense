"use client";

import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardFooter } from "~/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { categories } from "~/data/category";
import { categoryReports } from "~/data/report";
import { formatCurrency } from "~/utils/currency";

type Props = {};

const MonthlyUsage = (props: Props) => {
  const chartConfig = categories.reduce((prev, curr) => {
    prev[curr._id] = {
      label: curr.name,
      color: curr.color,
    };

    return prev;
  }, {} as ChartConfig);

  const chartData = categoryReports.map((item) => ({
    ...item,
    fill: `var(--color-${item.category})`,
  }));

  const total = chartData.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-sm uppercase mb-3 font-medium text-muted-foreground">
        Monthly Usage
      </h3>
      <Card className="flex-1 flex flex-col justify-center">
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="aspect-square max-h-[400px] mx-auto"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="category"
                innerRadius={90}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {formatCurrency(total, "BDT")}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Expenses
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Expense up by 5.2% this month
          </div>
          <div className="leading-none text-muted-foreground">
            total expense for the last 1 months
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MonthlyUsage;
