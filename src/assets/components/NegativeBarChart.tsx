import * as React from "react";
import ReactEcharts from "echarts-for-react";
import useNegativeBarChart from "../chartOptions/useNegativeBarChart";
import { ConnectionContext } from "./ConnectECharts";
import { OptionAContext } from "./OptionAWrapper";

interface INegativeBarChartProps {}

const NegativeBarChart: React.FunctionComponent<INegativeBarChartProps> = (
  _props
) => {
  const dataContext = React.useContext(OptionAContext);
  const context = React.useContext(ConnectionContext);
  if (!context || !dataContext) return;
  const data = useNegativeBarChart({
    title: "Employee Movement Breakdown",
    dataset: dataContext.dataset,
    barColors: {
      barColor: dataContext.barColors,
      barTextColor: dataContext.barTextColors,
    },
  });
  return (
    <ReactEcharts
      option={data}
      style={{ height: "80vh" }}
      onChartReady={(instance) => {
        context.addChart({ div: instance, group: "group1" });
      }}
    ></ReactEcharts>
  );
};

export default NegativeBarChart;
