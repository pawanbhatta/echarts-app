import { EChartsOption } from "echarts";

const DEFAULT_BAR_COLORS = {
  barColor: {
    group1: "#5db5e3",
    group2: "#ff9179",
  },
  barTextColor: {
    group1: "#64b7e3",
    group2: "#ff9881",
  },
};
export default function useGroupedBarChart({
  barColors = DEFAULT_BAR_COLORS,
  ...options
}: {
  title: string;
  dataset: any[][];
  xAxis?: any[];
  yAxis?: any[];
  barColors?: typeof DEFAULT_BAR_COLORS;
}): EChartsOption {
  return {
    grid: {
      containLabel: true,
    },
    dataset: {
      source: options.dataset,
    },
    yAxis: {
      type: "category",
      inverse: true,
      data: options.yAxis,
    },
    xAxis: {
      type: "value",
      axisLabel: {
        formatter: (value) => {
          return (value < 10 ? value.toFixed(2) : value.toFixed(1)) + "%";
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          width: 2,
        },
      },
    },
    series: [
      {
        type: "bar",
        barWidth: "30%",
        color: barColors.barColor.group1,
        label: {
          show: true,
          position: "right",
          color: barColors.barTextColor.group1,
          formatter: (value) => {
            // @ts-expect-error
            return value.data[1].toString() + "%";
          },
        },
      },
      {
        type: "bar",
        barWidth: "30%",
        color: barColors.barColor.group2,
        label: {
          show: true,
          position: "right",
          color: barColors.barTextColor.group2,
          formatter: (value) => {
            // @ts-expect-error
            return value.data[2].toString() + "%";
          },
        },
      },
    ],
  };
}
