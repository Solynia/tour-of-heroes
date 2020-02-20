import { Action } from "redux";
import Hero from "../../model/Hero";
import { HeroActions } from "../actionTypes";

export interface HeroAction extends Action<HeroActions> {
    type: HeroActions;
    payload: { hero?: Hero }
}

export interface HeroState {
    heroes: Hero[];
}

export default function (state: HeroState = { heroes: [] }, action: HeroAction) {
    switch (action.type) {
        case HeroActions.select:
            return heroSelect(state, action.payload.hero);
        case HeroActions.update:
            return heroUpdate(state, action.payload.hero);
        default:
            return state;
    }
}

function heroSelect(state: HeroState, hero: Hero = { name: '' }): HeroState {
    return {
        ...state,
        heroes: [...state.heroes.map(h => ({
            ...h,
            selected: hero && hero.id === h.id
        }))]
    }
}

function heroUpdate(state: HeroState, hero: Hero = { name: '' }): HeroState {
    return {
        ...state,
        heroes: [...state.heroes.map(h => ({
            ...h,
            name: hero && hero.id === h.id ? hero.name : h.name,
            selected: false
        }))]
    }
}