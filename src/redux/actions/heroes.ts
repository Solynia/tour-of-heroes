import { Dispatch } from "react";
import { Action } from "redux";
import Hero from "../../model/Hero";
import { HeroActions } from "./actionTypes";
import { displayNotification } from "./notifications";

export interface HeroAction extends Action<HeroActions> {
    type: HeroActions;
    payload: { hero?: Hero, heroes?: Hero[] }
}

export function selectHero(hero: Hero): HeroAction {
    return {
        type: HeroActions.select,
        payload: { hero }
    };
}

export function updateHero(hero: Hero): (dispatch: Dispatch<Action>) => void {
    return (dispatch: Dispatch<Action>) => {
        displayNotification({ message: `Saving ${hero.name}` })(dispatch);
        dispatch({ type: HeroActions.update, payload: { hero } } as HeroAction);
    };
}

export function cancelHero(): HeroAction {
    return {
        type: HeroActions.update,
        payload: {}
    };
}

export function fetchHeroes(): (dispatch: Dispatch<Action>) => void {
    return (dispatch: Dispatch<Action>) => {
        displayNotification({ message: "Fetching heroes" });
        fetch('http://localhost:3001/heroes')
            .then((response) => response.json())
            .then((heroes: Hero[]) => {
                dispatch(fetchHeroesSuccess(heroes))
                displayNotification({ message: "Heroes loaded" })(dispatch);
            })
            .catch(() => displayNotification({ message: "Error loading heroes" }));
    };
}

export function fetchHeroesSuccess(heroes: Hero[]): HeroAction {
    return {
        type: HeroActions.fetchHeroesSuccess,
        payload: { heroes }
    };
}