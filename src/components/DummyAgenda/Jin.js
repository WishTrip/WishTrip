import React from "react";

export default function Jin({ active, activeDot }) {
  return active === activeDot && <div>HELLO THIS IS {active}</div>;
}
