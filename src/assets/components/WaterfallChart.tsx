import ReactEcharts from "echarts-for-react";
import useWaterfallOptions from "../chartOptions/useWaterfallOptions";

function WaterfallChart() {
  const data = useWaterfallOptions({
    title: "Employee Movement Breakdown",
    data: [379, 326, -118, -232, +7],
    xAxis: [
      "Expansion",
      "Replacement",
      "Involuntary Turnover",
      "Voluntary Turnover",
      "Discrepancies",
    ],
  });
  return <ReactEcharts option={data} style={{ height: "70vh" }}></ReactEcharts>;
}

export default WaterfallChart;
