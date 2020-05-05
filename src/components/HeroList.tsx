import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { fetchHeroes } from "../redux/actions/heroes";
import { getHeroes } from "../redux/selectors/heroes";
import "./HeroList.css";

const HeroList = () => {
  const heroes = useSelector(getHeroes);
  const dispatch = useDispatch();
  useDocumentTitle('Hero List');
  // fetch heroes only once
  useEffect(() => fetchHeroes()(dispatch), [dispatch]);

  const elements = heroes?.map(hero => {
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

export default HeroList;
