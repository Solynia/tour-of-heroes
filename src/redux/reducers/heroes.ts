import Hero from "../../model/Hero";
import { HeroActions } from "../actions/actionTypes";
import { HeroAction } from "../actions/heroes";

export type HeroState = {
  heroes: Hero[];
}

export default function heroes(state: HeroState = { heroes: [] }, action: HeroAction) {
  switch (action.type) {
    case HeroActions.update:
      return heroUpdate(state, action.payload.hero);
    case HeroActions.fetchHeroesSuccess:
      return fetchHeroesSuccess(state, action.payload.heroes);
    default:
      return state;
  }
}

function heroUpdate(state: HeroState, hero: Hero = { name: '' }): HeroState {
  return {
    ...state,
    heroes: [...state.heroes.map(h => ({
      ...h,
      name: hero.id === h.id ? hero.name : h.name
    }))]
  };
}

function fetchHeroesSuccess(state: HeroState, heroes: Hero[] = []): HeroState {
  return {
    ...state,
    heroes
  };
}
