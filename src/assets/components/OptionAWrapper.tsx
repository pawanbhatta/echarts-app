import { PropsWithChildren, createContext } from "react";
import {
  CalendarDate,
  CaretDownFill,
  CircleFill,
  GearFill,
  InfoLg,
  ListUl,
  SquareHalf,
} from "react-bootstrap-icons";
import { Button } from "./common";
export const OptionAContext = createContext<{
  dataset: any[][];
  barColors: typeof DEFAULT_BAR_COLORS.barColor;
  barTextColors: typeof DEFAULT_BAR_COLORS.barTextColor;
} | null>(null);

const dataset = [
  ["Resignation Rate", "Overall", "High Performer"],
  ["Operations", 16.61, 16.6],
  ["Sales", 15.3, 18.1],
  ["IT", 13.7, 11.6],
  ["HR", 12.9, 20.8],
  ["Finance", 12.5, 9.27],
  ["Customer Support", 12.3, 12],
  ["Marketing", 11.9, 10.9],
  ["Office of CEO", 11, 0],
  ["Product", 9.37, 8.59],
];
const DEFAULT_BAR_COLORS = {
  barColor: {
    basic: "#59d1c8",
    group1: "#5db5e3",
    group2: "#ff9179",
  },
  barTextColor: {
    basic: "#65d4cc",
    group1: "#64b7e3",
    group2: "#ff9881",
  },
};
const OptionAWrapper = ({ children }: PropsWithChildren) => {
  return (
    <OptionAContext.Provider
      value={{
        dataset,
        barColors: DEFAULT_BAR_COLORS.barColor,
        barTextColors: DEFAULT_BAR_COLORS.barTextColor,
      }}
    >
      <div style={{ display: "flex" }}>
        <div className="chart" style={{ flex: 1, paddingInline: "30px" }}>
          <div>
            <h3>
              Comparison of high performer resignation rates to overall
              resignation rates{" "}
              <span
                style={{
                  width: "15px",
                  height: "15px",
                  display: "inline-grid",
                  placeItems: "center",
                  background: "#000",
                  borderRadius: "20vh",
                  padding: "0.4em",
                }}
              >
                <CaretDownFill fill="#fff" width={"100%"} height={"100%"} />
              </span>
            </h3>
            <p>Do high performers resign more than others?</p>
          </div>
          <div style={{ display: "flex", gap: "30px" }}>
            <Button>
              <CalendarDate height={"20px"} width={"auto"} />
              <b>Mar 2019</b>
            </Button>
            <Button>
              <b>+ Add a Filter</b>
            </Button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {children}
          </div>
        </div>
        <div
          className="summary"
          style={{
            padding: "0.5em",
            position: "relative",
            background: "#f3f4f6",
            boxShadow: "-2px 0 15px #aaa8",
            width: "300px",
          }}
        >
          <h3 style={{ marginTop: "0em" }}>Summary</h3>
          <h4>Apr 2018 - Mar 2019</h4>
          <div style={{ paddingInline: "2em", background: "#fff" }}>
            <ul style={{ padding: 0, margin: 0 }}>
              {[
                { textColor: "#3d82f6", title: "Overall", value: "14.0%" },
                { title: "Resignation Count", value: "14.0%" },
                { title: "Average Headcount", value: "14.0%" },
                {
                  textColor: "orangered",
                  title: "High Performer",
                  value: "14.0%",
                },
                { title: "Resignation Count", value: "14.0%" },
                { title: "Average Headcount", value: "14.0%" },
                { textColor: "limegreen", title: "Difference", value: "14.0%" },
              ].map((d, i) => {
                return (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "2em",
                      color: d.textColor ?? "black",
                      justifyContent: "space-between",
                      borderBottom: "2px solid #f3f4f6",
                    }}
                  >
                    <span>
                      <b>{d.title}</b>
                    </span>
                    <span>
                      <b>{d.value}</b>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <Button
            style={{
              marginTop: "0.8em",
              fontSize: "1.2em",
              width: "100%",
            }}
          >
            <b>View Details</b>
          </Button>
          <h4
            style={{
              marginTop: 0,
              marginBottom: "0.5em",
              borderBottom: "1px solid  #aaaa",
              marginInline: "0.5em",
              fontSize: "1.1em",
            }}
          >
            Legend
          </h4>
          <div
            style={{
              paddingInline: "1em",
              background: "#fff",
              color: "#6f7683",
            }}
          >
            <b>
              Not all data items are shown in this chart. To show these values,
              go to{" "}
              <a
                href="#"
                style={{
                  color: "#3d82f6",
                }}
              >
                Chat Settings
              </a>
            </b>
          </div>
          <ActionButtons />
        </div>
      </div>
    </OptionAContext.Provider>
  );
};

const ActionButtons = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "0",
          top: "50%",
          display: "grid",
          gap: "10px",
          transform: "translate(-50%,-50%)",
        }}
      >
        {[
          { value: "$info", background: "#3d82f6", icon: InfoLg },
          { value: "$hamburg", background: "#6b7280", icon: ListUl },
          { value: "$settings", background: "#6b7280", icon: GearFill },
          { value: "$civle", background: "#6b7280", icon: CircleFill },
          { value: "$dash", background: "#000", icon: SquareHalf },
        ].map((d, i) => (
          <a
            href="#"
            key={i}
            style={{
              background: d.background,
              color: d.background,
              padding: "0.7em",
              width: "17px",
              height: "17px",
              display: "grid",
              placeItems: "center",
              borderRadius: "10vw",
            }}
          >
            {d.icon ? (
              <d.icon fill="#fff" width="100%" height="100%" />
            ) : (
              d.value
            )}
          </a>
        ))}
      </div>
    </>
  );
};
export default OptionAWrapper;
