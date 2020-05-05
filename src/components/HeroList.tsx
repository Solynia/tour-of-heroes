import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import Hero from "../model/Hero";
import { fetchHeroes } from "../redux/actions/heroes";
import { AppState } from "../redux/reducers";
import { getHeroes } from "../redux/selectors/heroes";
import "./HeroList.css";

type StateProps = {
  heroes: Hero[];
}

type DispatchProps = {
  fetchHeroes: () => void;
}

type Props = StateProps & DispatchProps;

const HeroList = (props: Props) => {
  // fetch heroes only once
  useEffect(props.fetchHeroes, []);
  useDocumentTitle('Hero List');

  const elements = props.heroes?.map(hero => {
    return (
      <Link key={hero.id} to={`/heroes/detail/${hero.id}`}>
        <li>
          <span className="badge">{hero.id}</span> {hero.name}
        </li>
      </Link>
    );
  });

  return (
    <div>
      <h2>My Heroes</h2>
      <ul className="heroes">{elements}</ul>
    </div>
  );
}

const mapStateToProps = (state: AppState): StateProps => ({
  heroes: getHeroes(state),
});

export default connect<StateProps, DispatchProps>(mapStateToProps, { fetchHeroes })(HeroList);
