import React from "react";
import "./App.css";
import Heroes from "./Heroes";

interface AppProps {
  title: string;
}

function App(props: AppProps) {
  return (
    <div>
      <h1>{props.title}</h1>
      <Heroes />
    </div>
  );
}

export default App;
