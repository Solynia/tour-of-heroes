import { Dispatch } from "react";
import { Action } from "redux";
import Hero from "../model/Hero";
import { HeroActions } from "./actionTypes";

export interface HeroAction extends Action<HeroActions> {
    type: HeroActions;
    payload: { hero?: Hero, heroes?: Hero[] }
}

export function selectHero(hero: Hero): HeroAction {
    return {
        type: HeroActions.select,
        payload: { hero }
    }
}

export function updateHero(hero: Hero): HeroAction {
    return {
        type: HeroActions.update,
        payload: { hero }
    }
}

export function cancelHero(): HeroAction {
    return {
        type: HeroActions.update,
        payload: {}
    }
}

export function fetchHeroes() {
    return (dispatch: Dispatch<HeroAction>) => {
        fetch('http://localhost:3001/heroes')
            .then((response) => response.json())
            .then((heroes: Hero[]) => dispatch(fetchHeroesSuccess(heroes)));
    }
}

export function fetchHeroesSuccess(heroes: Hero[]): HeroAction {
    return {
        type: HeroActions.fetchHeroesSuccess,
        payload: { heroes }
    }
}