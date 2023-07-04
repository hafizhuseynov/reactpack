import React from "react";
import { createRoot } from "react-dom/client";

import Text from "components/Text";
function App() {
  return (
    <React.StrictMode>
      <div>
        <Text />
      </div>
    </React.StrictMode>
  );
}
const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(<App />);
