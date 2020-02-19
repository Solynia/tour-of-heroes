import React from "react";
import { connect } from "react-redux";
import Hero from "../model/Hero";
import { AppState } from "../redux/reducers";
import { getHeroes, getSelectedHero } from "../redux/selectors";
import { selectHero } from "../redux/actions";

interface HeroListProps {
  heroes?: Hero[];
  selectedHero?: Hero;
  selectHero?: (hero: Hero) => void;
}

function HeroList(props: HeroListProps) {
  const elements =
    props.heroes &&
    props.heroes.map(hero => {
      const selectClassName =
        hero && props.selectedHero && hero.id === props.selectedHero.id
          ? "selected"
          : "";
      return (
        <li
          key={hero.id}
          onClick={() => props.selectHero && props.selectHero(hero)}
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

export default connect<HeroListProps>(
  (state: AppState) => ({
    heroes: getHeroes(state),
    selectedHero: getSelectedHero(state)
  }),
  { selectHero }
)(HeroList);
