import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { updateHero } from "../redux/actions/heroes";
import { AppState } from "../redux/reducers";
import { getHeroById } from "../redux/selectors/heroes";

const HeroDetail = () => {
  const params = useParams()
  const navigate = useNavigate();
  const hero = useSelector((state: AppState) => getHeroById(state, parseInt(params.id ?? "")));
  const dispatch = useDispatch();
  const [input, setInput] = useState(hero?.name ?? "");
  useDocumentTitle(input);

  const handleUpdateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSaveClick = () => {
    updateHero?.({
      ...hero,
      name: input
    })(dispatch);
    redirectToList();
  };

  const redirectToList = () => navigate("/heroes/list");

  const disableSave = () => !input || (hero && input === hero.name);

  return hero ? (
    <form onSubmit={handleSaveClick}>
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
  ) : <h2>No content to display</h2>;
}

export default HeroDetail;
