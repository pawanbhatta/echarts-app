import "./App.css";
import WaterfallChart from "./assets/components/WaterfallChart";
import GroupedBarChart from "./assets/components/GroupedBarChart";
import NegativeBarChart from "./assets/components/NegativeBarChart";
import { ConnectECharts } from "./assets/components/ConnectECharts";
import OptionAWrapper from "./assets/components/OptionAWrapper";

function App() {
  return (
    <>
      <OptionAWrapper>
        <ConnectECharts>
          <GroupedBarChart />
          <NegativeBarChart />
        </ConnectECharts>
      </OptionAWrapper>
      <WaterfallChart />
    </>
  );
}

export default App;
