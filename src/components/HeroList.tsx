import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Hero from "../model/Hero";
import { AppState } from "../redux/reducers";
import { getHeroes } from "../redux/selectors/heroes";
import { fetchHeroes } from "../redux/actions/heroes";
import "./HeroList.css";

interface HeroListProps {
  heroes?: Hero[];
  fetchHeroes?: () => void;
}

class HeroList extends Component<HeroListProps> {
  componentDidMount() {
    this.props.fetchHeroes?.();
  }

  render() {
    const elements = this.props.heroes?.map(hero => {
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
}

const mapStateToProps = (state: AppState) => ({
  heroes: getHeroes(state),
});

export default connect<HeroListProps>(mapStateToProps, {
  fetchHeroes
})(HeroList);
