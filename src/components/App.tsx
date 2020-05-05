import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import HeroDetail from "./HeroDetail";
import HeroList from "./HeroList";
import Message from "./Message";
import NavMenu from "./NavMenu";

type Props = {
  title: string;
}

const App = (props: Props) => {
  return (
    <Router>
      <NavMenu></NavMenu>
      <main>
        <h1>{props.title}</h1>
        <Switch>
          <Route path="/heroes/list" component={HeroList} />
          <Route path="/heroes/detail/:id" component={HeroDetail} />
          <Route path="/heroes/detail" component={HeroDetail} />
        </Switch>
      </main>
      <Message></Message>
    </Router>
  );
}

export default App;
