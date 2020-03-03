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
    return (dispatch: Dispatch<Action>) => {
        dispatch(displayNotification({ message: "Fetching heroes" })(dispatch));
        fetch('http://localhost:3001/heroes')
            .then((response) => response.json())
            .then((heroes: Hero[]) => {
                dispatch(fetchHeroesSuccess(heroes))
                dispatch(displayNotification({ message: "Heroes loaded" })(dispatch));
            })
            .catch(() => dispatch(displayNotification({ message: "Error loading heroes" })(dispatch)));
    }
}

export function fetchHeroesSuccess(heroes: Hero[]): HeroAction {
    return {
        type: HeroActions.fetchHeroesSuccess,
        payload: { heroes }
    }
}