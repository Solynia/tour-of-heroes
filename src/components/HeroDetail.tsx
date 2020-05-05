import React, { useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import Hero from "../model/Hero";
import { updateHero } from "../redux/actions/heroes";
import { AppState } from "../redux/reducers";
import { getHeroById } from "../redux/selectors/heroes";

type OwnProps = RouteComponentProps<{ id: string }>;

type StateProps = {
  hero?: Hero;
}

type DispatchProps = {
  updateHero: (hero: Hero) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

const HeroDetail = (props: Props) => {
  const [input, setInput] = useState(props.hero?.name ?? "");
  useDocumentTitle(input);

  const handleUpdateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSaveClick = () => {
    props.updateHero?.({
      ...props.hero,
      name: input
    });
    redirectToList();
  };

  const redirectToList = () => props.history.push("/heroes/list");

  const disableSave = () => !input || (props.hero && input === props.hero.name);

  return props.hero ? (
    <form onSubmit={handleSaveClick}>
      <h2>{props.hero?.name.toUpperCase()} Details</h2>
      <div>
        <span>id: </span>
        {props.hero?.id}
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

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
  hero: getHeroById(state, parseInt(ownProps.match.params.id ?? "")),
});

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, { updateHero })(HeroDetail);
