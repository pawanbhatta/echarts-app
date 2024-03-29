/* Created by Dhaval Laiya */
/* Modified by Ashish Bhattarai (Added types) */

import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import cx from "classnames";

function ECharts(props: {
  options: any;
  style?: React.CSSProperties;
  className?: string;
  loading?: boolean;
  message?: string;
}) {
  const { options, style, className, loading, message } = props;
  const [chart, setChart] = useState<echarts.ECharts | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current, "westeros"); // echarts theme
    chart.setOption({ ...options, resizeObserver }, true); // second param is for 'noMerge'
    setChart(chart);
    if (resizeObserver && chartRef.current)
      resizeObserver.observe(chartRef.current);
  }, [options]);

  useEffect(() => {
    if (!chart) {
      return;
    }
    if (loading) {
      chart.showLoading();
      return;
    }

    chart.hideLoading();
  }, [chart, loading]);

  useEffect(() => {
    if (chart && options && message) {
      chart.clear();
    }
  }, [message]);

  const newStyle = {
    height: 350,
    ...style,
  };

  return (
    <div className="echarts-parent position-relative">
      <div
        ref={chartRef}
        style={newStyle}
        className={cx("echarts-react", className)}
      />
      {message ? <div className="no-data">{message}</div> : null}
    </div>
  );
}

const resizeObserver = new window.ResizeObserver((entries) => {
  entries.map(({ target }) => {
    const instance = echarts.getInstanceByDom(target as HTMLElement);
    if (instance) {
      instance.resize();
    }
  });
});
const EChartsRender = React.memo(ECharts);
export default EChartsRender;
