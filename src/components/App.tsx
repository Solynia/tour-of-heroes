import React from "react";
import "./App.css";
import Heroes from "./Heroes";
import NavMenu from "./NavMenu";

interface AppProps {
  title: string;
}

function App(props: AppProps) {
  return (
    <div>
      <NavMenu></NavMenu>
      <main>
        <h1>{props.title}</h1>
        <Heroes />
      </main>
    </div>
  );
}

export default App;
