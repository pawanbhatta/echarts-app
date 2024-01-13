import * as React from "react";
import ReactEcharts from "echarts-for-react";
import useGroupedBarChart from "../chartOptions/useGroupedBarChart";
import { ConnectionContext } from "./ConnectECharts";
import { OptionAContext } from "./OptionAWrapper";

interface IGroupedBarChartProps {}

const GroupedBarChart: React.FunctionComponent<IGroupedBarChartProps> = (
  _props
) => {
  const dataContext = React.useContext(OptionAContext);
  const context = React.useContext(ConnectionContext);
  if (!context || !dataContext) return;
  const data = useGroupedBarChart({
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

export default GroupedBarChart;
