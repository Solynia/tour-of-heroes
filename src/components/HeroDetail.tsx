import React from "react";
import { connect } from "react-redux";
import Hero from "../model/Hero";
import { AppState } from "../redux/reducers";
import { getSelectedHero } from "../redux/selectors/heroes";
import { updateHero, cancelHero } from "../redux/actions/heroes";

interface HeroDetailProps {
  hero?: Hero;
  updateHero?: (hero: Hero) => void;
  cancelHero?: () => void;
}

interface HeroDetailState {
  input: string;
  disableSave: boolean;
}

class HeroDetail extends React.Component<HeroDetailProps, HeroDetailState> {
  constructor(props: HeroDetailProps) {
    super(props);
    this.state = { input: "", disableSave: true };
  }

  handleUpdateInput = (value: string) => {
    this.setState({ input: value });
  };

  handleSaveClick = () => {
    this.props.updateHero?.({
      ...this.props.hero,
      name: this.state.input
    });
    this.setState({ input: "", disableSave: true });
  };

  handleCancelClick = () => this.props.cancelHero?.();

  disableSave = () => {
    return (
      !this.state.input ||
      (this.props.hero && this.state.input === this.props.hero.name)
    );
  };

  componentDidUpdate(prevProps: HeroDetailProps) {
    if (this.props.hero?.id !== prevProps.hero?.id) {
      this.setState({ input: this.props.hero?.name ?? "" });
    }
  }

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
        <input type="button" value="Cancel" onClick={this.handleCancelClick} />
      </form>
    ) : null;
  }
}

const mapStateToProps = (state: AppState) => ({
  hero: getSelectedHero(state)
});

export default connect<HeroDetailProps>(mapStateToProps, {
  updateHero,
  cancelHero
})(HeroDetail);
