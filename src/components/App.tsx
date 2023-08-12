import React from "react";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
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
        <Routes>
          <Route path="/heroes/list" element={<HeroList />} />
          <Route path="/heroes/detail/:id" element={<HeroDetail />} />
          <Route path="/heroes/detail" element={<HeroDetail />} />
        </Routes>
      </main>
      <Message></Message>
    </Router>
  );
}

export default App;
