import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent } from "~/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { useAppContext } from "~/contexts/app";
import { useCategoryStats } from "~/db/hooks";
import useResponsiveValue from "~/hooks/use-responsive-value";
import { formatCurrency } from "~/utils/currency";

type Props = {};

const MonthlyUsage = (props: Props) => {
  const { date, currency } = useAppContext();
  const { data } = useCategoryStats(date);

  const chartConfig = useMemo(() => {
    if (!Array.isArray(data) || data.length <= 0) return {};

    return data.reduce((prev, curr) => {
      prev[curr._id] = {
        label: curr.name,
        color: curr.color,
      };

      return prev;
    }, {} as ChartConfig);
  }, [data]);

  const chartData = useMemo(() => {
    if (!Array.isArray(data) || data.length <= 0) return [];

    return data.map((item) => ({
      ...item,
      total: item.total / 100,
      fill: `var(--color-${item._id})`,
    }));
  }, [data]);

  const total = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.total, 0);
  }, [chartData]);
  const innerRadius = useResponsiveValue({ "2xl": 70, sm: 60 });

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-sm uppercase mb-3 font-medium text-muted-foreground">
        Monthly Usage
      </h3>
      <Card className="flex-1 flex flex-col justify-center">
        <CardContent className="p-0">
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
                dataKey="total"
                nameKey="name"
                innerRadius={innerRadius}
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
                            className="fill-foreground text-2xl 2xl:text-3xl font-bold"
                          >
                            {formatCurrency(total, currency, {
                              minimumFractionDigits: 0,
                            })}
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
      </Card>
    </div>
  );
};

export default MonthlyUsage;
