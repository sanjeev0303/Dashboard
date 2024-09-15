"use client"

import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import AnalyticsCard from "./analytic-card"

export const description = "A pie chart with a label list"

const chartData = [
    {
      browser: "chrome",
      visitors: 275,
      fill: "var(--color-chrome)",
    },
    {
      browser: "safari",
      visitors: 200,
      fill: "var(--color-safari)",
    },
    {
      browser: "firefox",
      visitors: 187,
      fill: "var(--color-firefox)",
    },
    {
      browser: "edge",
      visitors: 173,
      fill: "var(--color-edge)",
    },
    {
      browser: "other",
      visitors: 90,
      fill: "var(--color-other)",
    },
  ];

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "#2563EB",
    },
    safari: {
      label: "Safari",
      color: "#61A8FB",
    },
    firefox: {
      label: "Firefox",
      color: "#3B86F7",
    },
    edge: {
      label: "Edge",
      color: "#90C7FE",
    },
    other: {
      label: "Other",
      color: "#BEDCFE",
    },
  } satisfies ChartConfig;


export function PieGraph() {
  return (
   <AnalyticsCard
     title="Traffic Pie Chart"
      subTitle="Showing Visitors from different browsers"
   >
    <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors">
              <LabelList
                dataKey="browser"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
   </AnalyticsCard>
  )
}
