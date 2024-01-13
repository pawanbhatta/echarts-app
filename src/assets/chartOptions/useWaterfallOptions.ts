import { EChartsOption } from "echarts";

const transformData = (data: number[]) => {
  let sum = 0;
  let help = [];
  let positive = [];
  let negative = [];
  let netChange = [];
  let discrepancies = [];
  for (var i = 0; i < data.length; ++i) {
    netChange.push("-");
    if (data[i] >= 0) {
      positive.push(data[i]);
      negative.push("-");
      discrepancies.push("-");
    } else {
      positive.push("-");
      negative.push(-data[i]);
      discrepancies.push("-");
    }

    if (i === 0) {
      help.push(0);
    } else {
      sum += data[i - 1];
      if (data[i] < 0) {
        help.push(sum + data[i]);
      } else {
        help.push(sum);
      }
    }
  }
  help.push("-");
  netChange.push(sum + data[i - 1]);
  positive.push("-");
  negative.push("-");
  discrepancies.push("-");
  return { help, positive, negative, discrepancies, netChange };
};

const DEFAULT_BAR_COLORS = {
  barColor: {
    positive: "#9bebb4",
    negative: "#fdacaa",
    discrepancies: "#c3c7ce",
    netChange: "#bedcfe",
  },
  barTextColor: {
    positive: "#53de86",
    negative: "#f88b8b",
    discrepancies: "#9ba2ad",
    netChange: "#90c4fc",
  },
};

const useWaterfallOptions = ({
  barColors = DEFAULT_BAR_COLORS,
  ...options
}: {
  title: string;
  data: number[];
  xAxis: any[];
  barColors?: typeof DEFAULT_BAR_COLORS;
}) => {
  const { help, negative, positive, discrepancies, netChange } = transformData(
    options.data
  );

  const option: EChartsOption = {
    title: {
      text: options.title,
      left: "left",
      borderColor: "#0003",
      borderType: "solid",
      padding: 10,
      borderWidth: 1,
      borderRadius: 5,
      textStyle: {
        color: "black",
        fontWeight: "normal",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        splitLine: { show: false },
        axisLabel: {
          interval: 0,
        },
        data: [...options.xAxis, "Net Change"],
      },
      {
        type: "category",
        position: "bottom",
        offset: 30,
        boundaryGap: true,
        axisTick: {
          show: true,
          length: 5,
          inside: true,
          lineStyle: {
            dashOffset: 100,
            color: "#fff",
            width: 5,
            shadowColor: "#fff",
            shadowOffsetY: 5,
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: 5,
            color: "black",
            opacity: 0.5,
          },
        },
        data: [
          "Incoming",
          "Outgoing",
          {
            value: "",
            textStyle: {
              color: "transparent",
            },
          },
        ],
      },
    ],
    yAxis: {
      type: "value",
      interval: 200,
    },
    series: [
      {
        type: "bar",
        stack: "all",
        barWidth: "90%",
        itemStyle: {
          // @ts-expect-error
          normal: {
            barBorderColor: "rgba(0,0,0,0)",
            color: "rgba(0,0,0,0)",
          },
          emphasis: {
            barBorderColor: "rgba(0,0,0,0)",
            color: "rgba(0,0,0,0)",
          },
        },
        data: help,
      },
      {
        name: "positive",
        type: "bar",
        stack: "all",
        data: positive,
        barWidth: "90%",
        itemStyle: {
          color: barColors.barColor.positive,
        },
        label: {
          show: true,
          position: "top",
          formatter: (value) => {
            // @ts-expect-error
            return (value.data < 0 ? "-" : "+") + value.data.toString();
          },
          color: barColors.barTextColor.positive,
        },
      },
      {
        name: "negative",
        type: "bar",
        stack: "all",
        data: negative,
        barWidth: "90%",
        itemStyle: {
          color: barColors.barColor.negative,
        },
        label: {
          show: true,
          position: "bottom",
          formatter: (value) => {
            // @ts-expect-error
            return (value.data < 0 ? "-" : "+") + value.data.toString();
          },
          color: barColors.barTextColor.negative,
        },
      },
      {
        name: "discrepancies",
        type: "bar",
        stack: "all",
        data: discrepancies,
        barWidth: "90%",
        itemStyle: {
          color: barColors.barColor.discrepancies,
        },
        label: {
          show: true,
          position: "bottom",
          formatter: (value) => {
            // @ts-expect-error
            return (value.data < 0 ? "-" : "+") + value.data.toString();
          },
          color: barColors.barTextColor.discrepancies,
        },
      },
      {
        name: "netChange",
        type: "bar",
        stack: "all",
        data: netChange,
        barWidth: "90%",
        itemStyle: {
          color: barColors.barColor.netChange,
        },
        label: {
          show: true,
          position: "top",
          formatter: (value) => {
            // @ts-expect-error
            return (value.data < 0 ? "-" : "+") + value.data.toString();
          },
          color: barColors.barTextColor.netChange,
        },
      },
    ],
  };

  return option;
};

export default useWaterfallOptions;
