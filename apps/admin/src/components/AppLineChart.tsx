"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";

const chartData = [
  { month: "Tháng 1", desktop: 186, mobile: 80 },
  { month: "Tháng 2", desktop: 305, mobile: 200 },
  { month: "Tháng 3", desktop: 237, mobile: 120 },
  { month: "Tháng 4", desktop: 73, mobile: 190 },
  { month: "Tháng 5", desktop: 209, mobile: 130 },
  { month: "Tháng 6", desktop: 214, mobile: 140 },
];
const chartConfig = {
  desktop: {
    label: "Máy tính",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Di động",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const AppLineChart = () => {
  return (
    <ChartContainer config={chartConfig} className="mt-6">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.replace("Tháng ", "T")}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey="desktop"
          type="monotone"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="mobile"
          type="monotone"
          stroke="var(--color-mobile)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default AppLineChart;
