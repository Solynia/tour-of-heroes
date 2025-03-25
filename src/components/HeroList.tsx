import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { fetchHeroes, getHeroes } from "../redux/heros/heroesSlice";
import "./HeroList.css";

const HeroList = () => {
  const heroes = useAppSelector(getHeroes);
  const dispatch = useAppDispatch();
  useDocumentTitle("Hero List");
  // fetch heroes only once
  useEffect(() => {
    dispatch(fetchHeroes());
  }, []);

  const elements = heroes?.map((hero) => {
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
};

export default HeroList;
