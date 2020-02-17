import React from "react";
import Hero from "../model/Hero";

interface HeroListProps {
  heroes?: Hero[];
  selectedHero?: Hero;
  onSelect: (hero: Hero) => void;
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
        <li onClick={() => props.onSelect(hero)} className={selectClassName}>
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

export default HeroList;
