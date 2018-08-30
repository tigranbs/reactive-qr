import React from "react";
import ReactDOM from "react-dom";
import ReactiveQR from "./lib";

const App = () => (
  <div style={{ width: 300, border: "1px solid #f7f7f7" }}>
    <ReactiveQR />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
