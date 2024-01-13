import { ECharts } from "echarts";
import React, { createContext, useEffect, useState } from "react";

export const ConnectionContext = createContext<{
  addChart: (chart: { div: ECharts; group: string }) => void;
} | null>(null);

export const ConnectECharts = ({ children }: React.PropsWithChildren) => {
  const [charts, setCharts] = useState<Array<{ div: ECharts; group: string }>>(
    []
  );
  const addChart = (chart: { div: ECharts; group: string }) => {
    chart.div.group = chart.group;
    setCharts([chart, ...charts]);
  };
  useEffect(() => {
    new Set(charts.map((c) => c.group)).forEach(async (group) => {
      await import("echarts").then((ec) => ec.connect(group));
    });
    return () => {
      new Set(charts.map((c) => c.group)).forEach(async (group) => {
        await import("echarts").then((ec) => ec.disconnect(group));
      });
    };
  }, [charts]);
  return (
    <ConnectionContext.Provider value={{ addChart }}>
      {children}
    </ConnectionContext.Provider>
  );
};
