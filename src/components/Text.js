import React, { useState } from "react";

export default function Text() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ userSelect: "none" }} onClick={() => setCount(count + 1)}>
      Count: {count}
    </div>
  );
}
