import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import HeroList from "./HeroList";
import HeroDetail from "./HeroDetail";
import Message from "./Message";
import NavMenu from "./NavMenu";

interface AppProps {
  title: string;
}

function App(props: AppProps) {
  return (
    <Router>
      <NavMenu></NavMenu>
      <main>
        <h1>{props.title}</h1>
        <Switch>
          <Route path="/heroes/list">
            <HeroList />
          </Route>
          <Route path="/heroes/detail/:id">
            <HeroDetail />
          </Route>
          <Route path="/heroes/detail">
            <HeroDetail />
          </Route>
        </Switch>
      </main>
      <Message></Message>
    </Router>
  );
}

export default App;
