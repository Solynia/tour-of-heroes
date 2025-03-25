import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { getHeroById, updateHero } from "../redux/heros/heroesSlice";

const HeroDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const hero = useAppSelector((state) =>
    getHeroById(state, parseInt(params.id ?? ""))
  );
  const dispatch = useAppDispatch();
  const [input, setInput] = useState(hero?.name ?? "");
  useEffect(() => setInput(hero?.name ?? ""), [hero]);
  useDocumentTitle(input);

  const handleUpdateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSaveClick = () => {
    dispatch(updateHero({ ...hero, name: input }));
    redirectToList();
  };

  const redirectToList = () => navigate("/heroes/list");

  const disableSave = () => !input || (hero && input === hero.name);

  return hero ? (
    <form action={handleSaveClick}>
      <h2>{hero?.name.toUpperCase()} Details</h2>
      <div>
        <span>id: </span>
        {hero?.id}
      </div>
      <div>
        <label>name: </label>
        <input
          type="text"
          placeholder="name"
          value={input}
          onChange={handleUpdateInput}
        />
      </div>
      <input type="submit" value="Save" disabled={disableSave()} />
      <input type="button" value="Cancel" onClick={redirectToList} />
    </form>
  ) : (
    <h2>No content to display</h2>
  );
};

export default HeroDetail;
