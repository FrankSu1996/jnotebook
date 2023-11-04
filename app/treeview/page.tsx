"use client";
import { Button } from "@/components/ui/button";
import { Tooltip } from "react-tooltip";

export default function Page() {
  return (
    <div className="container">
      <div className="App">
        <h1 data-tooltip-id="my-tooltip-1" style={{ backgroundColor: "#999" }}>
          Hello Tooltip Example
        </h1>
        <h2 data-tooltip-id="my-tooltip-2" style={{ backgroundColor: "#999" }}>
          This is a basic example on how to use ReactTooltip
        </h2>
      </div>
      <Tooltip id="my-tooltip-1" place="bottom" content="Hello world! I'm a Tooltip" />
      <Tooltip id="my-tooltip-2" place="bottom" variant="info" content="I'm a info tooltip" />
    </div>
  );
}
