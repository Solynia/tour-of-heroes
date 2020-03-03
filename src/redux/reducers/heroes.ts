import Hero from "../../model/Hero";
import { HeroActions } from "../actionTypes";
import { HeroAction } from "../actions";

export interface HeroState {
    heroes: Hero[];
}

export default function (state: HeroState = { heroes: [] }, action: HeroAction) {
    switch (action.type) {
        case HeroActions.select:
            return heroSelect(state, action.payload.hero);
        case HeroActions.update:
            return heroUpdate(state, action.payload.hero);
        case HeroActions.cancel:
            return heroCancel(state);
        case HeroActions.fetchHeroesSuccess:
            return fetchHeroesSuccess(state, action.payload.heroes);
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
    };
}

function heroUpdate(state: HeroState, hero: Hero = { name: '' }): HeroState {
    return {
        ...state,
        heroes: [...state.heroes.map(h => ({
            ...h,
            name: hero && hero.id === h.id ? hero.name : h.name,
            selected: false
        }))]
    };
}

function heroCancel(state: HeroState): HeroState {
    return {
        ...state,
        heroes: [...state.heroes.map(h => ({
            ...h,
            selected: false
        }))]
    };
}

function fetchHeroesSuccess(state: HeroState, heroes: Hero[] = []): HeroState {
    return {
        ...state,
        heroes
    };
}