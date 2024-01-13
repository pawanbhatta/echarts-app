import { EChartsOption } from "echarts";

const DEFAULT_BAR_COLORS = {
  barColor: {
    basic: "#59d1c8",
  },
  barTextColor: {
    basic: "#65d4cc",
  },
};
export default function useNegativeBarChart({
  barColors = DEFAULT_BAR_COLORS,
  ...options
}: {
  title: string;
  dataset: any[][];
  xAxis?: any[];
  yAxis?: any[];
  barColors?: typeof DEFAULT_BAR_COLORS;
}): EChartsOption {
  const mappedDataSet = options.dataset.map((data, i) => {
    if (i === 0) return [data[0], "Difference"];
    return [data[0], data[1] - data[2]];
  });
  return {
    dataset: {
      source: mappedDataSet,
    },
    yAxis: {
      type: "category",
      inverse: true,
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    xAxis: {
      type: "value",
      min: -20,
      max: 20,
      axisLabel: {
        formatter: (value) => {
          return value + " pp";
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          width: 2,
        },
      },
      interval: 10,
      splitLine: {
        show: true,
        interval: 5,
        lineStyle: {
          type: "dashed",
        },
      },
    },
    series: [
      {
        type: "bar",
        barWidth: "80%",
        color: barColors.barColor.basic,
        label: {
          show: true,
          position: "outside",
          color: barColors.barTextColor.basic,
          formatter: (value) => {
            // @ts-expect-error
            return value.data[1].toFixed(2).toString() + " pp";
          },
        },
      },
    ],
  };
}
