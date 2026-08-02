"use client";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { formatCurrency } from "@/lib/utils";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  total: {
    label: "Tổng doanh thu",
    color: "var(--chart-1)",
  },
  successful: {
    label: "Đã thanh toán",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "Tháng 1", total: 186000000, successful: 80000000 },
  { month: "Tháng 2", total: 305000000, successful: 200000000 },
  { month: "Tháng 3", total: 237000000, successful: 120000000 },
  { month: "Tháng 4", total: 173000000, successful: 100000000 },
  { month: "Tháng 5", total: 209000000, successful: 130000000 },
  { month: "Tháng 6", total: 214000000, successful: 140000000 },
];

const AppBarChart = () => {
  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">Tổng doanh thu</h1>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.replace("Tháng ", "T")}
          />
          <YAxis
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => `${value / 1000000}tr`}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => formatCurrency(Number(value))}
              />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="total" fill="var(--color-total)" radius={4} />
          <Bar dataKey="successful" fill="var(--color-successful)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default AppBarChart;
