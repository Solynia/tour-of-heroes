import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom"
import Hero from "../model/Hero";
import { updateHero } from "../redux/actions/heroes";
import { AppState } from "../redux/reducers";
import { getHeroById } from "../redux/selectors/heroes";

interface HeroDetailProps extends RouteComponentProps<{ id?: string }> {
  hero?: Hero;
  updateHero?: (hero: Hero) => void;
}

interface HeroDetailState {
  input: string;
}

class HeroDetail extends React.Component<HeroDetailProps, HeroDetailState> {
  constructor(props: HeroDetailProps) {
    super(props);
    this.state = { input: this.props.hero?.name ?? "" };
  }

  handleUpdateInput = (value: string) => {
    this.setState({ input: value });
  };

  handleSaveClick = () => {
    this.props.updateHero?.({
      ...this.props.hero,
      name: this.state.input
    });
    this.redirectToList();
  };

  redirectToList = () => this.props.history.push("/heroes/list");

  disableSave = () => {
    return (
      !this.state.input ||
      (this.props.hero && this.state.input === this.props.hero.name)
    );
  };

  render() {
    return this.props.hero ? (
      <form onSubmit={this.handleSaveClick}>
        <h2>{this.props.hero?.name.toUpperCase()} Details</h2>
        <div>
          <span>id: </span>
          {this.props.hero?.id}
        </div>
        <div>
          <label>name: </label>
          <input
            type="text"
            placeholder="name"
            value={this.state.input}
            onChange={e => this.handleUpdateInput(e.target.value)}
          />
        </div>
        <input type="submit" value="Save" disabled={this.disableSave()} />
        <input type="button" value="Cancel" onClick={this.redirectToList} />
      </form>
    ) : <h2>No content to display</h2>;
  }
}

const mapStateToProps = (state: AppState, ownProps: HeroDetailProps) => ({
  hero: getHeroById(state, parseInt(ownProps.match.params.id ?? "")),
});

export default connect<{ hero?: Hero }, { updateHero: (hero: Hero) => void }, HeroDetailProps>(mapStateToProps, {
  updateHero
})(HeroDetail);
