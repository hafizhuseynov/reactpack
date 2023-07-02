import React, { useState } from "react";
import Icon from "../assets/icons/bookmark-svgrepo-com.svg";
import "./Text.css";
import "./Text.scss";
export default function Text() {
  const [count, setCount] = useState(0);
  return (
    <div
      className="rounded"
      style={{ userSelect: "none" }}
      onClick={() => setCount(count + 1)}
    >
      Count: {count}
      <Icon
        style={{
          width: "24px",
          height: "24px",
          verticalAlign: "middle",
          marginLeft: "10px",
        }}
      />
    </div>
  );
}
