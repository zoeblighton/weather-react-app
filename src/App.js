import "./App.css";
import React from "react";
import axios from "axios";
import Weather from "./Weather";

function App() {
  return (
    <div className="App">
      <h1>
        {" "}
        <Weather />{" "}
      </h1>
    </div>
  );
}

export default App;
