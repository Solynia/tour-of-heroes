import React from "react";
import "./Heroes.css";
import Hero, { HEROES } from "../model/Hero";
import HeroForm from "./HeroForm";
import HeroList from "./HeroList";

interface HeroesState {
  hero?: Hero;
  heroes?: Hero[];
}

class Heroes extends React.Component<{}, HeroesState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      heroes: HEROES
    };
  }

  handleNameChange = (value: string) => {
    this.setState({
      hero: { ...this.state.hero, name: value }
    });
  };

  handleHeroSelect = (hero: Hero) => {
    this.setState({
      hero: hero
    });
  };

  render() {
    return (
      <div>
        <HeroList
          heroes={this.state.heroes}
          selectedHero={this.state.hero}
          onSelect={(hero: Hero) => this.handleHeroSelect(hero)}
        />
        <HeroForm
          hero={this.state.hero}
          onNameChange={(name: string) => this.handleNameChange(name)}
        />
      </div>
    );
  }
}

export default Heroes;
