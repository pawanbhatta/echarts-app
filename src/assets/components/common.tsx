import { PropsWithChildren } from "react";

export const Button = ({
  children,
  style,
}: PropsWithChildren<{ style?: React.CSSProperties }>) => {
  return (
    <button
      style={{
        border: "solid 1px #aaaa",
        padding: "0.5em",
        borderRadius: "5px",
        display: "flex",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
};
