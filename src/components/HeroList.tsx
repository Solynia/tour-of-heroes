import React, { Component } from "react";
import { connect } from "react-redux";
import Hero from "../model/Hero";
import { AppState } from "../redux/reducers";
import { getHeroes, getSelectedHero } from "../redux/selectors/heroes";
import { selectHero, fetchHeroes } from "../redux/actions/heroes";
import "./HeroList.css";

interface HeroListProps {
  heroes?: Hero[];
  selectedHero?: Hero;
  selectHero?: (hero: Hero) => void;
  fetchHeroes?: () => void;
}

class HeroList extends Component<HeroListProps> {
  componentDidMount() {
    this.props.fetchHeroes?.();
  }

  render() {
    const elements = this.props.heroes?.map(hero => {
      const selectClassName =
        hero?.id === this.props.selectedHero?.id ? "selected" : "";
      return (
        <li
          key={hero.id}
          onClick={() => this.props.selectHero?.(hero)}
          className={selectClassName}
        >
          <span className="badge">{hero.id}</span> {hero.name}
        </li>
      );
    });

    return (
      <div>
        <h2>My Heroes</h2>
        <ul className="heroes">{elements}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  heroes: getHeroes(state),
  selectedHero: getSelectedHero(state)
});

export default connect<HeroListProps>(mapStateToProps, {
  selectHero,
  fetchHeroes
})(HeroList);
